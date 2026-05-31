import React, { useEffect, useState } from "react";
import "./styles/VacationList.css";


export default function VacationList() {
    const [vacations, setVacations] = useState([]);

    const fetchVacations = async () => {
        fetch("http://localhost:9000/api/vacation")
            .then(res => res.json())
            .then(vacations => {
                setVacations(vacations)
            })
            .catch(err => console.log(err));
    }

    const deleteVacation = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this vacation?");
        if (!confirmed) return;
        try {
            const response = await fetch(`http://localhost:9000/api/vacation/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                fetchVacations(); // refresh the list after deletion
            } else {
                console.error("Error deleting vacation");
            }
        } catch (error) {
            console.error("Connection error:", error);
        }
    };


    const calculateDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const diffTime = end - start;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        return diffDays + 1;
    };

    useEffect(() => {
        fetchVacations();

    }, []);

    return (
        <div className="vacation-list-container">
            <h1 className="header-text">Vacation List</h1>

            <table>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Employee ID</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Days</th>
                    <th>Vacation ID</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {vacations.map((vacation) => (
                    <tr key={vacation.vacationId}>
                        <td>{vacation.firstName}</td>
                        <td>{vacation.lastName}</td>
                        <td>{vacation.employeeId}</td>
                        <td>{vacation.startDate}</td>
                        <td>{vacation.endDate}</td>
                        <td>{calculateDays(vacation.startDate, vacation.endDate)}</td>
                        <td>{vacation.vacationId}</td>
                        <td id="action-buttons">
                            <button className="delete-button" onClick={() => deleteVacation(vacation.vacationId)}>
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