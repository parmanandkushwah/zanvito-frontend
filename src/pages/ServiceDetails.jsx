import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  Star,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getHomeData } from "../api/homeApi";

function ServiceDetails() {
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ FIXED: useCallback to satisfy ESLint
  const fetchService = useCallback(async () => {
    try {
      const res = await getHomeData();

      if (res?.success && Array.isArray(res.services)) {
        const foundService = res.services.find(
          (s) => Number(s.id) === Number(id)
        );

        setService(foundService || null);
      } else {
        setService(null);
      }
    } catch (err) {
      console.error("Service Detail Error:", err);
      setService(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchService();
  }, [fetchService]);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-40 text-center text-gray-600">
          Loading...
        </div>
      </>
    );
  }

  /* ---------------- NOT FOUND ---------------- */
  if (!service) {
    return (
      <>
        <Navbar />
        <div className="pt-40 text-center text-gray-500">
          Service not found
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="mt-5 pt-28 pb-20 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-8">

          {/* ================= LEFT CONTENT ================= */}
          <div className="lg:col-span-2 space-y-8">

            {/* HERO CARD */}
            <div className="bg-gradient-to-r from-[#00C389]/10 to-white rounded-3xl p-8 border">
              <div className="flex items-center gap-5">
                <div className="h-16 w-16 rounded-2xl bg-[#00C389] flex items-center justify-center shadow-lg">
                  <img
                    src={service.icon}
                    alt={service.name}
                    className="h-8 w-8"
                  />
                </div>

                <div>
                  <h1 className="text-3xl font-bold text-[#111827]">
                    {service.name}
                  </h1>

                  <div className="mt-2 flex items-center gap-4">
                    <span className="bg-[#00C389]/10 text-[#00C389] px-4 py-1 rounded-full text-sm font-semibold">
                      Starting at ₹{service.starting_from}
                    </span>

                    <span className="flex items-center gap-1 text-sm text-[#6B7280]">
                      <Star size={14} className="text-yellow-400" />
                      4.8 (2.3k reviews)
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-[#374151] leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* INFO CARDS */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "Duration", value: "60–90 mins" },
                { label: "Warranty", value: "30 days service warranty" },
                { label: "Professionals", value: "Verified experts" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 border text-center"
                >
                  <p className="text-sm text-[#6B7280]">{item.label}</p>
                  <p className="mt-1 font-semibold text-[#111827]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* WHAT’S INCLUDED */}
            <div className="bg-white rounded-3xl p-8 border">
              <h3 className="text-lg font-semibold text-[#111827] mb-4">
                What’s included
              </h3>

              <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#374151]">
                <li>✔ Verified professional</li>
                <li>✔ On-time service</li>
                <li>✔ Transparent pricing</li>
                <li>✔ Post-service support</li>
              </ul>
            </div>

          </div>

          {/* ================= BOOKING CARD ================= */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#00C389]/30 h-fit sticky top-28">

            <h3 className="text-lg font-bold text-[#111827] mb-6">
              Book this service
            </h3>

            {/* ADDRESS */}
            <div className="mb-4">
              <label className="text-sm font-medium">
                Service Address
              </label>
              <div className="mt-2 flex items-center gap-2 border rounded-xl px-4 py-3">
                <MapPin size={18} className="text-[#00C389]" />
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* DATE */}
            <div className="mb-4">
              <label className="text-sm font-medium">
                Select Date
              </label>
              <div className="mt-2 flex items-center gap-2 border rounded-xl px-4 py-3">
                <Calendar size={18} className="text-[#00C389]" />
                <input
                  type="date"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* TIME */}
            <div className="mb-6">
              <label className="text-sm font-medium">
                Preferred Time
              </label>
              <div className="mt-2 flex items-center gap-2 border rounded-xl px-4 py-3">
                <Clock size={18} className="text-[#00C389]" />
                <input
                  type="time"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* PRICE */}
            <div className="mb-5">
              <p className="text-sm text-[#6B7280]">You pay</p>
              <p className="text-2xl font-bold text-[#111827]">
                ₹{service.starting_from}
              </p>
            </div>

            {/* CTA */}
            <button
              type="button"
              className="w-full bg-[#00C389] text-white py-3 rounded-full font-semibold hover:bg-emerald-600 transition"
            >
              Confirm Booking
            </button>

            <p className="mt-4 text-xs text-center text-[#6B7280]">
              <ShieldCheck
                size={14}
                className="inline mr-1 text-[#00C389]"
              />
              Safe & secure service guaranteed
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default ServiceDetails;
