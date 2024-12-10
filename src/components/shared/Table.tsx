import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Pagination from "./Pagination";
import { PaginationRequest, PaginationResponse } from "../../interfaces/shared";
import { SortedOrder } from "../../interfaces/enums";
interface TableProps<T> {
    renderCell:(item : T, columnKey : string, index : number) => ReactNode;
    columns: {name:string, id : string}[] // Column names
    data: PaginationResponse<T[]>; // Data rows
    pagination : PaginationRequest
    setPagintion:Dispatch<SetStateAction<PaginationRequest>>
}

function Table<T>({ columns, data, renderCell, setPagintion, pagination }:TableProps<T>)  {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: '', direction: 'asc' });
    
    const handlePageChange =(page:number) => {
        setPagintion({...pagination, pageIndex : page})
    }
    const handlePerPageChange =(items:number) => {
        setPagintion({...pagination, pagedItemsCount:items, pageIndex : 1})
    }
    // Sorting function
    const sortData = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        setPagintion({...pagination, orderKey : key, sortedOrder : sortConfig.direction === 'asc' ? SortedOrder.Ascending : SortedOrder.Descending})
        //setEditedData(sortedData);
    };
    
    return (
        <div className="h-full">
        {/* Table component  working here.... */}
        <div className="m-2">
        <table className="min-w-full table-auto">
<thead>
    <tr className="border bg-[#e5e7eb]">
        {columns.map((column) => (
            <th
                key={column.id}
                className="px-4 py-2 text-left cursor-pointer"
                onClick={() => sortData(column.name)}
            >
                {column.name}
                {sortConfig.key === column.id ? (
                    sortConfig.direction === "asc" ? (
                        <FaArrowUp className="inline ml-2" />
                    ) : (
                        <FaArrowDown className="inline ml-2" />
                    )
                ) : null}
            </th>
        ))}
    </tr>
</thead>
<tbody>
    {data.data.length > 0 ? (
        data.data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border">
                {columns.map((column) => (
                    <td key={column.id} className="px-4 py-2">
                        {renderCell(row, column.id, rowIndex)}
                    </td>
                ))}
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan={columns.length} className="text-center py-4">
                No items to display
            </td>
        </tr>
    )}
</tbody>
</table>

        </div>
        {/* Pagination  */}
        <Pagination currentPage={pagination.pageIndex} handlePageChange={handlePageChange} totalEntries={data.totalItems} perPage={pagination.pagedItemsCount} handlePerPageChange={handlePerPageChange} />
        </div>
    );
};

export default Table;
