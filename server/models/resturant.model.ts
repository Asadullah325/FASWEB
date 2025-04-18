import mongoose from "mongoose";

export interface IRestaurant {
  userId: mongoose.Schema.Types.ObjectId;
  name: string;  // Changed from resturantName to name
  city: string;
  country: string;
  delivaryTime: number;  // Corrected spelling from delivaryTime
  tags: string[];
  image: string;
  menus: mongoose.Schema.Types.ObjectId[];
}

export interface IRestaurantModel extends IRestaurant, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    delivaryTime: { type: Number, required: true },  // Corrected spelling
    tags: { type: [String], required: true },
    image: { type: String, required: true },
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    menus: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Menu" 
    }],
  },
  { timestamps: true }
);

const Restaurant = mongoose.model<IRestaurantModel>(
  "Restaurant",
  restaurantSchema  // Fixed typo in variable name (was resturantSchema)
);

export default Restaurant;