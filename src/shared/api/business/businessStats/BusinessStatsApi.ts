import { queryOptions } from "@tanstack/react-query";
import BusinessStatsService, { IPeriod } from "./BusinessStatsService";

export const businessGeneralStatsOptions = (data: IPeriod) => {
  return queryOptions({
    queryKey: ["businessGeneralStats", data.start_date, data.end_date],
    queryFn: () => BusinessStatsService.getGeneralStats(data),
  });
};

export const businessDailyTotalUsersStatsOptions = (data: IPeriod) => {
  return queryOptions({
    queryKey: ["businessDailyTotalUsersStats", data.start_date, data.end_date],
    queryFn: () => BusinessStatsService.getDailyTotalUsersStats(data),
  });
};

export const businessDailyActiveUsersStatsOptions = (data: IPeriod) => {
  return queryOptions({
    queryKey: ["businessDailyActiveUsersStats", data.start_date, data.end_date],
    queryFn: () => BusinessStatsService.getDailyActiveUsersStats(data),
  });
};

export const businessCoinProgramStatsOptions = (data: IPeriod) => {
  return queryOptions({
    queryKey: ["businessCoinProgramStats", data.start_date, data.end_date],
    queryFn: () => BusinessStatsService.getCoinProgramStats(data),
  });
};
