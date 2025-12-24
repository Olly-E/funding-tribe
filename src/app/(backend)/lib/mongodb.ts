/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL!;

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  console.log("CONNECTED TO DB:", mongoose.connection.name);

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Connecting to MongoDB...");

    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
