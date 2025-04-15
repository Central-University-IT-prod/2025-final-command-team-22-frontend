import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import * as m from "motion/react-m";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useCallback } from "react";
import { Button } from "@/shared/components/ui/button";
import { TInput } from "@/shared/components/ui/TInput";
import { userAuthOptions, useUpdateUserAuth } from "@/shared/api/user/userAuth/userAuthApi";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(1, "Введите пароль"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Route = createFileRoute("/user/login")({
  beforeLoad: async ({ context: { queryClient } }) => {
    try {
      await queryClient.ensureQueryData(userAuthOptions());
      return redirect({
        to: "/user",
      });
    } catch {
      // pass
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [wasClicked, setWasClicked] = useState(false);
  const { loginUserMutation } = useUpdateUserAuth();

  const generateRandomPosition = useCallback(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const buttonWidth = 200;
    const buttonHeight = 50;

    const maxX = viewportWidth - buttonWidth;
    const maxY = viewportHeight - buttonHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    setPosition({ x: randomX, y: randomY });
    setIsHovered(true);
    setWasClicked(true);

    setTimeout(() => {
      setIsHovered(false);
    }, 1000);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setValue("email", data.email.trim());
    setValue("password", data.password.trim());
    trigger();
    if (!isValid) {
      return;
    }
    setIsSubmitting(true);
    try {
      await loginUserMutation.mutateAsync(data, {
        onSuccess: () => {
          navigate({ to: "/user" });
          toast.success("Вход выполнен успешно!", {
            action: {
              label: "Закрыть",
              onClick: () => toast.dismiss(),
            },
          });
        },
      });
    } catch (error) {
      console.error("Ошибка при входе:", error);
      toast.error("Произошла ошибка при входе", {
        description: "Пожалуйста, проверьте введенные данные и попробуйте снова.",
        action: {
          label: "Закрыть",
          onClick: () => toast.dismiss(),
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background text-foreground"
    >
      <div className="relative mt-16 mb-16">
        <div className="relative container mx-auto flex min-h-[calc(100vh-8rem)] max-w-2xl flex-col items-center justify-center px-4">
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full"
          >
            <div className="mb-8 text-center">
              <m.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
                className="bg-clip-text text-2xl font-bold tracking-tight text-white sm:text-4xl"
              >
                Вход в аккаунт
              </m.h1>
              <m.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
                className="text-muted-foreground mx-auto mt-4 max-w-xl text-base"
              >
                Войдите в свой аккаунт для доступа к программам лояльности
              </m.p>
            </div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card/50 overflow-hidden rounded-2xl shadow-xl backdrop-blur-sm"
            >
              <div className="p-4 sm:p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <m.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <TInput
                      label="Почта"
                      type="email"
                      placeholder=""
                      {...register("email")}
                      error={errors.email?.message}
                    />
                  </m.div>

                  <m.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="relative">
                      <TInput
                        label="Пароль"
                        type={showPassword ? "text" : "password"}
                        placeholder=""
                        {...register("password")}
                        error={errors.password?.message}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-6 -translate-y-1/2 text-[#98a2b3] transition-colors hover:text-white"
                      >
                        {showPassword ? (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </m.div>

                  <m.div whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      className="relative mt-4 w-full overflow-hidden py-4 text-base"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <m.span
                          className="flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <svg
                            className="mr-2 h-5 w-5 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Вход...
                        </m.span>
                      ) : (
                        "Войти"
                      )}
                    </Button>
                  </m.div>
                </form>
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-8"
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="border-foreground/10 w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-background text-muted-foreground px-2">или</span>
                </div>
              </div>

              {wasClicked && (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6 text-center text-red-400 italic"
                >
                  Увы, нам не дали доступ к T-ID...
                </m.div>
              )}

              <m.div
                style={
                  position.x !== 0
                    ? {
                        position: "fixed",
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        zIndex: 50,
                      }
                    : {}
                }
                animate={{
                  scale: isHovered ? [1, 1.2, 0.8, 1.1, 1] : 1,
                  rotate: isHovered ? [0, 15, -15, 10, -10, 0] : 0,
                  filter: isHovered ? ["blur(0px)", "blur(2px)", "blur(0px)"] : "blur(0px)",
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
              >
                <Button className="group relative mt-6 w-full overflow-hidden py-4.5" onClick={generateRandomPosition}>
                  <m.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0"
                    animate={{
                      opacity: isHovered ? [0, 0.3, 0] : 0,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                  />
                  <span className="flex items-center justify-center gap-2">
                    Войти с
                    <m.img
                      src="/icons/tid.png"
                      alt="logo"
                      className="w-11"
                      animate={{
                        rotate: isHovered ? [0, 360] : 0,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: "easeInOut",
                      }}
                    />
                  </span>
                </Button>
              </m.div>

              <div className="mt-6 flex flex-col gap-4">
                <m.div whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/user/register" className="flex items-center justify-center gap-2">
                    <Button variant="outline" className="w-full py-4.5">
                      <img src="/icons/avatar.svg" alt="logo" className="h-4.5 w-4.5" />
                      Зарегистрировать новый аккаунт
                    </Button>
                  </Link>
                </m.div>
                <m.div whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/" className="flex items-center justify-center gap-2">
                    <Button variant="outline" className="w-full py-4.5">
                      <img src="/icons/home.svg" alt="logo" className="h-4.5 w-4.5" />
                      Вернуться на главную
                    </Button>
                  </Link>
                </m.div>
              </div>
            </m.div>
          </m.div>
        </div>
      </div>
    </m.div>
  );
}
