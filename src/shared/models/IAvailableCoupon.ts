import { IReward } from "@/shared/models/IReward";
import { IBusinessCoinProgram } from "@/shared/models/IBusinessCoinProgram";

export interface IAvailableCoupon {
  coin_program: Omit<IBusinessCoinProgram, "day_limit"> & {
    balance: number;
  };
  rewards: IReward[];
}
