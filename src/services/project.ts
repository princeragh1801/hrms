import { PaginationRequest } from "../interfaces/shared";
import http from "./http";

const getProjects = async(body:PaginationRequest)=>{
    try {
          
        const response = await http.post("Project/pagination", body);
        return response;
    } catch (error) {
        throw error;
    }   
}

export {
    getProjects
}