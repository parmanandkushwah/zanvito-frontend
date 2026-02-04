import React, { useEffect, useState, useCallback } from "react";
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
import { getImageUrl } from "../utils/getImageUrl";

/* 🔥 STATUS CONFIG */
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

/* 🔹 SKELETON */
function BookingDetailsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-white rounded-3xl p-6 border h-28" />
      <div className="bg-white rounded-3xl p-6 border h-24" />
      <div className="grid sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border h-20" />
        ))}
      </div>
    </div>
  );
}

function BookingDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchBookingDetails = useCallback(async () => {
    try {
      const res = await getCustomerBookingDetails(id);
      setData(res);
    } catch (err) {
      console.error("Failed to fetch booking details", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBookingDetails();
  }, [fetchBookingDetails]);

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
        <div className="pt-40 text-center text-red-500">
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
          <div className="bg-white rounded-3xl p-6 border flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#111827]">
                {service?.name}
              </h1>
              <p className="text-sm text-gray-500">
                Booking ID #{booking.id}
              </p>
            </div>

            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold ${status.className}`}
            >
              {status.label}
            </span>
          </div>

          {/* SERVICE INFO */}
          <div className="bg-white rounded-3xl p-6 border flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl overflow-hidden bg-gray-100">
              <img
                src={getImageUrl(service?.image)}
                alt={service?.name}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
                }}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <p className="font-semibold text-[#111827]">
                {service?.name}
              </p>
              <p className="text-sm text-gray-500">
                {booking.booking_type === "instant"
                  ? "Instant Service"
                  : "Scheduled Service"}
              </p>
            </div>
          </div>

          {/* INFO */}
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

          {/* PROVIDER */}
          <div className="grid sm:grid-cols-2 gap-6">
            {provider && (
              <ProfileCard title="Provider" person={provider} />
            )}
            {serviceman && (
              <ProfileCard title="Serviceman" person={serviceman} />
            )}
          </div>

          {/* PAYMENT */}
          {payment && (
            <div className="bg-white rounded-3xl p-6 border">
              <h3 className="font-bold mb-4">Payment Details</h3>
              <Row label="Total Amount" value={payment.total_amount} />
              <Row label="Advance Paid" value={payment.advance_amount} />
              <Row label="Payment Type" value={payment.payment_type} />
            </div>
          )}

          {/* RATING */}
          {booking.status === "COMPLETED" && (
            <div className="bg-white rounded-3xl p-6 border">
              <h3 className="font-bold mb-3">Rate Experience</h3>

              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={28}
                    onClick={() => setRating(s)}
                    className={
                      s <= rating
                        ? "text-yellow-400 fill-yellow-400 cursor-pointer"
                        : "text-gray-300 cursor-pointer"
                    }
                  />
                ))}
              </div>

              <textarea
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full border rounded-xl p-3 text-sm"
                placeholder="Write review..."
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
                className="mt-4 w-full bg-[#00C389] text-white py-3 rounded-full disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          )}

          <p className="text-xs text-center text-gray-500 flex justify-center gap-1">
            <ShieldCheck size={14} /> Safe & secure service
          </p>

        </div>
      </section>

      <Footer />
    </>
  );
}

/* 🔹 SMALL COMPONENTS */

const InfoCard = ({ icon, label, value }) => (
  <div className="bg-white rounded-2xl p-5 border">
    <div className="flex items-center gap-2 text-[#00C389] mb-1">
      {icon}
      <p className="text-sm font-medium">{label}</p>
    </div>
    <p className="text-sm">{value}</p>
  </div>
);

const ProfileCard = ({ title, person }) => (
  <div className="bg-white rounded-3xl p-6 border flex gap-4">
    <img
      src={getImageUrl(person.profile_photo)}
      alt={person.name}
      onError={(e) => {
        e.currentTarget.src =
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
      }}
      className="h-14 w-14 rounded-full object-cover"
    />
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="font-semibold">{person.name}</p>
      <p className="text-sm flex gap-1">
        <Phone size={14} /> {person.phone}
      </p>
    </div>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex justify-between text-sm mb-2">
    <span className="text-gray-500">{label}</span>
    <span className="font-semibold flex items-center gap-1">
      <IndianRupee size={14} /> {value}
    </span>
  </div>
);

export default BookingDetails;
