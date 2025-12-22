import { NextRequest, NextResponse } from "next/server";
import { AppError } from "../types";
import jwt from "jsonwebtoken";

export function createError({
  type,
  message,
  statusCode = 500,
}: {
  type: string;
  message: string;
  statusCode: number;
}): AppError {
  return {
    name: "AppError",
    type,
    message,
    statusCode,
    isOperational: true,
  };
}

export function handleApiError(err: unknown) {
  if ((err as AppError)?.name === "AppError") {
    const error = err as AppError;

    return NextResponse.json(
      {
        error: error.type,
        message: error.message,
      },
      { status: error.statusCode }
    );
  }

  console.error("UNEXPECTED ERROR:", err);

  return NextResponse.json(
    { error: "ServerError", message: "Unexpected error" },
    { status: 500 }
  );
}
export interface DecodedToken {
  userId: string;
}

export function getUserFromRequest(req: NextRequest | Request): DecodedToken {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw createError({
      type: "AuthError",
      message: "Missing or invalid token",
      statusCode: 401,
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultsecret"
    ) as DecodedToken;
    return decoded;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    throw createError({
      type: "AuthError",
      message: "Invalid or expired token",
      statusCode: 401,
    });
  }
}
