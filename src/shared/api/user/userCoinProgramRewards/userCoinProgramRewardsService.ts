import { $api } from "@/shared/http/api-clients";
import { IReward } from "@/shared/models/IReward";

export interface UserCoinProgramRewardsRequestDTO {
  coinProgramParticipantId: string;
  limit: number;
  offset: number;
}

export default class UserCoinProgramRewardsService {
  static async getUserCoinProgramRewards(data: UserCoinProgramRewardsRequestDTO): Promise<IReward[]> {
    const response = await $api.get<IReward[]>(`/user/coin_programs/${data.coinProgramParticipantId}/rewards`, {
      params: {
        limit: data.limit,
        offset: data.offset,
      },
    });
    return response.data;
  }
}
