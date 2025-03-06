import React, { useState } from "react";
import "./DoctorProfile.css";
import muiten from "../img/Service/image 6.png";
import chanmeo from "../img/Home/chan_meo.png";
import home from "../img/Home.png";
import BookingForm from "./BookingForm";
const DoctorProfile = ({ doctor, onClose }) => {
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleOpenBookingForm = () => {
    setShowBookingForm(true);
  };
  return (
    <div className="container-fluid">
      {showBookingForm ? (
        <BookingForm
          doctor={doctor}
          onClose={() => setShowBookingForm(false)}
        />
      ) : (
        <>
          <img src={muiten} alt="" className="backhome" onClick={onClose} />
          <h1>BÁC SĨ THÚ Y</h1>
          <div className="divider-container">
            <hr className="divider" />
            <img src={chanmeo} alt="Chân mèo" className="paw-print" />
            <hr className="divider" />
          </div>
          <div className="doctor-detail">
            <div className="button-closed">
              <img src={home} alt="" onClick={onClose} />
              <p>Quay lại danh sách bác sỹ</p>
            </div>

            <div className="doctor-info">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="doctor-image"
              />
              <div className="doctor-text">
                <h2 className="doctor-name">{doctor.name}</h2>
                <p className="specialty-details">
                  X-Quang và Siêu âm / Y khoa và Nội khoa
                </p>
                <p className="specialty-details">{doctor.location}</p>
                <button
                  className="book-appointment-button"
                  onClick={handleOpenBookingForm}
                >
                  Đặt lịch
                </button>
              </div>
            </div>
            <h3>Chuyên môn:</h3>
            <p>
              Chẩn đoán siêu âm ở động vật nhỏ, Đại học Chulalongkorn, Chẩn đoán
              hình ảnh ngực và bụng, Trường Nghiên cứu Thú y Cao cấp Châu Âu
              (ESAVS)
            </p>
            <h3>Trình độ / Chứng chỉ:</h3>
            <p>
              2006: Bachelor’s Degree of Doctor of Veterinary Medicine (D.V.M),
              Chulalongkorn University
            </p>
            <p>2012: Master Degree of Marketing (M.M), Mahidol University</p>
          </div>
        </>
      )}
    </div>
  );
};

export default DoctorProfile;
