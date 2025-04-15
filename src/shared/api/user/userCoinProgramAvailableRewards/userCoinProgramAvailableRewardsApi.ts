import { queryOptions } from "@tanstack/react-query";
import UserCoinProgramAvailableRewardsService, {
  UserCoinProgramAvailableRewardsRequestDTO,
} from "./userCoinProgramAvailableRewardsService.ts";

export const userCoinProgramAvailableRewardsOptions = (data: UserCoinProgramAvailableRewardsRequestDTO) => {
  return queryOptions({
    queryKey: ["userCoinProgramAvailableRewards", data.limit, data.offset],
    queryFn: () => UserCoinProgramAvailableRewardsService.getAvailableRewards(data),
  });
};
