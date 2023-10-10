import { ICategory } from "../../models";
import { HttpClient } from "../HTTPClients";

export class CategoryService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api`);
  }

  async getCategoryList(){
    return await this.get('Categories/all')
  }

  async createCategory(body: Object) {
    return await this.postWithToken("Categories", body);
  }

  async editCategory(body: ICategory) {
    return await this.put(`Categories/Edit`, body);
  }

  async deleteCategory(id: number) {
    return await this.delete(`Categories`, id);
  }
}