import mongoose from "mongoose";

type DeliveryDetails = {
  address: string;
  city: string;
  country: string;
  name: string;
  email: string;
};

type CartItems = {
  menuId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
};

export interface IOrder extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  resturantId: mongoose.Schema.Types.ObjectId;
  cartItems: CartItems;
  delevieryDetais: DeliveryDetails;
  totalPrice: number;
  status: "pending" | "completed" | "cancelled" | "delivered" | "on the way";
}

export interface IOrderModel extends IOrder, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resturantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    cartItems: [
      {
        menuId: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        name: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
    delevieryDetais: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled", "delivered", "on the way"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrderModel>("Order", orderSchema);

export default Order;
