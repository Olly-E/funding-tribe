import z, { object } from "zod";

export const addNewProjectSchema = object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});
export const addNewNewsSchema = object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Description is required"),
  description: z.string().min(1, "Description is required"),
});
