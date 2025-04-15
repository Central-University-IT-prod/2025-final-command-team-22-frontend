import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { toast } from "sonner";
import { TInput } from "@/shared/components/ui/TInput";
import { TTextArea } from "@/shared/components/ui/TTextArea";
import { z } from "zod";
import { businessAuthOptions, useUpdateBusinessAuth } from "@/shared/api/business/businessAuth/businessAuthApi";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const Route = createFileRoute("/business/_businessLayout/settings")({
  component: BusinessSettingsPage,
});

// Создаем схему валидации с помощью Zod
const businessSchema = z.object({
  name: z
    .string()
    .min(3, "Название компании должно содержать минимум 3 символа")
    .max(100, "Название компании не должно превышать 100 символов"),
  description: z
    .string()
    .min(5, "Описание должно содержать минимум 5 символов")
    .max(150, "Описание не должно превышать 150 символов"),
});

type BusinessFormData = z.infer<typeof businessSchema>;

function BusinessSettingsPage() {
  const { data: businessData } = useQuery(businessAuthOptions());
  const [isLoading, setIsLoading] = useState(false);
  const { updateBusinessMutation } = useUpdateBusinessAuth();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors, isDirty, isValid },
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      name: businessData?.name || "",
      description: businessData?.description || "",
    },
  });

  // Обработчик отправки формы
  const onSubmit = async (data: BusinessFormData) => {
    setValue("name", data.name.trim());
    setValue("description", data.description.trim());
    trigger();
    if (!isValid) {
      return;
    }
    setIsLoading(true);

    try {
      await updateBusinessMutation.mutateAsync(data);

      // Показываем уведомление об успехе
      toast.success("Настройки сохранены", {
        action: {
          label: "Закрыть",
          onClick: () => toast.dismiss(),
        },
      });
    } catch {
      // Показываем уведомление об ошибке
      toast.error("Ошибка при сохранении настроек", {
        action: {
          label: "Закрыть",
          onClick: () => toast.dismiss(),
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Обработчик отмены изменений
  const handleCancel = () => {
    reset({
      name: businessData?.name || "",
      description: businessData?.description || "",
    });
    toast("Изменения отменены", {
      description: "Форма возвращена к исходным значениям",
    });
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-4 sm:py-8">
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold sm:text-3xl">Настройки предприятия</h1>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="bg-card/50 no-scrollbar mb-4 flex w-full overflow-x-auto sm:mb-6">
            <TabsTrigger value="general" className="flex-1">
              Основные
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex-1">
              Уведомления
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex-1">
              Интеграции
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card className="bg-card/50">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-xl sm:text-2xl">Основная информация</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Управляйте основной информацией о вашем предприятии
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <form id="settings-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  <div className="space-y-4">
                    <TInput
                      label="Название компании"
                      {...register("name")}
                      error={errors.name?.message}
                      isUppedLabel={true}
                      className="w-full"
                    />
                    <TTextArea
                      label="Описание"
                      {...register("description")}
                      error={errors.description?.message}
                      isUppedLabel={true}
                      className="min-h-[120px] w-full"
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col-reverse justify-between gap-3 px-4 sm:flex-row sm:gap-0 sm:px-6">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={!isDirty || isLoading}
                  className="w-full sm:w-auto"
                >
                  Отменить
                </Button>
                <Button
                  type="submit"
                  form="settings-form"
                  disabled={!isDirty || isLoading}
                  className="w-full sm:w-auto"
                >
                  {isLoading ? "Сохранение..." : "Сохранить изменения"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="bg-card/50">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-xl sm:text-2xl">Уведомления</CardTitle>
                <CardDescription className="text-sm sm:text-base">Настройте параметры уведомлений</CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <p className="text-muted-foreground text-sm sm:text-base">
                  Настройки уведомлений будут доступны в ближайшем обновлении.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle>Интеграции</CardTitle>
                <CardDescription>Подключите внешние сервисы и системы</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Настройки интеграций будут доступны в ближайшем обновлении.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
