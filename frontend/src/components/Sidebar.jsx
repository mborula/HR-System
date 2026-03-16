import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">HR Manager</div>
      <ul className="nav-links">
        <li>Employee list</li>
        <li>Add employee</li>
        <li>Delete employee</li>
        <li>Departments</li>
        <li>Payroll</li>
        <li></li>
      </ul>
      
    </div>
  );
};

export default Sidebar;