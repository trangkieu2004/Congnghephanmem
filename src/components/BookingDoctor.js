import React, {useState} from "react";
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
    <h3>{doctor.name}</h3>
    <p className="specialty">{doctor.specialty}</p>
    <p className="location-text">{doctor.location}</p>
    <button className="booking-doctor_button" onClick={() => onBook(doctor)}>Đặt lịch</button>
    <button className="booking-doctor_button" onClick={() => onSelect(doctor)}>Thông tin chi tiết</button>
  </div>
);

const BookingDoctor = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false); // Thêm trạng thái mới
  
  const doctors = [
    {
      name: "Dr. Nguyễn Ngọc Mai",
      specialty: (
        <>
          X-Quang và Siêu âm <br />
          Y khoa và Nội khoa
        </>
      ),
      location: "Hoàng Mai - Hà Nội",
      image: doctor1,
    },
    {
      name: "Dr. Dương Anh Ngọc",
      specialty: (
        <>
          X-Quang và Siêu âm <br />
          Y khoa và Nội khoa
        </>
      ),
      location: "Hoàng Mai - Hà Nội",
      image: doctor2,
    },
    {
      name: "Dr. Kiều Bách Anh",
      specialty: (
        <>
          X-Quang và Siêu âm <br />
          Y khoa và Nội khoa
        </>
      ),
      location: "Hoàng Mai - Hà Nội",
      image: doctor3,
    },
  ];
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
