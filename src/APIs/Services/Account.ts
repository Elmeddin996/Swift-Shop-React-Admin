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
    const token = localStorage.getItem("adminToken");
    return await this.get(`Auth/Logout`, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    }).then(() => {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUserId");
    });
  }

  async users() {
    const token = localStorage.getItem("adminToken");
    return await this.get(`Auth/AllUsers`, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }

  async userData() {
    const token = localStorage.getItem("adminToken");
    return await this.get(`Auth/UserData`, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }

  async deleteUser(email: string) {
    const token = localStorage.getItem("adminToken");
    return await this.delete(`Auth`, email, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }
}
