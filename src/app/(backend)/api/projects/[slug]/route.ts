import { NextResponse } from "next/server";

import { createError, handleApiError } from "@/app/(backend)/utils/utils";
import Project from "@/app/(backend)/models/projectModel";
import dbConnect from "@/app/(backend)/lib/mongodb";

export async function PUT(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();

    const { slug } = await context.params;
    const body = await request.json();
    const { title, description, imgUrls } = body;

    if (!title && !description && !imgUrls) {
      throw createError({
        type: "MissingFieldError",
        message: "At least one field is required to update",
        statusCode: 400,
      });
    }

    const project = await Project.findOneAndUpdate(
      { slug },
      {
        ...(title && { title }),
        ...(description && { description }),
        ...(imgUrls && { imgUrls }),
      },
      { new: true, runValidators: true }
    ).select("_id title slug imgUrls createdAt updatedAt");

    if (!project) {
      throw createError({
        type: "NotFoundError",
        message: "Project not found",
        statusCode: 404,
      });
    }

    return NextResponse.json(
      { message: "Project updated", data: project },
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

    const project = await Project.findOneAndDelete({ slug });

    if (!project) {
      throw createError({
        type: "NotFoundError",
        message: "Project not found",
        statusCode: 404,
      });
    }

    return NextResponse.json(
      {
        message: "Project deleted successfully",
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

    console.log("Slug received:", slug);

    const project = await Project.findOne({ slug });

    if (!project) {
      throw createError({
        type: "NotFoundError",
        message: "Project not found",
        statusCode: 404,
      });
    }

    return NextResponse.json({ data: project }, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
}
