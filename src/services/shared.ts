
import http from "./http";

const getCombo = async(url:string)=>{
    try {
        const response = await http.get(url);
        return response;
    } catch (error) {
        throw error;
    }
}

export{
    getCombo
}