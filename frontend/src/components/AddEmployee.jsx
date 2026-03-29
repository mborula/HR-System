import React, { useState } from "react";
import "./AddEmployee.css";

export default function AddEmployee() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
    position: "",
    salary: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setMessage("Employee added");
        setFormData({
          firstName: "",
          lastName: "",
          address: "",
          email: "",
          phone: "",
          position: "",
          salary: ""
        });
      } else {
        const errorData = await response.json();
        setMessage(`ERROR: ${errorData.message || "Something went wrong"}`);
      }
    } catch (error) {
      setMessage("Server connection error");
    }
  };

  return (
    <div className="add-employee-container">
      <h1>Add employee</h1>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} required />
        <input type="number" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}