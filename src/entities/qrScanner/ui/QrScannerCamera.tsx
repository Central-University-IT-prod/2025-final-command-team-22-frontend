import { outline, Scanner } from "@yudiel/react-qr-scanner";
import { useRef, useState, useEffect } from "react";
import leftbotborder from "@/shared/assets/leftbotborder.svg";
import rightbotborder from "@/shared/assets/rightbotborder.svg";
import lefttopborder from "@/shared/assets/lefttopborder.svg";
import righttopborder from "@/shared/assets/righttopborder.svg";

interface QrScannerCameraProps {
  onScan: (code: string) => void;
  isLoading: boolean;
  drawerOpen: boolean;
  onVideoInit: (video: HTMLVideoElement, stream: MediaStream) => void;
}

export function QrScannerCamera({ onScan, isLoading, drawerOpen, onVideoInit }: QrScannerCameraProps) {
  const scannerRef = useRef<HTMLDivElement>(null);
  const [cameraLoading, setCameraLoading] = useState<boolean>(true);

  // Добавляем эффект для отслеживания загрузки камеры
  useEffect(() => {
    if (!drawerOpen) {
      setCameraLoading(true);
      
      // Проверяем наличие видео каждые 500мс
      const checkInterval = setInterval(() => {
        if (scannerRef.current) {
          const video = scannerRef.current.querySelector("video");
          if (video && video.readyState >= 2) { // HAVE_CURRENT_DATA или выше
            setCameraLoading(false);
            clearInterval(checkInterval);
            
            // Получаем поток для инициализации видео
            const stream = video.srcObject as MediaStream;
            if (stream) {
              onVideoInit(video, stream);
            }
          }
        }
      }, 500);

      // Очистка интервала при размонтировании
      return () => clearInterval(checkInterval);
    }
  }, [drawerOpen, onVideoInit]);

  return (
    <div className="relative w-full flex-1" ref={scannerRef}>
      {cameraLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl">
          <div className="flex flex-col items-center gap-4">
            <svg
              className="h-10 w-10 animate-spin"
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
            <p className="text-lg font-medium">Инициализация камеры...</p>
          </div>
        </div>
      )}
      <Scanner
        key={drawerOpen ? "inactive" : "active"}
        constraints={{
          facingMode: "environment",
          frameRate: 30,
        }}
        components={{
          finder: false,
          torch: false,
          tracker: outline,
        }}
        children={
          <div className="flex h-full w-full items-center justify-center">
            <div className="absolute top-1/2 left-1/2 h-[50vmin] w-[50vmin] -translate-x-1/2 -translate-y-1/2">
              <img src={lefttopborder} className="absolute top-0 left-0 w-[40px]" />
              <img src={righttopborder} className="absolute top-0 right-0 w-[40px]" />
              <img src={leftbotborder} className="absolute bottom-0 left-0 w-[40px]" />
              <img src={rightbotborder} className="absolute right-0 bottom-0 w-[40px]" />
            </div>
          </div>
        }
        styles={{
          container: {
            width: "100%",
            height: "100%",
          },
          video: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "15px",
          },
        }}
        allowMultiple={true}
        scanDelay={3000}
        onScan={(result) => {
          if (result.length > 0 && !isLoading && !drawerOpen) {
            const scanData = result[0].rawValue;
            onScan(scanData);
          }
        }}
      />
    </div>
  );
} 