import { $api } from "@/shared/http/api-clients";

export interface BusinessRequestDTO {
  email: string;
  password: string;
  name: string;
  description: string;
}

export interface BusinessResponseDTO {
  id: string;
  name: string;
  description: string;
  email: string;
}

export default class BusinessAuthService {
  static async login(data: Omit<BusinessRequestDTO, "description" | "name">): Promise<number> {
    const response = await $api.post("/business/auth/login", data);
    return response.status;
  }

  static async register(data: BusinessRequestDTO): Promise<number> {
    const response = await $api.post("/business/auth/register", data);
    return response.status;
  }

  static async getBusiness(): Promise<BusinessResponseDTO> {
    const response = await $api.get("/business/me");
    return response.data;
  }

  static async logout(): Promise<number> {
    const response = await $api.post("/business/auth/logout");
    return response.status;
  }

  static async updateBusiness(data: Omit<BusinessRequestDTO, "email" | "password">): Promise<number> {
    const response = await $api.put("/business", data);
    return response.status;
  }
}
