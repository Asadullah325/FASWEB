import { z } from "zod";

export const menuSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters long" })
    .max(50, { message: "Description must be at most 50 characters long" }),
  price: z.number().min(1, { message: "Price must be at least 1" }),
  image: z.any().refine((file) => file instanceof File && file.size > 0, {
    message: "Please upload a valid image file",
    path: ["image"],
  }),
});

export type Menu = z.infer<typeof menuSchema>;
