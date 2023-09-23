import { HttpClient } from "../HTTPClients";

export class ProductService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api/Products`);
  }

  async getProductList(){
    return await this.get('all')
  }
}