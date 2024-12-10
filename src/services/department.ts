
import { PaginationRequest } from "../interfaces/shared";
import http from "./http"

const getDepartments = async(body: PaginationRequest)=>{
    try {

          
        const response = await http.post("Department/pagination", body);
        return response;
    } catch (error) {
        throw error;
    }   
}

const getDepartmentById = async(id : number)=>{
    try {
        const response = await http.get(`Department/${id}`);
        return response;
    } catch (error) {
        throw error;
    }   
}

const deleteDepartment= async(id : number)=>{
    try {
        const response = await http.delete(`Department/${id}`);
        return response;
    } catch (error) {
        throw error;
    }   
}

const addDepartment= async(name : string)=>{
    try {
        const response = await http.post(`Department`, {name});
        return response;
    } catch (error) {
        throw error;
    }   
}
const updateDepartment= async(id : number, name : string)=>{
    try {
        const response = await http.put(`Department/${id}`, {name});
        return response;
    } catch (error) {
        throw error;
    }   
}


export{
    getDepartments,
    getDepartmentById,
    deleteDepartment,
    addDepartment,
    updateDepartment
}