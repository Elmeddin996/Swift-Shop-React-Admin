import { HttpClient } from "../HTTPClients";

export class ProductService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api/Products`);
  }

  async getProductList(){
   const token=localStorage.getItem("adminToken")
    return await this.get('all',{headers: {
      Authorization: `Bearer  ${token}`
    }})
  }
}