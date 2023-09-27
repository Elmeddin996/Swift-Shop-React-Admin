import { ILogin } from "../../models";
import { HttpClient } from "../HTTPClients";

export class AccountService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api/Auth`);
  }
  async login(body: ILogin) {
    console.log(body);
    return await this.post(`loginadmin`, body).then(({ data }) =>{
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUserId", data.userId);
    });
  }

  async logout() {
   const token=localStorage.getItem("adminToken")
    return await this.get(`Logout`,{headers: {
      Authorization: `Bearer  ${token}`
    }}).then(()=>{
      localStorage.removeItem("adminToken")
      localStorage.removeItem("adminUserId")
    })
  }

  async users(){
   const token=localStorage.getItem("adminToken")
    return await this.get(`AllUsers`,{headers: {
      Authorization: `Bearer  ${token}`
    }})
  }
}