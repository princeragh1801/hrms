import { AddEmployeeDto } from "../interfaces/employee";
import { PaginationRequest } from "../interfaces/shared";
import http from "./http"

const getEmployees = async(body:PaginationRequest)=>{
    try {
          
        const response = await http.post("Employee/pagination", body);
        return response;
    } catch (error) {
        throw error;
    }   
}

const getEmployeeById = async(id : number)=>{
    try {
        const response = await http.get(`Employee/${id}`);
        return response;
    } catch (error) {
        throw error;
    }   
}

const deleteEmployee= async(id : number)=>{
    try {
        const response = await http.delete(`Employee/${id}`);
        return response;
    } catch (error) {
        throw error;
    }   
}

const addEmployee= async(body : AddEmployeeDto)=>{
    try {
        const response = await http.post(`Employee`, body);
        return response;
    } catch (error) {
        throw error;
    }   
}
const updateEmployee= async(id : number, body : AddEmployeeDto)=>{
    try {
        const response = await http.put(`Employee/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }   
}

const getEmployeeForUpdate = async(id : number)=>{
    try {
        const response = await http.get(`Employee/Update/${id}`);
        return response;
    } catch (error) {
        throw error;
    }   
}


export{
    getEmployees,
    getEmployeeById,
    deleteEmployee,
    addEmployee,
    updateEmployee,
    getEmployeeForUpdate
}