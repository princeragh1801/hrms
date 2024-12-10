import React, { Dispatch, ReactNode, SetStateAction, useState, useEffect } from 'react';
import { MdSearch } from 'react-icons/md';
import { PaginationRequest } from '../../interfaces/shared';

interface PageWrapperProps {
  heading: string;
  showSearch?: boolean;
  showAdd?: boolean;
  addBtnName?:string
  handleAdd?: () => void;
  children: ReactNode;
  filters?: ReactNode[];
  pagination: PaginationRequest; // Pass pagination state from the parent
  setPagintion: Dispatch<SetStateAction<PaginationRequest>>; // Function to update pagination from the parent
}

function PageWrapper({
  heading,
  showSearch,
  showAdd,
  handleAdd,
  children,
  filters,
  setPagintion,
  pagination,
  addBtnName
}: PageWrapperProps) {
  // Local state for handling the search term input
  const [searchTerm, setSearchTerm] = useState('');

  // Debounced search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce timeout duration (500ms)
  const debounceTimeout = 500;

  // Update the debounced search term after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, debounceTimeout);

    // Cleanup timeout on every change to searchTerm
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Update pagination state in parent component when debounced search term changes
  useEffect(() => {
    // Only update pagination if the debounced search term has changed
    if (debouncedSearchTerm !== pagination.search) {
      setPagintion((prev) => ({
        ...prev,
        search: debouncedSearchTerm, // Pass the debounced search term here
        page: 1, // Optionally reset to page 1 when search changes
      }));
    }
  }, [debouncedSearchTerm, pagination.search, setPagintion]);

  // Handle input change and update local searchTerm state
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="overflow-x-auto border-2 rounded-lg">
      <div className="border-b-2 mb-4">
        <div className="px-2 my-2 flex justify-between">
          <h1 className="text-xl font-bold mb-4">{heading}</h1>
          {showAdd && (
            <button
              onClick={handleAdd}
              className="px-4 py-2 font-semibold bg-[#0e9f6e] rounded-lg text-white"
            >
              + {addBtnName}
            </button>
          )}
        </div>
        <div className="m-2 flex gap-x-2">
          {showSearch && (
            <div className="w-80 flex border-2 rounded-lg">
              <div className="ml-3 flex flex-col justify-center">
                <MdSearch fontSize={23} color="gray" />
              </div>
              <input
                type="text"
                value={searchTerm} // Bind to local search term state
                onChange={handleSearchChange} // Update search term on input change
                className="p-2 focus:outline-none"
                placeholder="Search here..."
              />
            </div>
          )}
          {filters && filters.map((filter) => filter)}
        </div>
      </div>

      {children}
    </div>
  );
}

export default PageWrapper;
