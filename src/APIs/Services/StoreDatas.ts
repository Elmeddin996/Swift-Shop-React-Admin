import { HttpClient } from "../HTTPClients";

export class StoreDataService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api`);
  }
  async getSiteDatas() {
    return await this.get("StoreDatas/Get");
  }

  async editStoreData(body: FormData) {
    return await this.put("StoreDatas/Edit", body);
  }
}
