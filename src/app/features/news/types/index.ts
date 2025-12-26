import { UploadedImage } from "@/app/types";

export interface INewsData {
  title: string;
  description: string;
  category: string;
  imgUrl: UploadedImage;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  _id: string;
}

export interface AddNewsPayload {
  title: string;
  description: string;
  category: string;
  imgUrl: UploadedImage;
}
