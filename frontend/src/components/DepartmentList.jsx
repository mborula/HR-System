import React, { useEffect, useState } from "react";
import "./styles/DepartmentList.css";

const initialFormData = {
  name: ""
};

export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");

  const fetchDepartments = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/departments");
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error("Error loading departments:", error);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadDepartments = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/departments");
        const data = await response.json();

        if (!ignore) {
          setDepartments(data);
        }
      } catch {
        console.error("Error loading departments");
      }
    };

    loadDepartments();

    return () => {
      ignore = true;
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9000/api/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage("Department added");
        setFormData(initialFormData);
        fetchDepartments();
      } else {
        const errorData = await response.json();
        setMessage(`ERROR: ${errorData.message || "Something went wrong"}`);
      }
    } catch {
      setMessage("Server connection error");
    }
  };

  const deleteDepartment = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this department?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:9000/api/departments/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setMessage("Department deleted");
        fetchDepartments();
      } else {
        setMessage("Error deleting department");
      }
    } catch {
      setMessage("Server connection error");
    }
  };

  return (
    <div className="department-list-container">
      <h1 className="header-text">Departments</h1>

      <form className="department-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Department name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <button type="submit">Add</button>
      </form>

      {message && <p className="department-message">{message}</p>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.name}</td>
              <td>{department.id}</td>
              <td className="action-buttons">
                <button
                  className="delete-button"
                  onClick={() => deleteDepartment(department.id)}
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
