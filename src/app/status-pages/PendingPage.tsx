import * as motion from "motion/react-m";
import { Spinner } from "@/shared/components/Spinner";

export const PendingPage = () => {
  return (
    <div className="my-auto flex min-h-[90vh] w-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <Spinner size="lg" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.2 }}
          className="space-y-4 text-center"
        >
          <h1 className="text-foreground text-3xl font-bold">Загрузка...</h1>
          <p className="text-muted-foreground">Пожалуйста, подождите</p>
        </motion.div>
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{
              opacity: [0.03, 0.06, 0.03],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 30%, hsl(var(--primary)) 0%, transparent 70%),
                radial-gradient(circle at 80% 70%, hsl(var(--primary)) 0%, transparent 70%)
              `,
            }}
          />
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
