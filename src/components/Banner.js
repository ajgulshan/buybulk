import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "../styles/Banner.module.css";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
      >
        <SwiperSlide>
          <img src="Banner1.avif" alt="Banner 1" className={styles.image} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="Banner2.jpg" alt="Banner 2" className={styles.image} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="Banner3.jpeg" alt="Banner 3" className={styles.image} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
