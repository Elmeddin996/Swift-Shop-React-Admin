import { HttpClient } from "../HTTPClients";

export class StoreDataService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api`);
  }
  async getSiteDatas() {
    const token = localStorage.getItem("adminToken");
    return await this.get("StoreDatas/Get", {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }
}
