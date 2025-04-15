import { QrCode } from "@/entities/qrCode";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { cn } from "@/shared/lib/utils";
import { FC, HTMLAttributes, PropsWithChildren, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { useQuery } from "@tanstack/react-query";
import { userQrOptions } from "@/shared/api/user/userQr/qrApi";

const ShowUserQrButton: FC<PropsWithChildren<HTMLAttributes<HTMLButtonElement>>> = ({ className, ...props }) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { data, isLoading, isError } = useQuery({
    ...userQrOptions(),
    enabled: open,
    refetchOnMount: true,
  });

  const triggerButton = (
    <Button className={cn("", className)} {...props} variant="default">
      Показать QR-код
    </Button>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ваш QR-код</DialogTitle>
            <DialogDescription>Покажите QR-код для начисления коинов</DialogDescription>
          </DialogHeader>
          {isLoading && <div className="flex justify-center py-8">Загрузка...</div>}
          {data && <QrCode value={"U" + data.data} />}
          {isError && <div className="flex justify-center py-8">Ошибка загрузки QR-кода</div>}
          <DialogFooter>
            <DialogClose asChild>
              <Button className="mb-2" variant="default">
                Закрыть
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-xl">Ваш QR-код</DrawerTitle>
          <DrawerDescription>Покажите QR-код для начисления коинов</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          {isLoading && <div className="flex justify-center py-8">Загрузка...</div>}
          {data && <QrCode value={"U" + data.data} />}
          {isError && <div className="flex justify-center py-8">Ошибка загрузки QR-кода</div>}
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button size={"lg"} variant="default">
              Закрыть
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ShowUserQrButton;
