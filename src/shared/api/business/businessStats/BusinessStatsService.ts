import { $api } from "@/shared/http/api-clients";

export interface IPeriod {
  start_date: string;
  end_date: string;
}

export interface IGeneralStatsResponseDTO {
  active_users: number;
  new_users: number;
  total_users: number;
}

export interface IDailyTotalUsersResponseDTO {
  date: string;
  total_users: number;
}

export interface IDailyActiveUsersResponseDTO {
  date: string;
  active_users: number;
}

export interface ICoinProgramResponseDTO {
  coupons_purchased_in_period: number;
  points_received_in_period: number;
  total_coupons_purchased: number;
  total_points_received: number;
}

export default class BusinessStatsService {
  static async getGeneralStats({ start_date, end_date }: IPeriod): Promise<IGeneralStatsResponseDTO> {
    const response = await $api.get<IGeneralStatsResponseDTO>(`/business/stats/general`, {
      params: { start_date, end_date },
    });
    return response.data;
  }

  static async getDailyTotalUsersStats({ start_date, end_date }: IPeriod): Promise<IDailyTotalUsersResponseDTO[]> {
    const response = await $api.get<IDailyTotalUsersResponseDTO[]>(`/business/stats/daily/total_users`, {
      params: { start_date, end_date },
    });
    return response.data;
  }

  static async getDailyActiveUsersStats({ start_date, end_date }: IPeriod): Promise<IDailyActiveUsersResponseDTO[]> {
    const response = await $api.get<IDailyActiveUsersResponseDTO[]>(`/business/stats/daily/active_users`, {
      params: { start_date, end_date },
    });
    return response.data;
  }

  static async getCoinProgramStats({ start_date, end_date }: IPeriod): Promise<ICoinProgramResponseDTO> {
    const response = await $api.get<ICoinProgramResponseDTO>(`/business/stats/coin_program`, {
      params: { start_date, end_date },
    });
    return response.data;
  }
}
