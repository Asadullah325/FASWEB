import mongoose, { Document } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  profilePicture: string;
  contact: number;
  address: string;
  country: string;
  city: string;
  isAdmin: boolean;
  lastLogin: Date;
  isVerified: boolean;
  verificationToken: string;
  verificationTokenExpiry: Date;
  resetPasswordToken: string;
  resetPasswordTokenExpiry: Date;
}

export interface IUserModel extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: null },
    contact: { type: Number, default: null },
    address: { type: String, default: "Update Your Address" },
    country: { type: String, default: "Update Your Country" },
    city: { type: String, default: "Update Your City" },
    isAdmin: { type: Boolean, default: false },

    // Extra fields for authentication and verification
    lastLogin: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    verificationTokenExpiry: { type: Date, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordTokenExpiry: { type: Date, default: null },
  },
  { timestamps: true }
);

const User = mongoose.model<IUserModel>("User", userSchema);

export default User;
