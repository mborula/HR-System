import React, { useState, useEffect } from "react";
import "./EditEmployee.css";
import { useLocation } from "react-router-dom";

export default function EditEmployee() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const urlId = queryParams.get("id");

    const [employeeId, setEmployeeId] = useState(urlId || "");
    const [form, setForm] = useState(null);

    const fetchEmployee = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/api/employees/${id}`);

            if (!res.ok) {
                alert("Employee not found in the database");
                setForm(null);
                return;
            }

            const data = await res.json();

            if (!data || !data.id) {
                alert("Employee not found in the database");
                setForm(null);
                return;
            }

            setForm(data);

        } catch (err) {
            console.error(err);
            alert("Server connection error");
        }
    };

    useEffect(() => {
        if (urlId) {
            fetchEmployee(urlId);
        }
    }, [urlId]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:8080/api/employees/${form.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form)
                }
            );

            if (response.ok) {
                alert("Employee updated!");
            } else {
                alert("Error updating employee");
            }
        } catch (error) {
            alert("Server error");
        }
    };

    return (
        <div className="edit-employee-container">
            <h1>Edit employee</h1>

            <input
                className="search-field"
                type="number"
                placeholder="Enter employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        fetchEmployee(employeeId);
                    }
                }}
            />


            {form && (
                <form onSubmit={handleSubmit}>
                    <input name="firstName" value={form.firstName} onChange={handleChange} />
                    <input name="lastName" value={form.lastName} onChange={handleChange} />
                    <input name="address" value={form.address} onChange={handleChange} />
                    <input name="email" value={form.email} onChange={handleChange} />
                    <input name="phone" value={form.phone} onChange={handleChange} />
                    <input name="position" value={form.position} onChange={handleChange} />
                    <input name="salary" value={form.salary} onChange={handleChange} />

                    <button type="submit">Update</button>
                </form>
            )}
        </div>
    );
}