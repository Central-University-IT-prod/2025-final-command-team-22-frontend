import { Button } from "@/shared/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/shared/components/ui/drawer";
import { CheckCircle, XCircle } from "lucide-react";
import { IReward } from "@/shared/models/IReward";

interface BusinessScanResponse {
  username: string;
  balance: number;
}

interface QrScannerResultProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isLoading: boolean;
  showConfirm: boolean;
  correctQr: boolean;
  resultMessage: string;
  isScanned?: string;
  user?: BusinessScanResponse;
  coupon?: IReward;
  isEnroll: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function QrScannerResult({
  isOpen,
  onOpenChange,
  isLoading,
  showConfirm,
  correctQr,
  resultMessage,
  isScanned,
  user,
  coupon,
  isEnroll,
  onConfirm,
  onCancel,
}: QrScannerResultProps) {
  // Проверяем, содержит ли сообщение информацию о лимите сканирований
  const isLimitError = resultMessage.includes("лимит сканирований");
  
  // Отладочный вывод
  console.log("QrScannerResult: resultMessage =", resultMessage);
  console.log("QrScannerResult: isLimitError =", isLimitError);
  
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="mx-auto max-w-[800px] rounded-t-xl">
        <DrawerHeader className="flex flex-col p-12">
          <DrawerTitle className="mb-2 text-2xl font-bold">
            {isLoading
              ? "Обработка QR-кода..."
              : showConfirm
                ? "Подтверждение"
                : isScanned
                  ? correctQr
                    ? "Успешно"
                    : isLimitError ? "Лимит достигнут" : "Ошибка"
                  : "QR-код отсканирован"}
          </DrawerTitle>
          <DrawerDescription asChild>
            <div className="text-muted-foreground text-sm">
              {isLoading ? (
                <div className="flex items-center">
                  <div className="border-primary mr-2 h-5 w-5 animate-spin rounded-full border-t-2 border-b-2"></div>
                  Обработка запроса...
                </div>
              ) : showConfirm ? (
                <div className="flex flex-col items-center gap-6">
                  <div className="flex flex-col items-start gap-2">
                    <div className="text-xl text-white">Пользователь: {user?.username}</div>
                    <div className="text-lg">Баланс: {user?.balance}</div>
                  </div>
                  <div className="flex gap-6">
                    <Button onClick={onCancel} variant="outline" size="lg">
                      Отмена
                    </Button>
                    <Button onClick={onConfirm} className="bg-primary hover:bg-primary/90 text-black" size="lg">
                      Пополнить
                    </Button>
                  </div>
                </div>
              ) : coupon && correctQr && !isEnroll ? (
                <div className="grid grid-cols-2 gap-4 p-2">
                  <div className="overflow-hidden rounded-md">
                    <img
                      className="h-full max-h-[150px] w-full max-w-[350px] object-cover"
                      src={coupon.image_url}
                      alt={"couponImage"}
                    />
                  </div>
                  <div>
                    <p className="text-xl text-white">{coupon.name}</p>
                    <p className="text-md pt-2">{coupon.description}</p>
                  </div>
                </div>
              ) : resultMessage ? (
                <div className="flex flex-col items-center gap-8 text-lg">
                  <div className="flex flex-col items-center text-center">
                    {correctQr ? (
                      <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
                    ) : isLimitError ? (
                      <XCircle className="mb-4 h-16 w-16 text-yellow-500" />
                    ) : (
                      <XCircle className="mb-4 h-16 w-16 text-red-500" />
                    )}
                    <span className={isLimitError ? "text-yellow-500 font-semibold" : ""}>
                      {resultMessage}
                    </span>
                  </div>
                  <Button onClick={onCancel} variant="outline" size="lg">
                    Закрыть
                  </Button>
                </div>
              ) : (
                <div>Код: {isScanned}</div>
              )}
            </div>
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
} 