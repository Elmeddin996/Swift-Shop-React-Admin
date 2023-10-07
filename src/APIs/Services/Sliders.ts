import { HttpClient } from "../HTTPClients";

export class SliderService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api`);
  }

  async getSliders (){
    const token = localStorage.getItem("adminToken");
    return await this.get("Sliders/all", {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }

  async getSlider(id:string){
    const token = localStorage.getItem("adminToken");
   return await this.getById("Sliders", id, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });
  }

  async createSlider(body: FormData) {
    const token = localStorage.getItem("adminToken");
    return await this.postWithToken("Sliders", body, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }

  async editSlider(body: FormData) {
    const token = localStorage.getItem("adminToken");
    return await this.put("Sliders/Edit", body, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }

  // async deleteProduct(id: number) {
  //   const token = localStorage.getItem("adminToken");
  //   return await this.delete("Products", id, {
  //     headers: {
  //       Authorization: `Bearer  ${token}`,
  //     },
  //   });
  // }

}
