import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { createError, handleApiError } from "../../../utils/utils";
import User from "@/app/(backend)/models/userModel";
import dbConnect from "../../../lib/mongodb";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { email, password } = body;
    if (!process.env.JWT_SECRET) {
      throw createError({
        type: "ConfigurationError",
        message: "JWT_SECRET is not configured",
        statusCode: 500,
      });
    }
    if (!email || !password) {
      throw createError({
        type: "MissingFieldError",
        message: "all fields are required (Email, password, phone)",
        statusCode: 400,
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createError({
        type: "DuplicateError",
        message: "User already exists",
        statusCode: 409,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
    });


    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        data: {
          _id: user._id,
          email: user.email,
          token,
          createdAt: user.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    return handleApiError(err);
  }
}
