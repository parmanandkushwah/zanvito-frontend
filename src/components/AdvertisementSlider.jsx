import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

SwiperCore.use([Pagination, Autoplay]);

function AdvertisementSlider({ banners = [] }) {
  if (!banners.length) return null;

  return (
    <div className="mt-4">
      <div className="max-w-6xl mx-auto px-4">
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div
                className="h-44 md:h-52 rounded-2xl overflow-hidden relative flex items-center shadow-xl"
                style={{
                  backgroundImage: `url(${banner.image_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* overlay */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* content */}
                <div className="relative z-10 px-6 text-white max-w-md">
                  <h3 className="text-lg md:text-2xl font-bold">
                    {banner.title}
                  </h3>

                  <button className="mt-4 bg-[#00C389] px-5 py-2 rounded-full font-medium hover:bg-emerald-600 transition">
                    Explore
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default AdvertisementSlider;
