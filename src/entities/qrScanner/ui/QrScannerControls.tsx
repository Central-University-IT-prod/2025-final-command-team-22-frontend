import { Button } from "@/shared/components/ui/button";
import { Flashlight, FlashlightOff, Home, Keyboard } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface QrScannerControlsProps {
  onToggleTorch: () => void;
  onToggleManualInput: () => void;
  torchOn: boolean;
  torchSupported: boolean;
  showManualInput: boolean;
}

export function QrScannerControls({
  onToggleTorch,
  onToggleManualInput,
  torchOn,
  torchSupported,
  showManualInput,
}: QrScannerControlsProps) {
  return (
    <div className="z-50 flex items-center justify-center gap-8 py-8">
      <Link to="/business/dashboard">
        <Button
          className="flex h-13 w-13 items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg hover:bg-white"
          size="lg"
        >
          <Home className="h-8 w-8" />
        </Button>
      </Link>
      <Button
        onClick={onToggleManualInput}
        className="flex h-12 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-lg hover:bg-white"
        size="lg"
      >
        <Keyboard className="h-8 w-8" />
        {showManualInput ? "Сканировать QR" : "Ввод вручную"}
      </Button>
      <Button
        onClick={onToggleTorch}
        className="flex h-13 w-13 items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg hover:bg-white"
        size="lg"
        disabled={!torchSupported || showManualInput}
      >
        {torchOn ? <FlashlightOff className="h-8 w-8" /> : <Flashlight className="h-8 w-8" />}
      </Button>
    </div>
  );
} 