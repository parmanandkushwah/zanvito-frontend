import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function TopServices({ services = [] }) {
  const navigate = useNavigate();

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
                relative bg-white/70 backdrop-blur-lg
                border border-white/40 rounded-3xl
                p-6 shadow-md hover:shadow-xl
                transition cursor-pointer
              "
            >
              <div className="h-12 w-12 rounded-xl bg-[#E6FBF4] flex items-center justify-center">
                <img
                  src={service.icon}
                  alt={service.name}
                  className="h-6 w-6"
                />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-[#111827]">
                {service.name}
              </h3>

              <p className="mt-2 text-[#6B7280]">
                Starting at{" "}
                <span className="font-bold text-[#111827]">
                  ₹{service.starting_from}
                </span>
              </p>

              <div className="absolute bottom-5 right-5 h-9 w-9 rounded-full bg-[#00C389] flex items-center justify-center text-white">
                <ChevronRight size={18} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default TopServices;
