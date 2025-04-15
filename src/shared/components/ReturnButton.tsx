import { cn } from "@/shared/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { FC, HTMLAttributes, PropsWithChildren } from "react";

const ReturnButton: FC<PropsWithChildren<HTMLAttributes<HTMLAnchorElement>>> = ({ className, ...props }) => {
  return (
    <Link to=".." className={cn("flex items-center gap-2 p-2 text-xl", className)} {...props}>
      <ArrowLeftIcon className="h-6 w-6" />
      <p>Назад</p>
    </Link>
  );
};

export default ReturnButton;
