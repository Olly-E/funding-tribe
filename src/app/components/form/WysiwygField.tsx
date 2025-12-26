"use client";
import React from "react";
import clsx from "clsx";

import { Label } from "../Elements/Label";

interface WysiwygFieldProps {
  id: string;
  value?: string;
  onChange?: (html: string) => void;
  hasError?: unknown;
  label?: string;
  isRequired?: boolean;
  clearSignal?: number;
}

export const WysiwygField: React.FC<WysiwygFieldProps> = ({
  id,
  value,
  onChange,
  hasError,
  label,
  isRequired,
  clearSignal,
}) => {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const lastValueRef = React.useRef<string>("");
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);

  React.useEffect(() => {
    if (!editorRef.current) return;

    if (value !== undefined && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
      lastValueRef.current = value;
    }
  }, [value]);

  // ✅ Handle clear signal
  React.useEffect(() => {
    if (editorRef.current && clearSignal !== undefined) {
      editorRef.current.innerHTML = "";
      lastValueRef.current = "";
      setIsBold(false);
      setIsItalic(false);
    }
  }, [clearSignal]);

  // Sync toolbar state on selection change
  React.useEffect(() => {
    const updateState = () => {
      setIsBold(document.queryCommandState("bold"));
      setIsItalic(document.queryCommandState("italic"));
    };

    document.addEventListener("selectionchange", updateState);
    return () => document.removeEventListener("selectionchange", updateState);
  }, []);

  // Update RHF + toolbar state
  const emitChange = () => {
    if (!editorRef.current) return;

    const newValue = editorRef.current.innerHTML;

    // Only emit if value actually changed
    if (newValue !== lastValueRef.current) {
      lastValueRef.current = newValue;
      onChange?.(newValue);
    }

    setIsBold(document.queryCommandState("bold"));
    setIsItalic(document.queryCommandState("italic"));
  };

  const applyFormat = (command: "bold" | "italic") => {
    editorRef.current?.focus();
    document.execCommand(command);
    emitChange();
  };

  return (
    <div>
      {label && (
        <Label htmlFor={id} isRequired={isRequired}>
          {label}
        </Label>
      )}

      {/* Toolbar */}
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => applyFormat("bold")}
          className={clsx(
            "px-2 py-1 border rounded font-bold",
            isBold ? "bg-black text-white" : "bg-white"
          )}
        >
          B
        </button>

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => applyFormat("italic")}
          className={clsx(
            "px-2 py-1 border rounded italic",
            isItalic ? "bg-black text-white" : "bg-white"
          )}
        >
          I
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={emitChange}
        onKeyUp={emitChange}
        onMouseUp={emitChange}
        className={clsx(
          "min-h-[120px] border px-4 py-3 rounded-md outline-none",
          hasError ? "border-red-500" : "border-black/30"
        )}
      />
    </div>
  );
};
