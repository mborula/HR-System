import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar'
import AddEmployee from "./components/AddEmployee";
import EmployeeList from "./components/EmployeeList";
import EditEmployee from "./components/EditEmployee";
import VacationList from "./components/VacationList";
import DepartmentList from "./components/DepartmentList";
import { Outlet } from "react-router-dom";
import AddVacation from "./components/AddVacation";





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
          <Route path="add-vacation" element={<AddVacation />} />
          <Route path="vacation-list" element={<VacationList />} />
          <Route path="departments" element={<DepartmentList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
