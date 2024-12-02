import { useState } from "react";
import Table from "./components/shared/Table";

function App() {
  const columns = ["Name", "Age", "Email"]; // Column names
    const [data, setData] = useState([
        { Name: "John Doe", Age: 28, Email: "john@example.com" },
        { Name: "Jane Smith", Age: 32, Email: "jane@example.com" },
    ]);

    const handleEdit = (index: number) => {
        // Handle row editing (e.g., show a modal with editable fields)
        console.log("Edit row at index:", index);
    };

    const handleDelete = (index: number) => {
        // Handle row deletion
        setData((prevData) => prevData.filter((_, idx) => idx !== index));
    };
  return (
    <div className="p-4">
            <Table
              heading="Employees"
              showAdd={true}
              showSearch={true}
              columns={columns}
              data={data}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
        </div>
  )
}

export default App
