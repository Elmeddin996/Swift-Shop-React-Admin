import { HttpClient } from "../HTTPClients";

export class OrderService extends HttpClient {
  constructor() {
    super(`http://elmeddin96-001-site1.htempurl.com/api`);
  }

  async getOrderList() {
    return await this.get("Orders/All");
  }

  async editOrder(body: Object) {
    return await this.put(`Orders/Edit`, body);
  }

  async deleteOrder(id:number){
    return await this.delete(`Orders`, id);
  }
}
