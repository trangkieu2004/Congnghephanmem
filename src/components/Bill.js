import React from "react";
import "./Bill.css";
import chanmeo from "../img/Home/chan_meo.png";
import muiten from "../img/Service/image 6.png";

const Bill = () => {
  return (
    <div className="container status-service">
      <h2>Hóa Đơn</h2>
      <div className="divider-container">
        <hr className="divider" />
        <img src={chanmeo} alt="Chân mèo" className="paw-print" />
        <hr className="divider" />
      </div>
      <div className="progress-container">
        <div className="progress-bar">
          <img src={muiten} alt=""  className="back-progress"/>
        </div>
        <table className="info-table">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>SĐT</th>
            <th>Tên thú cưng</th>
            <th>Giống</th>
            <th>Loại</th>
            <th>Dịch vụ</th>
            <th>Ngày</th>
            <th>Giờ</th>
            <th>Phương thức thanh toán</th>
            <th>Giá</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nguyễn Văn A</td>
            <td>0123456789</td>
            <td>Chó</td>
            <td>Golden Retriever</td>
            <td>Thú cưng</td>
            <td>Tắm rửa</td>
            <td>01/01/2023</td>
            <td>10:00</td>
            <td>Chuyển khoản</td>
            <td>500.000 VNĐ</td>
          </tr>
          {/* Thêm các hàng khác nếu cần */}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Bill;
