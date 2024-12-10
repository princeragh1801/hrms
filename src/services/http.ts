import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
console.log("Base url : ", baseURL)
const http = axios.create({
    baseURL : baseURL || "https://localhost:7051",
    timeout : 3000,
    headers :{Authorization : 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiUHJpbmNlIFJhZ2h1d2Fuc2hpIiwiTmFtZSI6IlByaW5jZSBSYWdodXdhbnNoaSIsIlVzZXJJZCI6IjIiLCJqdGkiOiI4M2E4NDNlNS02ODdmLTRjOWQtOWJhYi00MGE3M2YzZjEzMWIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiUm9sZSI6IlN1cGVyQWRtaW4iLCJEYXRlIjoiMTAvMTIvMjAyNCAxMjozNDoyMCIsImV4cCI6MTczNDI0NjI2MCwiaXNzIjoiSnd0SXNzdWVyOyIsImF1ZCI6Ikp3dEF1ZGllbmNlOyJ9.vl2se3Njel-qjp7jP6jIZ--myF9nDdQ3wTRouf36Cx8'}
})

export default http;