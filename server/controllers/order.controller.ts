import { Request, Response } from "express";
import Restaurant from "../models/resturant.model";
import Order from "../models/order.model";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// First, let's define proper types for better type safety
type MenuItem = {
  _id: string;
  name: string;
  image: string;
  price: number;
};

type CartItem = {
  menuId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type DeliveryDetails = {
  name: string;
  email: string;
  address: string;
  city: string;
  country: string;
};

type CheckoutSessionRequest = {
  cartItems: CartItem[];
  delivaryDetails: DeliveryDetails;
  resturantId: string;
};

// Updated createLineItems function with proper typing
export const createLineItems = (
  checkoutSessionRequest: CheckoutSessionRequest,
  menuItems: MenuItem[]
) => {
  const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
    const menuItem = menuItems.find(
      (item) => item._id.toString() === cartItem.menuId
    );
    if (!menuItem) throw new Error(`Menu Item ${cartItem.menuId} Not Found`);
    return {
      price_data: {
        currency: "pkr",
        product_data: {
          name: menuItem.name,
          images: [menuItem.image],
        },
        unit_amount: menuItem.price * 100,
      },
      quantity: cartItem.quantity,
    };
  });
  return lineItems;
};

// Updated controller function
export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body;

    const resturant = await Restaurant.findById(
      checkoutSessionRequest.resturantId
    ).populate<{ menus: MenuItem[] }>("menus"); // Specify the populated type

    if (!resturant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    const order = new Order({
      resturantId: resturant?._id,
      userId: req.id,
      delivaryDetails: checkoutSessionRequest.delivaryDetails,
      cartItems: checkoutSessionRequest.cartItems,
      totalPrice: checkoutSessionRequest.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    });

    const menuItems = resturant.menus;
    // Correct order of arguments - request first, then menuItems
    const lineItems = createLineItems(checkoutSessionRequest, menuItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["GB", "US", "PK", "CA"],
      },
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/order/status`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      metadata: {
        orderId: order._id.toString(),
        images: JSON.stringify(menuItems.map((item: any) => item.image)),
      },
    });

    await order.save();

    return res.status(200).json({
      success: true,
      session,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const orders = await Order.find({ userId })
      .populate("userId")
      .populate("resturantId");

    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const stripeWebhook = async (req: Request, res: Response) => {
  let event;

  try {
    const signature = req.headers["stripe-signature"];

    // Construct the payload string for verification
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET!;

    // Generate test header string for event construction
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });

    // Construct the event using the payload string and header
    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error: any) {
    console.error("Webhook error:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  // Handle the checkout session completed event
  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object as Stripe.Checkout.Session;
      const order = await Order.findById(session.metadata?.orderId);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Update the order with the amount and status
      if (session.amount_total) {
        order.totalPrice = session.amount_total;
      }
      order.status = "completed";

      await order.save();
    } catch (error) {
      console.error("Error handling event:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  // Send a 200 response to acknowledge receipt of the event
  res.status(200).send();
};
