/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudinary from "../../../lib/cloudinary";
import { NextResponse } from "next/server";

const MAX_RETRIES = 3;
const CONCURRENT_UPLOADS = 3; // limit simultaneous uploads

async function uploadFileWithRetry(file: File, retries = MAX_RETRIES) {
  const buffer = Buffer.from(await file.arrayBuffer());

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await new Promise<{ url: string; publicId: string }>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { folder: "projects", resource_type: "image" },
              (error, result) => {
                if (error || !result) return reject(error || new Error("No result"));
                resolve({
                  url: result.secure_url,
                  publicId: result.public_id,
                });
              }
            )
            .end(buffer);
        }
      );
    } catch (err) {
      if (attempt === retries) throw err;
      // small delay before retry
      await new Promise((r) => setTimeout(r, 500 * attempt));
    }
  }

  throw new Error("Failed to upload after retries");
}

// simple concurrency limiter
async function promisePool<T>(
  items: T[],
  fn: (item: T) => Promise<any>,
  limit: number
) {
  const results: any[] = [];
  const executing: Promise<any>[] = [];

  for (const item of items) {
    const p = fn(item).then((res) => results.push(res));
    executing.push(p);

    if (executing.length >= limit) {
      await Promise.race(executing);
      // remove resolved promises
      executing.splice(
        0,
        executing.length,
        ...executing.filter((p) => !p.finally)
      );
    }
  }

  await Promise.all(executing);
  return results;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files.length) {
      return NextResponse.json(
        { error: "No files uploaded" },
        { status: 400 }
      );
    }

    const uploads = await promisePool(files, uploadFileWithRetry, CONCURRENT_UPLOADS);

    return NextResponse.json({ images: uploads }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}
