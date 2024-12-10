import { useCallback, useEffect, useState } from "react";
import Table from "../components/shared/Table"
import { deleteEmployee, getEmployees } from "../services/employee";
import { Employee } from "../interfaces/employee";
import { PaginationRequest, PaginationResponse, Response } from "../interfaces/shared";
import { EmployeeTable } from "../constants/tableConfigurations";
import PageWrapper from "../components/shared/PageWrapper";
import { useNavigate } from "react-router-dom";
import { Role, SortedOrder } from "../interfaces/enums";
import { MdDelete, MdEdit } from "react-icons/md";
import ConfirmModal from "../components/modal/ConfirmModal";

function Employees() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false)
  const [pagination, setPagination] = useState<PaginationRequest>({
    pageIndex:1,
    pagedItemsCount:10,
    orderKey:"",
    search:"",
    sortedOrder:SortedOrder.NoOrder
  })
  const [response, setResponse] = useState<PaginationResponse<Employee[]>>()
  const [deletingId, setDeletingId] = useState<number>(0)
  const getEmployeeList = async() => {
    try {
      const response = await getEmployees(pagination);
      console.log("response : ", response)
      if(response.status >= 200 && response.status < 300){
        const responseData : Response<PaginationResponse<Employee[]>>= response.data;
        if(responseData.success){
          setResponse(responseData.data)
        }
      }
    } catch (error) {
      console.error("Error occured while fetching employees, ", error)
    }
  }
  useEffect(() => {
    getEmployeeList()
  },[pagination])

  const filters = [
      (<div key={"1"} className="flex border-2 rounded-lg">
      <div className="ml-2 flex flex-col justify-center">
      <label className="font-semibold text-gray-600">Role:</label>
      </div>
      <select
          className="mr-2 focus:outline-none " onChange={(e) => console.log("Role changed: ", e.target.value)}
      >
              <option key="1" value={Role.Employee}>
                  Employee
              </option>
              <option key="2" value={Role.Admin}>
                  Admin
              </option>
              <option key="3" value={Role.SuperAdmin}>
                  SuperAdmin
              </option>
      </select>
    </div>),
    
  ]
  const getRole = (role : Role) =>{
    switch (role) {
      case Role.Employee:
        return "Employee"

      case Role.Admin:
        return "Admin"

      case Role.SuperAdmin:
        return "SuperAdmin"
      
      default:
        return "Employee"
    }
  }
  const renderCell = useCallback(
    (employee: Employee, columnKey: string, index: number) => {
      switch (columnKey) {
        case "uid":
          return (
            <p className="text-bold text-sm   text-gray-900">{((pagination.pageIndex-1)*pagination.pagedItemsCount) + index + 1}</p>
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
          return <p className="text-bold text-sm   text-gray-900">{getRole(employee.role)}</p>
        case "actions":
          return (
            <div className="flex gap-x-2">
              <MdEdit cursor="pointer" onClick={() => navigate(`post/${employee.id}`)} />
              <MdDelete cursor="pointer" onClick={() => {
                setDeletingId(employee.id)
                setShowModal(true)
                }}/>
            </div>
          )
        default:
          return null;
      }
    },
    [pagination]
  );

  const handleDelete = async ()=>{
    try {
      const response = await deleteEmployee(deletingId)
      console.log("Response : ", response)
      if(response.status >= 200 && response.status < 300){
        const responseData : Response<boolean> = response.data;
        if(responseData.success){
          console.log(responseData.message)
          setPagination({...pagination, pageIndex : 1})
        }
      }
    } catch (error) {
      console.log("Error occured while deleting employee, ", error)
    }finally{
      setShowModal(false)
    }
  }
  return (
    <PageWrapper pagination={pagination} setPagintion={setPagination} heading="Employees" showAdd={true} addBtnName={"Add an employee"} filters={filters} showSearch={true} handleAdd={() => {
      navigate("post")
    }} >
      {response && <Table
      renderCell={renderCell}
      columns={EmployeeTable}
      data={response}
      setPagintion={setPagination}
      pagination={pagination}
      />}
      {showModal && <ConfirmModal
      heading='Confirm Deletion'
      description='Are you sure you want to delete this item? This action cannot be undone.'
      onConfirm={handleDelete}
      setShowModal={setShowModal}
      />}
    </PageWrapper>
  )
}

export default Employees