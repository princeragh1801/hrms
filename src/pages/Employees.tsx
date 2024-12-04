import { useState } from "react";
import Table from "../components/shared/Table"

function Employees() {
  const columns = ["Name", "Age", "Email"]; // Column names
  const [data, setData] = useState([
      { Name: "John Doe", Age: 28, Email: "john@example.com" },
      { Name: "Jane Smith", Age: 32, Email: "jane@example.com" },
  ]);
  return (
    <Table
      heading="Employees"
      showAdd={true}
      showSearch={true}
      columns={columns}
      data={data}
    />
  )
}

export default Employees