import React from 'react'
import { MdSearch } from 'react-icons/md';

interface PageWrapperProps{
    heading : string;
    showSearch?:boolean;
    showAdd?:boolean;
    handleAdd?:()=> void;
    children:any
}
function PageWrapper({heading, showSearch, showAdd, handleAdd, children} : PageWrapperProps) {
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

            {children}

        </div>
  )
}

export default PageWrapper