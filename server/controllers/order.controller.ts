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
  deliveryDetails: DeliveryDetails;
  restaurantId: string;
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

    const restaurant = await Restaurant.findById(
      checkoutSessionRequest.restaurantId
    ).populate<{ menus: MenuItem[] }>("menus"); // Specify the populated type

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    const order = new Order({
      restaurantId: restaurant._id,
      userId: req.id,
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems,
    });

    const menuItems = restaurant.menus;
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
