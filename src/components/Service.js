import React, { useEffect, useState } from 'react';
import './Service.css';
import { useNavigate } from 'react-router-dom';
import chanmeo from '../img/Home/chan_meo.png';
import doc1 from '../img/Service/image 3.png';
import doc2 from '../img/Service/image 4.png';
import doc3 from '../img/Service/image 5.png';

const Service = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]); 
  // Danh sách ảnh cố định để gán vào dữ liệu API
  const serviceImages = [doc1, doc2, doc3];
  useEffect(() => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    fetch('https://pet-booking-eta.vercel.app/services', {
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`  // Thêm header Authorization
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('DATA:', data);
        const mappedServices = data.data.map((service, index) => ({
          _id: service._id,
          title: service.name,
          description: service.description,
          price: `Giá: ${service.price.toLocaleString()} VND`,
          image: serviceImages[index % serviceImages.length],
        }));
        setServices(mappedServices);
      })
      .catch((error) => console.error('Lỗi khi lấy danh sách dịch vụ:', error));
  }, []);
  
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
