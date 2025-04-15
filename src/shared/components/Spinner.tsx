import { cn } from "../lib/utils";

interface ISpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Spinner = ({ className, size = "md" }: ISpinnerProps) => {
  const sizeClasses = {
    sm: {
      wrapper: "w-8 h-8",
      ring: "w-8 h-8 border-[2px]",
      inner: "w-6 h-6 border-[2px]",
    },
    md: {
      wrapper: "w-14 h-14",
      ring: "w-14 h-14 border-[3px]",
      inner: "w-10 h-10 border-[3px]",
    },
    lg: {
      wrapper: "w-32 h-32",
      ring: "w-32 h-32 border-[4px]",
      inner: "w-24 h-24 border-[4px]",
    },
  };

  return (
    <>
      <style>
        {`
          @keyframes spinner-outer {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes spinner-inner {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(-360deg); }
          }
          @keyframes spinner-glow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.05); }
          }
          .spinner-outer {
            animation: spinner-outer 1s linear infinite;
          }
          .spinner-inner {
            animation: spinner-inner 0.8s linear infinite;
          }
          .spinner-glow {
            animation: spinner-glow 1.5s ease-in-out infinite;
          }
        `}
      </style>

      <div className={cn("flex h-full w-full items-center justify-center", className)}>
        <div className={cn("relative", sizeClasses[size].wrapper)}>
          <div
            className={cn(
              "spinner-outer",
              "absolute inset-0",
              "border-primary rounded-full",
              "border-t-transparent border-l-transparent",
              sizeClasses[size].ring
            )}
          />
          <div
            className={cn(
              "spinner-inner",
              "absolute top-1/2 left-1/2",
              "border-primary/50 rounded-full",
              "border-r-transparent border-b-transparent",
              sizeClasses[size].inner
            )}
          />
          <div
            className={cn(
              "spinner-glow",
              "absolute inset-0 -z-10",
              "rounded-full blur-md",
              "bg-primary/5",
              sizeClasses[size].ring
            )}
          />
        </div>
      </div>
    </>
  );
};
