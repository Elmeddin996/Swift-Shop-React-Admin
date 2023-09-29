import { IBrand } from "../../models";
import { HttpClient } from "../HTTPClients";

export class BrandService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api`);
  }

  async getBrandList() {
    const token = localStorage.getItem("adminToken");
    return await this.get("Brands/all", {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }

  async editBrand(body: IBrand) {
    const token = localStorage.getItem("adminToken");
    return await this.put(`Brands/Edit`, body, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }

  async deleteBrand(id: number) {
    const token = localStorage.getItem("adminToken");
    return await this.delete(`Brands`, id, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }
}
