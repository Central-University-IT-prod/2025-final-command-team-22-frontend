import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { IRewardsListRequest } from "./businessCoinProgramRewardsService";
import BusinessCoinProgramRewardsService from "./businessCoinProgramRewardsService";
import { IReward } from "@/shared/models/IReward";

export const businessCoinProgramRewardsOptions = (data: IRewardsListRequest) => {
  return queryOptions({
    queryKey: ["businessCoinProgramRewards", data.limit, data.offset],
    queryFn: () => BusinessCoinProgramRewardsService.getRewardsList(data),
  });
};

export const useUpdateBusinessCoinProgramRewards = () => {
  const queryClient = useQueryClient();

  const businessCreateRewardMutation = useMutation({
    mutationFn: (data: Omit<IReward, "id">) => BusinessCoinProgramRewardsService.createReward(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businessCoinProgramRewards"] });
    },
  });

  const businessDeleteRewardMutation = useMutation({
    mutationFn: (id: string) => BusinessCoinProgramRewardsService.deleteReward(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businessCoinProgramRewards"] });
    },
  });

  const businessActivateCouponCodeMutation = useMutation({
    mutationFn: (code: string) => BusinessCoinProgramRewardsService.activateCouponCode(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businessCoinProgramRewards"] });
    },
  });

  return {
    businessCreateRewardMutation,
    businessDeleteRewardMutation,
    businessActivateCouponCodeMutation,
  };
};
