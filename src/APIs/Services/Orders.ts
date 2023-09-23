import { HttpClient } from "../HTTPClients";

export class OrderService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api`);
  }
}