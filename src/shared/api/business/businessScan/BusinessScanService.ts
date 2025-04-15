import { $api } from "@/shared/http/api-clients";

export default class BusinessScanService {
  static async businessScanQr(qrData: string): Promise<number> {
    const response = await $api.get(`/business/coin_program/scan/${qrData}`);
    return response.data;
  }

  static async businessScanEnroll(qrData: string): Promise<number> {
    const response = await $api.post(`/business/coin_program/scan/enroll`, { code: qrData });
    return response.status;
  }
  static async businessScanReward(qrData: string): Promise<number> {
    const response = await $api.post(`/business/coin_program/reward/activate`, { code: qrData });
    return response.status;
  }
}
