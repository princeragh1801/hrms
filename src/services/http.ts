import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
console.log("Base url : ", baseURL)
const http = axios.create({
    baseURL : baseURL || "https://localhost:7051",
    timeout : 3000,
    headers :{Authorization : 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiUHJpbmNlIFJhZ2h1d2Fuc2hpIiwiTmFtZSI6IlByaW5jZSBSYWdodXdhbnNoaSIsIlVzZXJJZCI6IjIiLCJqdGkiOiIyZDExNWFkZC01ZDNiLTQ4ZGYtYTU3Mi00NTBlOWNhYjY4NTEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiUm9sZSI6IlN1cGVyQWRtaW4iLCJEYXRlIjoiMjYvMTIvMjAyNCAxNjoyODoyMyIsImV4cCI6MTczNTY0MjcwMywiaXNzIjoiSnd0SXNzdWVyOyIsImF1ZCI6Ikp3dEF1ZGllbmNlOyJ9.pVPaiBbmJtihwTIgQeSDXjOLhDVXJHK55qY4j7XoWIo'}
})

export default http;