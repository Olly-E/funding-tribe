"use client";

import { useState, useRef, useEffect, DragEvent } from "react";
import {
  UseMultiFileUploadProps,
  UploadedFile,
  UseMultiFileUploadReturn,
} from "../types";
import { useFileUpload } from "./useFileUpload";

export const useMultiFileUpload = ({
  onUploadSuccess,
}: UseMultiFileUploadProps): UseMultiFileUploadReturn => {
  const fileInputRef = useRef<HTMLInputElement>(
    null as unknown as HTMLInputElement
  );
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // This is your actual file upload mutation from react-query, etc.
  const { mutate: uploadFile, isPending } = useFileUpload({
    onSuccess: onUploadSuccess,
  });

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles = Array.from(fileList);

    newFiles.forEach((file) => {
      const newFileState: UploadedFile = {
        id: Date.now() + Math.random(),
        file,
        status: "uploading",
        preview: URL.createObjectURL(file),
      };
      setFiles((prev) => [...prev, newFileState]);

      uploadFile(file, {
        onSuccess: (url) => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === newFileState.id ? { ...f, status: "success", url } : f
            )
          );
        },
        onError: () => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === newFileState.id ? { ...f, status: "error" } : f
            )
          );
        },
      });
    });
  };

  const removeFile = (id: number) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const removeAllFiles = () => {
    setFiles([]);
  };

  useEffect(() => {
    const successfulUploads = files.filter((f) => f.status === "success");
    const allDone = files.every(
      (f) => f.status === "success" || f.status === "error"
    );
    if (allDone && successfulUploads.length > 0) {
      const urls = successfulUploads
        .map((f) => f.url)
        .filter(Boolean) as string[];
      if (urls.length > 0) onUploadSuccess(urls);
    }
  }, [files, onUploadSuccess]);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const getRootProps = () => ({
    onClick: () => fileInputRef.current?.click(),
    onDragOver: (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
    },
    onDragLeave: (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
    },
    onDrop: (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
  });

  const getInputProps = () => ({
    ref: fileInputRef,
    type: "file" as const,
    multiple: true,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleFiles(e.target.files),
    className: "hidden",
    disabled: isPending,
  });

  return {
    files,
    isDragging,
    getRootProps,
    getInputProps,
    removeFile,
    removeAllFiles,
  };
};
