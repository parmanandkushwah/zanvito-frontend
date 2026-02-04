import React from "react";
import heroBg from "../assets/hero-bg1.png";
import AdvertisementSlider from "./AdvertisementSlider";
// import { getImageUrl } from "../utils/getImageUrl";


function HeroSection({ banners = [] }) {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        height: "100vh",
        backgroundImage: `url(${heroBg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Soft overlay */}
      <div className="absolute inset-0 bg-white/70"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
        <div className="mt-24">
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#111827]">
            One-Stop Solution For Your{" "}
            <span className="inline-block px-6 py-2 rounded-full bg-[#00C389] text-white">
              HOME SERVICE
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-[#6B7280] text-base md:text-lg max-w-3xl mx-auto">
            We connect you with trusted servicemen for all your home and business
            needs. Easy booking, clear pricing, and stress-free service 😊
          </p>

          {/* Search */}
          <div className="mt-8 flex flex-col md:flex-row items-center bg-white border border-[#E5E7EB] rounded-full overflow-hidden max-w-3xl mx-auto shadow-md">
            <input
              type="text"
              placeholder="Search Service"
              className="flex-1 px-6 py-4 text-[#111827] placeholder-[#6B7280] focus:outline-none"
            />
            <button
              type="button"   // 🔥 THIS IS THE FIX
              className="bg-[#00C389] text-white px-8 py-4 font-semibold hover:bg-emerald-600 transition"
            >
              Find Service
            </button>
          </div>

          {/* Advertisement Slider */}
          {banners.length > 0 && (
            <div className="mt-20">
              <AdvertisementSlider banners={banners} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
