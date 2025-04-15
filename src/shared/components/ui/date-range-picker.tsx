import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { ru } from "date-fns/locale";

interface DateRangePickerProps {
  className?: string;
  value: DateRange | undefined;
  onChange: (value: DateRange | undefined) => void;
}

export function DateRangePicker({ className, value, onChange }: DateRangePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start border-none bg-[#333333] text-left font-normal hover:bg-[#404040]",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="text-primary mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {value.from.toLocaleDateString("ru")} - {value.to.toLocaleDateString("ru")}
                </>
              ) : (
                value.from.toLocaleDateString("ru")
              )
            ) : (
              <span>Выберите период</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            locale={ru}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
