import type React from "react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/shared/lib/utils";
import { HelpCircle } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isUppedLabel?: boolean;
  tooltip?: string;
}

export function TInput({ label, className, id, error, isUppedLabel = false, tooltip, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(props.value || "");
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

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
        {tooltip ? (
          <div className="flex items-center">
            <label
              htmlFor={inputId}
              className={cn(
                "text-muted-foreground absolute cursor-text transition-all duration-200",
                isFocused || value || isUppedLabel ? "top-2 text-sm text-white" : "top-1/2 -translate-y-1/2"
              )}
            >
              {label}
              {tooltip && (
                <div className="relative ml-1 inline-block">
                  <HelpCircle
                    className="text-muted-foreground relative top-[-1px] inline-block h-3.5 w-3.5 cursor-help"
                    onMouseEnter={() => setIsTooltipVisible(true)}
                    onMouseLeave={() => setIsTooltipVisible(false)}
                  />
                  {isTooltipVisible && (
                    <div
                      ref={tooltipRef}
                      className="absolute top-full left-0 z-50 mt-1 max-w-[250px] min-w-[200px] rounded-md bg-[#333] p-2 text-xs text-white shadow-lg"
                    >
                      {tooltip}
                    </div>
                  )}
                </div>
              )}
            </label>
          </div>
        ) : (
          <label
            htmlFor={inputId}
            className={cn(
              "text-muted-foreground absolute cursor-text transition-all duration-200",
              isFocused || value || isUppedLabel ? "top-2 text-sm text-white" : "top-1/2 -translate-y-1/2"
            )}
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          className="mt-4 w-full bg-transparent pt-1 outline-none"
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
