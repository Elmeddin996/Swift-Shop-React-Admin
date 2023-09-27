import { HttpClient } from "../HTTPClients";

export class BrandService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api`);
  }

  async getBrandList(){
    const token=localStorage.getItem("adminToken")
    return await this.get('Brands/all',{headers: {
      Authorization: `Bearer  ${token}`
    }})
  }

}