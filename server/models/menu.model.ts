import mongoose from "mongoose";

export interface IMenu {
  resturantId: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  image: string;
  price: number;
}

export interface IMenuModel extends IMenu, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const menuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    resturantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Menu = mongoose.model<IMenuModel>("Menu", menuSchema);

export default Menu;
