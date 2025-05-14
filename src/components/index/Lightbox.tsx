import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Hamburger from "hamburger-react";
import styles from "./lightbox.module.css";
import Image from "next/image";

type Props = {
  setLightBox: (index: boolean) => void;
  images: {
    url: string;
    alt: string | null;
    caption: string | null;
    dimensions: { width: number; height: number; aspectRatio: number };
  }[];
};

export default function Lightbox({ setLightBox, images }: Props) {
  useEffect(() => {
    // Lock scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      // Unlock scroll on cleanup
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <span className={styles.closeButton} onClick={() => setLightBox(false)}>
        <Hamburger size={20} toggled={true} />
      </span>
      <div className={styles.slider}>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          slidesPerView="auto"
          className={styles.swiper}
          centeredSlides={true}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className={styles.image__wrapper}>
                <Image
                  src={image.url}
                  alt={image.alt || ""}
                  className={styles.image}
                  width={image.dimensions.width}
                  height={image.dimensions.height}
                />
                <p className={styles.caption}>{image.caption}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
