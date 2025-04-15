import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { businessCoinProgramOptions } from "@/shared/api/business/businessCoinProgram/businessCoinProgramApi";
import { useUpdateBusinessScan } from "@/shared/api/business/businessScan/businessScanApi";
import { useUpdateBusinessCoinProgramRewards } from "@/shared/api/business/businessCoinProgramRewards/businessCoinProgramRewardsApi";
import BusinessScanService from "@/shared/api/business/businessScan/BusinessScanService";
import { IReward } from "@/shared/models/IReward";

// Импорт подкомпонентов
import { QrScannerCamera } from "./QrScannerCamera";
import { ManualInput } from "./ManualInput";
import { QrScannerControls } from "./QrScannerControls";
import { QrScannerResult } from "./QrScannerResult";
import { NoCoinProgram } from "./NoCoinProgram";

// Импорт типов
import { BusinessScanResponse, ExtendedMediaTrackConstraintSet } from "../model/types";

export function QrScanner() {
  // Рефы для доступа к видео и потоку
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Запросы и мутации
  const {
    data: coinProgramData,
    isLoading: isCoinProgramLoading,
    isFetching,
    isPending,
  } = useQuery(businessCoinProgramOptions());
  const { businessActivateCouponCodeMutation } = useUpdateBusinessCoinProgramRewards();
  const { businessScanEnrollMutation } = useUpdateBusinessScan();

  // Состояния для пользователя и купона
  const [user, setUser] = useState<BusinessScanResponse | undefined>(undefined);
  const [coupon, setCoupon] = useState<IReward | undefined>(undefined);
  
  // Состояния для управления фонариком
  const [torchOn, setTorchOn] = useState<boolean>(false);
  const [torchSupported, setTorchSupported] = useState<boolean>(false);
  
  // Состояния для управления сканером
  const [isScanned, setIsScanned] = useState<string | undefined>(undefined);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [correctQr, setCorrectQr] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [currentScan, setCurrentScan] = useState<string>("");
  const [isEnroll, setIsEnroll] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);

  // Обработка сканирования QR-кода
  async function handleScan(scan: string) {
    if (!scan) return;

    setIsLoading(true);
    setIsScanned(scan);
    setDrawerOpen(true);

    try {
      let response;
      const newScan = scan.slice(1);
      setCurrentScan(newScan);

      if (scan.startsWith("U")) {
        response = (await BusinessScanService.businessScanQr(newScan)) as unknown as BusinessScanResponse;
        if (response) {
          setUser(response);
          setShowConfirm(true);
          setCorrectQr(true);
          setResultMessage("");
          setIsEnroll(true);
          setCoupon(undefined);
        }
      } else if (scan.startsWith("C")) {
        response = await businessActivateCouponCodeMutation.mutateAsync(newScan);
        setCoupon(response);
        setCorrectQr(true);
        setResultMessage("Купон успешно активирован");
      } else {
        setCoupon(undefined);
        setCorrectQr(false);
        setResultMessage("Некорректный QR-код");
      }
    } catch (error: any) {
      if (
        error?.status === 403
      ) {
        setResultMessage("Достигнут дневной лимит сканирований для этого пользователя");
      } else {
        setResultMessage("Некорректный QR-код");
      }
      setCorrectQr(false);
      setShowConfirm(false);
    } finally {
      setIsLoading(false);
    }
  }


  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await businessScanEnrollMutation.mutateAsync(currentScan);
      setResultMessage("Баллы успешно начислены");
      setShowConfirm(false);
    } catch (error: any) {
      if (
        error?.status === 403
      ) {
        const message = "Ваш дневной лимит исчерпан. Возвращайтесь завтра!";
        setResultMessage(message);
        setShowConfirm(false);
      } else {
        setResultMessage("Ошибка при начислении баллов");
      }
      setCorrectQr(false);
    } finally {
      setIsLoading(false);
      setIsEnroll(false);
    }
  };

  // Закрытие диалога
  const handleCancel = () => {
    setDrawerOpen(false);
  };

  // Инициализация видео и проверка поддержки фонарика
  const handleVideoInit = async (video: HTMLVideoElement, stream: MediaStream) => {
    videoRef.current = video;
    streamRef.current = stream;
    
    try {
      const track = stream.getVideoTracks()[0];
      if (!track) return;

      const capabilities = track.getCapabilities();
      // @ts-expect-error
      const hasTorch = !!capabilities.torch;
      setTorchSupported(hasTorch);
      
      if (hasTorch) {
        await track.applyConstraints({
          advanced: [{ torch: false } as ExtendedMediaTrackConstraintSet],
        });
        setTorchOn(false);
      }
    } catch (error) {
      return
    }
  };

  // Переключение фонарика
  const toggleTorch = async () => {
    try {
      if (!streamRef.current) return;
      
      const track = streamRef.current.getVideoTracks()[0];
      if (!track) return;
      
      const newTorchState = !torchOn;
      await track.applyConstraints({
        advanced: [{ torch: newTorchState } as ExtendedMediaTrackConstraintSet],
      });
      setTorchOn(newTorchState);
    } catch (error) {
      return
    }
  };

  // Переключение между сканером и ручным вводом
  const toggleManualInput = () => {
    setShowManualInput(!showManualInput);
  };

  // Если программа лояльности не создана, показываем соответствующее сообщение
  if (!coinProgramData && !isCoinProgramLoading && !isFetching && !isPending) {
    return <NoCoinProgram />;
  }

  return (
    <div className="mx-auto flex h-[90svh] w-[100svw] flex-col items-center justify-center md:h-[600px] md:w-[600px] md:pt-36">
      {!drawerOpen && !showManualInput && (
        <QrScannerCamera
          onScan={handleScan}
          isLoading={isLoading}
          drawerOpen={drawerOpen}
          onVideoInit={handleVideoInit}
        />
      )}
      
      {showManualInput && (
        <ManualInput
          onSubmit={handleScan}
          onCancel={() => setShowManualInput(false)}
          isLoading={isLoading}
        />
      )}
      
      <QrScannerControls
        onToggleTorch={toggleTorch}
        onToggleManualInput={toggleManualInput}
        torchOn={torchOn}
        torchSupported={torchSupported}
        showManualInput={showManualInput}
      />
      
      <QrScannerResult
        isOpen={drawerOpen}
        onOpenChange={(open) => {
          if (!open) {
            setDrawerOpen(false);
            setIsScanned(undefined);
            setCorrectQr(false);
            setResultMessage("");
            setIsLoading(false);
            setShowConfirm(false);
            setUser(undefined);
          }
        }}
        isLoading={isLoading}
        showConfirm={showConfirm}
        correctQr={correctQr}
        resultMessage={resultMessage}
        isScanned={isScanned}
        user={user}
        coupon={coupon}
        isEnroll={isEnroll}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}
