import * as React from "react";
import clsx from "clsx";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Label } from "../Elements/Label";

interface WysiwygField {
  id: string;
  placeholder?: string;
  autoFocus?: boolean;
  isRequired?: boolean;
  registration: Partial<UseFormRegisterReturn>;
  hasError: FieldError | undefined;
  className?: string;
  label?: string;
  rows?: number;
  limit?: number | null;
  value?: string;
  labelClassName?: string;
}

export const WysiwygField: React.FC<WysiwygField> = ({
  id,
  placeholder,
  autoFocus,
  registration,
  className,
  hasError,
  label,
  labelClassName,
  isRequired,
}) => {
  const editorRef = React.useRef<HTMLDivElement>(null);

  const exec = (command: "bold" | "italic") => {
    document.execCommand(command);
    editorRef.current?.focus();
  };

  const handleInput = () => {
    if (!editorRef.current || !registration.onChange) return;

    registration.onChange({
      target: {
        name: registration.name,
        value: editorRef.current.innerHTML,
      },
    });
  };

  return (
    <div>
      {label && (
        <Label htmlFor={id} isRequired={isRequired} className={labelClassName}>
          {label}
        </Label>
      )}

      {/* Toolbar */}
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => exec("bold")}
          className="px-3 py-1 border rounded font-bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => exec("italic")}
          className="px-3 py-1 border rounded italic"
        >
          I
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        data-placeholder={placeholder}
        className={clsx(
          "min-h-[120px] w-full py-4 px-4 border rounded-md outline-none",
          "focus:border-black",
          "before:content-[attr(data-placeholder)] before:text-black/40 before:pointer-events-none",
          "empty:before:block",
          hasError && "border-red-500",
          className
        )}
      />

      {/* Hidden textarea for react-hook-form */}
      <textarea
        {...registration}
        id={id}
        className="hidden"
        readOnly
      />
    </div>
  );
};
