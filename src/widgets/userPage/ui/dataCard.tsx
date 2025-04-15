import { cn } from "@/shared/lib/utils";
import { FC, HTMLAttributes, PropsWithChildren } from "react";

interface DataCardProps {
  title: string;
  value: string | number;
}

const DataCard: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement> & DataCardProps>> = ({
  title,
  value,
  className,
  ...props
}) => {
  return (
    <div className={cn("grid aspect-square grid-rows-2 rounded-[24px] bg-[#1c1c1e] p-3", className)} {...props}>
      <div className="text-muted-foreground text-lg">{title}</div>
      <div className="self-end text-4xl font-medium">{value}</div>
    </div>
  );
};

export default DataCard;
