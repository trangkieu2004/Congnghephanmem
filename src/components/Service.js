import React from 'react';
import './Service.css';
import { useNavigate } from 'react-router-dom';
import chanmeo from '../img/Home/chan_meo.png';
import doc1 from '../img/Service/image 3.png';
import doc2 from '../img/Service/image 4.png';
import doc3 from '../img/Service/image 5.png';

const Service = () => {
  const navigate = useNavigate();
  const services = [
    {
      title: 'Petstation - Tắm sấy',
      price: 'Giá: 100.000 - 200.000 VND',
      image: doc1, // Thay bằng đường dẫn hình ảnh thực tế
      
    },
    {
      title: 'Petstation - Vệ sinh',
      price: 'Giá: 50.000 - 100.000 VND',
      image: doc2, // Thay bằng đường dẫn hình ảnh thực tế
      
    },
    {
      title: 'Petstation - Cắt tỉa',
      price: 'Giá: 150.000 - 200.000 VND',
      image: doc3, // Thay bằng đường dẫn hình ảnh thực tế
      
    },
  ];
  const handleServiceClick = (service) => {
    navigate('/service-detail', { state: service });
  };
  return (
    <div className="spa-services-container">
      <h2>DỊCH VỤ SPA</h2>
      <div className="divider-container">
        <hr className="divider" />
        <img src={chanmeo} alt="Chân mèo" className="paw-print" />
        <hr className="divider" />
      </div>
      <div className="services">
        {services.map((service, index) => (
          <div className="service-card" key={index} onClick={() => handleServiceClick(service)}>
            <img src={service.image} alt={service.title} className="service-image" />
            <h3>{service.title}</h3>
            <p>{service.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service
