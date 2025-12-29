import { NextResponse } from "next/server";

import { createError, handleApiError } from "@/app/(backend)/utils/utils";
import dbConnect from "@/app/(backend)/lib/mongodb";
import News from "@/app/(backend)/models/newsModel";

export async function PUT(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();

    const { slug } = await context.params;
    const body = await request.json();
    const { title, description, imgUrl, category } = body;

    if (!title && !description && !category) {
      throw createError({
        type: "MissingFieldError",
        message: "Title, description and category, are required",
        statusCode: 400,
      });
    }

    const news = await News.findOneAndUpdate(
      { slug },
      {
        ...(title && { title }),
        ...(description && { description }),
        ...(imgUrl && { imgUrl }),
        ...(category && { category }),
      },
      { new: true, runValidators: true }
    ).select("_id title slug imgUrl category createdAt updatedAt");

    if (!news) {
      throw createError({
        type: "NotFoundError",
        message: "News not found",
        statusCode: 404,
      });
    }

    return NextResponse.json(
      { message: "News updated", data: news },
      { status: 200 }
    );
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    await dbConnect();

    const news = await News.findOneAndDelete({ slug });

    if (!news) {
      throw createError({
        type: "NotFoundError",
        message: "News not found",
        statusCode: 404,
      });
    }

    return NextResponse.json(
      {
        message: "News deleted successfully",
        data: { slug },
      },
      { status: 200 }
    );
  } catch (err) {
    return handleApiError(err);
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();

    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    const news = await News.findOne({ slug });

    if (!news) {
      throw createError({
        type: "NotFoundError",
        message: "News not found",
        statusCode: 404,
      });
    }

    return NextResponse.json({ data: news }, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
}
