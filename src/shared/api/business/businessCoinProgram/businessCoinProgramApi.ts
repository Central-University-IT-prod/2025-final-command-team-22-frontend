import BusinessCoinProgramService from "./BusinessCoinProgramService";
import { IBusinessCoinProgram } from "@/shared/models/IBusinessCoinProgram";
import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";

export const businessCoinProgramOptions = () => {
  return queryOptions({
    queryKey: ["businessCoinProgram"],
    queryFn: () => BusinessCoinProgramService.getCoinProgram(),
    retry: false,
    select: (data) => data.data,
  });
};

export const useUpdateBusinessCoinProgram = () => {
  const queryClient = useQueryClient();

  const createBusinessCoinProgramMutation = useMutation({
    mutationFn: (data: Omit<IBusinessCoinProgram, "id">) => BusinessCoinProgramService.createCoinProgram(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businessCoinProgram"] });
    },
  });

  const updateBusinessCoinProgramMutation = useMutation({
    mutationFn: (data: Omit<IBusinessCoinProgram, "id">) => BusinessCoinProgramService.updateCoinProgram(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businessCoinProgram"] });
    },
  });

  return {
    createBusinessCoinProgramMutation,
    updateBusinessCoinProgramMutation,
  };
};
