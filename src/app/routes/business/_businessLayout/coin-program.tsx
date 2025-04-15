import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/shared/components/ui/button";
import {
  businessCoinProgramOptions,
  useUpdateBusinessCoinProgram,
} from "@/shared/api/business/businessCoinProgram/businessCoinProgramApi";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  businessCoinProgramRewardsOptions,
  useUpdateBusinessCoinProgramRewards,
} from "@/shared/api/business/businessCoinProgramRewards/businessCoinProgramRewardsApi";
import { TInput } from "@/shared/components/ui/TInput";
import { TTextArea } from "@/shared/components/ui/TTextArea";
import * as m from "motion/react-m";
import { toast } from "sonner";
import { FormProvider, useForm } from "react-hook-form";
import { cn } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence } from "motion/react";
import { IReward } from "@/shared/models/IReward";
import { uploadToImgBB } from "@/shared/lib/imgBB";
import { TrashIcon } from "lucide-react";
import { ImageWithSpinner } from "@/shared/components/ImageWithSpinner";
import { businessAuthOptions } from "@/shared/api/business/businessAuth/businessAuthApi";
import { IBusinessCoinProgram } from "@/shared/models/IBusinessCoinProgram";

type CoinProgramFormData = {
  name: string;
  description: string;
  day_limit: number;
  card_color: string;
};

type RewardFormData = Omit<IReward, "id">;

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

// Определяем схему валидации с помощью zod
const coinProgramSchema = z.object({
  name: z.string().min(3, "Название должно быть больше 3 символов").max(30, "Название должно быть меньше 30 символов"),
  description: z.string().min(1, "Описание обязательно").max(150, "Описание должно быть меньше 150 символов"),
  day_limit: z.number().min(1, "Дневной лимит должен быть больше 1"),
  card_color: z.string().min(1, "Цвет карты обязателен"),
});

const rewardSchema = z.object({
  name: z
    .string()
    .min(3, "Название награды должно быть больше 3 символов")
    .max(50, "Название должно быть меньше 50 символов"),
  description: z.string().min(1, "Описание награды обязательно").max(150, "Описание должно быть меньше 150 символов"),
  cost: z.number().min(1, "Стоимость должна быть больше 0"),
  image_url: z.string().min(1, "Изображение обязательно"),
});

export const Route = createFileRoute("/business/_businessLayout/coin-program")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rewardModalOpen, setRewardModalOpen] = useState(false);
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  const [isLoadingReward, setIsLoadingReward] = useState(false);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [rewardToDelete, setRewardToDelete] = useState<string | null>(null);
  const [selectedReward, setSelectedReward] = useState<IReward | null>(null);
  const [rewardInfoModalOpen, setRewardInfoModalOpen] = useState(false);

  const addCoinProgramForm = useForm<CoinProgramFormData>({
    resolver: zodResolver(coinProgramSchema),
    defaultValues: {
      name: "",
      description: "",
      day_limit: 0,
      card_color: "#000000",
    },
  });

  const rewardForm = useForm<RewardFormData>({
    resolver: zodResolver(rewardSchema),
    defaultValues: {
      name: "",
      description: "",
      cost: 0,
      image_url: "",
    },
  });

  const { data: coinProgram } = useQuery(businessCoinProgramOptions());
  const { data: rewards } = useQuery(businessCoinProgramRewardsOptions({ limit: 100, offset: 0 }));
  const { data: businessData } = useQuery(businessAuthOptions());

  const { createBusinessCoinProgramMutation } = useUpdateBusinessCoinProgram();
  const { businessCreateRewardMutation, businessDeleteRewardMutation } = useUpdateBusinessCoinProgramRewards();

  // Блокировка скролла при открытии модального окна добавления награды
  useEffect(() => {
    if (rewardModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [rewardModalOpen]);

  const handleCreateSubmit = async (values: CoinProgramFormData) => {
    // Обработка значений перед отправкой
    const trimmedName = values.name.trim();
    const trimmedDescription = values.description.trim();

    if (trimmedName !== values.name) {
      addCoinProgramForm.setValue("name", trimmedName);
    }

    if (trimmedDescription !== values.description) {
      addCoinProgramForm.setValue("description", trimmedDescription);
    }

    await addCoinProgramForm.trigger();
    if (!addCoinProgramForm.formState.isValid) {
      return;
    }

    try {
      const formattedValues = {
        name: trimmedName,
        description: trimmedDescription,
        day_limit: Number(values.day_limit),
        card_color: values.card_color,
      };

      await createBusinessCoinProgramMutation.mutateAsync(formattedValues);
      toast.success("Программа лояльности создана", {
        action: {
          label: "Закрыть",
          onClick: () => toast.dismiss(),
        },
      });
      setIsModalOpen(false);
      addCoinProgramForm.reset();
    } catch (error) {
      console.error(error);
      toast.error("Произошла ошибка при сохранении", {
        action: {
          label: "Закрыть",
          onClick: () => toast.dismiss(),
        },
      });
    }
  };

  const handleRewardSubmit = async (values: RewardFormData) => {
    rewardForm.setValue("name", values.name.trim());
    rewardForm.setValue("description", values.description.trim());
    rewardForm.trigger();
    if (!rewardForm.formState.isValid) {
      return;
    }
    setIsLoadingReward(true);
    try {
      const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
      if (!fileInput?.files) {
        throw new Error("Выберите изображение");
      }
      const imageUrl = await uploadToImgBB(fileInput.files);

      await businessCreateRewardMutation.mutateAsync({
        ...values,
        cost: Number(values.cost),
        image_url: imageUrl,
      });
      toast.success("Награда добавлена", {
        action: {
          label: "Закрыть",
          onClick: () => toast.dismiss(),
        },
      });
      setRewardModalOpen(false);
      rewardForm.reset();
    } catch (error) {
      console.error(error);
      toast.error("Произошла ошибка при добавлении награды", {
        action: {
          label: "Закрыть",
          onClick: () => toast.dismiss(),
        },
      });
    } finally {
      setIsLoadingReward(false);
    }
  };

  const handleDeleteReward = async (id: string) => {
    setIsLoadingReward(true);
    try {
      await businessDeleteRewardMutation.mutateAsync(id);
      toast.success("Награда удалена", {
        action: { label: "Закрыть", onClick: () => toast.dismiss() },
      });
      setRewardToDelete(null);
    } catch (error) {
      console.error(error);
      toast.error("Произошла ошибка при удалении награды", {
        action: { label: "Закрыть", onClick: () => toast.dismiss() },
      });
    } finally {
      setConfirmDeleteModalOpen(false);
      setIsLoadingReward(false);
    }
  };

  const handleRewardClick = (reward: IReward) => {
    setSelectedReward(reward);
    setRewardInfoModalOpen(true);
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background text-foreground min-h-screen py-4 sm:py-8"
    >
      <div className="relative">
        <div className="container mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="mb-4 sm:mb-8"
          >
            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl md:text-4xl">
              {getTimeBasedGreeting()}, {businessData?.name || "Пользователь"}
            </h1>
            <p className="text-muted-foreground mt-2 max-w-xl text-sm sm:mt-4 sm:text-base">
              Управляйте вашей программой лояльности и наградами для клиентов
            </p>
          </m.div>

          <div className={cn("mt-8 grid grid-cols-1 gap-6")}>
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-2"
            >
              {!coinProgram ? (
                <div className="bg-card/50 flex w-full flex-col items-center justify-center rounded-2xl px-3 py-4 text-center backdrop-blur-sm sm:px-4 sm:py-8">
                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="w-full max-w-md"
                  >
                    <m.h2
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="text-lg font-semibold text-white sm:text-xl"
                    >
                      У вас еще нет программы лояльности
                    </m.h2>
                    <m.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="text-muted-foreground mt-4 mb-8 text-sm md:text-base"
                    >
                      Создайте программу лояльности, чтобы привлекать и удерживать клиентов. Настройте систему наград и
                      бонусов для ваших покупателей.
                    </m.p>
                    <m.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    >
                      <Button
                        onClick={() => setIsModalOpen(true)}
                        size="lg"
                        className="bg-primary hover:bg-primary/90 relative overflow-hidden transition-all duration-300 hover:scale-105"
                      >
                        <span className="relative z-10 text-sm md:text-base">Создать программу лояльности</span>
                        <div className="from-primary/80 to-primary absolute inset-0 -z-10 bg-gradient-to-r opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
                      </Button>
                    </m.div>
                  </m.div>
                </div>
              ) : (
                <div className="bg-card/50 rounded-2xl p-3 backdrop-blur-sm sm:p-6">
                  <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                    <h2 className="text-lg font-semibold text-white sm:text-xl">Ваша программа лояльности</h2>
                    <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                      <Button
                        variant="outline"
                        className="order-2 flex items-center sm:order-1 md:hidden"
                        onClick={() => setIsInfoExpanded(!isInfoExpanded)}
                      >
                        {isInfoExpanded ? "Скрыть информацию" : "Показать информацию"}
                      </Button>
                      <Button
                        variant="outline"
                        className="order-1 flex items-center sm:order-2"
                        onClick={() => {
                          setIsModalOpen(true);
                        }}
                      >
                        Редактировать
                      </Button>
                    </div>
                  </div>
                  <AnimatePresence>
                    {(isInfoExpanded && window.innerWidth <= 768) || window.innerWidth > 768 ? (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 flex flex-col gap-4 overflow-hidden sm:mt-6 md:flex-row md:gap-10"
                      >
                        <div className="space-y-2">
                          <p className="text-muted-foreground text-sm">Название</p>
                          <p className="text-white">{coinProgram.name}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-muted-foreground text-sm">Описание</p>
                          <p className="text-white">
                            {coinProgram.description.length > 20
                              ? coinProgram.description.slice(0, 20) + "..."
                              : coinProgram.description}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-muted-foreground mb-1 text-sm">Цвет карты</p>
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full" style={{ backgroundColor: coinProgram.card_color }} />
                            <p className="text-white">{coinProgram.card_color}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-muted-foreground text-sm">Дневной лимит по активациям</p>
                          <p className="text-white">{coinProgram.day_limit}</p>
                        </div>
                      </m.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              )}

              {coinProgram && (
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-card/50 mt-4 rounded-2xl p-3 backdrop-blur-sm sm:mt-6 sm:p-6"
                >
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <m.h2
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="text-lg font-semibold text-white sm:text-xl"
                    >
                      Награды
                    </m.h2>
                    <Button
                      onClick={() => setRewardModalOpen(true)}
                      className="transition-transform duration-300 hover:scale-105"
                    >
                      Добавить награду
                    </Button>
                  </div>
                  <div className="mt-4 sm:mt-6">
                    {rewards && rewards.length > 0 ? (
                      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
                        {rewards.map((reward) => (
                          <m.div
                            key={reward.id}
                            onClick={() => handleRewardClick(reward)}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="bg-card/30 group hover:bg-card/50 relative cursor-pointer overflow-hidden rounded-xl border border-white/5 p-4 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-101 hover:shadow-xl"
                          >
                            <div className="from-primary/10 absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100" />
                            <div className="relative flex flex-col gap-4">
                              <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                  <h3 className="group-hover:from-primary group-hover:to-primary/70 bg-gradient-to-r from-white to-white/70 bg-clip-text text-lg font-semibold text-transparent transition-colors duration-300">
                                    {reward.name}
                                  </h3>
                                  <p className="text-muted-foreground line-clamp-2 text-sm">{reward.description}</p>
                                </div>
                              </div>

                              <m.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="relative aspect-[16/9] w-full overflow-hidden rounded-lg"
                              >
                                <ImageWithSpinner
                                  src={reward.image_url}
                                  alt={reward.name}
                                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-102"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                              </m.div>

                              <div className="flex items-center justify-between">
                                <m.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 }}
                                  className="bg-primary/10 text-primary group-hover:bg-primary/20 text-light inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium transition-colors duration-300"
                                >
                                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  Стоимость: {reward.cost}
                                </m.div>
                              </div>
                            </div>
                          </m.div>
                        ))}
                      </div>
                    ) : (
                      <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                      >
                        <div className="bg-primary/10 rounded-full p-4">
                          <svg className="text-primary h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4M12 20V4" />
                          </svg>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium text-white">Нет доступных наград</h3>
                          <p className="text-muted-foreground text-sm">Добавьте первую награду для ваших клиентов</p>
                        </div>
                      </m.div>
                    )}
                  </div>
                </m.div>
              )}
            </m.div>
          </div>
        </div>
      </div>

      {coinProgram ? (
        <EditProgramModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} coinProgram={coinProgram} />
      ) : (
        <CreateProgramModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          form={addCoinProgramForm}
          onSubmit={handleCreateSubmit}
        />
      )}

      <m.div
        initial={{ opacity: 0 }}
        animate={rewardModalOpen ? { opacity: 1 } : { opacity: 0 }}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
          rewardModalOpen ? "" : "pointer-events-none"
        }`}
      >
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => {
            rewardForm.reset();
            rewardForm.clearErrors();
            setRewardModalOpen(false);
          }}
        />
        <m.div
          initial={{ scale: 0.95 }}
          animate={rewardModalOpen ? { scale: 1 } : { scale: 0.95 }}
          className="relative mx-3 w-full max-w-lg rounded-2xl bg-[#2B2B2B] p-4 sm:mx-0 sm:p-6"
        >
          <h2 className="mb-4 text-lg font-semibold text-white sm:mb-6 sm:text-xl">Добавить награду</h2>
          <form onSubmit={rewardForm.handleSubmit(handleRewardSubmit)} className="space-y-4">
            <TInput
              label="Название"
              {...rewardForm.register("name")}
              error={rewardForm.formState.errors.name?.message}
            />
            <TTextArea
              label="Описание"
              {...rewardForm.register("description")}
              error={rewardForm.formState.errors.description?.message}
            />
            <TInput
              label="Стоимость (в баллах лояльности)"
              type="number"
              {...rewardForm.register("cost", { valueAsNumber: true })}
              error={rewardForm.formState.errors.cost?.message}
              isUppedLabel={true}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Изображение награды</label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/bmp,image/tiff,image/webp,image/heic"
                className="border-input hover:bg-primary/40 w-full rounded-md border bg-transparent px-3 py-2 text-sm text-white shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    rewardForm.setValue("image_url", "pending_upload");
                  }
                }}
              />
              {rewardForm.formState.errors.image_url && (
                <p className="text-destructive text-sm">{rewardForm.formState.errors.image_url.message}</p>
              )}
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  rewardForm.reset();
                  rewardForm.clearErrors();
                  setRewardModalOpen(false);
                }}
              >
                Отмена
              </Button>
              {isLoadingReward ? (
                <Button type="submit" disabled>
                  Добавление...
                </Button>
              ) : (
                <Button type="submit">Добавить</Button>
              )}
            </div>
          </form>
        </m.div>
      </m.div>

      <ConfirmDeleteModal
        isOpen={confirmDeleteModalOpen}
        onClose={() => setConfirmDeleteModalOpen(false)}
        onConfirm={() => {
          if (rewardToDelete) {
            handleDeleteReward(rewardToDelete);
          }
        }}
        isLoadingReward={isLoadingReward}
      />

      <RewardInfoModal
        isOpen={rewardInfoModalOpen}
        onClose={() => {
          setRewardInfoModalOpen(false);
          setTimeout(() => setSelectedReward(null), 300);
        }}
        reward={selectedReward}
        onDelete={(id) => {
          setRewardToDelete(id);
          setConfirmDeleteModalOpen(true);
          setRewardInfoModalOpen(false);
        }}
      />
    </m.div>
  );
}

// Модальное окно создания программы
const CreateProgramModal = ({
  isOpen,
  onClose,
  form,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  form: ReturnType<typeof useForm<CoinProgramFormData>>;
  onSubmit: (values: CoinProgramFormData) => Promise<void>;
}) => {
  // Создаём локальный state для хранения начальных значений формы
  const [initialValues, setInitialValues] = useState<CoinProgramFormData | null>(null);

  // При открытии модального окна сохраняем начальные значения формы
  useEffect(() => {
    if (isOpen && !initialValues) {
      setInitialValues({
        name: form.getValues("name"),
        description: form.getValues("description"),
        day_limit: form.getValues("day_limit"),
        card_color: form.getValues("card_color"),
      });
    }
  }, [isOpen, form, initialValues]);

  // Обработка закрытия модального окна
  const handleClose = () => {
    // После закрытия сбрасываем сохраненные начальные значения
    setInitialValues(null);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      // Блокируем скролл
      document.body.style.overflow = "hidden";
    } else {
      // Возвращаем скролл
      document.body.style.overflow = "";
    }

    // Очистка при размонтировании
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isOpen ? "" : "pointer-events-none"}`}
    >
      <div className="fixed inset-0 bg-black/50" onClick={handleClose} />
      <m.div
        initial={{ scale: 0.95 }}
        animate={isOpen ? { scale: 1 } : { scale: 0.95 }}
        className="relative w-full max-w-lg rounded-2xl bg-[#2B2B2B] px-3 py-6 md:p-6"
      >
        <h2 className="mb-6 text-xl font-semibold text-white">Создать программу</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <TInput label="Название" {...form.register("name")} error={form.formState.errors.name?.message} />
          <TTextArea
            label="Описание"
            {...form.register("description")}
            error={form.formState.errors.description?.message}
          />
          <TInput
            label="Дневной лимит по активациям"
            type="number"
            {...form.register("day_limit", { valueAsNumber: true })}
            error={form.formState.errors.day_limit?.message}
            isUppedLabel={true}
            tooltip="(для каждой отдельной награды)"
          />
          <TInput
            label="Цвет карты"
            type="color"
            {...form.register("card_color")}
            error={form.formState.errors.card_color?.message}
            isUppedLabel={true}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={handleClose}>
              Отмена
            </Button>
            <Button type="submit">Создать</Button>
          </div>
        </form>
      </m.div>
    </m.div>
  );
};

// Типы для модальных окон программы лояльности
type EditProgramModalProps = {
  isOpen: boolean;
  onClose: () => void;
  coinProgram: Omit<IBusinessCoinProgram, "id">;
};

// Модальное окно редактирования программы
const EditProgramModal = ({ isOpen, onClose, coinProgram }: EditProgramModalProps) => {
  // Получаем форму и обработчик из контекста
  const updateCoinProgramForm = useForm<CoinProgramFormData>({
    resolver: zodResolver(coinProgramSchema),
    defaultValues: coinProgram
      ? {
          name: coinProgram.name,
          description: coinProgram.description,
          day_limit: coinProgram.day_limit,
          card_color: coinProgram.card_color,
        }
      : {
          name: "",
          description: "",
          day_limit: 0,
          card_color: "#000000",
        },
  });

  const { updateBusinessCoinProgramMutation } = useUpdateBusinessCoinProgram();

  const handleUpdateSubmit = async (values: CoinProgramFormData) => {
    updateCoinProgramForm.setValue("name", values.name.trim());
    updateCoinProgramForm.setValue("description", values.description.trim());
    updateCoinProgramForm.trigger();
    if (!updateCoinProgramForm.formState.isValid) {
      return;
    }
    try {
      if (!coinProgram) return;

      const formattedValues: Omit<IBusinessCoinProgram, "id"> = {
        ...values,
        day_limit: Number(values.day_limit),
      };

      await updateBusinessCoinProgramMutation.mutateAsync(formattedValues);
      toast.success("Программа лояльности обновлена", {
        action: {
          label: "Закрыть",
          onClick: () => toast.dismiss(),
        },
      });
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Произошла ошибка при сохранении", {
        action: {
          label: "Закрыть",
          onClick: () => toast.dismiss(),
        },
      });
    }
  };

  // При открытии и закрытии модального окна управляем прокруткой страницы
  useEffect(() => {
    if (isOpen) {
      // Запрещаем прокрутку на body при открытии модального окна
      document.body.style.overflow = "hidden";
    } else {
      // Возвращаем прокрутку body при закрытии модального окна
      document.body.style.overflow = "";
    }

    // Очистка при размонтировании
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isOpen ? "" : "pointer-events-none"}`}
    >
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <m.div
        initial={{ scale: 0.95 }}
        animate={isOpen ? { scale: 1 } : { scale: 0.95 }}
        className="relative w-full max-w-lg rounded-2xl bg-[#2B2B2B] px-3 py-6 md:p-6"
      >
        <h2 className="mb-6 text-xl font-semibold text-white">Редактировать программу</h2>
        <FormProvider {...updateCoinProgramForm}>
          <form onSubmit={updateCoinProgramForm.handleSubmit(handleUpdateSubmit)} className="space-y-4">
            <TInput
              label="Название"
              {...updateCoinProgramForm.register("name")}
              error={updateCoinProgramForm.formState.errors.name?.message}
              isUppedLabel={true}
            />
            <TTextArea
              label="Описание"
              {...updateCoinProgramForm.register("description")}
              error={updateCoinProgramForm.formState.errors.description?.message}
              isUppedLabel={true}
            />
            <TInput
              label="Дневной лимит по активациям"
              type="number"
              {...updateCoinProgramForm.register("day_limit", { valueAsNumber: true })}
              error={updateCoinProgramForm.formState.errors.day_limit?.message}
              isUppedLabel={true}
              tooltip="(для каждой отдельной награды)"
            />
            <TInput
              label="Цвет карты"
              type="color"
              {...updateCoinProgramForm.register("card_color")}
              error={updateCoinProgramForm.formState.errors.card_color?.message}
              isUppedLabel={true}
            />
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={onClose}>
                Отмена
              </Button>
              <Button type="submit">Сохранить</Button>
            </div>
          </form>
        </FormProvider>
      </m.div>
    </m.div>
  );
};

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoadingReward,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoadingReward: boolean;
}) => {
  useEffect(() => {
    if (isOpen) {
      // Блокируем скролл
      document.body.style.overflow = "hidden";
    } else {
      // Возвращаем скролл
      document.body.style.overflow = "";
    }

    // Очистка при размонтировании
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isOpen ? "" : "pointer-events-none"}`}
    >
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <m.div
        initial={{ scale: 0.95 }}
        animate={isOpen ? { scale: 1 } : { scale: 0.95 }}
        className="relative w-full max-w-md rounded-2xl bg-[#2B2B2B] p-6"
      >
        <h2 className="mb-4 text-lg font-semibold text-white">Подтверждение удаления</h2>
        <p className="text-muted-foreground">Вы уверены, что хотите удалить эту награду?</p>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          {isLoadingReward ? (
            <Button type="submit" disabled>
              Удаление...
            </Button>
          ) : (
            <Button onClick={onConfirm}>Удалить</Button>
          )}
        </div>
      </m.div>
    </m.div>
  );
};

const RewardInfoModal = ({
  isOpen,
  onClose,
  reward,
  onDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  reward: IReward | null;
  onDelete: (id: string) => void;
}) => {
  const [modalKey, setModalKey] = useState(Date.now());

  useEffect(() => {
    if (isOpen) {
      setModalKey(Date.now());
      // Блокируем скролл
      document.body.style.overflow = "hidden";
    } else {
      // Возвращаем скролл
      document.body.style.overflow = "";
    }

    // Очистка при размонтировании
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
      className={`fixed inset-0 z-40 flex items-center justify-center p-4 ${isOpen ? "" : "pointer-events-none"}`}
    >
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <m.div
        initial={{ scale: 0.95 }}
        animate={isOpen ? { scale: 1 } : { scale: 0.95 }}
        className="relative w-full max-w-lg rounded-2xl bg-[#2B2B2B] p-4 sm:p-6"
      >
        {reward && (
          <div key={`${reward.id}-${modalKey}`}>
            <div className="mb-2 flex items-start justify-between">
              <h2 className="text-lg font-semibold text-white">{reward.name}</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(reward.id)}
                className="text-primary hover:text-primary"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-muted-foreground mb-4">{reward.description}</p>
            <div className="relative w-full overflow-hidden rounded-lg">
              <ImageWithSpinner
                key={`${reward.id}-${modalKey}`}
                src={reward.image_url}
                alt={reward.name}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        )}
        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </m.div>
    </m.div>
  );
};
