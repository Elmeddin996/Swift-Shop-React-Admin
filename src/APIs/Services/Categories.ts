import { ICategory } from "../../models";
import { HttpClient } from "../HTTPClients";

export class CategoryService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api`);
  }

  async getCategoryList(){
   const token=localStorage.getItem("adminToken")
    return await this.get('Categories/all',{headers: {
      Authorization: `Bearer  ${token}`
    }})
  }

  async createCategory(body: Object) {
    const token = localStorage.getItem("adminToken");
    return await this.postWithToken("Categories", body, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }

  async editCategory(body: ICategory) {
    const token = localStorage.getItem("adminToken");
    return await this.put(`Categories/Edit`, body, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }

  async deleteCategory(id: number) {
    const token = localStorage.getItem("adminToken");
    return await this.delete(`Categories`, id, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }
}