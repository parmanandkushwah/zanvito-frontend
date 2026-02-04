import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { getImageUrl } from "../utils/getImageUrl";


function TopServices({ services = [] }) {
  const navigate = useNavigate();
console.log("IMAGE BASE URL =", process.env.REACT_APP_IMAGE_BASE_URL);
  // sirf top 4 services
  const topServices = services.slice(0, 4);

  return (
    <section className="py-12 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#111827]">
            Top Services
          </h2>

          <button
            onClick={() => navigate("/services")}
            className="flex items-center gap-1 text-[#00C389] font-medium hover:underline"
          >
            View all <ChevronRight size={16} />
          </button>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topServices.map((service) => (
           <div
  key={service.id}
  onClick={() => navigate(`/services/${service.id}`)}
  className="
    group relative bg-white
    rounded-3xl border
    shadow-sm hover:shadow-xl
    hover:border-[#00C389]
    transition cursor-pointer
    overflow-hidden
  "
>
  {/* IMAGE */}
  <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
    <img
      src={getImageUrl(service.image)}
      alt={service.name}
      onError={(e) => {
        e.currentTarget.src =
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
      }}
      className="
        h-full w-full object-cover
        transition-transform duration-500
        group-hover:scale-105
      "
    />

    {/* PRICE BADGE */}
    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-[#111827] shadow">
      ₹{service.starting_from}
    </span>
  </div>

  {/* CONTENT */}
  <div className="p-5">
    <h3 className="text-lg font-semibold text-[#111827]">
      {service.name}
    </h3>

    <p className="mt-1 text-sm text-[#6B7280]">
      Professional & verified service
    </p>

    <div className="mt-4 flex items-center justify-between">
      <span className="text-sm font-medium text-[#00C389]">
        Book now
      </span>

      <div className="h-8 w-8 rounded-full bg-[#00C389] flex items-center justify-center text-white">
        <ChevronRight size={16} />
      </div>
    </div>
  </div>
</div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default TopServices;
