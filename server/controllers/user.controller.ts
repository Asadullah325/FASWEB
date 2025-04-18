import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateAccessToken } from "../utils/generateToken";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import {
  sendResetEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../utils/email";
import { uploadProfileImage } from "../utils/uploadProfileImage";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, contact } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken = generateVerificationCode(6);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      contact: Number(contact),
      verificationToken,
      verificationTokenExpiry: Date.now() + 24 * 60 * 60 * 1000, // 1 day
    });

    const token = generateAccessToken(res, user);
    await sendVerificationEmail(email, verificationToken);

    const userWithoutPassword = await User.findById(user._id).select(
      "-password"
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateAccessToken(res, user);
    user.lastLogin = new Date();
    await user.save();

    const userWithoutPassword = await User.findById(user._id).select(
      "-password"
    );
    res.status(200).json({
      success: true,
      message: `Welcome Back ${user.name}`,
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { verificationCode } = req.body;

    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiry: { $gt: Date.now() },
    }).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification token",
      });
    }

    user.isVerified = true;
    user.verificationToken = "";
    user.verificationTokenExpiry = null;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logout = async (_: Request, res: Response) => {
  try {
    return res.clearCookie("token").status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiry = resetTokenExpiry;

    await user.save();

    await sendResetPasswordEmail(
      user.email,
      `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
    );
    res.status(200).json({
      success: true,
      message: "Reset password email sent successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.resetPasswordToken = "";
    user.resetPasswordTokenExpiry = null;
    await user.save();

    await sendResetEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const checkAuth = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const { name, email, phone, city, country, address } = req.body;
    const file = req.file; // This comes from multer

    let imageURL = null;
    
    // Only process image if file was uploaded
    if (file) {
      imageURL = await uploadProfileImage(file);
      if (!imageURL) {
        return res.status(400).json({ 
          success: false, 
          message: "Image upload failed" 
        });
      }
    }

    const updatedData: any = {
      name,
      email,
      contact: Number(phone),
      city,
      country,
      address,
    };

    // Only add profilePicture if we have a new image
    if (imageURL) {
      updatedData.profilePicture = imageURL;
    }

    const user = await User.findByIdAndUpdate(
      userId, 
      updatedData, 
      { new: true }
    ).select("-password");

    return res.status(200).json({ 
      success: true, 
      user, 
      message: "Profile updated successfully" 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: "Internal server error" 
    });
  }
};