import { z } from "zod";

export const resturantSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),
  city: z
    .string()
    .min(2, { message: "City must be at least 2 characters long" })
    .max(50, { message: "City must be at most 50 characters long" }),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters long" })
    .max(50, { message: "Country must be at most 50 characters long" }),
  time: z.number().min(1, { message: "Time must be at least 1 minute" }),
 tags: z
    .array(z.string())
    .min(1, { message: "Please enter at least one tag" }),
  image: z
    .any()
    .refine((file) => file instanceof File && file.size > 0, {
      message: "Please upload a valid image file",
      path: ["image"],
    })
});

export type Resturant = z.infer<typeof resturantSchema>;
