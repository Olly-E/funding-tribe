import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { createError, handleApiError } from "@/app/(backend)/utils/utils";
import Project from "@/app/(backend)/models/projectModel";
import dbConnect from "@/app/(backend)/lib/mongodb";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params;
    console.log(id);

    const body = await request.json();
    const { title, description, imgUrls } = body;

    if (!title && !description && !imgUrls) {
      throw createError({
        type: "MissingFieldError",
        message: "At least one field is required to update",
        statusCode: 400,
      });
    }

    const project = await Project.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(description && { description }),
        ...(imgUrls && { imgUrls }),
      },
      { new: true, runValidators: true }
    ).select("_id title imgUrls createdAt updatedAt");

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
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createError({
        type: "InvalidIdError",
        message: "Invalid project ID",
        statusCode: 400,
      });
    }

    await dbConnect();

    const project = await Project.findByIdAndDelete(id);

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
        data: { _id: id },
      },
      { status: 200 }
    );
  } catch (err) {
    return handleApiError(err);
  }
}
