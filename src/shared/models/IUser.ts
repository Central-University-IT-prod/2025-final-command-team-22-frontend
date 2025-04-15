import { IBusinessCard } from "./IBusinessCard";

export interface IUser {
  name: string;
  email: string;
  totalPurchases: number;
  freePurchases: number;
  businessCards: IBusinessCard[];
}
