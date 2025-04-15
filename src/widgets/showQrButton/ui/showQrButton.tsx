import { QrCode } from "@/entities/qrCode";
import { useUserCoinPrograms } from "@/shared/api/user/userCoinPrograms/userCoinProgramsApi";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/components/ui/drawer";
import { cn } from "@/shared/lib/utils";
import { FC, HTMLAttributes, PropsWithChildren, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ShowQrButtonAlert } from "./showQrButtonAlert";
import { toast } from "sonner";

interface ShowQrButtonProps {
  cost: number;
  has: number;
  userCoinProgramId: string;
  rewardId: string;
}

const ShowQrButton: FC<PropsWithChildren<HTMLAttributes<HTMLButtonElement> & ShowQrButtonProps>> = ({
  cost,
  has,
  userCoinProgramId,
  rewardId,
  className,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [QrData, setQrData] = useState<string>("MAGOMED");
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { buyUserProgramRewardMutation } = useUserCoinPrograms();

  const handlePurchase = async () => {
    try {
      const response = await buyUserProgramRewardMutation.mutateAsync({
        userCoinProgramId,
        rewardId,
      });
      setQrData(response.code);
      setOpen(true);
      setShowConfirm(false);
    } catch {
      toast.error("Ошибка при приобретении QR-кода", {
        action: {
          label: "Закрыть",
          onClick: () => toast.dismiss(),
        },
      });
      setShowConfirm(false);
    }
  };

  const handleCloseQrCode = () => {
    setOpen(false);
    setShowAlert(false);
  };

  const content = (
    <>
      <QrCode value={"C" + QrData} />
      <ShowQrButtonAlert
        onSure={handleCloseQrCode}
        open={showAlert}
        setOpen={setShowAlert}
        title="Вы точно хотите закрыть QR-код?"
        description="Коины за него спишутся, даже если вы его не просканировали!"
        cancelText="Отмена"
        actionText="Закрыть"
      />
    </>
  );

  if (isDesktop) {
    return (
      <>
        <Button
          className={cn("", className)}
          onClick={() => setShowConfirm(true)}
          disabled={cost > has}
          {...props}
          variant="default"
        >
          Приобрести
        </Button>

        <ShowQrButtonAlert
          onSure={handlePurchase}
          open={showConfirm}
          setOpen={setShowConfirm}
          title="Вы уверены?"
          description="Коины за награду спишутся сразу же"
          cancelText="Отмена"
          actionText="Приобрести"
        />

        <Dialog
          open={open}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setShowAlert(true);
            }
          }}
        >
          <DialogContent onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle>Ваш QR-код</DialogTitle>
              <DialogDescription>Покажите QR-код для получения награды</DialogDescription>
            </DialogHeader>
            {content}
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={() => setShowAlert(true)} className="mb-2" variant="default">
                  Закрыть
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <Button
        className={cn("", className)}
        onClick={() => setShowConfirm(true)}
        disabled={cost > has}
        {...props}
        variant="default"
      >
        Приобрести
      </Button>

      <ShowQrButtonAlert
        onSure={handlePurchase}
        open={showConfirm}
        setOpen={setShowConfirm}
        title="Вы уверены?"
        description="Коины за награду спишутся сразу же"
        cancelText="Отмена"
        actionText="Приобрести"
      />

      <Drawer
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setShowAlert(true);
          }
        }}
      >
        <DrawerContent onPointerDownOutside={(e) => e.preventDefault()} onInteractOutside={(e) => e.preventDefault()}>
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-xl">Ваш QR-код</DrawerTitle>
            <DrawerDescription>Покажите QR-код для получения награды</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">{content}</div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button size={"lg"} variant="default" onClick={() => setShowAlert(true)}>
                Закрыть
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ShowQrButton;
