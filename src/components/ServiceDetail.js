import React from "react";
import "./ServiceDetail.css";
import { useLocation } from "react-router-dom";
const ServiceDetail = () => {
  const location = useLocation();
  const { title, price, image = [] } = location.state || {};

  // Kiểm tra trường hợp không có state
  if (!location.state) {
    return <div>Không tìm thấy thông tin dịch vụ.</div>;
  }

  return (
    <div className="container-fluid service-detail-container">
      <div className="service-info">
        <img src={image} alt={title} className="detail-image" />
        <div className="infont">
          <h2>Tên dịch vụ: {title}</h2>
          <div className="rating">
            <span>Đánh giá: </span>
            <span>★★★★☆</span>
          </div>
          <div className="weight-range">
            <span>Cân nặng: </span>
            <div className="weight-container">
              <div className="weight-box">&lt; 5 kg</div>
              <div className="weight-box">5 - 10 kg</div>
              <div className="weight-box">10 - 20 kg</div>
            </div>
          </div>
          <div className="price-container">
            <p>{price}</p>
          </div>
          <button className="order-button">Đặt lịch</button>
        </div>
      </div>
      <div className="description">
        <button className="order-button">Nội dung chi tiết</button>
        <p>
          PETSTATION là dịch vụ chăm sóc thú cưng chuyên nghiệp, cung cấp các
          dịch vụ tắm sấy, vệ sinh, cắt tỉa và các dịch vụ khác nhằm đảm bảo sức
          khỏe và vẻ đẹp cho thú cưng của bạn.
        </p>
      </div>
    </div>
  );
};

export default ServiceDetail;
