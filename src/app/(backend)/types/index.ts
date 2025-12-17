import { Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  imgUrls?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type AppError = {
  name: "AppError";
  type: string;
  message: string;
  statusCode: number;
  isOperational: true;
};
