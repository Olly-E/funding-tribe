import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { createError, handleApiError } from "@/app/(backend)/utils/utils";
import dbConnect from "@/app/(backend)/lib/mongodb";
import User from "@/app/(backend)/models/userModel";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      throw createError({
        type: "MissingFieldError",
        message: "Email and password are required",
        statusCode: 400,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw createError({
        type: "NotFoundError",
        message: "User not found",
        statusCode: 404,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw createError({
        type: "AuthError",
        message: "Invalid credentials",
        statusCode: 401,
      });
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "3d" }
    );

    return NextResponse.json({
      message: "Login successful",
      data: {
        _id: user._id,
        email: user.email,
        token,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    return handleApiError(err);
  }
}
