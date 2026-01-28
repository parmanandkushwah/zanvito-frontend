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
  IndianRupee,
  Star,
} from "lucide-react";
import { getCustomerBookingDetails } from "../api/bookingApi";

/* 🔥 STATUS CONFIG (same ecosystem) */
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

function BookingDetailsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* HEADER */}
      <div className="bg-white rounded-3xl p-6 border flex justify-between">
        <div className="space-y-2">
          <div className="h-5 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="h-7 w-28 bg-gray-200 rounded-full"></div>
      </div>

      {/* SERVICE */}
      <div className="bg-white rounded-3xl p-6 border flex items-center gap-4">
        <div className="h-14 w-14 bg-gray-200 rounded-xl"></div>
        <div className="space-y-2">
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
          <div className="h-3 w-28 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* INFO CARDS */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* PROVIDER */}
      <div className="grid sm:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-6 border flex items-center gap-4"
          >
            <div className="h-14 w-14 bg-gray-200 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-3 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
              <div className="h-3 w-28 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* PAYMENT */}
      <div className="bg-white rounded-3xl p-6 border space-y-3">
        <div className="h-5 w-40 bg-gray-200 rounded"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-4 w-full bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  );
}


function BookingDetails() {
  const { id } = useParams(); // bookingId
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBookingDetails();
  }, [id]);

  const fetchBookingDetails = async () => {
    try {
      const res = await getCustomerBookingDetails(id);
      setData(res);
    } catch (err) {
      console.error("Failed to fetch booking details", err);
    } finally {
      setLoading(false);
    }
  };

 if (loading) {
  return (
    <>
      <Navbar />
      <section className="pt-28 pb-20 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-6">
          <BookingDetailsSkeleton />
        </div>
      </section>
      <Footer />
    </>
  );
}

  if (!data) {
    return (
      <>
        <Navbar />
        <div className="pt-40 text-center text-sm text-red-500">
          Booking not found
        </div>
        <Footer />
      </>
    );
  }

  const { booking, service, provider, serviceman, payment } = data;

  const status =
    statusConfig[booking.status] || {
      label: booking.status,
      className: "bg-gray-100 text-gray-600",
    };

  return (
    <>
      <Navbar />

      <section className="pt-28 pb-20 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-6 space-y-8">

          {/* HEADER */}
          <div className="bg-white rounded-3xl p-6 border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#111827]">
                {service?.name}
              </h1>
              <p className="text-sm text-[#6B7280]">
                Booking ID #{booking.id}
              </p>
            </div>

            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold w-fit ${status.className}`}
            >
              {status.label}
            </span>
          </div>

          {/* SERVICE */}
          <div className="bg-white rounded-3xl p-6 border flex items-center gap-4">
            <img
              src={service?.icon}
              alt={service?.name}
              className="h-14 w-14 rounded-xl object-cover"
            />
            <div>
              <p className="font-semibold text-[#111827]">
                {service?.name}
              </p>
              <p className="text-sm text-[#6B7280]">
                {booking.booking_type === "instant"
                  ? "Instant Service"
                  : "Scheduled Service"}
              </p>
            </div>
          </div>

          {/* BOOKING INFO */}
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
              value={booking.address || "Address not available"}
            />
          </div>

          {/* PROVIDER & SERVICEMAN */}
          <div className="grid sm:grid-cols-2 gap-6">
            {provider && (
              <ProfileCard title="Service Provider" person={provider} />
            )}
            {serviceman && (
              <ProfileCard title="Assigned Serviceman" person={serviceman} />
            )}
          </div>

          {/* PAYMENT */}
          {payment && (
            <div className="bg-white rounded-3xl p-6 border">
              <h3 className="text-lg font-bold text-[#111827] mb-4">
                Payment Details
              </h3>

              <div className="space-y-3 text-sm">
                <Row
                  label="Total Amount"
                  value={`₹${payment.total_amount}`}
                />
                <Row
                  label="Advance Paid"
                  value={`₹${payment.advance_amount}`}
                />
                <Row
                  label="Payment Type"
                  value={payment.payment_type}
                />
              </div>
            </div>
          )}

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

          {/* ⭐ RATING */}
          {booking.status === "COMPLETED" && (
            <div className="bg-white rounded-3xl p-6 border">
              <h3 className="text-lg font-bold text-[#111827] mb-4">
                Rate Your Experience
              </h3>

              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      size={28}
                      className={
                        star <= rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                ))}
                <span className="ml-3 text-sm text-[#6B7280]">
                  {rating ? `${rating}/5` : "Tap to rate"}
                </span>
              </div>

              <textarea
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your experience (optional)"
                className="w-full rounded-2xl border px-4 py-3 text-sm focus:border-[#00C389] outline-none resize-none"
              />

              <button
                disabled={!rating || submitting}
                onClick={() => {
                  setSubmitting(true);
                  setTimeout(() => {
                    alert("Thanks for your feedback ❤️");
                    setSubmitting(false);
                  }, 1000);
                }}
                className="mt-4 w-full bg-[#00C389] text-white py-3 rounded-full font-semibold hover:bg-emerald-600 transition disabled:opacity-50"
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
