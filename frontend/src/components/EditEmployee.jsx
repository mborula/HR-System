import React, { useState, useEffect } from "react";
import "./styles/EditEmployee.css";
import { useLocation } from "react-router-dom";

export default function EditEmployee() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const urlId = queryParams.get("id");

    const [employeeId, setEmployeeId] = useState(urlId || "");
    const [form, setForm] = useState(null);
    const [departments, setDepartments] = useState([]);

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

    const loadEmployee = async (id, ignore = false) => {
        try {
            const res = await fetch(`http://localhost:9000/api/employees/${id}`);

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

            if (!ignore) {
                setForm(data);
            }

        } catch {
            alert("Server connection error");
        }
    };

    useEffect(() => {
        let ignore = false;

        const loadEmployeeFromUrl = async () => {
            if (!urlId) return;

            try {
                const res = await fetch(`http://localhost:9000/api/employees/${urlId}`);

                if (!res.ok) {
                    alert("Employee not found in the database");
                    if (!ignore) {
                        setForm(null);
                    }
                    return;
                }

                const data = await res.json();

                if (!data || !data.id) {
                    alert("Employee not found in the database");
                    if (!ignore) {
                        setForm(null);
                    }
                    return;
                }

                if (!ignore) {
                    setForm(data);
                }
            } catch {
                alert("Server connection error");
            }
        };

        loadEmployeeFromUrl();

        return () => {
            ignore = true;
        };
    }, [urlId]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleDepartmentChange = (e) => {
        const departmentId = e.target.value;

        setForm({
            ...form,
            department: departmentId
                ? { id: Number(departmentId) }
                : null
        });
    };

    const buildEmployeePayload = () => {
        return {
            ...form,
            salary: Number(form.salary),
            department: form.department?.id
                ? { id: Number(form.department.id) }
                : null
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:9000/api/employees/${form.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(buildEmployeePayload())
                }
            );

            if (response.ok) {
                alert("Employee updated!");
            } else {
                alert("Error updating employee");
            }
        } catch {
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
                        loadEmployee(employeeId);
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
                    <select
                        name="departmentId"
                        value={form.department?.id || ""}
                        onChange={handleDepartmentChange}
                        required
                    >
                        <option value="">Select department</option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>

                    <button type="submit">Update</button>
                </form>
            )}
        </div>
    );
}
