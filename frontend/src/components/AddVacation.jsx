import React, { useEffect, useState } from "react";
import "./styles/AddVacation.css";

export default function AddVacation() {
    const [employees, setEmployees] = useState([]);

    const [formData, setFormData] = useState({
        employeeId: "",
        startDate: "",
        endDate: ""
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await fetch("http://localhost:9000/api/employees");
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:9000/api/vacation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    employeeId: Number(formData.employeeId),
                    startDate: formData.startDate,
                    endDate: formData.endDate
                })
            });

            if (response.ok) {
                setMessage("Vacation added");
                setFormData({
                    employeeId: "",
                    startDate: "",
                    endDate: ""
                });
            } else {
                setMessage("Error while adding vacation");
            }
        } catch (error) {
            setMessage("Server connection error");
        }
    };

    return (
        <div className="add-vacation-container">
            <h1>Add Vacation</h1>
            {message && <p className="success-message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <select name="employeeId" value={formData.employeeId} onChange={handleChange} required>
                    <option value="">Select employee</option>
                    {employees.map(employee => (
                        <option key={employee.id} value={employee.id}>
                            {employee.firstName} {employee.lastName} (ID: {employee.id})
                        </option>
                    ))}
                </select>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required/>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required/>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}