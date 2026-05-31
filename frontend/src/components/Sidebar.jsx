import React from 'react';
import { NavLink } from "react-router-dom";
import './styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">HR Manager</div>

      <ul className="nav-links">
        <li>
          <NavLink to="/employees">Employee list</NavLink>
        </li>
        <li>
          <NavLink to="/add">Add employee</NavLink>
        </li>
        <li>
          <NavLink to="/edit">Edit employee</NavLink>
        </li>
        <li>
            <NavLink to="/add-vacation">Add vacation</NavLink>
        </li>
        <li>
            <NavLink to="/vacation-list">Vacation list</NavLink>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;