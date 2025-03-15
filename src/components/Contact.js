import React, { useState } from "react";
import "./Contact.css";
import pictuercat from "../img/avatar-anh-meo-cute-3 1.png";
import chanmeo from "../img/Home/chan_meo.png";
import muiten from "../img/Service/image 6.png";
import letter from "../img/Group 54.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    content: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // New state for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Đã gửi dữ liệu:", formData);
    setIsSubmitted(true); // Set submitted state to true
    // Thêm logic gửi dữ liệu ở đây
  };
  const handleBack = () => {
    setIsSubmitted(false); // Quay lại form đăng ký
    setFormData({
      // Đặt lại dữ liệu form
      name: "",
      address: "",
      phone: "",
      email: "",
      content: "",
    });
  };
  return (
    <div className="contact-form-container">
      <h2>CONTACT FORM</h2>
      <div className="divider-container">
        <hr className="divider" />
        <img src={chanmeo} alt="Chân mèo" className="paw-print" />
        <hr className="divider" />
      </div>

      {isSubmitted ? (
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
              <p className="confirm-message">
                Bạn đã gửi thông tin liên lạc thành công.
                <br />
                Trong vòng 24h PetStation sẽ liên hệ với bạn. Cảm ơn bạn đã sử
                dụng dịch vụ PetStation!
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="form-content">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="name">
                <i className="fas fa-user"></i>Họ tên
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">
                <i className="fas fa-map-marker-alt"></i>Địa chỉ
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">
                <i className="fas fa-phone"></i>SDT
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                <i className="fas fa-envelope"></i>Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">
                <i className="fas fa-comment-dots"></i>Nội dung
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Gửi</button>
          </form>
          <div className="image-container">
            <img
              src={pictuercat} // Hình ảnh mèo
              alt="Cute Cat"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
