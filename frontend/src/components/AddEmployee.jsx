import React, { useEffect, useState } from "react";
import "./styles/AddEmployee.css";

const initialFormData = {
  firstName: "",
  lastName: "",
  address: "",
  email: "",
  phone: "",
  position: "",
  salary: "",
  departmentId: ""
};

const employeeFields = [
  { name: "firstName", type: "text", placeholder: "First Name" },
  { name: "lastName", type: "text", placeholder: "Last Name" },
  { name: "address", type: "text", placeholder: "Address" },
  { name: "email", type: "email", placeholder: "Email" },
  { name: "phone", type: "tel", placeholder: "Phone" },
  { name: "position", type: "text", placeholder: "Position" },
  { name: "salary", type: "number", placeholder: "Salary" }
];

export default function AddEmployee() {
  const [formData, setFormData] = useState(initialFormData);
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState("");

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

  const buildEmployeePayload = () => {
    return {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      email: formData.email,
      phone: formData.phone,
      position: formData.position,
      salary: Number(formData.salary),
      department: formData.departmentId
          ? { id: Number(formData.departmentId) }
          : null
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9000/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildEmployeePayload())
      });

      if (response.ok) {
        setMessage("Employee added");
        setFormData(initialFormData);
      } else {
        const errorData = await response.json();
        setMessage(`ERROR: ${errorData.message || "Something went wrong"}`);
      }
    } catch {
      setMessage("Server connection error");
    }
  };

  return (
      <div className="add-employee-container">
        <h1>Add employee</h1>
        {message && <p>{message}</p>}

        <form onSubmit={handleSubmit}>
          {employeeFields.map((field) => (
              <input
                  key={field.name}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
              />
          ))}

          <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              required
          >
            <option value="">Select department</option>
            {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
            ))}
          </select>

          <button type="submit">Add</button>
        </form>
      </div>
  );
}
