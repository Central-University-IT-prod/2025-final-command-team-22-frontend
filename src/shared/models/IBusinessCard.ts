import { ICoupon } from "./ICoupon";

export interface IBusinessCard {
  businessId: string;
  name: string;
  description: string;
  color: string;
  balance: number;
  coupons?: ICoupon[];
}
