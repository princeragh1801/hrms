import { Role } from "./enums";

export interface AddEmployeeDto {
    username: string; 
    password: string; 
    name: string; 
    email: string; 
    phone: string; 
    address: string; 
    salary: number;
    departmentID?: number | null; 
    managerID?: number | null; 
    role: Role;
}