import { $api } from "@/shared/http/api-clients";
import { IUserCoinProgram } from "@/shared/models/IUserCoinProgram";

export type UserCoinProgramResponseDTO = IUserCoinProgram;
export type UserCoinProgramRequestDTO = {
  limit: number;
  offset: number;
};

export interface BuyUserProgramRewardRequestDTO {
  userCoinProgramId: string;
  rewardId: string;
}

export interface IBuyUserProgramRewardResponseDTO {
  code: string;
}

export default class UserCoinProgramsService {
  static async getUserCoinPrograms(data: UserCoinProgramRequestDTO): Promise<UserCoinProgramResponseDTO[]> {
    const response = await $api.get<UserCoinProgramResponseDTO[]>("/user/coin_programs", {
      params: {
        limit: data.limit,
        offset: data.offset,
      },
    });
    return response.data;
  }

  static async buyUserProgramReward(data: BuyUserProgramRewardRequestDTO): Promise<IBuyUserProgramRewardResponseDTO> {
    const response = await $api.post(`/user/coin_programs/${data.userCoinProgramId}/rewards/${data.rewardId}/buy`);
    return response.data;
  }
}
