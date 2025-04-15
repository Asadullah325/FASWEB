import cloudinary from "./cloudinary";

export const uploadImageToCloudinary = async (file: Express.Multer.File) => {
  try {
    const base64Image = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${base64Image}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "restaurant_images",
    });

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Image upload failed");
  }
};
