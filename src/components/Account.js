import React, { useState, useEffect } from "react";
import "./Account.css";
import chanmeo from "../img/Home/chan_meo.png";
import muiten from "../img/Service/image 6.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    phone: "",
    email: "",
    sex: "nữ",
  });

  const [isEditing, setIsEditing] = useState({
    username: false,
    address: false,
    phone: false,
    email: false,
    sex: false,
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.error("Không tìm thấy userId hoặc token");
      navigate("/login"); // Chuyển về login nếu không có userId hoặc token
      return;
    }

    const fetchUserData = async () => {
      try {
        console.log("userId:", userId);
        console.log("token:", token);
        const res = await axios.get(
          `https://pet-booking-eta.vercel.app/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Kết quả API:", res.data);

        const user = res.data.data;
        if (!user) {
          console.error("Không có user trong response");
          return;
        }

        setFormData({
          username: user.username || "",
          address: user.address || "",
          phone: user.phone || "",
          email: user.email || "",
          sex: user.sex || "nữ",
        });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu user:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: !isEditing[field] });
  };

  const handleBack = () => {
    navigate("/home");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!formData.username || !formData.email || !formData.phone) {
      toast.error("Vui lòng điền đầy đủ thông tin trước khi cập nhật.");
      return;
    }

    try {
      const response = await axios.put(
        `https://pet-booking-eta.vercel.app/user/update/${userId}`,
        {
          username: formData.username,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          sex: formData.sex,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Response update:", response.data);
      toast.success("Cập nhật thành công!");
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error.response || error);
      toast.error("Cập nhật thất bại, vui lòng thử lại!");
    }
  };

  return (
    <div className="container-profile">
      <h2>THÔNG TIN CÁ NHÂN</h2>
      <div className="divider-container">
        <hr className="dividermeo" />
        <img src={chanmeo} alt="Chân mèo" className="paw-print" />
        <hr className="dividermeo" />
      </div>
      <div className="profile">
        <div className="back">
          <img
            src={muiten}
            alt="back"
            className="arrow-icon"
            onClick={handleBack}
          />
        </div>
        <form onSubmit={handleSubmit} className="form-profile">
          {Object.keys(formData).map(
            (field, index) =>
              field !== "sex" && (
                <div className="form-group-profile" key={index}>
                  <label>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <div className="input-group">
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      disabled={!isEditing[field]}
                    />
                    <i
                      className="fas fa-edit edit-icon"
                      onClick={() => toggleEdit(field)}
                    ></i>
                  </div>
                </div>
              )
          )}
          <div className="form-group-profile">
            <label>Giới tính:</label>
            <div className="select-container">
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                disabled={!isEditing.sex}
              >
                <option value="nữ">Nữ</option>
                <option value="nam">Nam</option>
              </select>
              <i
                className="fas fa-edit edit-icon"
                onClick={() => toggleEdit("sex")}
              ></i>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Lưu
          </button>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default Account;
