import axios from "axios";


export class HttpClient{  
    baseUrl:string;
    constructor(url:string){
        this.baseUrl=url;
    }

    async get(endpoint:string,header:any){
        return await axios.get(`${this.baseUrl}/${endpoint}`,header);
    }

    async getById(endpoint:string,id:string|number,header:any){
        return await axios.get(`${this.baseUrl}/${endpoint}/${id}`,header);
    }

    async post(endpoint:string,body:any){
        return await axios.post(`${this.baseUrl}/${endpoint}`,body);
    }

    async put(endpoint:string,body:any){
        return await axios.put(`${this.baseUrl}/${endpoint}`,body);
    }

    async delete(endpoint:string,uniqueKey:number|string,header:any){
        return await axios.delete(`${this.baseUrl}/${endpoint}/${uniqueKey}`,header)
    }
}