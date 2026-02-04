import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils/getImageUrl";



function FeaturedServices({ services = [] }) {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -900, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 900, behavior: "smooth" });
  };

  if (!services.length) return null;

  return (
    <section className="py-14 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#111827]">
            Featured Services
          </h2>

          <button
            onClick={() => navigate("/services")}
            className="text-[#00C389] font-medium hover:underline"
          >
            View all
          </button>
        </div>

        {/* Slider */}
        <div className="relative">

          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10
                       bg-white/70 backdrop-blur-md shadow-md p-2 rounded-full
                       hover:bg-white transition"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Cards Row */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-hidden scroll-smooth"
          >
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => navigate(`/services/${service.id}`)}
                className="
                  min-w-[260px]
                  bg-white/70 backdrop-blur-lg
                  border border-white/40
                  rounded-3xl
                  shadow-md hover:shadow-xl
                  transition cursor-pointer
                  overflow-hidden
                "
              >
                {/* Image */}
                <div className="relative h-40">
                  <img
  src={
    getImageUrl(service.image) ||
    "https://via.placeholder.com/300x200?text=Service"
  }
  alt={service.name}
  className="w-full h-full object-cover"
/>

                  {/* Featured Badge */}
                  <span className="absolute top-3 left-3 bg-[#00C389] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Featured
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-semibold text-[#111827]">
                    {service.name}
                  </h3>

                  <p className="mt-2 text-[#6B7280] text-sm">
                    Starting at{" "}
                    <span className="font-bold text-[#111827]">
                      ₹{service.starting_from}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10
                       bg-white/70 backdrop-blur-md shadow-md p-2 rounded-full
                       hover:bg-white transition"
          >
            <ChevronRight size={22} />
          </button>

        </div>
      </div>
    </section>
  );
}

export default FeaturedServices;
