import { Link } from "@tanstack/react-router";
import * as motion from "motion/react-m";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export const NotFoundPage = () => {
  return (
    <div className="flex min-h-[90vh] w-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="text-primary/10 text-center text-[150px] font-bold select-none">404</div>
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="text-primary text-6xl font-bold">404</span>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4 text-center"
        >
          <h1 className="text-foreground text-2xl font-bold">Упс! Страница не найдена</h1>
          <p className="text-muted-foreground">Похоже, страница, которую вы ищете, не существует или была перемещена</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col justify-center gap-4 pt-4 sm:flex-row"
        >
          <Button variant="default" size="lg" asChild className="mx-auto gap-2 sm:mx-0">
            <Link to="/">
              <Home className="h-4 w-4" />
              На главную
            </Link>
          </Button>

          <Button variant="outline" size="lg" onClick={() => window.history.back()} className="mx-auto gap-2 sm:mx-0">
            <ArrowLeft className="h-4 w-4" />
            Назад
          </Button>
        </motion.div>
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>
    </div>
  );
};
