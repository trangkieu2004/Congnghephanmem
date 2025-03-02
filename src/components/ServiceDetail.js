import React, {useState} from "react";
import "./ServiceDetail.css";
import picture1 from "../img/Service/image 7.png";
import muiten from "../img/Service/image 6.png";
import picture2 from "../img/Service/image 8.png";
import picture3 from "../img/Service/image 9.png";
import { useLocation, useNavigate , Link} from "react-router-dom";

const ServiceDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { title, price, image } = location.state || {};
  const [selectedWeight, setSelectedWeight] = useState('');

  // Kiểm tra trường hợp không có state
  if (!location.state) {
    return <div>Không tìm thấy thông tin dịch vụ.</div>;
  }

  const handleBooking = () => {
    navigate("/booking", { state: { title, weight: selectedWeight } }); // Đường dẫn đến trang đặt lịch
  };

  return (
    <div className="container-fluid bg-white flex justify-center items-center min-h-screen">
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <div className="flex items-center mb-4">
          <Link to="/services">
            <img src={muiten} alt="quay-lai" className="arrow-icon" />
          </Link>
        </div>
        <div className="flex">
          <div className="flex-shrink-0">
            <img
              alt={title}
              className="w-48 h-48 object-cover rounded-lg mb-4"
              src={image}
            />
            <div className="flex space-x-2 mb-4">
              <img
                alt="Hình ảnh 1 về dịch vụ"
                className="w-12 h-12 object-cover rounded-lg"
                src={picture1}
              />
              <img
                alt="Hình ảnh 2 về dịch vụ"
                className="w-12 h-12 object-cover rounded-lg custom-space"
                src={picture2}
              />
              <img
                alt="Hình ảnh 3 về dịch vụ"
                className="w-12 h-12 object-cover rounded-lg custom-space"
                src={picture3}
              />
            </div>
          </div>
          <div className="ml-4 flex-grow flex-column">
            <h2 className="text-xl font-semibold text-black mb-1">
              Tên dịch vụ: {title}
            </h2>
            <div className="flex flex-col">
              <div className="flex items-center mb-1">
                <p className="mr-2">Đánh giá:</p>
                <span className="text-yellow-500">
                  <i className="fas fa-star"></i>
                </span>
                <span className="text-yellow-500">
                  <i className="fas fa-star"></i>
                </span>
                <span className="text-yellow-500">
                  <i className="fas fa-star"></i>
                </span>
                <span className="text-yellow-500">
                  <i className="fas fa-star"></i>
                </span>
                <span className="text-gray-400">
                  <i className="fas fa-star"></i>
                </span>
              </div>
              <p className="mb-2">Cân nặng:</p>
              <div className="flex space-x-2 mb-1">
                <button className="weight-button" onClick={() => setSelectedWeight('< 5 kg')}>&lt; 5 kg</button>
                <button className="weight-button" onClick={() => setSelectedWeight('5 - 10 kg')}>5 - 10 kg</button>
                <button className="weight-button" onClick={() => setSelectedWeight('10 - 20 kg')}>10 - 20 kg</button>
              </div>
              <p className="mb-1">{price}</p>
              <button className="bg-orange-400 text-black px-4 py-2 rounded mb-4" onClick={handleBooking}>
                Đặt lịch
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button className="bg-orange-400 text-black px-4 py-2 rounded mb-4">
            Nội dung chi tiết
          </button>
          <p className="text-sm text-gray">
            PETSTATION sử dụng các sản phẩm chăm sóc thú cưng cao cấp, an toàn
            cho da và lông của thú cưng. Đội ngũ nhân viên spa được đào tạo bài
            bản, có kinh nghiệm và kỹ năng chăm sóc thú cưng chuyên nghiệp.
          </p>
          <p className="text-sm text-gray">
            Giá dịch vụ Grooming tại PetStation được tính theo cân nặng của thú
            cưng và loại dịch vụ. Bảng giá trên đã bao gồm vệ sinh tai, cạo bàn,
            cạo lông bụng, cắt móng, vắt tuyến mồ hôi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
