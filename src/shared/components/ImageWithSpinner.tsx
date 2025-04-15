import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { Spinner } from "./Spinner";
import * as m from "motion/react-m";

export const ImageWithSpinner = ({
  src,
  alt,
  className,
  containerClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Сбрасываем состояние загрузки при изменении src
  useEffect(() => {
    if (src) {
      setIsLoading(true);
      
      // Предзагрузка изображения
      const img = new Image();
      img.src = src;
      
      img.onload = () => {
        setIsLoading(false);
      };
      
      img.onerror = () => {
        setIsLoading(false);
      };
    }
  }, [src]);

  return (
    <div className={cn("relative", containerClassName)}>
      {isLoading && (
        <div className="bg-card/30 absolute inset-0 flex items-center justify-center">
          <Spinner size="sm" />
        </div>
      )}
      <m.img
        key={src}
        src={src}
        alt={alt}
        className={cn(className, "max-h-[300px] object-cover max-w-[full]")}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </div>
  );
};
