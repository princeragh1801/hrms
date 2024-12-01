import { Auth } from "../interfaces/auth";
import http from "./http";

const login = async(body : Auth)=>{
    try {
        const response = await http.post("Login", body)
        return response;
    } catch (error) {
        throw error;
    }
}

export {
    login
}