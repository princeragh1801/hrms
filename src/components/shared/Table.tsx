import { ReactNode, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Pagination from "./Pagination";
interface TableProps<T> {
    renderCell:(item : T, columnKey : string, index : number) => ReactNode;
    columns: {name:string, id : string}[] // Column names
    data: T[]; // Data rows
}

function Table<T>({ columns, data, renderCell }:TableProps<T>)  {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: '', direction: 'asc' });
    
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(10)
    const handlePageChange =(page:number) => {
        setCurrentPage(page)
    }
    const handlePerPageChange =(items:number) => {
        setPerPage(items)
    }
    // Sorting function
    const sortData = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
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
    {data.length > 0 ? (
        data.map((row, rowIndex) => (
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
        <Pagination currentPage={currentPage} handlePageChange={handlePageChange} totalEntries={1001} perPage={perPage} handlePerPageChange={handlePerPageChange} />
        </div>
    );
};

export default Table;
