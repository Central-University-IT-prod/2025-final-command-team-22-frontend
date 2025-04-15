import { Button } from "@/shared/components/ui/button";
import { XCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function NoCoinProgram() {
  return (
    <div className="mx-auto flex h-[90svh] w-[100svw] flex-col items-center justify-center gap-6 p-4 md:h-[600px] md:w-[600px] md:pt-36">
      <div className="flex flex-col items-center gap-4 text-center">
        <XCircle className="h-16 w-16 text-red-500" />
        <h1 className="text-2xl font-bold text-red-500">Программа лояльности не создана</h1>
        <p className="text-muted-foreground max-w-md text-center">
          Для использования QR-сканера необходимо создать программу лояльности в вашем бизнес-профиле
        </p>
      </div>
      <Button asChild className="mt-4">
        <Link to="/business/coin-program">Создать программу лояльности</Link>
      </Button>
    </div>
  );
} 