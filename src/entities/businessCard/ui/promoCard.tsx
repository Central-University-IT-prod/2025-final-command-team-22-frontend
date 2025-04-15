import { Button } from "@/shared/components/ui/button";
import { cn, pluralize } from "@/shared/lib/utils";
import { FC, HTMLAttributes, PropsWithChildren, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
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
import { ShowQrButton } from "@/widgets/showQrButton/index";
import { IReward } from "@/shared/models/IReward";
import { Progress } from "@/shared/components/ui/progress";
import { useQueryClient } from "@tanstack/react-query";

const PromoCard: FC<
  PropsWithChildren<
    HTMLAttributes<HTMLDivElement> &
      Omit<IReward, "description"> & {
        has: number;
        description?: string;
        userCoinProgramId: string;
        id: string;
        isInAvailable?: boolean;
      }
  >
> = ({ image_url, name, cost, has, description, className, isInAvailable, userCoinProgramId, id, ...props }) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [imageError, setImageError] = useState(false);
  const queryClient = useQueryClient();

  const fallbackImage = "/images/T-QuestionMark.png";
  const displayImageUrl = imageError || !image_url ? fallbackImage : image_url;

  const handleImageError = () => {
    setImageError(true);
  };

  const triggerButton = !isInAvailable ? (
    <div
      className={cn("grid grid-rows-[1fr_1fr] overflow-hidden rounded-[12px] bg-white p-2 text-black", className)}
      {...props}
    >
      <div className="flex aspect-square w-full items-center justify-center overflow-hidden">
        <img
          className="h-full w-full rounded-[24px] object-cover"
          src={displayImageUrl}
          alt={name}
          onError={handleImageError}
        />
      </div>
      <div className="mt-2 grid grid-rows-2 text-white">
        <p className="p-1 text-center font-medium">{name}</p>
        <div className="flex flex-col justify-center gap-1">
          <p className="font-medium">{cost} коинов</p>
          <Progress value={(has / cost) * 100} />
          {cost - has > 0 ? (
            <p className="text-muted-foreground">Еще {cost - has} коинов</p>
          ) : (
            <p className="text-muted-foreground">Доступно!</p>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div
      className={cn(
        "flex h-full w-full cursor-pointer flex-col gap-1 overflow-hidden rounded-[12px] text-black",
        className
      )}
      {...props}
    >
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[12px] bg-[#343434]">
        <img
          className="h-full w-full rounded-[14px] object-cover p-2"
          src={displayImageUrl}
          alt={name}
          onError={handleImageError}
        />
        <p className="bg-primary absolute bottom-2 left-2 rounded-sm px-2 py-1 text-sm">
          {pluralize(cost, ["коин", "коина", "коинов"])}
        </p>
      </div>
      <p className="w-full pt-1 pb-3 pl-4 text-left font-medium text-white">{name}</p>
    </div>
  );

  const content = (
    <div className="grid grid-cols-2 gap-4 p-2">
      <div className="overflow-hidden">
        <img
          className="h-full max-h-[150px] w-full max-w-[350px] rounded-md object-cover"
          src={displayImageUrl}
          alt={name}
          onError={handleImageError}
        />
      </div>
      <div className="">
        <p className="text-xl">{name}</p>
        <p className="text-muted-foreground text-sm">{pluralize(cost, ["коин", "коина", "коинов"])}</p>
        <p className="text-md pt-2">{description}</p>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{name}</DialogTitle>
            <DialogDescription>Ваша награда</DialogDescription>
          </DialogHeader>
          {content}
          <DialogFooter>
            <ShowQrButton cost={cost} has={has} userCoinProgramId={userCoinProgramId} rewardId={id} />
            <DialogClose asChild>
              <Button
                className="mb-2"
                variant="secondary"
                onClick={() => {
                  queryClient.invalidateQueries({ queryKey: ["userAuth"] });
                  queryClient.invalidateQueries({ queryKey: ["userCoinPrograms"] });
                }}
              >
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
          <DrawerTitle className="text-2xl">{name}</DrawerTitle>
          <DrawerDescription>Ваша награда</DrawerDescription>
        </DrawerHeader>
        {content}
        <DrawerFooter className="pt-2">
          <ShowQrButton cost={cost} has={has} userCoinProgramId={userCoinProgramId} rewardId={id} />
          <DrawerClose asChild>
            <Button
              size={"lg"}
              variant="secondary"
              onClick={() => {
                queryClient.invalidateQueries({ queryKey: ["userAuth"] });
                queryClient.invalidateQueries({ queryKey: ["userCoinPrograms"] });
              }}
            >
              Закрыть
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default PromoCard;
