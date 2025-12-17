import { NextResponse } from "next/server";

import { createError, handleApiError } from "../../utils/utils";
import Project from "../../models/projectModel";
import dbConnect from "../../lib/mongodb";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { title, description, imgUrls } = body;
    if (!title || !description) {
      throw createError({
        type: "MissingFieldError",
        message: "Title and description are required",
        statusCode: 400,
      });
    }
    const exists = await Project.findOne({ title });
    if (exists) {
      throw createError({
        type: "DuplicateError",
        message: "Project title already exists",
        statusCode: 409,
      });
    }
    const project = await Project.create({
      title,
      description,
      imgUrls: Array.isArray(imgUrls) ? imgUrls : [],
    });
    return NextResponse.json(
      { message: "Project created", data: project },
      { status: 201 }
    );
  } catch (err) {
    return handleApiError(err);
  }
}

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find()
      .select("_id title description imgUrls createdAt updatedAt")
      .sort({ createdAt: -1 });
    return NextResponse.json(
      { message: "Projects fetched successfully", data: projects },
      { status: 200 }
    );
  } catch (err) {
    return handleApiError(err);
  }
}
