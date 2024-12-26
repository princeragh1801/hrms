import { useCallback, useEffect, useState } from "react";
import Table from "../components/shared/Table"
import { getProjects } from "../services/project";
import { Project } from "../interfaces/project";
import { PaginationRequest, PaginationResponse, Response } from "../interfaces/shared";
import { ProjectTable } from "../constants/tableConfigurations";
import PageWrapper from "../components/shared/PageWrapper";
import { useNavigate } from "react-router-dom";
import { SortedOrder } from "../interfaces/enums";
import { MdDelete, MdEdit, MdOutlineRemoveRedEye } from "react-icons/md";

function Projects() {
  const navigate = useNavigate();
  //const columns = ["name", "email", "ProjectName", "managerName", "salary", "createdOn"]; // Column names
  const [pagination, setPagination] = useState<PaginationRequest>({
    pageIndex:1,
    pagedItemsCount:10,
    orderKey:"",
    search:"",
    sortedOrder:SortedOrder.NoOrder
  })
  const [response, setResponse] = useState<PaginationResponse<Project[]>>()

  const getProjectList = async() => {
    try {
      const response = await getProjects(pagination);
      console.log("response : ", response)
      if(response.status >= 200 && response.status < 300){
        const responseData : Response<PaginationResponse<Project[]>>= response.data;
        if(responseData.success){
          setResponse(responseData.data)
        }
      }
    } catch (error) {
      console.error("Error occured while fetching Projects, ", error)
    }
  }
  useEffect(() => {
    getProjectList()
  },[pagination])

  const renderCell = useCallback(
    (project: Project, columnKey: string, index: number) => {
      switch (columnKey) {
        case "uid":
          return (
            <p className="text-bold text-sm   text-gray-900">{((pagination.pageIndex-1)*pagination.pagedItemsCount) + index + 1}</p>
          );
        case "name":
          return <p className="text-bold text-sm   text-gray-900">{project.name}</p>
        case "status":
          return <p className="text-bold text-sm   text-gray-900">{project.status}</p>
        
        case "actions":
          return (
                      <div className="flex gap-x-4">
                        <MdOutlineRemoveRedEye cursor="pointer" onClick={() => navigate(`${project.id}`)}/>
                        <MdEdit cursor="pointer" onClick={() => navigate(`post/${project.id}`)} />
                        <MdDelete cursor="pointer" onClick={() => {
                          
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
    <PageWrapper pagination={pagination} setPagintion={setPagination} heading="Projects" showAdd={true} addBtnName="Add Project" showSearch={true} handleAdd={() => {
      navigate("post")
    }} >
      {response && <Table
      renderCell={renderCell}
      columns={ProjectTable}
      data={response}
      setPagintion={setPagination}
      pagination={pagination}
      />}
    </PageWrapper>
  )
}

export default Projects