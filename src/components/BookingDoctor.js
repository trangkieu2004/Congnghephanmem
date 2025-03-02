import React from "react";
import "./BookingDoctor.css";
import doctor1 from "../img/Home/dortor1.png";
import doctor2 from "../img/Home/dortor2.png";
import doctor3 from "../img/Home/doctor.png";
import chanmeo from "../img/Home/chan_meo.png";

const DoctorCard = ({ name, specialty, location, image }) => (
  <div className="booking-doctor_card">
    <img src={image} alt={name} />
    <h3>{name}</h3>
    <p className="specialty">{specialty}</p>
    <p className="location-text">{location}</p>
    <button className="booking-doctor_button">Đặt lịch</button>
    <button className="booking-doctor_button">Thông tin chi tiết</button>
  </div>
);

const BookingDoctor = () => {
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

  return (
    <div className="booking-doctor_container">
      <div className="container">
        <h2 className="title">BÁC SỸ THÚ Y</h2>
        <div className="divider-container">
          <hr className="divider" />
          <img src={chanmeo} alt="Chân mèo" className="paw-print" />
          <hr className="divider" />
        </div>
      </div>

      {doctors.map((doctor, index) => (
        <DoctorCard key={index} {...doctor} />
      ))}
    </div>
  );
};

export default BookingDoctor;
