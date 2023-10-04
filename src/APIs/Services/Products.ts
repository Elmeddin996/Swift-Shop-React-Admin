import { HttpClient } from "../HTTPClients";

export class ProductService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api`);
  }

  async getProductList() {
    const token = localStorage.getItem("adminToken");
    return await this.get("Products/all", {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }

  async getProduct(id:string){
    const token = localStorage.getItem("adminToken");
   return await this.getById("Products/GetAdmin", id, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });
  }

  async createProduct(body: FormData) {
    const token = localStorage.getItem("adminToken");
    return await this.postWithToken("Products", body, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }

  async editProduct(body: FormData) {
    const token = localStorage.getItem("adminToken");
    return await this.put("Products/Edit", body, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }

  async deleteProduct(id: number) {
    const token = localStorage.getItem("adminToken");
    return await this.delete("Products", id, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }

}
