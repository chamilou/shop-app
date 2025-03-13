"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import styles from "./Slider.module.css";

export default function Slider() {
  return (
    <div className={styles.sliderContainer}>
      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className={styles.swiper}
      >
        {[1, 2, 3].map((num) => (
          <SwiperSlide key={num} className={styles.slide}>
            <div className={styles.imageWrapper}>
              <Image
                src={`/media/slider/banner${num}.jpg`}
                alt={`Banner ${num}`}
                layout="fill"
                objectFit="cover"
                priority={num === 1} // Load first image fast
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
