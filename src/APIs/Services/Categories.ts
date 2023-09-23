import { HttpClient } from "../HTTPClients";

export class CategoryService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api/Categories`);
  }

  async getCategoryList(){
    return await this.get('all')
  }

}