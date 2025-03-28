import React, { useState, useEffect } from "react";
import "./ServiceStatus.css";
import axios from "axios";
import chanmeo from "../img/Home/chan_meo.png";
import cancel from "../img/Delete.png";

const ServiceStatus = () => {
  const [appointments, setAppointments] = useState([]); // State để lưu danh sách lịch hẹn
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  const currentUserId = localStorage.getItem("userId"); // Lấy userId từ localStorage
  console.log("🔍 userId hiện tại:", currentUserId);
  useEffect(() => {
    if (!token) {
      console.error("Chưa có token");
      return;
    }

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "https://pet-booking-eta.vercel.app/appointments",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("📦 Dữ liệu API trả về:", response.data);

        if (Array.isArray(response.data.data)) {
          const filteredAppointments = response.data.data.filter(
            (appointment) => {
              console.log(
                `🧐 So sánh: ${appointment.userId} === ${currentUserId}`
              );
              return appointment.userId === currentUserId;
            }
          );
          console.log("✅ Lịch hẹn của user:", filteredAppointments);
          setAppointments(filteredAppointments); // Lưu toàn bộ danh sách lịch hẹn
        } else {
          console.error("❌ Dữ liệu không hợp lệ!", response.data);
          setAppointments([]); // Đảm bảo state không bị lỗi
        }
      } catch (error) {
        console.error("🚨 Lỗi khi lấy danh sách lịch hẹn:", error);
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, [token]);

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
                  <td>{appointment.status}</td>
                  <td>
                    <button>
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