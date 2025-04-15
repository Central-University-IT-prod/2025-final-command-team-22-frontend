import type React from "react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/shared/lib/utils";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  isUppedLabel?: boolean;
}

export function TTextArea({ label, className, id, error, isUppedLabel = false, ...props }: TextAreaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(props.value || "");
  const inputId = id || `textarea-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        className={cn(
          "bg-secondary relative rounded-lg border border-transparent px-4 py-2 transition-all duration-300",
          isFocused && "border-gray-500",
          error && "border-red-500",
          className
        )}
      >
        <label
          htmlFor={inputId}
          className={cn(
            "text-muted-foreground absolute cursor-text transition-all duration-200",
            isFocused || value || isUppedLabel ? "top-2 text-sm text-white" : "top-1/2 -translate-y-1/2"
          )}
        >
          {label}
        </label>
        <textarea
          id={inputId}
          className="mt-4 w-full resize-none bg-transparent pt-1 outline-none"
          onFocus={() => setIsFocused(true)}
          {...props}
          onChange={(e) => {
            setValue(e.target.value);
            props.onChange?.(e);
          }}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
