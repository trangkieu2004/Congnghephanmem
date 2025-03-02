import React, { useState } from "react";
import muiten from "../img/Service/image 6.png";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./AppointmentForm.css";
const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    petType: "",
    breed: "",
    age: "",
    gender: "",
    species: "",
    paymentMethod: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { title, weight } = location.state || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  if (!location.state) {
    return <div>Không tìm thấy thông tin đặt lịch.</div>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Đã gửi form:", formData);
    // Chuyển hướng đến trang xác nhận lịch hẹn
    navigate("/confirm", { state: formData });
  };

  return (
    <div className="appointment-form">
      <Link to="/services">
        <img src={muiten} alt="quay-lai" className="arrow-icon font-semibol" />
      </Link>
      <h4 className="text-xl font-semibol ml-2">Đặt lịch hẹn</h4>
      <div className="m-5 bg-white">
        <form onSubmit={handleSubmit}>
          <div className="from mb-4">
            <h2 className="font-sem mb-2">
              Thông tin chủ của thú cưng/ Người đặt lịch
            </h2>
            <input
              type="text"
              name = "name"
              placeholder="Họ và tên"
              value={formData.name} 
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone} 
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
          </div>

          <div className="from mb-4">
            <div className="flex items-center">
              <label className="w-1/4 text-sm text-bold mr-2">Ngày: </label>
              <input
                type="date"
                name="date"
                placeholder="Chọn ngày"
                value={formData.date} 
                onChange={handleChange}
                className="w-3/4 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/4 text-sm text-bold mr-3">Giờ: </label>
              <input
                type="time"
                name="time"
                placeholder="Chọn giờ"
                value={formData.time} 
                onChange={handleChange}
                className="w-3/4 p-2 border border-gray-300 rounded"
              />
            </div>
            <h2 className="text-xl mb-2">Thông tin thú cưng</h2>
            <input
              type="text"
              name="petType"
              placeholder="Tên thú cưng"
              value={formData.petType} 
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              name="breed"
              placeholder="Loại thú cưng"
              value={formData.breed} 
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <div className="flex items-center gap-x-4 mb-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="ml-2 mr-2">Đực</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="ml-2">Cái</label>
              </div>
            </div>
            <input
              type="text"
              name="age"
              placeholder="Tuổi"
              value={formData.age} 
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              name="species"
              placeholder="Giống loài"
              value={formData.species} 
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <h2 className="text-xl mb-2">Phương thức thanh toán</h2>
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-2">
              <option value="">Chọn phương thức thanh toán</option>
              <option value="debit_card">Momo</option>
              <option value="cash">Tiền mặt</option>
            </select>
            <div className="text-sm">
              <p>
                <span>
                  <b>Dịch vụ: </b>
                </span>
                {title}
              </p>
              <p>
                <span>
                  <b>Giá: </b>
                </span>{" "}
                150,000 VND
              </p>
              <p>
                <span>
                  <b>Cân nặng: </b>
                </span>{" "}
                {weight}
              </p>
            </div>
            <div className="flex justify-center button-appoint">
              <button type="submit" className="p-2 mb-4">
                Xác nhận đặt lịch
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
