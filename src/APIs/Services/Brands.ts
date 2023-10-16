import { IBrand } from "../../models";
import { HttpClient } from "../HTTPClients";

export class BrandService extends HttpClient {
  constructor() {
    super(`http://elmeddin96-001-site1.htempurl.com/api`);
  }

  async getBrandList() {
    return await this.get("Brands/all");
  }

  async getBrandById(id: number | undefined) {
    if (id !== undefined) {
      return await this.getById(`Brands`, id);
    }
  }

  async createBrand(body: Object) {
    return await this.postWithToken("Brands", body);
  }

  async editBrand(body: IBrand) {
    return await this.put(`Brands/Edit`, body);
  }

  async deleteBrand(id: number) {
    return await this.delete(`Brands`, id);
  }
}
