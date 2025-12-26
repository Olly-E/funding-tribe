import { createError, handleApiError } from "../../utils/utils";
import { NextResponse } from "next/server";
import dbConnect from "../../lib/mongodb";
import News from "../../models/newsModel";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { title, description, category, imgUrl } = body;

    if (!title || !description || !category) {
      throw createError({
        type: "MissingFieldError",
        message: "Title, description and category, are required",
        statusCode: 400,
      });
    }

    const exists = await News.findOne({ title });
    if (exists) {
      throw createError({
        type: "DuplicateError",
        message: "News title already exists",
        statusCode: 409,
      });
    }

    const news = await News.create({
      title,
      description,
      category,
      imgUrl,
    });

    return NextResponse.json(
      { message: "News created", data: news },
      { status: 201 }
    );
  } catch (err) {
    return handleApiError(err);
  }
}

export async function GET() {
  try {
    await dbConnect();
    const news = await News.find()
      .select("_id title description category imgUrl createdAt slug updatedAt")
      .sort({ createdAt: -1 });
    return NextResponse.json(
      { message: "News fetched successfully", data: news },
      { status: 200 }
    );
  } catch (err) {
    return handleApiError(err);
  }
}
