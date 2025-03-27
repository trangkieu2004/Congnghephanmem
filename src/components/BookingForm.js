import React, { useState, useEffect } from "react";
import "./BookingForm.css";
import muiten from "../img/Service/image 6.png";
import letter from "../img/Group 54.png";
import chanmeo from "../img/Home/chan_meo.png";

const BookingForm = ({ doctor, onClose }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    appointmentTime: "",
    petName: "",
    petType: "",
    petBreed: "",
    petAge: "",
    petGender: "",
    paymentMethod: "",
    vetDoctor: doctor?.id || "",
    status: "pending",
    note: "",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  // Cập nhật vetDoctor khi prop doctor thay đổi
  useEffect(() => {
    if (doctor?.name) {
      setFormData((prev) => ({ ...prev, vetDoctor: doctor.name }));
    }
  }, [doctor]);

  // Fetch dữ liệu
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return alert("Bạn chưa đăng nhập!");

      try {
        await Promise.all([
          fetch("https://pet-booking-eta.vercel.app/vet-doctors", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
      } catch (error) {
        console.error("Lỗi khi fetch API:", error);
      }
    };

    fetchData();
  }, []);

  // Xử lý thay đổi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Bạn chưa đăng nhập!");
  
    // Chuyển đổi thời gian hẹn sang định dạng ISO 8601 với phần Z
    const formattedAppointmentTime = new Date(formData.appointmentTime).toISOString();
  
    const dataToSend = { ...formData, appointmentTime: formattedAppointmentTime };
  
    // Kiểm tra vetDoctor
    if (!dataToSend.vetDoctor) {
      alert("Vui lòng chọn bác sĩ thú y.");
      return;
    }
  
    console.log("Dữ liệu gửi đi:", JSON.stringify(dataToSend)); // Ghi lại dữ liệu
  
    try {
      const response = await fetch(
        "https://pet-booking-eta.vercel.app/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );
  
      const result = await response.json();
      if (response.ok) {
        setShowConfirmation(true);
      } else {
        console.error("Lỗi từ máy chủ:", result); // Ghi lại lỗi từ máy chủ
        alert(`Lỗi: ${result.message || "Có lỗi xảy ra."}`);
      }
    } catch (error) {
      alert("Không thể kết nối đến server.");
    }
  };

  const handleBack = () => {
    setShowConfirmation(false);
    setFormData({
      customerName: "",
      customerPhone: "",
      appointmentTime: "",
      petName: "",
      petType: "",
      petBreed: "",
      petAge: "",
      petGender: "",
      paymentMethod: "",
      vetDoctor: doctor?.id || "",
      status: "pending",
      note: "",
    });
  };

  return (
    <div className="booking-form">
      {showConfirmation ? (
        <div className="container-fluid confirmDoctor">
          <h2>BÁC SỸ THÚ Y</h2>
          <div className="divider-container">
            <hr className="divider" />
            <img src={chanmeo} alt="Chân mèo" className="paw-print" />
            <hr className="divider" />
          </div>
          <div className="container-fluid content">
            <div className="back">
              <img
                src={muiten}
                alt="back"
                className="arrow-icon"
                onClick={handleBack}
              />
            </div>
            <div className="content-wrapper">
              <img src={letter} alt="" className="letter" />
              <div className="text-container">
                <h4 className="confirm-title">Xác nhận lịch hẹn</h4>
                <p className="confirm-message">
                  Bạn đã xác nhận đặt lịch thành công. <br />
                  Trong vòng 24h PetStation sẽ liên hệ với bạn để xác nhận lại
                  lịch hẹn.
                  <br /> Cảm ơn bạn đã sử dụng dịch vụ của PetStation!
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="header-booking">
            <img
              src={muiten}
              alt="quay-lai"
              className="back-doctor font-semibol"
              onClick={onClose}
            />
            <img
              src={doctor.image}
              alt={doctor.name}
              className="image-doctor"
            />
            <h3>{doctor.name}</h3>
          </div>

          <h4 className="text-xl font-semibold ml-2">Đặt lịch hẹn</h4>
          <div className="m-5 bg-white">
            <form onSubmit={handleSubmit}>
              <div className="from mb-4">
                <h2 className="font-sem mb-2">
                  Thông tin chủ của thú cưng/ Người đặt lịch
                </h2>
                <input
                  type="text"
                  name="customerName"
                  placeholder="Họ và tên"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <input
                  type="text"
                  name="customerPhone"
                  placeholder="Số điện thoại"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
              </div>

              <div className="from mb-4">
                <div className="flex items-center">
                  <label className="w-1/4 text-sm text-bold mr-2">
                    Thời gian hẹn:{" "}
                  </label>
                  <input
                    type="datetime-local"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    required
                  />
                </div>
                <h2 className="text-xl mb-2">Thông tin thú cưng</h2>
                <input
                  type="text"
                  name="petName"
                  placeholder="Tên thú cưng"
                  value={formData.petName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <input
                  type="text"
                  name="petType"
                  placeholder="Loại thú cưng"
                  value={formData.petType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <div className="flex items-center gap-x-4 mb-2">
                  <label>Giới tính:</label>
                  <select
                    name="petGender"
                    value={formData.petGender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Chọn</option>
                    <option value="MALE">Đực</option>
                    <option value="FEMALE">Cái</option>
                    <option value="OTHER">Khác</option>
                  </select>
                </div>
                <input
                  type="number"
                  name="petAge"
                  placeholder="Tuổi"
                  value={formData.petAge}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <input
                  type="text"
                  name="petBreed"
                  placeholder="Giống loài"
                  value={formData.petBreed}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <h2 className="text-xl mb-2">Phương thức thanh toán</h2>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="">Chọn phương thức thanh toán</option>
                  <option value="cash">Tiền mặt</option>
                  <option value="credit_card">Thẻ tín dụng</option>
                  <option value="paypal">PayPal</option>
                </select>
                <div className="flex justify-center button-appoint">
                  <button type="submit" className="p-2 mb-4">
                    Xác nhận đặt lịch
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingForm;