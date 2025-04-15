import { IReward } from '@/shared/models/IReward';

interface IRewardCardProps extends Omit<IReward, "description"> {
  has: number;
  need: number;
  description?: string;
  couponId?: string;
  className?: string;
}

export function RewardCard({ has, need, description, className, ...props }: IRewardCardProps) {
  // ...
} 