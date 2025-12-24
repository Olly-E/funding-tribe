// /app/api/common/delete-upload/route.ts
import { handleApiError } from "@/app/(backend)/utils/utils";
import cloudinary from "@/app/(backend)/lib/cloudinary";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { publicId } = body;

    if (!publicId) {
      return NextResponse.json(
        { error: "publicId is required" },
        { status: 400 }
      );
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      return NextResponse.json(
        { error: "Failed to delete image", details: result },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Image deleted successfully" });
  } catch (err) {
    return handleApiError(err);
  }
}
