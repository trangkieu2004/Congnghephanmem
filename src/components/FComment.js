import React, { useState, useRef, useEffect } from "react";
import "./FComment.css";
import logo from "../img/anhnen.png";
import anhnen from "../img/image 1.png";
import search from "../img/Search.png";
import { Link, useNavigate } from "react-router-dom";

const FComment = ({ username, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Tạo ref cho dropdown

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Đóng dropdown khi nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
                <Link to="/home" className="nav-link">
                  Trang Chủ
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link to="/introduce" className="nav-link">
                  Giới Thiệu
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link to="/services" className="nav-link">
                  Dịch Vụ
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link to="/booking-doctor" className="nav-link">
                  Bác Sĩ Thú Y
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link to="/contact" className="nav-link">
                  Liên Hệ
                </Link>
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
          <div className="d-flex align-items-center nav-link">
            {username ? (
              <div className="dropdown" ref={dropdownRef}>
                <span
                  style={{
                    marginLeft: "30px",
                    color: "black",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={toggleDropdown}
                >
                  {username} ▼
                </span>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item">
                      Thông tin cá nhân
                    </Link>
                    <Link to="/status-service" className="dropdown-item">
                      Danh sách đặt lịch hẹn
                    </Link>
                    <Link to="/bill" className="dropdown-item">
                      Hóa đơn
                    </Link>
                    <span
                      className="dropdown-item"
                      onClick={onLogout} // Xử lý đăng xuất
                      style={{ cursor: "pointer" }}
                    >
                      Log out
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <span
                className="nav-link mx-3"
                onClick={() => navigate("/login")} // Điều hướng đến Login
                style={{ cursor: "pointer", color: "black" }}
              >
                Login
              </span>
            )}
          </div>
        </div>
      </header>
      <div className="container-fluid p-0 ">
        <img src={anhnen} alt="anhlogo" className="img-fluid w-100 anhnen" />
      </div>
    </div>
  );
};

export default FComment;