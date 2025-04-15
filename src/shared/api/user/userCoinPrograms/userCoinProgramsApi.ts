import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import UserCoinProgramsService, {
  BuyUserProgramRewardRequestDTO,
  UserCoinProgramRequestDTO,
} from "./UserCoinProgramsService";

export const userCoinProgramsOptions = (data: UserCoinProgramRequestDTO) => {
  return queryOptions({
    queryKey: ["userCoinPrograms", data.limit, data.offset],
    queryFn: () => UserCoinProgramsService.getUserCoinPrograms(data),
  });
};

export const useUserCoinPrograms = () => {
  const queryClient = useQueryClient();

  const buyUserProgramRewardMutation = useMutation({
    mutationFn: (data: BuyUserProgramRewardRequestDTO) => UserCoinProgramsService.buyUserProgramReward(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userCoinPrograms"] });
      queryClient.invalidateQueries({ queryKey: ["userCoinProgramAvailableRewards"] });
      queryClient.invalidateQueries({ queryKey: ["userCoinProgramRewards"] });
      queryClient.invalidateQueries({ queryKey: ["userQr"] });
      queryClient.invalidateQueries({ queryKey: ["userAuth"] });
    },
  });

  return {
    buyUserProgramRewardMutation,
  };
};
