import { Button } from "@/shared/components/ui/button";
import { TInput } from "@/shared/components/ui/TInput";
import { useState } from "react";
import { m } from "motion/react";

interface ManualInputProps {
  onSubmit: (code: string) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function ManualInput({ onSubmit, onCancel, isLoading }: ManualInputProps) {
  const [manualCode, setManualCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(true);
    
    if (!manualCode.trim()) {
      return;
    }
    
    setIsSubmitting(true);
    onSubmit(manualCode);
    setManualCode("");
    setIsSubmitting(false);
    setShowError(false);
  };

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold">Ввод вручную</h2>
        <TInput
          value={manualCode}
          onChange={(e) => setManualCode(e.target.value)}
          label="Код"
          error={showError && !manualCode.trim() ? "Поле не может быть пустым" : undefined}
        />
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              onCancel();
              setManualCode("");
            }}
            type="button"
          >
            Отмена
          </Button>
          <Button type="submit" disabled={isLoading || !manualCode.trim()}>
            {isSubmitting ? (
              <m.span
                className="flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <svg
                  className="mr-2 h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Отправка...
              </m.span>
            ) : (
              "Отправить"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
} 