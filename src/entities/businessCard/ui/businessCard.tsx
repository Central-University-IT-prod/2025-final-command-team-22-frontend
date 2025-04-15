import { cn, pluralize, getContrastColor } from "@/shared/lib/utils";
import { motion } from "motion/react";
import { FC, HTMLAttributes, PropsWithChildren } from "react";

interface BusinessCardProps {
  id: string;
  title: string;
  amount?: number;
  description?: string;
  color: string;
  amountPosition?: "top" | "bottom";
}

const BusinessCard: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement> & BusinessCardProps>> = ({
  title,
  amount = 0,
  description,
  color,
  className,
  id,
  children,
  amountPosition = "bottom",
  ...props
}) => {
  const textColor = getContrastColor(color, "#f8f8f8", "#222222");

  if (children) {
    return (
      <motion.div
        //@ts-expect-error style dont support custom attributes
        style={{ "--card-color": color }}
        layoutId={`card-${id}`}
        className={cn(
          "grid grid-rows-[32px_auto] rounded-[12px] border border-gray-700 bg-[var(--card-color)] p-2 not-md:aspect-video",
          className
        )}
        {...props}
      >
        <div className="flex justify-between">
          <div style={{ color: textColor }} className="text-lg">
            {title}
          </div>
        </div>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      //@ts-expect-error style dont support custom attributes
      style={{ "--card-color": color }}
      layoutId={`card-${id}`}
      className={cn(
        "grid aspect-video grid-rows-[32px_auto_32px] rounded-[12px] p-4 border border-gray-700 bg-[var(--card-color)] shadow-lg",
        className
      )}
      {...props}
    >
      {amountPosition === "bottom" ? (
        <>
          <div style={{ color: textColor }} className="text-xl font-bold">
            {title}
          </div>
          <div style={{ color: textColor }}>{description}</div>
          <div style={{ color: textColor }} className="self-end text-2xl font-bold">
            {pluralize(amount, ["коин", "коина", "коинов"])}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between">
            <div style={{ color: textColor }} className="text-lg">
              {title}
            </div>
            <div style={{ color: textColor }} className="text-xl font-bold">
              {pluralize(amount, ["коин", "коина", "коинов"])}
            </div>
          </div>
          <div style={{ color: textColor }}>{description}</div>
        </>
      )}
    </motion.div>
  );
};

export default BusinessCard;
