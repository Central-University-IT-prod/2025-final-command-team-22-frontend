import { cn } from "@/shared/lib/utils";
import { FC, HTMLAttributes, PropsWithChildren } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { Copy } from "lucide-react";

interface QrCodeProps {
  value: string;
}

const QrCode: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement> & QrCodeProps>> = ({
  value,
  className,
  ...props
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Скопировано", {
        action: {
          label: "Закрыть",
          onClick: () => toast.dismiss(),
        },
      });
    } catch {
      toast.error("Failed to copy to clipboard", {
        action: {
          label: "Закрыть",
          onClick: () => toast.dismiss(),
        },
      });
    }
  };

  return (
    <div className={cn("flex items-center justify-center rounded-[30px] bg-[#343434]", className)} {...props}>
      <div className="flex flex-col items-center gap-2 p-4">
        <div className="rounded-[8px] bg-white p-4">
          <QRCodeSVG size={200} value={value} />
        </div>
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div />
          <p className="text-foreground">{value}</p>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="text-foreground hover:text-foreground/80 h-8 w-8"
          >
            <Copy className="h-4 w-4" />
            <span className="sr-only">Скопировано</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QrCode;
