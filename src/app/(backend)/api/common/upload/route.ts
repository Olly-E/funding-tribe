/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudinary from "../../../lib/cloudinary";
import { NextResponse } from "next/server";

const MAX_RETRIES = 3;

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
                if (error || !result)
                  return reject(error || new Error("No result"));
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
      await new Promise((r) => setTimeout(r, 500 * attempt));
    }
  }

  throw new Error("Failed to upload after retries");
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    console.log(`📥 Received ${files.length} files for upload`);

    if (!files.length) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    // ✅ SIMPLEST FIX: Just use Promise.all - it maintains order naturally
    const uploads = await Promise.all(
      files.map((file) => uploadFileWithRetry(file))
    );

    console.log(`✅ Successfully uploaded ${uploads.length} images`);

    return NextResponse.json({ images: uploads }, { status: 200 });
  } catch (err: any) {
    console.error("❌ Upload error:", err);
    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}
