import http from "./http"

const getEmployees = async()=>{
    try {
        var body = {
            pageIndex: 1,
            pagedItemsCount: 50,
            orderKey: "",
            sortedOrder: 0,
            search: ""
            
          }
          
        const response = await http.post("Employee/pagination", body);
        return response;
    } catch (error) {
        throw error;
    }   
}

export{
    getEmployees
}