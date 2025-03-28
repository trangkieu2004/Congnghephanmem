import React, { useState, useEffect } from "react";
import "./BookingForm.css";
import muiten from "../img/Service/image 6.png";
import letter from "../img/Group 54.png";
import chanmeo from "../img/Home/chan_meo.png";

const BookingForm = ({ doctor, onClose }) => {
  console.log("Bác sĩ được chọn:", doctor);
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
    vetDoctor: doctor?._id || "",  // Sử dụng id thay vì name
    status: "pending",
    note: "",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (doctor?.id) {
      setFormData((prev) => ({
        ...prev,
        vetDoctor: doctor.id, // Cập nhật ID bác sĩ
      }));
    }
  }, [doctor]);

  // Xử lý thay đổi dữ liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Kiểm tra dữ liệu trước khi gửi
  const validateForm = () => {
    const requiredFields = ["customerName", "customerPhone", "appointmentTime", "petName", "petType", "paymentMethod", "vetDoctor"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Vui lòng nhập đầy đủ thông tin: ${field}`);
        return false;
      }
    }
    return true;
  };

  // Gửi form đặt lịch
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    if (!token) return alert("Bạn chưa đăng nhập!");

    // Chuẩn hóa thời gian về ISO 8601 (bỏ giây nếu cần)
    const formattedAppointmentTime = new Date(formData.appointmentTime).toISOString();

    const dataToSend = {
      ...formData,
      appointmentTime: formattedAppointmentTime,
      vetDoctor: doctor?.id, // Đảm bảo gửi id thay vì name
    };

    console.log("Dữ liệu gửi đi:", JSON.stringify(dataToSend));

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
        console.error("Lỗi từ máy chủ:", result);
        alert(`Lỗi: ${result.message || "Có lỗi xảy ra."}`);
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      alert("Không thể kết nối đến server.");
    }
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
                onClick={() => setShowConfirmation(false)}
              />
            </div>
            <div className="content-wrapper">
              <img src={letter} alt="" className="letter" />
              <div className="text-container">
                <h4 className="confirm-title">Xác nhận lịch hẹn</h4>
                <p className="confirm-message">
                  Bạn đã đặt lịch thành công! <br />
                  Trong vòng 24h, PetStation sẽ liên hệ để xác nhận lịch hẹn.
                  <br /> Cảm ơn bạn đã sử dụng dịch vụ của PetStation!
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="header-booking">
            <img src={muiten} alt="quay-lai" className="back-doctor" onClick={onClose} />
            <img src={doctor.image} alt={doctor.name} className="image-doctor" />
            <h3>{doctor.name}</h3>
          </div>

          <h4 className="text-xl font-semibol ml-2">Đặt lịch hẹn</h4>
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
                  className="w-full p-2 border rounded mb-2"
                />
              </div>

              <div className="from mb-4">
                <label>Thời gian hẹn: </label>
                <input
                  type="datetime-local"
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <h2 className="text-xl mb-2">Thông tin thú cưng</h2>
                <input
                  type="text"
                  name="petName"
                  placeholder="Tên thú cưng"
                  value={formData.petName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <input type="text" name="petType" placeholder="Loại thú cưng" value={formData.petType} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
                <select name="petGender" value={formData.petGender} onChange={handleChange} required>
                  <option value="">Chọn giới tính</option>
                  <option value="MALE">Đực</option>
                  <option value="FEMALE">Cái</option>
                  <option value="OTHER">Khác</option>
                </select>
                <input type="number" name="petAge" placeholder="Tuổi" value={formData.petAge} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
                <input type="text" name="petBreed" placeholder="Giống loài" value={formData.petBreed} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
                <h2 className="text-xl mb-2">Phương thức thanh toán</h2>
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
                  <option value="">Chọn phương thức</option>
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
