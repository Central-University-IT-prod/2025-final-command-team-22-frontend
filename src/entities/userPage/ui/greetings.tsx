import { cn } from "@/shared/lib/utils";
import { FC, HTMLAttributes, PropsWithChildren } from "react";

interface GreetingsProps {
  name: string;
}

const getTimeBasedGreeting = () => {
  const hours = new Date().getHours();
  if (hours >= 5 && hours < 12) {
    return "Доброе утро";
  } else if (hours >= 12 && hours < 18) {
    return "Добрый день";
  } else if (hours >= 18 && hours < 23) {
    return "Добрый вечер";
  } else {
    return "Доброй ночи";
  }
};

const Greetings: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement> & GreetingsProps>> = ({
  name,
  className,
  ...props
}) => {
  return (
    <div className={cn("text-foreground pt-8 text-2xl font-medium md:pt-0", className)} {...props}>
      {getTimeBasedGreeting()}, <br />
      {name}
    </div>
  );
};

export default Greetings;
