import { HttpClient } from "../HTTPClients";

export class OrderService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api`);
  }

  async getOrderList() {
    const token = localStorage.getItem("adminToken");
    return await this.get("Orders/All", {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }

  async editOrder(body: Object) {
    const token = localStorage.getItem("adminToken");
    return await this.put(`Orders/Edit`, body, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }

  async deleteOrder(id:number){
    const token = localStorage.getItem("adminToken");
    return await this.delete(`Orders`, id, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }
}
