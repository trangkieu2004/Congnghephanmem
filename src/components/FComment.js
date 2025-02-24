import React from "react";
import "./FComment.css";
import logo from "../img/anhnen.png";
import anhnen from "../img/image 1.png";
import search from '../img/Search.png';
import { Link , useNavigate} from 'react-router-dom';
const FComment = ({onLoginClick}) => {
  const navigate = useNavigate();

  return (
    <div className="app">
      <header className="header p-3" role="banner">
        <div className="container d-flex justify-content-between align-items-center phandau">
          <div className="Img">
            <img src={logo} alt="Logo" className="img-fluid" />
          </div>
          <nav className="nav">
            <ul className="nav-list d-flex justify-content-center m-0">
              <li className="nav-item mx-3">
                <Link to="/home" className="nav-link">Trang Chủ</Link>
              </li>
              <li className="nav-item mx-3">
                <Link to="/introduce" className="nav-link">Giới Thiệu</Link>
              </li>
              <li className="nav-item mx-3">
                <Link to="/services" className="nav-link">Dịch Vụ</Link>
              </li>
              <li className="nav-item mx-3">
                <Link to="/vet" className="nav-link">Bác Sĩ Thú Y</Link>
              </li>
              <li className="nav-item mx-3">
                <Link to="/contact" className="nav-link">Liên Hệ</Link>
              </li>
            </ul>
          </nav>
          <div className="search-container">
            <input
              type="text"
              placeholder=""
              className="form-control search-input"
            />
            <img className="search-icon" src={search} alt="Search" />
          </div>
          <span 
            className="nav-link mx-3" 
            onClick={() => navigate('/login')} // Điều hướng đến Login
            style={{ cursor: "pointer", color: "black" }}
          >
            Login
          </span>
        </div>
      </header>
      <div className="container-fluid p-0 ">
        <img
          src={anhnen} alt="anhlogo" className="img-fluid w-100 anhnen"/>
      </div>
    </div>
  );
};

export default FComment;
