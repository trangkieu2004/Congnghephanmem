import React from "react";
import cat1 from "../img/Introduce/GioiThieu.png";
import heart from "../img/Introduce/Heart.png";
import dollar from "../img/Introduce/image 10.png";
import atom from "../img/Introduce/atom.png";
import like from "../img/Introduce/Group 77.png";
import chanmeo from "../img/Home/chan_meo.png";
import "./Introduce.css";

const Introduce = () => {
  return (
    <div className="container-fluid">
      <div className="container">
        <h2 className="title">GIỚI THIỆU</h2>
        <div className="divider-container">
          <hr className="divider" />
          <img src={chanmeo} alt="Chân mèo" className="paw-print" />
          <hr className="divider" />
        </div>
        <div className="grid-container">
          <div className="text-section">
            <div className="info-box">
              <p className="right-align">
                <strong>CUNG CẤP SẢN PHẨM VỚI GIÁ CẢ PHẢI CHĂNG</strong>
                <br /> Cửa hàng không chỉ mang lại dịch vụ chuyên nghiệp, mà còn
                cho bạn một mức giá phải chăng.
              </p>
              <img src={dollar} alt="" />
            </div>
            <div className="info-box">
              <p className="right-align">
                <strong>CUNG CẤP DỊCH VỤ CHẤT LƯỢNG</strong>
                <br /> Chúng tôi sẽ giúp bạn cung cấp dịch vụ tốt nhất nhờ kinh
                nghiệm nhiều năm và hệ thống chăm sóc chuyên nghiệp.
              </p>
              <img src={like} alt="" />
            </div>
          </div>
          <div className="center-section">
            <img src={cat1} alt="Cat" className="cat-image" />
          </div>
          <div className="text-section right-section">
            <div className="info-box">
              <img src={heart} alt="" />
              <p className="left-align">
                <strong>
                  NHÂN VIÊN TƯ VẤN NHIỆT TÌNH, AM HIỂU VỀ THÚ CƯNG
                </strong>
                <br /> Bên cạnh các sản phẩm, chúng tôi còn tư vấn để đảm bảo
                bạn hiểu rõ và chăm sóc thú cưng tốt nhất.
              </p>
            </div>
            <div className="info-box">
              <img src={atom} alt="" />
              <p className="left-align">
                <strong>CUNG CẤP DỊCH VỤ ĐA DẠNG, PHONG PHÚ</strong>
                <br /> Mỗi loại thú cưng có một đặc điểm riêng, chúng tôi cung
                cấp đa dạng sản phẩm và dịch vụ để phù hợp với bạn.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container ms-5 khung">
        <h2>Station is house, happiness, respect</h2>
        <p className="left">
        Xây dựng nơi dừng chân lý tưởng của thú cưng. Đem lại cho thú cưng và khách hàng trải nghiệm tốt nhất khi sử dụng dịch vụ của  <span className="highlight">PetStation</span>.
        </p>
        <p className="left mt-5">
          Tại <span className="highlight">PetStation</span>, chúng tôi đồng hành cùng người nuôi trong việc chăm sóc thú cưng đúng cách. Bởi chúng tôi hiểu rằng, việc nuôi dưỡng và bảo vệ một thành viên trong gia đình cần rất nhiều nỗ lực và sự thấu hiểu.
        </p>
        <p className="left mt-5">
        <span className="highlight">PetStation</span> cung cấp các dịch vụ tắm spa, chăm sóc, cắt tỉa lông, tạo kiểu, vệ sinh tai,... Với chất lượng dịch vụ tốt nhất,
          <span className="highlight">PetStation</span> luôn được khách hàng tin tưởng và sẽ là điểm đến tuyệt vời dành cho thú cưng.
        </p>
        <h1>PET LIKE US AND SO WILL YOU</h1>
      </div>
    </div>
  );
};

export default Introduce;
