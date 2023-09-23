import axios from "axios";


export class HttpClient{  
    baseUrl:string;
    constructor(url:string){
        this.baseUrl=url;
    }

    async get(endpoint:string){
        return await axios.get(`${this.baseUrl}/${endpoint}`);
    }

    async post(endpoint:string,body:any){
        return await axios.post(`${this.baseUrl}/${endpoint}`,body);
    }

    async put(endpoint:string,body:any){
        return await axios.put(`${this.baseUrl}/${endpoint}`,body);
    }

    async delete(endpoint:string,id:number|string,header:any){
        return await axios.delete(`${this.baseUrl}/${endpoint}/${id}`,header)
    }
}