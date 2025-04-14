import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateAccessToken = (res: Response, user: any) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );
  res.cookie("accessToken", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 3600000, // 1 hour
  });
  return token;
};
