import React from "react";
import "./ConfirmBooking.css";
import { Link } from "react-router-dom";
import letter from "../img/Group 54.png";
import muiten from "../img/Service/image 6.png";
import chanmeo from "../img/Home/chan_meo.png";

const ConfirmBooking = () => {
  // const location = useLocation();

  return (
    <div className="container-fluid confirmBooking">
      <h2>DỊCH VỤ SPA</h2>
      <div className="divider-container">
        <hr className="divider" />
        <img src={chanmeo} alt="Chân mèo" className="paw-print" />
        <hr className="divider" />
      </div>
      <div className="container-fluid content">

        <div className="back">
          <Link to="/services">
            <img src={muiten} alt="back" className="arrow-icon" />
          </Link>
        </div>

        <div className="content-wrapper">
          <img src={letter} alt="" className="letter"/>

          <div className="text-container">
            <h4 className="confirm-title">Xác nhận lịch hẹn</h4>
            <p className="confirm-message">
              Bạn đã xác nhận đặt lịch thành công.<br/> Trong vòng 24h PetStation sẽ
              liên hệ với bạn để xác nhận lại lịch hẹn. <br /> Cảm ơn bạn đã sử dụng dịch vụ của PetStation!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;
