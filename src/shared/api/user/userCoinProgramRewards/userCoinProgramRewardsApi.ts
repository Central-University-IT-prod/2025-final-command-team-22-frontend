import { queryOptions } from "@tanstack/react-query";
import UserCoinProgramRewardsService, { UserCoinProgramRewardsRequestDTO } from "./userCoinProgramRewardsService";

export const userCoinProgramRewardsOptions = (data: UserCoinProgramRewardsRequestDTO) => {
  return queryOptions({
    queryKey: ["userCoinProgramRewards", data.coinProgramParticipantId, data.limit, data.offset],
    queryFn: () => UserCoinProgramRewardsService.getUserCoinProgramRewards(data),
  });
};
