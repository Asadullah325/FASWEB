import { Request, Response } from "express";
import { uploadImageToCloudinary } from "../utils/imageUpload";
import Menu from "../models/menu.model";
import Restaurant from "../models/resturant.model";
import mongoose from "mongoose";

export const addMenu = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const imageURL = await uploadImageToCloudinary(file as Express.Multer.File);

    if (!imageURL) {
      return res.status(400).json({
        success: false,
        message: "Image upload failed",
      });
    }

    const menu = await Menu.create({
      name,
      description,
      price,
      image: imageURL,
    });

    const userId = req.id;
    const resturant = await Restaurant.findOne({ userId });
    if (!resturant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    (resturant.menus as mongoose.Schema.Types.ObjectId[]).push(
      menu._id as mongoose.Schema.Types.ObjectId
    );
    await resturant.save();

    return res.status(201).json({
      success: true,
      message: "Menu added successfully",
      menu,
    });
  } catch (error) {
    console.error("Error adding menu:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const editMenu = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const file = req.file;
    const menuId = req.params.id;

    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found",
      });
    }

    if (file) {
      const imageURL = await uploadImageToCloudinary(
        file as Express.Multer.File
      );
      if (!imageURL) {
        return res.status(400).json({
          success: false,
          message: "Image upload failed",
        });
      }
      menu.image = imageURL;
    }

    menu.name = name || menu.name;
    menu.description = description || menu.description;
    menu.price = price || menu.price;

    await menu.save();

    return res.status(200).json({
      success: true,
      message: "Menu updated successfully",
      menu,
    });
  } catch (error) {
    console.error("Error editing menu:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
