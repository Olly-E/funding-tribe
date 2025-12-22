import dbConnect from "@/app/(backend)/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { createError, handleApiError } from "@/app/(backend)/utils/utils";
import User from "@/app/(backend)/models/userModel";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { email, newPassword } = body;

    if (!email || !newPassword) {
      throw createError({
        type: "MissingFieldError",
        message: "Email and new password are required",
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

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      {
        message: "Password reset successful",
      },
      { status: 200 }
    );
  } catch (err) {
    return handleApiError(err);
  }
}
