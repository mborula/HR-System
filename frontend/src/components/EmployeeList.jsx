import React, { useEffect, useState } from "react";
import "./EmployeeList.css";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEmployees = () => {
    fetch("http://localhost:8080/api/employees")
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error("Error:", err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:8080/api/employees/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchEmployees(); // refresh the list after deletion
      } else {
        console.error("Error deleting employee");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  return (
    <div className="employee-list-container">
        <h1 className="header-text">Employee List</h1>
        <div className="header-search">
          <input
            className="search-field"
            type="search"
            placeholder="Enter employee last name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
     
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Salary</th>
            <th>ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees
              .filter(emp =>
                emp.lastName.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(emp => (
            <tr key={emp.id}>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.address}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.position}</td>
              <td>{emp.salary}</td>
              <td>{emp.id}</td>
              <td>
                <button
                  onClick={() => deleteEmployee(emp.id)}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                    borderRadius: "4px"
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}