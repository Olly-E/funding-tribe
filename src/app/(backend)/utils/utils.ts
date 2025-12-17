import { NextResponse } from "next/server";
import { AppError } from "../types";

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
