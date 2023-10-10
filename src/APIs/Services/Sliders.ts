import { HttpClient } from "../HTTPClients";

export class SliderService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api`);
  }

  async getSliders (){
    return await this.get("Sliders/all");
  }

  async getSlider(id:string){
   return await this.getById("Sliders", id);
  }

  async createSlider(body: FormData) {
    return await this.postWithToken("Sliders", body);
  }

  async editSlider(body: FormData) {
    return await this.put("Sliders/Edit", body);
  }

  async deleteSlider(id: number) {
    return await this.delete("Sliders", id);
  }

}
