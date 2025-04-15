import { $api } from "@/shared/http/api-clients";
import { IBusinessCoinProgram } from "@/shared/models/IBusinessCoinProgram";

export default class BusinessCoinProgramService {
  static async createCoinProgram(data: Omit<IBusinessCoinProgram, "id">): Promise<IBusinessCoinProgram> {
    data.day_limit = parseInt(data.day_limit.toString());
    const response = await $api.post("/business/coin_program", data);
    return response.data
  }

  static async getCoinProgram(): Promise<{ data: Omit<IBusinessCoinProgram, "id"> | null; error: any }> {
    try {
      const response = await $api.get("/business/coin_program");
      return { data: response.data, error: null}
    } catch (error) {
      return { data: null, error: error}
    }
  }

  static async updateCoinProgram(data: Omit<IBusinessCoinProgram, "id">): Promise<IBusinessCoinProgram> {
    const response = await $api.put(`/business/coin_program`, data);
    return response.data;
  }
}
