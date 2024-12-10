import { useCallback, useEffect, useState } from "react";
import Table from "../components/shared/Table"
import { getEmployees } from "../services/employee";
import { Employee } from "../interfaces/employee";
import { PaginationResponse, Response } from "../interfaces/shared";
import { EmployeeTable } from "../constants/tableConfigurations";
import PageWrapper from "../components/shared/PageWrapper";

function Employees() {
  const columns = ["name", "email", "departmentName", "managerName", "salary", "createdOn"]; // Column names
  
  const [data, setData] = useState<Employee[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const getEmployeeList = async() => {
    try {
      const response = await getEmployees();
      console.log("response : ", response)
      if(response.status >= 200 && response.status < 300){
        const responseData : Response<PaginationResponse<Employee[]>>= response.data;
        if(responseData.success){
          setData(responseData.data.data)
          setTotalItems(responseData.data.totalItems);
          setTotalPages(responseData.data.totalPages);
        }
        // console.log("Response data : ", responseData)
      }
    } catch (error) {
      console.error("Error occured while fetching employees, ", error)
    }
  }
  useEffect(() => {
    getEmployeeList()
  },[])

  const renderCell = useCallback(
    (employee: Employee, columnKey: string, index: number) => {
      switch (columnKey) {
        case "uid":
          return (
            <p className="text-bold text-sm   text-gray-900">{index + 1}</p>
          );
        case "name":
          return <p className="text-bold text-sm   text-gray-900">{employee.name}</p>
        case "email":
          return <p className="text-bold text-sm   text-gray-900">{employee.email + 1}</p>
        case "department":
          return <p className="text-bold text-sm   text-gray-900">{employee.departmentName || "-"}</p>
        case "manager":
          return <p className="text-bold text-sm   text-gray-900">{employee.managerName || "-"}</p>
        case "role":
          return <p className="text-bold text-sm   text-gray-900">{employee.role}</p>
        case "actions":
          return <p className="text-bold text-sm   text-gray-900">{employee.id}</p>
        default:
          return null;
      }
    },
    []
  );
  return (
    <PageWrapper heading="Employees" showAdd={true} showSearch={true} handleAdd={() => {}} >
      <Table
      renderCell={renderCell}
      columns={EmployeeTable}
      data={data}
      
      />
    </PageWrapper>
  )
}

export default Employees