import { $api } from "@/shared/http/api-clients";
import { IUserCoinProgram } from "@/shared/models/IUserCoinProgram";

export default class UserCoinProgramService {
  static async getUserCoinProgram(id: string): Promise<IUserCoinProgram> {
    const response = await $api.get<IUserCoinProgram>(`/user/coin_programs/${id}`);
    return response.data;
  }
}
