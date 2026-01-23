import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Search,
} from "lucide-react";

/* MOCK BOOKINGS DATA */
const bookings = [
  {
    id: "BK101",
    service: "AC Installation",
    category: "AC Repair",
    price: "₹1499",
    date: "12 Oct 2026",
    time: "10:00 AM",
    address: "Vijay Nagar, Indore",
    status: "Confirmed",
  },
  {
    id: "BK102",
    service: "Bathroom Cleaning",
    category: "Cleaning",
    price: "₹699",
    date: "05 Oct 2026",
    time: "02:30 PM",
    address: "Palasia, Indore",
    status: "Completed",
  },
  {
    id: "BK103",
    service: "Fan Repair",
    category: "Electrician",
    price: "₹299",
    date: "28 Sep 2026",
    time: "06:00 PM",
    address: "Bhawarkua, Indore",
    status: "Cancelled",
  },
];

const statusStyles = {
  Confirmed: "bg-[#00C389]/10 text-[#00C389]",
  Completed: "bg-blue-100 text-blue-600",
  Cancelled: "bg-red-100 text-red-600",
};

function MyBookings() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  /* SEARCH FILTER (LIGHTWEIGHT) */
  const filteredBookings = useMemo(() => {
    return bookings.filter(
      (b) =>
        b.service.toLowerCase().includes(search.toLowerCase()) ||
        b.category.toLowerCase().includes(search.toLowerCase()) ||
        b.id.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

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

          {/* SEARCH BAR (SUBTLE, SAME THEME) */}
          <div className="mb-10 max-w-md relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by service, category or booking ID"
              className="
                w-full pl-11 pr-4 py-3 rounded-full
                border border-[#E5E7EB]
                focus:border-[#00C389]
                outline-none text-sm
              "
            />
          </div>

          {/* BOOKINGS LIST (DESIGN SAME) */}
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="
                  bg-white rounded-3xl p-6 border
                  hover:shadow-lg transition
                "
              >
                {/* TOP ROW */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-[#111827]">
                      {booking.service}
                    </h2>
                    <p className="text-sm text-[#6B7280]">
                      {booking.category}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-1 rounded-full text-xs font-semibold w-fit
                      ${statusStyles[booking.status]}
                    `}
                  >
                    {booking.status}
                  </span>
                </div>

                {/* DETAILS */}
                <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm text-[#374151]">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-[#00C389]" />
                    {booking.date}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-[#00C389]" />
                    {booking.time}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#00C389]" />
                    {booking.address}
                  </div>
                </div>

                {/* BOTTOM */}
                <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm text-[#6B7280]">
                      Amount Paid
                    </p>
                    <p className="text-xl font-bold text-[#111827]">
                      {booking.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        navigate(`/my-bookings/${booking.id}`)
                      }
                      className="
                        px-5 py-2 rounded-full
                        border border-[#00C389]
                        text-[#00C389] text-sm font-medium
                        hover:bg-[#00C389] hover:text-white
                        transition
                      "
                    >
                      View Details
                    </button>

                    {booking.status === "Completed" && (
                      <button
                        className="
                          px-5 py-2 rounded-full
                          bg-[#00C389] text-white
                          text-sm font-medium
                          hover:bg-emerald-600
                          transition
                        "
                      >
                        Rebook
                      </button>
                    )}
                  </div>
                </div>

                {/* FOOTER NOTE */}
                <p className="mt-4 text-xs text-[#6B7280] flex items-center gap-1">
                  <ShieldCheck size={14} className="text-[#00C389]" />
                  Booking ID: {booking.id}
                </p>
              </div>
            ))}

            {filteredBookings.length === 0 && (
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
