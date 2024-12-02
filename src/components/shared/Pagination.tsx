
import { MdArrowBack, MdArrowForward } from 'react-icons/md'

export interface PaginationProps{
    currentPage:number;
    totalEntries:number;
    perPage:number;
    handlePageChange:(page:number) => void;
    handlePerPageChange:(items:number) => void;
}
function Pagination({currentPage, totalEntries, perPage, handlePageChange, handlePerPageChange}:PaginationProps) {
    const totalPages = Math.ceil(totalEntries / perPage);

  return (

     <div className="flex justify-end items-center mr-2 my-4 space-x-2">
     <p>Total {totalEntries} entries</p>
     <p className="text-gray-400">|</p>
     <div className="flex items-center space-x-2">
         <label>Show</label>
         <select value={perPage} onChange={(e)=>handlePerPageChange(parseInt(e.target.value))} className="border p-1 h-8">
         <option value={10}>10</option>
         <option value={50}>50</option>
         <option value={100}>100</option>
         </select>
     </div>
     <p className="text-gray-400">|</p>
     <div className="flex items-center">
         <label className="mr-2">Page</label>
         <div className="border p-1 flex items-center justify-center h-8 w-8">
         <MdArrowBack  cursor="pointer" onClick={() => currentPage > 1 && handlePageChange(currentPage-1)}  />
         </div>
         <select className="border p-1 h-8" value={currentPage} onChange={(e) => handlePageChange(parseInt(e.target.value))}>
         {Array.from({ length: totalPages }, (_, index) => (
            <option key={index + 1} value={index + 1}>
            {index + 1}
            </option>
        ))}
         </select>
         <div className="border p-1 flex items-center justify-center h-8 w-8">
         <MdArrowForward cursor="pointer" onClick={() => currentPage < totalPages && handlePageChange(currentPage+1)}/>
         </div>
     </div>
     </div>
  )
}

export default Pagination