import { useCallback, useEffect, useState } from "react";
import { AddEmployeeDto } from "../interfaces/employee";
import DynamicForm from "./shared/DynamicForm";
import { getCombo } from "../services/shared";
import { Combo, Response } from "../interfaces/shared";
import { getEmployeeForUpdate } from "../services/employee";
import { useParams } from "react-router-dom";


function PostEmployee() {
    const {employeeId} = useParams()
    const [departmentList, setDepartmentList] = useState<Combo[]>([])
    const [managerList, setManagerList] = useState<Combo[]>([])
    const [departmentId, setDepartmentId] = useState<number|null>(null)
    const [managerId, setManagerId] = useState<number|null>(null)
    const isEditMode = (employeeId && parseInt(employeeId) > 0);
    const [employee, setEmployee] = useState<AddEmployeeDto>()
    const handleDepartmentChange = async(e: React.ChangeEvent<HTMLSelectElement>) => {
        try {
            setDepartmentId(parseInt(e.target.value))
            await getManagerCombo(parseInt(e.target.value));
            
        } catch (error) {
            
        }
    }
    const handleManagerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setManagerId(parseInt(e.target.value))
    }
    
    const fields = [
        {
            value : employee?.username,
            name: "username",
            label: "Username",
            type: "text",
            placeholder: "Enter your username",
            validation: { required: "Username is required" },

        },
        {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Enter your password",
            validation: {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
            },
        },
        {
            value : employee?.name,
            name: "name",
            label: "Name",
            type: "text",
            placeholder: "Enter your name",
            validation: {
                required: "Name is required",
                minLength: { value: 6, message: "Name must be at least 6 characters" },
            },
        },
        {
            value : employee?.email,
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Enter your email",
            validation: {
                required: "Email is required",
                minLength: { value: 6, message: "Email must be at least 6 characters" },
            },
        },
        {
            value : employee?.phone,
            name: "phone",
            label: "Contact Number",
            type: "text",
            placeholder: "Enter your contact number",
            validation: {
                required: "Contact number is required",
                minLength: { value: 10, message: "Contact Number must be 10 characters" },
                maxLength:{value: 10, message: "Contact Number must be 10 characters"}
            },
        },
        {
            value : employee?.address,
            name: "address",
            label: "Address",
            type: "text",
            placeholder: "Enter your address",
            validation: {
                required: "Address is required",
                minLength: { value: 6, message: "address must be at least 6 characters" },
            },
        },
        {
            value : employee?.salary,
            name: "salary",
            label: "Salary",
            type: "number",
            placeholder: "Enter your salary",
            validation: {
                required: "Salary is required",
                min: { value: 1000, message: "Salary must be greater than 1000" }, // Minimum value validation
            },
            inputOptions: { valueAsNumber: true }, // Converts input to number
    
      },
      {
        value : departmentId,
        name: "departmentID",
        label: "Department",
        type: "select",
        placeholder:"Select a department",
        
        inputOptions: { valueAsNumber: true },
        options: departmentList,
        handleChange:(e: React.ChangeEvent<HTMLSelectElement>) => handleDepartmentChange(e)
      },
      {
        value : managerId,
        name: "managerID",
        label: "Manager",
        type: "select",
        placeholder:"Select a Manager",
        handleChange:(e: React.ChangeEvent<HTMLSelectElement>) => handleManagerChange(e),
        inputOptions: { valueAsNumber: true },
        options: managerList,
      },
      {
        value : employee?.role,
        name: "role",
        label: "Role",
        type: "select",
        placeholder:"Select a role",
        validation: {
            required: "Role is required",
            min:{value:1, message:"Please select a valid role"},
            max:{value:3, message:"Please select a valid role"}
        },
        inputOptions: { valueAsNumber: true },
        options: [
            { name: "Admin", id: 1 },
            { name: "User", id: 2 },
            { name: "Guest", id: 3 },
        ],
      }
    ];
    const getEmployee = async() => {
        try {
            if(employeeId) {
                const response = await getEmployeeForUpdate(parseInt(employeeId));
                console.log("Response : ", response)
                if(response.status >= 200 && response.status < 300){
                    const data : Response<AddEmployeeDto> = response.data;
                    setEmployee(data.data)
                    if(data.data.managerID){
                        setManagerId(data.data.managerID)
                    }if(data.data.departmentID){
                        setDepartmentId(data.data.departmentID)
                    }
                }
            }
        } catch (error) {
            console.error("Error occured while fetching employee, ", error)
        }
    }
    const getManagerCombo = useCallback(async (id: number) => {
        try {
            const response = await getCombo(`/Employee/department/${id}`);
            console.log("Response : ", response);
            if (response.status >= 200 && response.status < 300) {
                const data: Response<Combo[]> = response.data;
                setManagerId(null);
                setManagerList(data.data);
            }
        } catch (error) {
            console.error("Error occurred while fetching departments:", error);
        }
    }, [departmentId]);
    const getDepartmentCombo = async() => {
        try {
            const response = await getCombo("/Department");
            console.log("Response : ", response)
            if(response.status >= 200 && response.status < 300){
                const data : Response<Combo[]> = response.data;
                setDepartmentList(data.data);
                setManagerList([])
                setManagerId(null)
            }
        } catch (error) {
            console.error("Error occured while fetching departments, ", error)
        }
    }
    const handlePost = (data : any)=>{
        const updatedData :AddEmployeeDto= {
            ...data,
            managerID : managerId,
            departmentID : departmentId
        }
        console.log("Data : ", updatedData)
        console.log("Handle post method called!!!")
    }
    useEffect(() => {
        getDepartmentCombo();
        if(isEditMode){
            getEmployee()
        }
    },[])
    
  return (
    <div className="h-full w-full flex justify-center items-center">
        <div className="border-2 rounded-lg flex items-center justify-center flex-col gap-x-2">
            <h1 className="font-bold text-xl my-4">{isEditMode ? "Update" : "Add"} Employee</h1>
            <DynamicForm<AddEmployeeDto> fields={fields} onSubmit={handlePost} classname="grid grid-cols-1 md:grid-cols-2 gap-4" />
        </div>
    </div>
  )
}

export default PostEmployee