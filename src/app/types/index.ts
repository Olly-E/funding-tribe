import { DragEvent, RefObject } from "react";
export interface Option {
  id: string;
  name: string;
}

export enum AccessType {
  ADMIN = "ADMIN",
  VISITOR = "VISITOR",
}
export interface UploadedFile {
  id: number;
  file: File;
  status: "uploading" | "success" | "error";
  url?: string;
  preview: string;
  publicId: string;
}

export interface ErrorResponseData {
  message: string | string[];
}

export interface AxiosErrorResponse {
  response?: {
    data?: ErrorResponseData;
  };
}
export interface UploadedImage {
  url: string;
  publicId: string;
}



export interface UseMultiFileUploadReturn {
  files: UploadedFile[];
  isDragging: boolean;
  getRootProps: () => {
    onClick: () => void;
    onDragOver: (e: DragEvent<HTMLDivElement>) => void;
    onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
    onDrop: (e: DragEvent<HTMLDivElement>) => void;
  };
  uploadPending: boolean;
  getInputProps: () => {
    ref: RefObject<HTMLInputElement>;
    type: "file";
    multiple: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className: string;
    disabled: boolean;
  };
  clearFiles: () => void;
  removeFile: (id: number) => void;
  removeAllFiles: () => void;
  deletePending: boolean;
  getSuccessfulUploads: () => UploadedImage[]; // ✅ ADD THIS
}

export interface UploadEventPhotoSectionProps {
  onUploadSuccess: (urls: string[]) => void;
  className?: string;
  label?: string;
}

export interface ImageData {
  src: string;
  alt: string;
  title: string;
  slug: string;
}