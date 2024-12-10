import { Role } from "./enums";
import { Combo } from "./shared";

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
export interface Employee {
    id: number;
    name: string;
    email: string;
    salary: number;
    role: Role; // You can replace this with an enum if roles have specific values
    managerName: string;
    departmentName: string | null;
    createdOn: Date; // Alternatively, you can use `Date` if you parse the string into a date object
}

export interface EmployeeCombo extends Combo{
    departmentName : string
}