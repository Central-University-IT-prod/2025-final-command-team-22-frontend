import { queryOptions } from "@tanstack/react-query";
import UserQrService from "./qrService";

export const userQrOptions = () => {
  return queryOptions({
    queryKey: ["userQr"],
    queryFn: UserQrService.getQr,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};
