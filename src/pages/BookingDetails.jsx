import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Phone,
  IndianRupee, Star,
} from "lucide-react";


/* 🔥 MOCK API RESPONSE (later backend se aayega) */
const bookingResponse = {
  booking: {
    id: 53,
    status: "COMPLETED",
    booking_type: "scheduled",
    booking_date: "2025-12-27T18:30:00.000Z",
    booking_time: "12:46:00",
    address:
      "085 ramu nagar, mata , Piplya Kumar, Indore, Juni Indore Tahsil, Indore, Madhya Pradesh, 452001, India",
    instructions: "phone laga",
    created_at: "2025-12-24T00:46:31.388Z",
  },
  service: {
    id: 29,
    name: "Exterior Texture & Protective Coating",
    icon:
      "https://res.cloudinary.com/dwu3yms2p/image/upload/v1766053216/services/icon/vmqhnjdsdvzxgkl3t5rp.png",
  },
  provider: {
    id: 88,
    name: "Ajit Sharma",
    role: "agency",
    profile_photo:
      "https://res.cloudinary.com/dwu3yms2p/image/upload/v1765866646/quickfix/companies/suq52uevr8lzjk99h8zp.jpg",
    phone: "7080907080",
  },
  serviceman: {
    id: 111,
    name: "Champi",
    phone: "9000000011",
    profile_photo:
      "https://res.cloudinary.com/dwu3yms2p/image/upload/v1766556869/quickfix/servicemen/profile/cxgg7qdl0nzevhliq6d9.jpg",
  },
  payment: {
    total_amount: "12299.00",
    advance_amount: "1659.00",
    payment_type: "ADVANCE",
  },
};

const statusStyles = {
  CONFIRMED: "bg-[#00C389]/10 text-[#00C389]",
  COMPLETED: "bg-blue-100 text-blue-600",
  CANCELLED: "bg-red-100 text-red-600",
};

function BookingDetails() {
    const [rating, setRating] = useState(0);
const [review, setReview] = useState("");
const [submitting, setSubmitting] = useState(false);
 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { booking, service, provider, serviceman, payment } =
    bookingResponse;

  return (
    <>
      <Navbar />

      <section className="pt-28 pb-20 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-6 space-y-8">

          {/* HEADER */}
          <div className="bg-white rounded-3xl p-6 border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#111827]">
                {service.name}
              </h1>
              <p className="text-sm text-[#6B7280]">
                Booking ID #{booking.id}
              </p>
            </div>

            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold w-fit
                ${statusStyles[booking.status]}
              `}
            >
              {booking.status}
            </span>
          </div>

          {/* SERVICE INFO */}
          <div className="bg-white rounded-3xl p-6 border flex items-center gap-4">
            <img
              src={service.icon}
              alt={service.name}
              className="h-14 w-14 rounded-xl object-cover"
            />
            <div>
              <p className="font-semibold text-[#111827]">
                {service.name}
              </p>
              <p className="text-sm text-[#6B7280]">
                Scheduled Service
              </p>
            </div>
          </div>

          {/* BOOKING DETAILS */}
          <div className="grid sm:grid-cols-3 gap-4">
            <InfoCard
              icon={<Calendar size={18} />}
              label="Service Date"
              value={new Date(booking.booking_date).toDateString()}
            />
            <InfoCard
              icon={<Clock size={18} />}
              label="Service Time"
              value={booking.booking_time}
            />
            <InfoCard
              icon={<MapPin size={18} />}
              label="Address"
              value={booking.address}
            />
          </div>

          {/* PROVIDER & SERVICEMAN */}
          <div className="grid sm:grid-cols-2 gap-6">
            <ProfileCard title="Service Provider" person={provider} />
            <ProfileCard title="Assigned Serviceman" person={serviceman} />
          </div>

          {/* PAYMENT */}
          <div className="bg-white rounded-3xl p-6 border">
            <h3 className="text-lg font-bold text-[#111827] mb-4">
              Payment Details
            </h3>

            <div className="space-y-3 text-sm">
              <Row label="Total Amount" value={`₹${payment.total_amount}`} />
              <Row
                label="Advance Paid"
                value={`₹${payment.advance_amount}`}
              />
              <Row label="Payment Type" value={payment.payment_type} />
            </div>
          </div>

          {/* INSTRUCTIONS */}
          {booking.instructions && (
            <div className="bg-white rounded-3xl p-6 border">
              <h3 className="text-lg font-bold text-[#111827] mb-2">
                Customer Instructions
              </h3>
              <p className="text-sm text-[#374151]">
                {booking.instructions}
              </p>
            </div>
          )}

          {/* ⭐ RATING & REVIEW (ONLY IF COMPLETED) */}
{booking.status === "COMPLETED" && (
  <div className="bg-white rounded-3xl p-6 border">
    <h3 className="text-lg font-bold text-[#111827] mb-4">
      Rate Your Experience
    </h3>

    {/* STAR RATING */}
    <div className="flex items-center gap-2 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(star)}
          className="transition"
        >
          <Star
            size={28}
            className={`${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}

      <span className="ml-3 text-sm text-[#6B7280]">
        {rating > 0 ? `${rating}/5` : "Tap to rate"}
      </span>
    </div>

    {/* REVIEW INPUT */}
    <textarea
      rows={4}
      value={review}
      onChange={(e) => setReview(e.target.value)}
      placeholder="Share your experience (optional)"
      className="
        w-full rounded-2xl border px-4 py-3 text-sm
        focus:border-[#00C389] outline-none
        resize-none
      "
    />

    {/* SUBMIT BUTTON */}
    <button
      disabled={rating === 0 || submitting}
      onClick={() => {
        setSubmitting(true);

        // 🔥 later backend call
        setTimeout(() => {
          alert("Thanks for your feedback ❤️");
          setSubmitting(false);
        }, 1000);
      }}
      className="
        mt-4 w-full bg-[#00C389] text-white
        py-3 rounded-full font-semibold
        hover:bg-emerald-600 transition
        disabled:opacity-50
      "
    >
      {submitting ? "Submitting..." : "Submit Review"}
    </button>
  </div>
)}

          {/* FOOTER NOTE */}
          <p className="text-xs text-center text-[#6B7280] flex justify-center items-center gap-1">
            <ShieldCheck size={14} className="text-[#00C389]" />
            Safe & secure service guaranteed
          </p>

        </div>
      </section>

      <Footer />
    </>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

const InfoCard = ({ icon, label, value }) => (
  <div className="bg-white rounded-2xl p-5 border">
    <div className="flex items-center gap-2 text-[#00C389] mb-1">
      {icon}
      <p className="text-sm font-medium">{label}</p>
    </div>
    <p className="text-sm text-[#374151]">{value}</p>
  </div>
);

const ProfileCard = ({ title, person }) => (
  <div className="bg-white rounded-3xl p-6 border flex items-center gap-4">
    <img
      src={person.profile_photo}
      alt={person.name}
      className="h-14 w-14 rounded-full object-cover"
    />
    <div>
      <p className="text-sm text-[#6B7280]">{title}</p>
      <p className="font-semibold text-[#111827]">{person.name}</p>
      <p className="text-sm text-[#6B7280] flex items-center gap-1">
        <Phone size={14} /> {person.phone}
      </p>
    </div>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex items-center justify-between">
    <p className="text-[#6B7280]">{label}</p>
    <p className="font-semibold text-[#111827] flex items-center gap-1">
      <IndianRupee size={14} /> {value}
    </p>
  </div>
);

export default BookingDetails;
