"use client";

import { useState, useRef, useEffect, DragEvent } from "react";
import { UploadedFile, UseMultiFileUploadReturn } from "../types";
import { useDeleteUploads } from "../api/useDeleteUpload";
import { useFileUpload } from "../api/useFileUpload";

export const useMultiFileUpload = (): UseMultiFileUploadReturn => {
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const { mutate: uploadFile, isPending: uploadPending } = useFileUpload();
  const { mutate: deleteUploads, isPending: deletePending } =
    useDeleteUploads();

  const clearFiles = () => {
    setFiles([]);
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const filesArray = Array.from(fileList);
    const formData = new FormData();
    filesArray.forEach((file) => formData.append("files", file));

    // Create new file states with uploading status
    const newFiles: UploadedFile[] = filesArray.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      status: "uploading",
      publicId: "",
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    uploadFile(formData, {
      onSuccess: (data) => {
        setFiles((prev) => {
          const updated = [...prev];

          // Find and update each newly uploaded file by ID
          newFiles.forEach((newFile, i) => {
            const index = updated.findIndex((f) => f.id === newFile.id);
            if (index !== -1 && data.images[i]) {
              updated[index] = {
                ...updated[index],
                status: "success",
                url: data.images[i].url,
                publicId: data.images[i].publicId,
              };
            }
          });

          return updated;
        });
      },
    });
  };

  const removeFile = (id: number) => {
    const file = files.find((f) => f.id === id);
    if (file?.publicId) {
      deleteUploads({ publicIds: [file.publicId] });
    }
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const removeAllFiles = () => {
    const publicIds = files
      .map((f) => f.publicId)
      .filter((id): id is string => Boolean(id));

    if (publicIds.length) {
      deleteUploads({ publicIds });
    }
    setFiles([]);
  };

  // ✅ NEW: Method to get successful uploads when needed
  const getSuccessfulUploads = () => {
    return files
      .filter((f) => f.status === "success" && f.url)
      .map((f) => ({ url: f.url!, publicId: f.publicId }));
  };

  useEffect(() => {
    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.preview));
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
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
      e.target.value = ""; // Reset input
    },
    className: "hidden",
    disabled: uploadPending,
  });

  return {
    files,
    isDragging,
    getRootProps,
    getInputProps,
    removeFile,
    removeAllFiles,
    deletePending,
    uploadPending,
    clearFiles,
    getSuccessfulUploads, // ✅ NEW: Export this method
  };
};
