import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const Banner = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper my-5 md:my-10 "
      >
        <SwiperSlide>
          <img
            src="https://i.ibb.co.com/Zp8JMc4r/Gemini-Generated-Image-hdostjhdostjhdos.png"
            alt=""
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img src="https://i.ibb.co.com/vvsFDCx7/BD-Petcare-2.png" alt="" />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img
            src="https://i.ibb.co.com/s95wC8BX/Gemini-Generated-Image-sd6cnfsd6cnfsd6c.png"
            alt=""
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img src="https://i.ibb.co.com/Jw2535tS/BD-Petcare-3.png" alt="" />
        </SwiperSlide>{" "}
      </Swiper>
    </>
  );
};

export default Banner;
