import React, { useState, useEffect } from "react";
import "./BookingDoctor.css";
import doctor1 from "../img/Home/doctor01.png";
import doctor2 from "../img/Home/doctor02.png";
import doctor3 from "../img/Home/doctor.png";
import chanmeo from "../img/Home/chan_meo.png";
import DoctorProfile from "./DoctorProfile";
import BookingForm from "./BookingForm";

const DoctorCard = ({doctor, onSelect, onBook }) => (
  <div className="booking-doctor_card">
    <img src={doctor.image} alt={doctor.name} />
    <h3>Dr.{doctor.name}</h3>
    <p className="specialty">{doctor.specialization}</p>
    <p className="location-text">{doctor.address}</p>
    <button className="booking-doctor_button" onClick={() => onBook(doctor)}>Đặt lịch</button>
    <button className="booking-doctor_button" onClick={() => onSelect(doctor)}>Thông tin chi tiết</button>
  </div>
);

const BookingDoctor = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false); // Thêm trạng thái mới
  
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        const response = await fetch("https://pet-booking-eta.vercel.app/vet-doctors", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        });
        const result = await response.json();
        const doctorImages = [doctor1, doctor2, doctor3];
        const doctorsWithImages = result.data.map((doctor, index) => ({
          ...doctor,
          image: doctorImages[index % doctorImages.length],
        }));
        setDoctors(doctorsWithImages);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bác sĩ:", error);
      }
    };
  
    fetchDoctors();
  }, []);
  
  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingForm(false); // Đặt lại trạng thái form đặt lịch
  };
  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingForm(true); // Hiện form đặt lịch
  };
  const handleCloseDetail = () => {
    setSelectedDoctor(null);
    setShowBookingForm(false); // Đặt lại trạng thái khi đóng
  };

  return (
    <div className="booking-doctor_container">
      {showBookingForm ? (
        <BookingForm doctor={selectedDoctor} onClose={handleCloseDetail} />
      ) : (
        selectedDoctor ? (
          <DoctorProfile doctor={selectedDoctor} onClose={handleCloseDetail} />
        ) : (
          <>
            <div className="container">
              <h2 className="title">BÁC SỸ THÚ Y</h2>
              <div className="divider-container">
                <hr className="divider" />
                <img src={chanmeo} alt="Chân mèo" className="paw-print" />
                <hr className="divider" />
              </div>
            </div>

            {doctors.map((doctor, index) => (
              <DoctorCard 
                key={index} 
                doctor={doctor} 
                onSelect={handleSelectDoctor} 
                onBook={handleBookAppointment} // Truyền hàm đặt lịch
              />
            ))}
          </>
        )
      )}
    </div>
  );
};

export default BookingDoctor;
