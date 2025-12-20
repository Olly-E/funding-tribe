import { object, z } from "zod";

export const loginSchema = object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});
