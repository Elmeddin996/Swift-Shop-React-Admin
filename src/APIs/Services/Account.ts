import { ILogin } from "../../models";
import { HttpClient } from "../HTTPClients";

export class AccountService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api`);
  }
  async login(body: ILogin) {
    return await this.post(`Auth/loginadmin`, body).then(({ data }) => {
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUserId", data.userId);
    });
  }

  async logout() {
    return await this.get(`Auth/Logout`).then(() => {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUserId");
    });
  }

  async users() {
    return await this.get(`Auth/AllUsers`);
  }

  async userData() {
    return await this.get(`Auth/UserData`);
  }

  async deleteUser(email: string) {
    return await this.delete(`Auth`, email);
  }
}
