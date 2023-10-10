import axios from "axios";
import { token } from "../utils/helpers";

export class HttpClient {
  baseUrl: string;
  constructor(url: string) {
    this.baseUrl = url;
  }

  async get(endpoint: string) {
    return await axios.get(`${this.baseUrl}/${endpoint}`,  {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }

  async getById(endpoint: string, id: string | number) {
    return await axios.get(`${this.baseUrl}/${endpoint}/${id}`,  {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }

  async post(endpoint: string, body: any) {
    return await axios.post(`${this.baseUrl}/${endpoint}`, body);
  }

  async postWithToken(endpoint: string, body: any) {
    return await axios.post(`${this.baseUrl}/${endpoint}`, body,  {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }

  async put(endpoint: string, body: any) {
    return await axios.put(`${this.baseUrl}/${endpoint}`, body,  {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  }

  async delete(endpoint: string, uniqueKey: number | string) {
    return await axios.delete(
      `${this.baseUrl}/${endpoint}/${uniqueKey}`,  {
        headers: {
          Authorization: `Bearer  ${token}`,
        },
      });
  }
}
