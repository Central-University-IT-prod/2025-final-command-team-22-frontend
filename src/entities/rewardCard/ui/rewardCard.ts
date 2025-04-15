import { IReward } from "@/shared/models/IReward";

export interface IRewardCardProps extends Omit<IReward, "description"> {
  has: number;
  description?: string;
  couponId?: string;
  className?: string;
}
