import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import BusinessAuthService, { BusinessRequestDTO } from "./BusinessAuthService";

export const businessAuthOptions = () => {
  return queryOptions({
    queryKey: ["businessAuth"],
    queryFn: () => BusinessAuthService.getBusiness(),
  });
};

export const useUpdateBusinessAuth = () => {
  const queryClient = useQueryClient();

  const registerBusinessMutation = useMutation({
    mutationFn: (data: BusinessRequestDTO) => BusinessAuthService.register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businessAuth"] });
    },
  });

  const loginBusinessMutation = useMutation({
    mutationFn: (data: Omit<BusinessRequestDTO, "description" | "name">) => BusinessAuthService.login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businessAuth"] });
    },
  });

  const logoutBusinessMutation = useMutation({
    mutationFn: () => BusinessAuthService.logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businessAuth"] });
    },
  });

  const updateBusinessMutation = useMutation({
    mutationFn: (data: Omit<BusinessRequestDTO, "email" | "password">) => BusinessAuthService.updateBusiness(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businessAuth"] });
    },
  });

  return {
    registerBusinessMutation,
    loginBusinessMutation,
    logoutBusinessMutation,
    updateBusinessMutation,
  };
};
