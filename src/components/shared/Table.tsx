import React, { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import {MdRemoveRedEye,  MdSearch  } from "react-icons/md";
import Pagination from "./Pagination";
interface TableProps {
    heading : string;
    showSearch?:boolean;
    showAdd?:boolean;
    handleAdd?:()=> void;
    columns: string[]; // Column names
    data: any[]; // Data rows
    filters?:object // TODO:::
}

const Table: React.FC<TableProps> = ({ columns, data,  heading, showSearch, showAdd, handleAdd }) => {
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
        <div className="overflow-x-auto border-2 rounded-lg ">
            <div className="border-b-2 mb-4">
            <div className="px-2 my-2 flex justify-between">
            <h1 className="text-xl font-bold mb-4">{heading}</h1>
            {showAdd && <button onClick={handleAdd} className="px-4 py-2 font-semibold bg-[#0e9f6e] rounded-lg text-white">+ Add an employee</button>}
            {/* <div className="flex justify-between gap-x-4">
            {showSearch && <input className="p-2 bg-gray-200 rounded-lg " placeholder="Search here..."/>}
            
            </div> */}
            </div>
            <div className="m-2 flex gap-x-2">
            {showSearch && (
                <div className="w-80 flex border-2 rounded-lg">
                    <div className="ml-3 flex flex-col justify-center">
                    <MdSearch fontSize={23} color="gray" />
                    </div>
                    <input
                        className="p-2 focus:outline-none" // Remove border color on focus
                        placeholder="Search here..."
                    />
                </div>
            )}
            {/* {filters && (

            )} */}
                <div className="flex border-2 rounded-lg">
                    <div className="ml-2 flex flex-col justify-center">
                    <label className="font-semibold text-gray-600">Role:</label>
                    </div>
                    <select
                        className="mr-2 focus:outline-none "
                    >
                            <option key="1" value={"Admin"}>
                                Admin
                            </option>
                            <option key="1" value={"Admin"}>
                                Employee
                            </option>
                            <option key="1" value={"Admin"}>
                                SuperAdmin
                            </option>
                    </select>
                </div>
            </div>
            </div>
            <div className="m-2">
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="border bg-[#e5e7eb]">
                    <th className=" px-4 py-2 text-left">S.No</th>
                    {columns.map((column, index) => (
                            <th key={index} className=" px-4 py-2 text-left cursor-pointer" onClick={() => sortData(column)}>
                                {column}
                                {sortConfig.key === column ? (
                                    sortConfig.direction === 'asc' ? (
                                        <FaArrowUp className="inline ml-2" />
                                    ) : (
                                        <FaArrowDown className="inline ml-2" />
                                    )
                                ) : null}
                            </th>
                        ))}
                        <th className=" px-4 py-2">View</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 && data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border">
                            <td className="px-4 py-2">{rowIndex + 1}</td> {/* Display Serial Number */}
                            {columns.map((column, colIndex) => (
                                <td key={colIndex} className="px-4 py-2">
                                    {row[column] || "-"} {/* Render value or "-" if not present */}
                                </td>
                            ))}
                            <td className="px-4 py-2">
                                <div className="flex gap-x-2 justify-center items-center">
                                <MdRemoveRedEye cursor={"pointer"} />
                                </div>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
                
            </table>
            {
                data.length === 0 && (
                    <div className="my-10 w-full flex justify-center items-center">
                        <p className="text-center">No items to display</p>
                    </div>
                )
            }
            </div>
            {/* Pagination  */}
            <Pagination currentPage={currentPage} handlePageChange={handlePageChange} totalEntries={1001} perPage={perPage} handlePerPageChange={handlePerPageChange} />

        </div>
    );
};

export default Table;
