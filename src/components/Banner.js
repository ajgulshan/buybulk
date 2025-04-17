import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "../styles/Banner.module.css";
import Link from "next/link";

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
          <Link href="/auction">
            <img src="uploads/bb1.jpeg" alt="Banner 1" className={styles.image} />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/auction">
            <img src="uploads/bb2.jpeg" alt="Banner 2" className={styles.image} />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/auction">
            <img src="uploads/bb3.jpeg" alt="Banner 3" className={styles.image} />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
