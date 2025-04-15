import { $api } from "@/shared/http/api-clients";

interface IQrResponse {
  data: string;
}

export default class UserQrService {
  static async getQr(): Promise<IQrResponse> {
    const response = await $api<IQrResponse>("/user/qr");
    return response.data;
  }
}
