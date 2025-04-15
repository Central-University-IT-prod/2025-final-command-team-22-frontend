import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import BusinessScanService from "./BusinessScanService";

export const businessScanOptions = (qrData: string) => {
  return queryOptions({
    queryKey: ["businessScan", qrData],
    queryFn: () => BusinessScanService.businessScanQr(qrData),
  });
};

export const useUpdateBusinessScan = () => {
  const queryClient = useQueryClient();

  const businessScanEnrollMutation = useMutation({
    mutationFn: (qrData: string) => BusinessScanService.businessScanEnroll(qrData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businessScan"] });
    },
  });

  const businessScanRewardMutation = useMutation({
    mutationFn: (qrData: string) => BusinessScanService.businessScanReward(qrData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businessScan"] });
    },
  });

  return {
    businessScanEnrollMutation,
    businessScanRewardMutation
  };
};
