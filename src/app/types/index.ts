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
}

export interface ErrorResponseData {
  message: string | string[];
}

export interface AxiosErrorResponse {
  response?: {
    data?: ErrorResponseData;
  };
}

export interface UploadedFile {
  id: number;
  file: File;
  status: "uploading" | "success" | "error";
  url?: string;
  preview: string;
}

export interface UseMultiFileUploadProps {
  onUploadSuccess: (urls: string | string[]) => void;
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
  getInputProps: () => {
    ref: RefObject<HTMLInputElement>;
    type: "file";
    multiple: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className: string;
    disabled: boolean;
  };
  removeFile: (id: number) => void;
  removeAllFiles: () => void;
}

export interface UploadEventPhotoSectionProps {
  onUploadSuccess: (urls: string | string[]) => void;
  className?: string;
  label?: string;
}
