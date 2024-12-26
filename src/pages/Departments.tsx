import { useCallback, useEffect, useState } from "react";
import Table from "../components/shared/Table"
import { deleteDepartment, getDepartments } from "../services/department";
import { Department } from "../interfaces/department";
import { PaginationRequest, PaginationResponse, Response } from "../interfaces/shared";
import { DepartmentTable } from "../constants/tableConfigurations";
import PageWrapper from "../components/shared/PageWrapper";
import { SortedOrder } from "../interfaces/enums";
import { MdDelete } from "react-icons/md";
import AddDepartment from "../components/AddDepartment";
import ConfirmModal from "../components/modal/ConfirmModal";

function Departments() {
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [id, setId] = useState<number>(0)
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
  const handleDelete = async() => {
    try {
      const response = await deleteDepartment(id);
      console.log("Response : ", response)
      if(response.status >= 200 && response.status < 300){
        const responseData : Response<boolean> = response.data;
        if(responseData.success){
          console.log("Response : ", responseData.message)
        }
      }
    } catch (error) {
      console.error("Error occured while deleting the department, ", error)
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
        // case "createdBy":
        //   return <p className="text-bold text-sm   text-gray-900">{department.createdBy}</p>
        
        case "actions":
          return (
                  <div className="flex items-center">
                    <MdDelete cursor="pointer" onClick={() => {
                      setId(department.id) 
                      setShowDeleteModal(true)
                    }}/>
                  </div>
                )
        default:
          return null;
      }
    },
    [pagination]
  );
  return (
    <PageWrapper pagination={pagination} setPagintion={setPagination} heading="Departments" showAdd={true} addBtnName="Add department" showSearch={true} handleAdd={() => {
      setShowModal(true)
    }} >
      {response && <Table
      renderCell={renderCell}
      columns={DepartmentTable}
      data={response}
      setPagintion={setPagination}
      pagination={pagination}
      />}
      {showModal && <AddDepartment setShowModal={setShowModal}/>}
      {showDeleteModal && <ConfirmModal heading="Confirm Deletion" description="Are you sure you really want to delete this item" setShowModal={setShowDeleteModal} onConfirm={handleDelete} />}
    </PageWrapper>
  )
}

export default Departments