import { $api } from "@/shared/http/api-clients";
import { IReward } from "@/shared/models/IReward";

export interface IRewardsListRequest {
  limit: number;
  offset: number;
}

export default class BusinessCoinProgramRewardsService {
  static async getRewardsList(data: IRewardsListRequest): Promise<IReward[]> {
    const response = await $api.get(`/business/coin_program/rewards`, { params: data });
    return response.data;
  }

  static async createReward(data: Omit<IReward, "id">): Promise<IReward> {
    const response = await $api.post(`/business/coin_program/rewards`, data);
    return response.data;
  }

  static async deleteReward(id: string): Promise<number> {
    const response = await $api.delete(`/business/coin_program/rewards/${id}`);
    return response.status;
  }

  static async activateCouponCode(qrData: string): Promise<IReward> {
    const response = await $api.post(`/business/coin_program/rewards/activate`, { code: qrData });
    return response.data;
  }
}
