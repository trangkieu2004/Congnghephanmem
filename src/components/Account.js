import React, { useState } from "react";
import "./Account.css";
import chanmeo from "../img/Home/chan_meo.png";
import muiten from "../img/Service/image 6.png";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Username: "",
    Address: "",
    phone: "",
    email: "",
    sex: "nữ", // Đặt giá trị mặc định cho giới tính
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [isEditing, setIsEditing] = useState({
    Username: false,
    Address: false,
    phone: false,
    email: false,
    sex: false,
  });
  const handleBack = () => {
    navigate("/home");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const toggleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: !isEditing[field] });
  };
  return (
    <div className="container-profile">
      <h2>THÔNG TIN CÁ NHÂN</h2>
      <div className="divider-container">
        <hr className="divider" />
        <img src={chanmeo} alt="Chân mèo" className="paw-print" />
        <hr className="divider" />
      </div>
      <div className="profile">
        <div className="back">
          <img
            src={muiten}
            alt="back"
            className="arrow-icon"
            onClick={handleBack}
          />
        </div>
        <form onSubmit={handleSubmit} className="form-profile">
          {Object.keys(formData).map((field, index) => (
            field !== "sex" && ( // Loại bỏ trường giới tính ở đây
            <div className="form-group-profile" key={index}>
              <label>{field === "Username" ? "Username" : field}</label>
              <div className="input-group">
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field.toLowerCase()}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={!isEditing[field]} // Vô hiệu hóa input nếu không ở chế độ chỉnh sửa
                />
                <i
                  className={`fas fa-edit edit-icon`} // Sử dụng biểu tượng chỉnh sửa từ Font Awesome
                  onClick={() => toggleEdit(field)}
                ></i>
              </div>
            </div>
            )
          ))}
          <div className="form-group-profile">
            <label>Giới tính:</label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
            >
              <option value="nữ">Nữ</option>
              <option value="nam">Nam</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
};

export default Account;