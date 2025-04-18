import axios from "axios";
import FormData from "form-data";

export const uploadProfileImage = async (file: Express.Multer.File) => {
  try {
    const formData = new FormData();
    formData.append("file", file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    formData.append("upload_preset", "user-image"); // must be an existing unsigned preset

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dvueazpqv/image/upload`, // <- replace with your actual cloud name
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );

    return response.data.secure_url;
  } catch (error: any) {
    console.error("Error uploading image to Cloudinary:", error.response?.data || error);
    throw new Error("Image upload failed");
  }
};
