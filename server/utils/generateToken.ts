import jwt from "jsonwebtoken";
import { IUserModel } from "../models/user.model";
import { Response } from "express";

export const generateAccessToken = (res: Response, user: IUserModel) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return token;
};
