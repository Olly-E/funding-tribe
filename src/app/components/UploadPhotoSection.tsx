// src/components/UploadPhotoSection.tsx
"use client";

import Image from "next/image";
import React from "react";
import clsx from "clsx";
import {
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  Plus,
  Image as ImageIcon,
} from "lucide-react";

import { useMultiFileUpload } from "../hooks/useMultiFileUpload";
import { Button } from "./Button";

interface UploadPhotoSectionProps {
  onUploadSuccess: (urls: string | string[]) => void;
  className?: string;
  label?: string;
}

export const UploadPhotoSection: React.FC<UploadPhotoSectionProps> = ({
  onUploadSuccess,
  className,
  label,
}) => {
  const {
    getRootProps,
    getInputProps,
    files,
    isDragging,
    removeFile,
    removeAllFiles,
  } = useMultiFileUpload({
    onUploadSuccess,
  });

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}

      <input {...getInputProps()} />

      {files.length === 0 && (
        <div
          {...getRootProps()}
          className={clsx(
            "border w-[154px] bg-transparent border-black mt-1.5 rounded-lg p-8 text-center cursor-pointer transition-colors",
            "flex flex-col items-center justify-center",
            isDragging
              ? "border-black"
              : "border-gray-300 hover:border-black-400"
          )}
        >
          <ImageIcon className="text-[32px] mb-2" />
          <p className="text-xs text-center text-black">
            Drag image here or upload image library
          </p>
        </div>
      )}

      {/* Renders the grid view when one or more files are present */}
      {files.length > 0 && (
        <div className="mt-4 max-w-[776px] space-y-2 p-8 border mx-auto rounded-md">
          <div className=" gap-[30px]">
            <div className="col-span-2 flex items-center justify-between mb-[33px]">
              <div className=" text-black">
                <h2 className="leading-[100%] text-[24px] sm:text-[32px] font-bold">
                  Uploaded photos
                </h2>
                <p className="mt-1 text-sm">{files.length} photos selected</p>
              </div>
              <Button
                type="button"
                variant="secondary"
                onClick={removeAllFiles}
                size="md"
                className="rounded-md!"
              >
                Clear photos
              </Button>
            </div>

            {/* Map over the existing files */}
            <div className="flex flex-wrap gap-6">
              {files.map((fileState) => (
                <div key={fileState.id}>
                  <div className="relative size-[100px] w-[100px] rounded-md overflow-hidden">
                    <Image
                      src={fileState.preview}
                      alt={fileState.file.name}
                      fill
                      className="object-cover"
                    />
                    {/* <span className="text-sm left-5 bg-black/80 px-2 py-1 rounded-lg absolute w-fit top-5 text-black truncate">
                        {fileState.file.name}
                      </span> */}
                    <button
                      type="button"
                      onClick={() => removeFile(fileState.id)}
                      className="size-6 centered right-1 top-1 absolute transition-colors bg-white rounded-full"
                    >
                      <Trash2 size={12} className="text-red-state" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {fileState.status === "uploading" && (
                      <Loader2 className="animate-spin h-5 w-5 text-black" />
                    )}
                    {fileState.status === "success" && (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                    {fileState.status === "error" && (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* NEW: The "Add More" card */}
            {files.length < 5 && (
              <div
                {...getRootProps()}
                className={clsx(
                  "w-[100px] h-[100px] mt-6 border-2 border-dashed rounded-[20px] cursor-pointer transition-colors",
                  "flex flex-col items-center justify-center text-black/50",
                  isDragging
                    ? "border-black bg-black/10"
                    : "border-gray-3 hover:border-black-400"
                )}
              >
                <Plus size={24} color="#000000" />
                <p className="mt-2 font-semibold text-black text-sm">
                  Add more
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
