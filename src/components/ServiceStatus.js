import React, { useState, useEffect } from "react";
import "./ServiceStatus.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import chanmeo from "../img/Home/chan_meo.png";
import cancel from "../img/Delete.png";

const ServiceStatus = () => {
  const [appointments, setAppointments] = useState([]); // State để lưu danh sách lịch hẹn
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      alert("Bạn chưa đăng nhập!");
      navigate("/login");
      return;
    }
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(
          "https://pet-booking-eta.vercel.app/appointments",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("📦 Dữ liệu từ API:", response.data);

        if (Array.isArray(response.data.data)) {
          setAppointments(response.data.data);
        } else {
          console.error("❌ Dữ liệu không hợp lệ!", response.data);
          setAppointments([]);
        }
      } catch (error) {
        console.error("🚨 Lỗi khi lấy dữ liệu:", error);
        setAppointments([]);
      }
    };

    fetchSchedules();
  }, [token, navigate]);
  const handleCancelAppointment = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn hủy lịch hẹn này?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `https://pet-booking-eta.vercel.app/appointments/${id}/cancel`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("🗑️ Xóa lịch hẹn thành công:", response.data);
      alert("Lịch hẹn đã được hủy!");
  
      // Cập nhật danh sách hiển thị
      setAppointments((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("❌ Lỗi khi hủy lịch hẹn:", error.response?.data || error.message);
      alert("Hủy lịch hẹn thất bại!");
    }
  };
  return (
    <div className="container status-service">
      <h2>DANH SÁCH ĐẶT LỊCH HẸN</h2>
      <div className="divider-container">
        <hr className="divider" />
        <img src={chanmeo} alt="Chân mèo" className="paw-print" />
        <hr className="divider" />
      </div>
      <div className="progress-container">
        <table className="info-table">
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>SĐT</th>
              <th>Tên thú cưng</th>
              <th>Giống</th>
              <th>Loại</th>
              <th>Dịch vụ</th>
              <th>Bác sỹ</th>
              <th>Ngày</th>
              <th>Phương thức thanh toán</th>
              <th>Giá</th>
              <th>Trạng thái</th>
              <th>Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.customerName}</td>
                  <td>{appointment.customerPhone}</td>
                  <td>{appointment.petName}</td>
                  <td>{appointment.petBreed}</td>
                  <td>{appointment.petType}</td>
                  <td>{appointment.service?.name || "Không có dịch vụ"}</td>
                  <td>{appointment.vetDoctor?.name || "Chưa có bác sĩ"}</td>
                  <td>{new Date(appointment.appointmentTime).toLocaleString()}</td>
                  <td>{appointment.paymentMethod}</td>
                  <td>{appointment.service?.price} VND</td>
                  <td>{appointment.status}</td>
                  <td>
                    <button onClick={() => handleCancelAppointment(appointment._id)}>
                      <img src={cancel} alt="Delete" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" style={{ textAlign: "center", padding: "10px" }}>
                  Không có lịch hẹn nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceStatus;