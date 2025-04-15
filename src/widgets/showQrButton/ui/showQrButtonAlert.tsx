import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { createContext, useEffect, useState } from "react";

interface AlertContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function ShowQrButtonAlert({
  title,
  description,
  cancelText,
  actionText,
  onSure,
  open,
  setOpen,
}: {
  title: string;
  description: string;
  cancelText: string;
  actionText: string;
  onSure: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [isAlertOpen, setIsAlertOpen] = useState(open);

  useEffect(() => {
    setIsAlertOpen(open);
  }, [open]);

  return (
    <AlertContext.Provider value={{ isOpen: isAlertOpen, setIsOpen: setIsAlertOpen }}>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsAlertOpen(false);
                setOpen(false);
              }}
            >
              {cancelText}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onSure();
                setIsAlertOpen(false);
              }}
            >
              {actionText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AlertContext.Provider>
  );
}
