import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { businessAuthOptions } from "@/shared/api/business/businessAuth/businessAuthApi";
import {
  businessGeneralStatsOptions,
  businessDailyTotalUsersStatsOptions,
  businessCoinProgramStatsOptions,
} from "@/shared/api/business/businessStats/BusinessStatsApi";
import * as m from "motion/react-m";
import { Users, Ticket, Coins } from "lucide-react";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/shared/components/ui/date-range-picker";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const cardContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

export const Route = createFileRoute("/business/_businessLayout/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const businessQuery = businessAuthOptions();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });

  const period = useMemo(() => {
    const start = date?.from || new Date(new Date().setMonth(new Date().getMonth() - 1));
    const end = date?.to || new Date();

    return {
      start_date: start.toISOString(),
      end_date: end.toISOString(),
    };
  }, [date]);

  const { data: generalStats } = useQuery(businessGeneralStatsOptions(period));
  const { data: dailyTotalUsers } = useQuery(businessDailyTotalUsersStatsOptions(period));
  const { data: coinProgramStats } = useQuery(businessCoinProgramStatsOptions(period));

  const { isLoading, error } = useQuery(businessQuery);

  const chartData = useMemo(() => {
    if (!dailyTotalUsers || dailyTotalUsers.length === 0) return [];

    return dailyTotalUsers.map((item) => ({
      month: new Date(item.date).toLocaleString("ru", { day: "numeric", month: "numeric" }),
      clients: item.total_users,
      activeClients: Math.round(
        (item.total_users * (generalStats?.active_users ?? 0)) / (generalStats?.total_users ?? 1)
      ),
    }));
  }, [dailyTotalUsers, generalStats]);

  const totalGrowth = useMemo(() => {
    if (!dailyTotalUsers || dailyTotalUsers.length < 2) return 0;

    const oldestValue = dailyTotalUsers[0].total_users;
    const latestValue = dailyTotalUsers[dailyTotalUsers.length - 1].total_users;

    if (oldestValue === 0) return 100;
    return (((latestValue - oldestValue) / oldestValue) * 100).toFixed(1);
  }, [dailyTotalUsers]);

  const activeGrowth = useMemo(() => {
    if (!dailyTotalUsers || dailyTotalUsers.length < 2 || !generalStats) return 0;

    const oldestValue = Math.round(
      (dailyTotalUsers[0].total_users * generalStats.active_users) / generalStats.total_users
    );
    const latestValue = Math.round(
      (dailyTotalUsers[dailyTotalUsers.length - 1].total_users * generalStats.active_users) / generalStats.total_users
    );

    if (oldestValue === 0) return 100;
    return (((latestValue - oldestValue) / oldestValue) * 100).toFixed(1);
  }, [dailyTotalUsers, generalStats]);

  const chartConfig = {
    clients: {
      label: "Клиенты",
      color: "var(--chart-1)",
    },
    activeClients: {
      label: "Активные клиенты",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <m.div
      className="bg-background text-foreground flex min-h-screen w-full justify-center"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <div className="flex w-full max-w-7xl flex-col gap-6 px-4 py-8">
        <m.div className="flex flex-col gap-2" variants={item}>
          {isLoading ? (
            <div className="animate-pulse">
              <div className="bg-muted mb-2 h-8 w-64 rounded"></div>
              <div className="bg-muted h-6 w-48 rounded"></div>
            </div>
          ) : error ? (
            <div className="text-red-500">
              <h1 className="text-2xl font-bold">Ошибка загрузки данных</h1>
              <h2 className="text-xl">Пожалуйста, проверьте подключение или войдите снова</h2>
            </div>
          ) : (
            <m.div variants={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl md:text-4xl">
                  Статистика и аналитика
                </h1>
                <p className="text-muted-foreground max-w-xl text-sm sm:mt-2 sm:text-base">
                  Основные показатели эффективности
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <DateRangePicker value={date} onChange={setDate} />
              </div>
            </m.div>
          )}
        </m.div>

        <m.div className="grid grid-cols-1 gap-6" variants={item}>
          <m.div
            variants={item}
            className="bg-card/50 border-border relative overflow-hidden rounded-xl border p-4 backdrop-blur-sm sm:p-6"
          >
            <div className="relative mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="mb-1 text-sm font-medium tracking-wider text-white sm:text-base">Общая статистика</h2>
                <p className="text-muted-foreground text-xs sm:text-sm">Прирост за выбранный период</p>
              </div>
            </div>

            <m.div className="relative grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2" variants={cardContainer}>
              <m.div
                variants={cardItem}
                whileHover={{ scale: 1.01, transition: { duration: 0.15 } }}
                className="relative rounded-lg bg-[#333333] p-3 transition-all hover:bg-[#333333]/80 sm:p-4"
              >
                <div className="mb-2 flex items-center gap-3 sm:mb-3">
                  <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg sm:h-10 sm:w-10">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className="text-muted-foreground text-xs sm:text-sm">Всего клиентов</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold sm:text-3xl">{generalStats?.total_users ?? 0}</span>
                  <span className="text-chart-5 text-xs font-medium sm:text-sm">
                    +{generalStats?.new_users ?? 0} (
                    {generalStats &&
                      (generalStats.total_users == generalStats.new_users
                        ? 100
                        : (generalStats.new_users / Math.max(generalStats.total_users - generalStats.new_users)) * 100
                      ).toFixed(1)}
                    %) <span className="text-muted-foreground font-light">за выбранный период</span>
                  </span>
                </div>
              </m.div>

              <m.div
                variants={cardItem}
                whileHover={{ scale: 1.01, transition: { duration: 0.15 } }}
                className="relative rounded-lg bg-[#333333] p-3 transition-all hover:bg-[#333333]/80 sm:p-4"
              >
                <div className="mb-2 flex items-center gap-3 sm:mb-3">
                  <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg sm:h-10 sm:w-10">
                    <Ticket className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className="text-muted-foreground text-xs sm:text-sm">Выдано наград</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold sm:text-3xl">
                    {coinProgramStats?.total_coupons_purchased ?? 0}
                  </span>
                  <span className="text-chart-5 text-xs font-medium sm:text-sm">
                    +{coinProgramStats?.coupons_purchased_in_period ?? 0} (
                    {coinProgramStats &&
                      (coinProgramStats.total_coupons_purchased == coinProgramStats.coupons_purchased_in_period
                        ? 100
                        : (coinProgramStats.coupons_purchased_in_period /
                            (coinProgramStats.total_coupons_purchased - coinProgramStats.coupons_purchased_in_period)) *
                          100
                      ).toFixed(1)}
                    %) <span className="text-muted-foreground font-light">за выбранный период</span>
                  </span>
                </div>
              </m.div>

              <m.div
                variants={cardItem}
                whileHover={{ scale: 1.01, transition: { duration: 0.15 } }}
                className="relative rounded-lg bg-[#333333] p-3 transition-all hover:bg-[#333333]/80 sm:p-4"
              >
                <div className="mb-2 flex items-center gap-3 sm:mb-3">
                  <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg sm:h-10 sm:w-10">
                    <Users className="h-4 w-4 fill-current sm:h-5 sm:w-5" />
                  </div>
                  <span className="text-muted-foreground text-xs sm:text-sm">Активные клиенты</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold sm:text-3xl">{generalStats?.active_users ?? 0}</span>
                  <span className="text-chart-5 text-xs font-medium sm:text-sm">
                    +{generalStats?.active_users ?? 0} (
                    {generalStats &&
                      (generalStats.active_users == generalStats.total_users
                        ? 100
                        : (generalStats.active_users / Math.max(generalStats.total_users - generalStats.active_users)) *
                          100
                      ).toFixed(1)}
                    %) <span className="text-muted-foreground font-light">за выбранный период</span>
                  </span>
                </div>
              </m.div>

              <m.div
                variants={cardItem}
                whileHover={{ scale: 1.01, transition: { duration: 0.15 } }}
                className="relative rounded-lg bg-[#333333] p-3 transition-all hover:bg-[#333333]/80 sm:p-4"
              >
                <div className="mb-2 flex items-center gap-3 sm:mb-3">
                  <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg sm:h-10 sm:w-10">
                    <Coins className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className="text-muted-foreground text-xs sm:text-sm">Получено баллов</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold sm:text-3xl">{coinProgramStats?.total_points_received ?? 0}</span>
                  <span className="text-chart-5 text-xs font-medium sm:text-sm">
                    +{coinProgramStats?.points_received_in_period ?? 0} (
                    {coinProgramStats &&
                      (coinProgramStats.total_points_received == coinProgramStats.points_received_in_period
                        ? 100
                        : (coinProgramStats.points_received_in_period /
                            (coinProgramStats.total_points_received - coinProgramStats.points_received_in_period)) *
                          100
                      ).toFixed(1)}
                    %) <span className="text-muted-foreground font-light">за выбранный период</span>
                  </span>
                </div>
              </m.div>
            </m.div>
          </m.div>

          <m.div
            variants={item}
            className="bg-card/50 border-border relative overflow-hidden rounded-xl border p-4 backdrop-blur-sm sm:p-6"
          >
            <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col">
                <h2 className="mb-1 text-sm font-medium tracking-wider text-white sm:text-base md:text-lg">
                  Динамика по клиентам
                </h2>
                <p className="text-muted-foreground max-w-[340px] text-xs sm:text-sm">
                  Анализ роста количества клиентов за выбранный период
                </p>
              </div>
              <div className="flex flex-col items-start gap-2 sm:items-end">
                <span className="bg-chart-1 rounded-full px-2.5 py-1 text-xs font-medium text-white sm:text-sm">
                  +{totalGrowth}% рост клиентов
                </span>
                <span className="bg-chart-2 rounded-full px-2.5 py-1 text-xs font-medium text-white sm:text-sm">
                  +{activeGrowth}% рост активных клиентов
                </span>
              </div>
            </div>

            <div className="h-60 w-full sm:h-72 md:h-80">
              {chartData.length === 0 ? (
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <p className="text-muted-foreground text-center text-sm">
                    За выбранный период нет данных по клиентам
                  </p>
                </div>
              ) : (
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{
                        top: 10,
                        right: 10,
                        left: -10,
                        bottom: 0,
                      }}
                    >
                      <defs>
                        <linearGradient id="colorClients" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorActiveClients" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        vertical={false}
                        strokeDasharray="3 3"
                        stroke="var(--color-border)"
                        opacity={0.4}
                      />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        stroke="var(--color-muted-foreground)"
                        fontSize={12}
                      />
                      <YAxis
                        dataKey="clients"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        stroke="var(--color-muted-foreground)"
                        fontSize={12}
                        domain={[0, Math.max(...(chartData.map((item) => item.clients) ?? [0]))]}
                        ticks={Array.from({ length: generalStats?.total_users ?? 0 }, (_, i) => i)}
                      />
                      <ChartTooltip
                        cursor={{
                          stroke: "var(--chart-1)",
                          strokeWidth: 1,
                          strokeDasharray: "4 4",
                        }}
                        content={
                          <ChartTooltipContent
                            indicator="line"
                            className="!bg-card/95 !border-border/50 backdrop-blur-sm"
                          />
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="clients"
                        stroke="var(--chart-1)"
                        strokeWidth={2}
                        fill="url(#colorClients)"
                        dot={{
                          stroke: "var(--chart-1)",
                          strokeWidth: 2,
                          fill: "var(--color-background)",
                          r: 4,
                        }}
                        activeDot={{
                          stroke: "var(--chart-1)",
                          strokeWidth: 2,
                          fill: "var(--chart-1)",
                          r: 6,
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="activeClients"
                        stroke="var(--chart-2)"
                        strokeWidth={2}
                        fill="url(#colorActiveClients)"
                        dot={{
                          stroke: "var(--chart-2)",
                          strokeWidth: 2,
                          fill: "var(--color-background)",
                          r: 4,
                        }}
                        activeDot={{
                          stroke: "var(--chart-2)",
                          strokeWidth: 2,
                          fill: "var(--chart-2)",
                          r: 6,
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              )}
            </div>
          </m.div>
        </m.div>
      </div>
    </m.div>
  );
}
