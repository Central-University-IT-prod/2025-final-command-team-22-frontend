import { queryOptions } from "@tanstack/react-query";
import UserCoinProgramService from "./UserCoinProgramService";

export const userCoinProgramOptions = (id: string) => {
  return queryOptions({
    queryKey: ["userCoinPrograms", id],
    queryFn: () => UserCoinProgramService.getUserCoinProgram(id),
  });
};
