import { useCallback, useEffect, useState } from "react";
import Table from "../components/shared/Table"
import { getDepartments } from "../services/department";
import { Department } from "../interfaces/department";
import { PaginationRequest, PaginationResponse, Response } from "../interfaces/shared";
import { DepartmentTable } from "../constants/tableConfigurations";
import PageWrapper from "../components/shared/PageWrapper";
import { useNavigate } from "react-router-dom";
import { SortedOrder } from "../interfaces/enums";

function Departments() {
  const navigate = useNavigate();
  //const columns = ["name", "email", "departmentName", "managerName", "salary", "createdOn"]; // Column names
  const [pagination, setPagination] = useState<PaginationRequest>({
    pageIndex:1,
    pagedItemsCount:10,
    orderKey:"",
    search:"",
    sortedOrder:SortedOrder.NoOrder
  })
  const [response, setResponse] = useState<PaginationResponse<Department[]>>()

  const getDepartmentList = async() => {
    try {
      const response = await getDepartments(pagination);
      console.log("response : ", response)
      if(response.status >= 200 && response.status < 300){
        const responseData : Response<PaginationResponse<Department[]>>= response.data;
        if(responseData.success){
          setResponse(responseData.data)
        }
      }
    } catch (error) {
      console.error("Error occured while fetching Departments, ", error)
    }
  }
  useEffect(() => {
    getDepartmentList()
  },[pagination])

  const renderCell = useCallback(
    (department: Department, columnKey: string, index: number) => {
      switch (columnKey) {
        case "uid":
          return (
            <p className="text-bold text-sm   text-gray-900">{((pagination.pageIndex-1)*pagination.pagedItemsCount) + index + 1}</p>
          );
        case "name":
          return <p className="text-bold text-sm   text-gray-900">{department.name}</p>
        case "createdBy":
          return <p className="text-bold text-sm   text-gray-900">{department.createdBy}</p>
        
        case "actions":
          return <p className="text-bold text-sm   text-gray-900">{department.id}</p>
        default:
          return null;
      }
    },
    [pagination]
  );
  return (
    <PageWrapper pagination={pagination} setPagintion={setPagination} heading="Departments" showAdd={true} addBtnName="Add department" showSearch={true} handleAdd={() => {
      navigate("post")
    }} >
      {response && <Table
      renderCell={renderCell}
      columns={DepartmentTable}
      data={response}
      setPagintion={setPagination}
      pagination={pagination}
      />}
    </PageWrapper>
  )
}

export default Departments