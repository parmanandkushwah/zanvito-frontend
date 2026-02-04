import  { React, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Search,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCustomerBookings } from "../api/bookingApi";
import { getImageUrl } from "../utils/getImageUrl";

/* 🔥 COMPLETE STATUS CONFIG */
const statusConfig = {
  SEARCHING_PROVIDER: {
    label: "Searching Provider",
    className: "bg-purple-100 text-purple-700",
  },
  PENDING_PAYMENT: {
    label: "Pending Payment",
    className: "bg-orange-100 text-orange-700",
  },
  CONFIRMED: {
    label: "Confirmed",
    className: "bg-[#00C389]/10 text-[#00C389]",
  },
  IN_PROGRESS: {
    label: "In Progress",
    className: "bg-yellow-100 text-yellow-700",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-blue-100 text-blue-600",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-100 text-red-600",
  },
};

function BookingSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-6 border animate-pulse">
      <div className="flex gap-4">
        <div className="h-14 w-14 bg-gray-200 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-40 bg-gray-200 rounded" />
          <div className="h-3 w-28 bg-gray-200 rounded" />
        </div>
        <div className="h-6 w-24 bg-gray-200 rounded-full" />
      </div>

      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-28 bg-gray-200 rounded" />
        <div className="h-4 w-40 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

function MyBookings() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await getCustomerBookings();
      setBookings(res.bookings || []);
    } catch (err) {
      console.error("Failed to load bookings", err);
    } finally {
      setLoading(false);
    }
  };

  /* 🔎 SEARCH */
  const filteredBookings = useMemo(() => {
    const q = search.toLowerCase();
    return bookings.filter((b) => {
      const serviceName = b.service?.name || "";
      const bookingId = b.id?.toString() || "";
      return (
        serviceName.toLowerCase().includes(q) ||
        bookingId.includes(q)
      );
    });
  }, [search, bookings]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <>
      <Navbar />

      <section className="pt-28 pb-20 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-6">

          {/* HEADER */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#111827]">
              My Bookings
            </h1>
            <p className="text-sm text-[#6B7280] mt-1">
              Track and manage your service bookings
            </p>
          </div>

          {/* SEARCH */}
          <div className="mb-10 max-w-md relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by service or booking ID"
              className="w-full pl-11 pr-4 py-3 rounded-full border focus:border-[#00C389] outline-none text-sm"
            />
          </div>

          {loading && (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <BookingSkeleton key={i} />
              ))}
            </div>
          )}

          {/* BOOKINGS */}
          <div className="space-y-6">
            {filteredBookings.map((booking) => {
              const status =
                statusConfig[booking.status] || {
                  label: booking.status,
                  className: "bg-gray-100 text-gray-600",
                };

              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-3xl p-6 border hover:shadow-lg transition"
                >
                  {/* TOP */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* SERVICE IMAGE */}
                      <div className="h-14 w-14 rounded-xl overflow-hidden bg-gray-100">
                        <img
                          src={getImageUrl(booking.service?.image)}
                          alt={booking.service?.name}
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
                          }}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <h2 className="text-lg font-bold text-[#111827]">
                          {booking.service?.name || "Service"}
                        </h2>
                        <p className="text-sm text-[#6B7280]">
                          {booking.booking_type === "instant"
                            ? "Instant Booking"
                            : "Scheduled Booking"}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-4 py-1 rounded-full text-xs font-semibold ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  {/* DETAILS */}
                  <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm text-[#374151]">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-[#00C389]" />
                      {formatDate(booking.booking_date)}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-[#00C389]" />
                      {booking.booking_time}
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-[#00C389]" />
                      {booking.address || "Address not available"}
                    </div>
                  </div>

                  {/* BOTTOM */}
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#6B7280]">
                        Starting From
                      </p>
                      <p className="text-xl font-bold text-[#111827]">
                        ₹{booking.service?.starting_from ?? "--"}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        navigate(`/my-bookings/${booking.id}`)
                      }
                      className="px-5 py-2 rounded-full border border-[#00C389] text-[#00C389] text-sm font-medium hover:bg-[#00C389] hover:text-white transition"
                    >
                      View Details
                    </button>
                  </div>

                  {/* FOOTER */}
                  <p className="mt-4 text-xs text-[#6B7280] flex items-center gap-1">
                    <ShieldCheck size={14} className="text-[#00C389]" />
                    Booking ID: {booking.id}
                  </p>
                </div>
              );
            })}

            {!loading && filteredBookings.length === 0 && (
              <p className="text-sm text-[#6B7280]">
                No bookings found
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default MyBookings;
