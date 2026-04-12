import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar'
import AddEmployee from "./components/AddEmployee";
import EmployeeList from "./components/EmployeeList";
import EditEmployee from "./components/EditEmployee";

import { Outlet } from "react-router-dom";


function DeleteEmployee() {
  return <h1>Delete Employee</h1>;
}

function Departments() {
  return <h1>Departments</h1>;
}

function Payroll() {
  return <h1>Payroll</h1>;
}

function Layout() {
  return (
    <>
      <Sidebar />
      <div style={{ marginLeft: "260px", padding: "20px" }}>
        <Outlet />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="employees" element={<EmployeeList/>} />
          <Route path="add" element={<AddEmployee />} />
          <Route path="edit" element={<EditEmployee/>}/>
          <Route path="delete" element={<DeleteEmployee />} />
          <Route path="departments" element={<Departments />} />
          <Route path="payroll" element={<Payroll />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}