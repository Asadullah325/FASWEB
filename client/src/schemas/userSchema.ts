import { z } from "zod";

export const userSignUpSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .max(50, { message: "Email must be at most 50 characters long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password must be at most 50 characters long" }),
  contact: z
    .string()
    .min(11, { message: "Contact number must be at least 11 characters long" })
    .max(11, { message: "Contact number must be at most 11 characters long" }),
});

export type UserSignUp = z.infer<typeof userSignUpSchema>;

export const userLoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .max(50, { message: "Email must be at most 50 characters long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password must be at most 50 characters long" }),
});

export type UserLogin = z.infer<typeof userLoginSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .max(50, { message: "Email must be at most 50 characters long" }),
});

export type forgotPasssword = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password must be at most 50 characters long" }),
});

export type resetPassword = z.infer<typeof resetPasswordSchema>;

