import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import * as m from "motion/react-m";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { TInput } from "@/shared/components/ui/TInput";
import { TTextArea } from "@/shared/components/ui/TTextArea";
import { businessAuthOptions, useUpdateBusinessAuth } from "@/shared/api/business/businessAuth/businessAuthApi";
import { toast } from "sonner";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Название компании должно содержать минимум 3 символа")
      .max(100, "Название компании не должно превышать 100 символов"),
    description: z
      .string()
      .min(5, "Описание должно содержать минимум 5 символов")
      .max(150, "Описание не должно превышать 150 символов"),
    email: z.string().email("Введите корректный email"),
    password: z
      .string()
      .min(8, "Пароль должен содержать минимум 8 символов")
      .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
      .regex(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
      .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру")
      .regex(/[^A-Za-z0-9]/, "Пароль должен содержать хотя бы один специальный символ"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

function getPasswordStrength(password: string): number {
  if (!password) return 0;
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  return strength;
}

export const Route = createFileRoute("/business/register")({
  beforeLoad: async ({ context: { queryClient } }) => {
    try {
      await queryClient.ensureQueryData(businessAuthOptions());
      return redirect({
        to: "/business/coin-program",
      });
    } catch {
      // pass
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [passwordValue, setPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const { registerBusinessMutation } = useUpdateBusinessAuth();
  const navigate = useNavigate();
  const passwordStrength = getPasswordStrength(passwordValue);

  const formFields = [
    { name: "name" as const, delay: 0.3 },
    { name: "description" as const, delay: 0.4 },
    { name: "email" as const, delay: 0.5 },
    { name: "password" as const, delay: 0.6 },
    { name: "confirmPassword" as const, delay: 0.7 },
  ] as const;

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setValue("name", data.name.trim());
    setValue("email", data.email.trim());
    setValue("password", data.password.trim());
    setValue("confirmPassword", data.confirmPassword.trim());
    trigger();
    if (!isValid) {
      return;
    }
    setIsSubmitting(true);
    setRegistrationError(null);
    try {
      await registerBusinessMutation.mutateAsync(data, {
        onSuccess: () => {
          navigate({ to: "/business/login" });
          toast.success("Бизнес-аккаунт успешно создан", {
            action: {
              label: "Закрыть",
              onClick: () => toast.dismiss(),
            },
          });
        },
        onError: (error) => {
          console.error("Ошибка при регистрации бизнеса:", error);
          setRegistrationError("Произошла ошибка при регистрации. Пожалуйста, попробуйте снова.");
        },
      });
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      setRegistrationError("Произошла ошибка при регистрации. Пожалуйста, попробуйте снова.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength <= 2) return "bg-red-500";
    if (strength <= 3) return "bg-yellow-500";
    if (strength <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength <= 2) return "Слабый";
    if (strength <= 3) return "Средний";
    if (strength <= 4) return "Хороший";
    return "Отличный";
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
                Создание бизнес-аккаунта
              </m.h1>
              <m.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
                className="text-muted-foreground mx-auto mt-4 max-w-xl text-base"
              >
                Создайте бизнес-аккаунт для доступа к платформе лояльности
              </m.p>
            </div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card/50 overflow-hidden rounded-2xl shadow-xl backdrop-blur-sm"
            >
              <div className="p-4 sm:p-6">
                {registrationError && (
                  <div className="mb-4 rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{registrationError}</p>
                      </div>
                    </div>
                  </div>
                )}

                {registerBusinessMutation.isSuccess && (
                  <div className="mb-4 rounded-md bg-green-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-700">
                          Регистрация бизнеса прошла успешно! Вы будете перенаправлены на страницу входа.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {formFields.map((field) => (
                    <m.div
                      key={field.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: field.delay }}
                    >
                      {field.name === "description" ? (
                        <TTextArea
                          label="Описание компании"
                          placeholder=""
                          rows={3}
                          {...register(field.name)}
                          error={errors[field.name]?.message}
                        />
                      ) : field.name === "password" ? (
                        <div>
                          <div className="relative">
                            <TInput
                              label="Пароль"
                              type={showPassword ? "text" : "password"}
                              placeholder=""
                              {...register("password")}
                              error={errors.password?.message}
                              onChange={(e) => {
                                setPasswordValue(e.target.value);
                                register("password").onChange(e);
                              }}
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

                          {/* Индикатор сложности пароля */}
                          {passwordValue && (
                            <div className="mt-4">
                              <div className="bg-foreground/10 mb-1 flex h-1 overflow-hidden rounded-full">
                                {[...Array(5)].map((_, index) => (
                                  <div
                                    key={index}
                                    className={`h-full w-1/5 transition-all duration-300 ${
                                      index < passwordStrength
                                        ? getPasswordStrengthColor(passwordStrength)
                                        : "bg-transparent"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p
                                className={`text-xs ${
                                  passwordStrength <= 2
                                    ? "text-red-500"
                                    : passwordStrength <= 3
                                      ? "text-yellow-500"
                                      : passwordStrength <= 4
                                        ? "text-blue-500"
                                        : "text-green-500"
                                }`}
                              >
                                Сложность пароля: {getPasswordStrengthText(passwordStrength)}
                              </p>
                            </div>
                          )}

                          <ul className="text-foreground/70 mt-4 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                            <li className={`flex items-center ${/[A-Z]/.test(passwordValue) ? "text-green-500" : ""}`}>
                              <svg
                                className={`mr-1.5 h-4 w-4 flex-shrink-0 ${/[A-Z]/.test(passwordValue) ? "text-green-500" : "text-foreground/30"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="truncate">Заглавная буква</span>
                            </li>
                            <li className={`flex items-center ${/[a-z]/.test(passwordValue) ? "text-green-500" : ""}`}>
                              <svg
                                className={`mr-1.5 h-4 w-4 flex-shrink-0 ${/[a-z]/.test(passwordValue) ? "text-green-500" : "text-foreground/30"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="truncate">Строчная буква</span>
                            </li>
                            <li className={`flex items-center ${/[0-9]/.test(passwordValue) ? "text-green-500" : ""}`}>
                              <svg
                                className={`mr-1.5 h-4 w-4 flex-shrink-0 ${/[0-9]/.test(passwordValue) ? "text-green-500" : "text-foreground/30"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="truncate">Цифра</span>
                            </li>
                            <li
                              className={`flex items-center ${/[^A-Za-z0-9]/.test(passwordValue) ? "text-green-500" : ""}`}
                            >
                              <svg
                                className={`mr-1.5 h-4 w-4 flex-shrink-0 ${
                                  /[^A-Za-z0-9]/.test(passwordValue) ? "text-green-500" : "text-foreground/30"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="truncate">Специальный символ</span>
                            </li>
                            <li className={`flex items-center ${passwordValue.length >= 8 ? "text-green-500" : ""}`}>
                              <svg
                                className={`mr-1.5 h-4 w-4 flex-shrink-0 ${passwordValue.length >= 8 ? "text-green-500" : "text-foreground/30"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="truncate">Минимум 8 символов</span>
                            </li>
                          </ul>
                        </div>
                      ) : field.name === "confirmPassword" ? (
                        <div>
                          <div className="relative">
                            <TInput
                              label="Подтвердите пароль"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder=""
                              {...register("confirmPassword")}
                              error={errors.confirmPassword?.message}
                              onChange={(e) => {
                                register("confirmPassword").onChange(e);
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute top-1/2 right-6 -translate-y-1/2 text-[#98a2b3] transition-colors hover:text-white"
                            >
                              {showConfirmPassword ? (
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
                        </div>
                      ) : (
                        <TInput
                          label={
                            field.name === "name" ? "Название компании" : field.name === "email" ? "Почта" : "Пароль"
                          }
                          type={field.name === "email" ? "email" : "text"}
                          placeholder=""
                          {...register(field.name)}
                          error={errors[field.name]?.message}
                        />
                      )}
                    </m.div>
                  ))}

                  <m.div whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      className="relative mt-4 w-full overflow-hidden py-4 text-base"
                      type="submit"
                      disabled={registerBusinessMutation.isPending || isSubmitting}
                    >
                      {registerBusinessMutation.isPending || isSubmitting ? (
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
                          Регистрация...
                        </m.span>
                      ) : (
                        "Зарегистрироваться"
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

              <div className="mt-6 flex flex-col gap-4">
                <m.div whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/business/login" className="flex items-center justify-center gap-2">
                    <Button variant="outline" className="w-full py-4.5">
                      <img src="/icons/avatar.svg" alt="logo" className="h-4.5 w-4.5" />
                      Войти в существующий бизнес-аккаунт
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
