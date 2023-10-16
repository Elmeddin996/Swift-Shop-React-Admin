import { HttpClient } from "../HTTPClients";

export class ProductService extends HttpClient {
  constructor() {
    super(`http://elmeddin96-001-site1.htempurl.com/api`);
  }

  async getProductList() {
    return await this.get("Products/all");
  }

  async getProduct(id:string){
   return await this.getById("Products/GetAdmin", id);
  }

  async createProduct(body: FormData) {
    return await this.postWithToken("Products", body);
  }

  async editProduct(body: FormData) {
    return await this.put("Products/Edit", body);
  }

  async deleteProduct(id: number) {
    return await this.delete("Products", id);
  }

}
