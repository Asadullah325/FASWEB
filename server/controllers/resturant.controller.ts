import { Request, Response } from "express";
import Restaurant from "../models/resturant.model";
import { uploadImageToCloudinary } from "../utils/imageUpload";
import Order from "../models/order.model";

export const createResturant = async (req: Request, res: Response) => {
  try {
    const { name, city, country, delivaryTime, tags } = req.body;

    // Validate required fields
    if (!name || !city || !country || !delivaryTime || !tags) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userId = req.id;
    const resturant = await Restaurant.findOne({ userId });
    if (resturant) {
      return res.status(400).json({
        success: false,
        message: "Restaurant already exists",
      });
    }

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

    // Handle tags safely
    const parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;

    const newResturant = await Restaurant.create({
      name,
      city,
      country,
      delivaryTime,
      tags: parsedTags,
      image: imageURL,
      userId,
    });

    return res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      newResturant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getResturant = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const resturant = await Restaurant.findOne({ userId }).populate("menus");
    if (!resturant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }
    return res.status(200).json({
      success: true,
      resturant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateResturant = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const resturant = await Restaurant.findOne({ userId });
    if (!resturant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    const { name, address, city, country, delivaryTime, tags } = req.body;
    const file = req.file;

    let imageURL = resturant.image;
    if (file) {
      const uploadedImageURL = await uploadImageToCloudinary(
        file as Express.Multer.File
      );
      if (!uploadedImageURL) {
        return res.status(400).json({
          success: false,
          message: "Image upload failed",
        });
      }
      imageURL = uploadedImageURL;
    }
    const updatedResturant = await Restaurant.findOneAndUpdate(
      { userId },
      {
        name,
        address,
        city,
        country,
        delivaryTime,
        tags: JSON.parse(tags),
        image: imageURL,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      updatedResturant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getResturantOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const resturant = await Restaurant.findOne({ userId });
    if (!resturant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    const orders = await Order.find({ resturantId: resturant._id })
      .populate("userId")
      .populate("resturantId")
      .populate("menuId");

    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
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

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const SearchResturant = async (req: Request, res: Response) => {
  try {
    const searchText = req.params.searchTerm || "";
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedTags = ((req.query.selectedTags as string) || "")
      .split(",")
      .filter((tag) => tag);

    // Debugging logs for clarity
    console.log("Selected Tags:", selectedTags);
    console.log("Search Query:", searchQuery);
    console.log("Search Text:", searchText);

    const query: any = {};
    const orConditions: any[] = [];

    // Search by name, city, country from searchText
    if (searchText) {
      orConditions.push(
        { name: { $regex: searchText, $options: "i" } },
        { city: { $regex: searchText, $options: "i" } },
        { country: { $regex: searchText, $options: "i" } }
      );
    }

    // filter on the basis of searchQuery
    if (searchQuery) {
      orConditions.push(
        { name: { $regex: searchQuery, $options: "i" } },
        { tags: { $regex: searchQuery, $options: "i" } }
      );
    }

    // Handle selectedTags filtering
    if (selectedTags.length > 0) {
      query.tags = {
        $elemMatch: {
          $in: selectedTags.map((tag) => new RegExp(tag, "i")), // Case-insensitive regex
        },
      };
    }

    // If any search conditions were added, combine them with OR
    if (orConditions.length > 0) {
      query.$or = orConditions;
    }

    console.log("Final MongoDB Query:", JSON.stringify(query, null, 2));

    // Perform the search using the constructed query
    const restaurants = await Restaurant.find(query);

    // Return the search results
    return res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    console.error("SearchResturant Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getSingleResturant = async (req: Request, res: Response) => {
  try {
    const { resturantId } = req.params;

    const resturant = await Restaurant.findById(resturantId).populate({
      path: "menus",
      options: { createdAt: -1 },
    });
    if (!resturant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }
    return res.status(200).json({
      success: true,
      resturant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
