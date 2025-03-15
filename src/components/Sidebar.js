import React from 'react';
import './Sidebar.css';
import { Link, useLocation } from "react-router-dom";
import logo from "../img/anhnen.png"; // Đảm bảo đường dẫn đúng

const Sidebar = ({ isScheduleOpen, toggleSchedule }) => {
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
  };
  return (
    <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav>
        <Link 
          className={`menu-item ${isActive("/profile") ? "active" : ""}`} 
          to="/profile" 
        >
          <i className="fas fa-home menu-icon"></i>
          Home
        </Link>
        <div>
          <span 
            className={`menu-item ${location.pathname.startsWith("/lich") ? "active" : ""}`} 
            onClick={toggleSchedule}
          >
            <i className="fas fa-calendar-alt menu-icon"></i>
            Lịch
          </span>
          {isScheduleOpen && (
            <div className="sub-menu">
              <Link 
                className={`sub-menu-item ${isActive("/lich-spa") ? "active" : ""}`} 
                to="/lich-spa" 
              >
                <i className="fas fa-spa menu-icon"></i>
                Lịch Spa
              </Link>
              <Link 
                className={`sub-menu-item ${isActive("/lich-kham") ? "active" : ""}`} 
                to="/lich-kham" 
              >
                <i className="fas fa-user-md menu-icon"></i>
                Lịch Khám
              </Link>
            </div>
          )}
        </div>
        <Link 
          className={`menu-item ${isActive("/tai-khoan") ? "active" : ""}`} 
          to="/tai-khoan" 
        >
          <i className="fas fa-user menu-icon"></i>
          Tài khoản
        </Link>
        <Link 
          className={`menu-item ${isActive("/pets") ? "active" : ""}`} 
          to="/pets" 
        >
          <i className="fas fa-paw menu-icon"></i>
          Pets
        </Link>
        </nav>
      </div>
  )
}

export default Sidebar
