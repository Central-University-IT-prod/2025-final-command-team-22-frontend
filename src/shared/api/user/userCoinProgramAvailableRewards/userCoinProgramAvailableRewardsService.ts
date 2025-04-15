import { $api } from "@/shared/http/api-clients";
import { IAvailableCoupon } from "@/shared/models/IAvailableCoupon";

export interface UserCoinProgramAvailableRewardsRequestDTO {
  limit: number;
  offset: number;
}

export default class UserCoinProgramAvailableRewardsService {
  static async getAvailableRewards(data: UserCoinProgramAvailableRewardsRequestDTO): Promise<IAvailableCoupon[]> {
    const response = await $api.get<IAvailableCoupon[]>(`/user/coin_programs/rewards/available`, {
      params: {
        limit: data.limit,
        offset: data.offset,
      },
    });
    return response.data;
  }
}
