import React, { useEffect, useState, useCallback } from "react";
import { useParams,useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  Star,
  XCircle, Loader2
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getHomeData } from "../api/homeApi";
import { reverseGeocode, searchLocation } from "../api/locationApi";
import { createBookingDraft, getBookingBill, updateBookingDateTime, checkoutBooking, getBookingPaymentStatus } from "../api/bookingApi";
// import { Cashfree } from "@cashfreepayments/pg-react";
// import { load } from "@cashfreepayments/cashfree-js";




function ServiceDetailsSkeleton() {
  return (
    <section className="pt-28 pb-20 bg-[#F9FAFB] animate-pulse">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">

          {/* HERO */}
          <div className="bg-white rounded-3xl p-8 border">
            <div className="flex items-center gap-5">
              <div className="h-16 w-16 bg-gray-200 rounded-2xl" />
              <div className="space-y-3">
                <div className="h-5 w-56 bg-gray-200 rounded" />
                <div className="h-4 w-40 bg-gray-200 rounded" />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
            </div>
          </div>

          {/* INFO CARDS */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border space-y-2"
              >
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
            ))}
          </div>

          {/* INCLUDED */}
          <div className="bg-white rounded-3xl p-8 border space-y-3">
            <div className="h-5 w-40 bg-gray-200 rounded" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 w-56 bg-gray-200 rounded" />
            ))}
          </div>
        </div>

        {/* RIGHT BOOKING CARD */}
        <div className="bg-white rounded-3xl p-6 border h-fit space-y-4">
          <div className="h-5 w-40 bg-gray-200 rounded" />

          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-10 w-full bg-gray-200 rounded-xl" />
            </div>
          ))}

          <div className="mt-4">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-6 w-32 bg-gray-200 rounded mt-2" />
          </div>

          <div className="h-11 w-full bg-gray-300 rounded-full mt-4" />
        </div>

      </div>
    </section>
  );
}


function ServiceDetails() {
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [draftId, setDraftId] = useState(null);
  const [billData, setBillData] = useState(null);
const [billLoading, setBillLoading] = useState(false);
const [isEditingDateTime, setIsEditingDateTime] = useState(false);
const [editDate, setEditDate] = useState("");
const [editTime, setEditTime] = useState("");
const [showPaymentOptions, setShowPaymentOptions] = useState(false);
const [paymentType, setPaymentType] = useState(null); // "ADVANCE" | "FULL"
const [checkoutLoading, setCheckoutLoading] = useState(false);
const [paymentPopup, setPaymentPopup] = useState({
  open: false,
  status: null, // SUCCESS | FAILED | PENDING | DROPPED
});
const navigate = useNavigate();

const closeAndGoHome = () => {
  setPaymentPopup({ open: false, status: null });
  navigate("/");
};
  /* ================= BOOKING FLOW STATE ================= */
  const [step, setStep] = useState(1);

  const [bookingData, setBookingData] = useState({
  service_id: Number(id),
  latitude: null,
  longitude: null,
  address: "",
  booking_type: null,   // 👈 NOT hardcoded
  booking_date: "",
  booking_time: "",
  instructions: "",
});


const [locationLoading, setLocationLoading] = useState(false);
 const [locationLabel, setLocationLabel] = useState("");
 const [locationQuery, setLocationQuery] = useState("");
const [locationResults, setLocationResults] = useState([]);

const [formMessage, setFormMessage] = useState({
  type: "", // "error" | "success"
  text: "",
});

const getCurrentLocation = async () => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  setLocationLoading(true);

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // 🔹 Convert ONLY for UI display
        const readableLocation = await reverseGeocode(lat, lng);

        // ✅ Backend data (ONLY lat/lng)
        setBookingData((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lng,
          // ❌ address ko TOUCH bhi nahi karna
        }));

        // ✅ UI display
        setLocationLabel(readableLocation);
      } catch (err) {
        alert("Unable to fetch location");
        console.error(err);
      } finally {
        setLocationLoading(false);
      }
    },
    () => {
      setLocationLoading(false);
      alert("Location permission denied");
    }
  );
};


const handleLocationSearch = async (value) => {
  setLocationQuery(value);
  setLocationLabel(value);

  if (value.length < 3) {
    setLocationResults([]);
    return;
  }

  const results = await searchLocation(value);
  setLocationResults(results);
};

const handleSelectLocation = (item) => {
  setBookingData((prev) => ({
    ...prev,
    latitude: Number(item.lat),
    longitude: Number(item.lon),
  }));

  setLocationLabel(item.display_name);
  setLocationQuery("");
  setLocationResults([]);
};

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

  // ================= FETCH BILL WHEN DRAFT ID CHANGES =================
  useEffect(() => {
  if (step === 2 && draftId) {
    fetchBillDetails();
  }
}, [step, draftId]);

// ================= FETCH PAYMENT STATUS =================
const fetchPaymentStatus = async (bookingId) => {
  try {
    const res = await getBookingPaymentStatus(bookingId);
    return res.status; // COMPLETED | PAYMENT_PENDING | PAYMENT_DROPPED | CANCELLED
  } catch (err) {
    console.error("Payment status error", err);
    return null;
  }
};

// ================= PREFILL EDIT DATE TIME =================
useEffect(() => {
  if (billData?.booking) {
    setEditDate(
      billData.booking.date
        ? billData.booking.date.split("T")[0]
        : ""
    );
    setEditTime(billData.booking.time || "");
  }
}, [billData]);

const fetchBillDetails = async () => {
  try {
    setBillLoading(true);
    const data = await getBookingBill(draftId);
    setBillData(data);
  } catch (err) {
    console.error("Bill fetch error", err);
  } finally {
    setBillLoading(false);
  }
};

  /* ---------------- LOADING ---------------- */
  if (loading) {
  return (
    <>
      <Navbar />
      <ServiceDetailsSkeleton />
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

  /* ================= CREATE BOOKING ================= */
  const handleCreateBooking = () => {
    const payload = {
      service_id: bookingData.service_id,
      latitude: bookingData.latitude,
      longitude: bookingData.longitude,
      address: bookingData.address,
      booking_type: bookingData.booking_type,
      instructions: bookingData.instructions,
    };

    if (bookingData.booking_type === "scheduled") {
      payload.booking_date = bookingData.booking_date;
      payload.booking_time = bookingData.booking_time;
    }

    console.log("BOOKING PAYLOAD 👉", payload);
    // API CALL HERE
  };

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

          {formMessage.text && (
  <div
    className={`mb-4 rounded-xl px-4 py-3 text-sm ${
      formMessage.type === "error"
        ? "bg-red-50 text-red-700 border border-red-200"
        : "bg-green-50 text-green-700 border border-green-200"
    }`}
  >
    {formMessage.text}
  </div>
)}

            {step === 1 && (
  <>
    <h3 className="text-lg font-bold text-[#111827] mb-6">
      Step 1
    </h3>

  {/* SELECT LOCATION */}
<div className="mb-4 relative">
  <label className="text-sm font-medium">Select Location</label>

  <div className="mt-2 flex items-center gap-2 border rounded-xl px-4 py-3">
    <MapPin size={18} className="text-[#00C389]" />

    <input
      type="text"
      placeholder="Search area / locality"
      value={locationLabel}
      onChange={(e) => handleLocationSearch(e.target.value)}
      className="w-full outline-none text-sm bg-transparent"
    />

    <button
      type="button"
      onClick={getCurrentLocation}
      disabled={locationLoading}
      className="text-[#00C389] text-sm font-semibold disabled:opacity-50"
    >
      {locationLoading ? "Locating..." : "Use"}
    </button>
  </div>

  {/* SEARCH RESULTS */}
  {locationResults.length > 0 && (
    <div className="absolute z-20 mt-2 w-full bg-white border rounded-xl shadow-lg max-h-56 overflow-auto">
      {locationResults.map((item) => (
        <button
          key={item.place_id}
          type="button"
          onClick={() => handleSelectLocation(item)}
          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
        >
          {item.display_name}
        </button>
      ))}
    </div>
  )}

  {locationLabel && (
    <p className="text-xs text-green-600 mt-1">
      Location detected successfully
    </p>
  )}
</div>

    {/* ADDRESS */}
    <div className="mb-4">
  <label className="text-sm font-medium">House / Flat No</label>

  <input
    type="text"
    placeholder="House no, Flat, Floor"
    value={bookingData.address}
    onChange={(e) =>
      setBookingData({
        ...bookingData,
        address: e.target.value, // 👈 USER INPUT ONLY
      })
    }
    className="w-full mt-2 border rounded-xl px-4 py-3"
  />
</div>

    {/* BOOKING TYPE */}
    <div className="mb-4">
      <label className="text-sm font-medium">Date & Time</label>

      <div className="mt-3 space-y-3">
        <label className="flex items-center gap-3">
          <input
            type="radio"
            name="bookingType"
            onChange={() =>
              setBookingData({ ...bookingData, booking_type: "scheduled" })
            }
          />
          Custom Date & Time
        </label>

        <label className="flex items-center gap-3">
          <input
            type="radio"
            name="bookingType"
            onChange={() =>
              setBookingData({ ...bookingData, booking_type: "instant" })
            }
          />
          Instant Service
        </label>
      </div>
    </div>

    {/* DATE TIME */}
    {bookingData.booking_type === "scheduled" && (
      <>
        <input
          type="date"
          className="w-full border rounded-xl px-4 py-3 mb-3"
          onChange={(e) =>
            setBookingData({ ...bookingData, booking_date: e.target.value })
          }
        />

        <input
          type="time"
          className="w-full border rounded-xl px-4 py-3 mb-4"
          onChange={(e) =>
            setBookingData({ ...bookingData, booking_time: e.target.value })
          }
        />
      </>
    )}

    {/* INSTRUCTIONS */}
    <div className="mb-6">
      <label className="text-sm font-medium">Additional Instruction</label>
      <textarea
        placeholder="Please call before coming"
        value={bookingData.instructions}
        onChange={(e) =>
          setBookingData({ ...bookingData, instructions: e.target.value })
        }
        className="w-full mt-2 border rounded-xl px-4 py-3"
      />
    </div>

    {/* CONTINUE */}
   <button
  onClick={async () => {
    // 🔄 clear previous message
    setFormMessage({ type: "", text: "" });

    // ✅ VALIDATION
    if (!bookingData.latitude || !bookingData.longitude) {
      setFormMessage({
        type: "error",
        text: "Please select your location",
      });
      return;
    }

    if (!bookingData.address) {
      setFormMessage({
        type: "error",
        text: "Please enter house / flat number",
      });
      return;
    }

    if (!bookingData.booking_type) {
      setFormMessage({
        type: "error",
        text: "Please select booking type",
      });
      return;
    }

    if (
      bookingData.booking_type === "scheduled" &&
      (!bookingData.booking_date || !bookingData.booking_time)
    ) {
      setFormMessage({
        type: "error",
        text: "Please select date and time",
      });
      return;
    }

   try {
  const payload = {
    service_id: bookingData.service_id,
    latitude: bookingData.latitude,
    longitude: bookingData.longitude,
    address: bookingData.address,
    booking_type: bookingData.booking_type,
    instructions: bookingData.instructions,
  };

  if ((bookingData.booking_type === "scheduled")) {
    payload.booking_date = bookingData.booking_date;
    payload.booking_time = bookingData.booking_time;
  }

 const res = await createBookingDraft(payload);

console.log("DRAFT CREATE RESPONSE 👉", res);

// ✅ correct draft id
const draftIdFromApi = res?.draft?.id;

if (!draftIdFromApi) {
  throw new Error("Draft ID not received");
}

setDraftId(draftIdFromApi);

setFormMessage({
  type: "success",
  text: "Booking details saved successfully",
});

// ✅ STEP CHANGE ONLY ONCE
setStep(2);


} catch (err) {
  console.error(err);
  setFormMessage({
    type: "error",
    text: "Failed to save booking. Please try again.",
  });
}

  }}
  className="w-full bg-[#00C389] text-white py-3 rounded-full font-semibold"
>
  Continue
</button>
  </>
)}

            {step === 2 && (
  <>
    <h3 className="text-lg font-bold text-[#111827] mb-6">
      Bill Details
    </h3>

    {billLoading && (
      <p className="text-sm text-gray-500">Loading bill details...</p>
    )}

    {billData && (
      <>
    {/* SERVICE + DATE TIME */}
<div className="mb-6 border rounded-2xl p-4">

  <div className="flex items-start justify-between gap-4">
    <div className="flex items-center gap-4">
      <img
        src={billData.service.icon}
        alt={billData.service.name}
        className="h-12 w-12 rounded-xl"
      />

      <div>
        <p className="font-semibold text-[#111827]">
          {billData.service.name}
        </p>

        {!isEditingDateTime ? (
          <p className="text-sm text-gray-500 mt-1">
            {new Date(billData.booking.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
            {" • "}
            {billData.booking.time}
            {billData.booking.type === "instant" && " (Instant)"}
          </p>
        ) : (
          <div className="flex gap-1 mt-2">
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
              className="border rounded-lg px-1 py-1 text-sm"
            />
            <input
              type="time"
              value={editTime}
              onChange={(e) => setEditTime(e.target.value)}
              className="border rounded-lg px-1 py-1 text-sm"
            />
          </div>
        )}
      </div>
    </div>

    {!isEditingDateTime && (
      <button
        onClick={() => setIsEditingDateTime(true)}
        className="text-[#00C389] text-sm font-semibold"
      >
        ✏️ Edit
      </button>
    )}
  </div>

  {/* ✅ SAVE BUTTON — YAHI HAI BHAI 😄 */}
  {isEditingDateTime && (
    <button
      onClick={async () => {
        if (!editDate || !editTime) {
          alert("Please select date & time");
          return;
        }

        try {
          await updateBookingDateTime(draftId, {
            booking_date: editDate,
            booking_time: editTime,
          });

          // UI sync
          setBillData((prev) => ({
            ...prev,
            booking: {
              ...prev.booking,
              date: `${editDate}T00:00:00.000Z`,
              time: editTime,
            },
          }));

          setIsEditingDateTime(false);
        } catch (err) {
          console.error(err);
          alert("Failed to update date & time");
        }
      }}
      className="mt-4 w-full bg-[#00C389] text-white py-2 rounded-full font-semibold"
    >
      Save Date & Time
    </button>
  )}
</div>

        {/* BILL SUMMARY */}
        <div className="border rounded-2xl p-4 space-y-3 mb-6">
          <div className="flex justify-between">
            <span>Total Amount</span>
            <span className="font-semibold">
              ₹{billData.bill.total_amount}
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <span>Advance Amount</span>
            <span>₹{billData.bill.advance_amount}</span>
          </div>

          <div className="flex justify-between font-semibold">
            <span>Payable Now</span>
            <span>₹{billData.bill.payable_now}</span>
          </div>
        </div>

      {/* CONFIRM */}
<button
  onClick={() => setShowPaymentOptions(true)}
  className="w-full bg-[#00C389] text-white py-3 rounded-full font-semibold"
>
  Confirm Booking
</button>

  {showPaymentOptions && (
  <div className="mt-6 border rounded-2xl p-4 space-y-4">

    <p className="text-sm font-semibold text-[#111827]">
      Select Payment Type
    </p>

    {/* ADVANCE */}
    <label
      className={`flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer ${
        paymentType === "ADVANCE"
          ? "border-[#00C389] bg-[#00C389]/5"
          : ""
      }`}
    >
      <div>
        <p className="font-medium">Pay Advance</p>
        <p className="text-sm text-gray-500">
          ₹{billData.bill.advance_amount} payable now
        </p>
      </div>

      <input
        type="radio"
        name="paymentType"
        value="ADVANCE"
        checked={paymentType === "ADVANCE"}
        onChange={() => setPaymentType("ADVANCE")}
      />
    </label>

    {/* FULL */}
    <label
      className={`flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer ${
        paymentType === "FULL"
          ? "border-[#00C389] bg-[#00C389]/5"
          : ""
      }`}
    >
      <div>
        <p className="font-medium">Pay Full Amount</p>
        <p className="text-sm text-gray-500">
          ₹{billData.bill.total_amount} payable now
        </p>
      </div>

      <input
        type="radio"
        name="paymentType"
        value="FULL"
        checked={paymentType === "FULL"}
        onChange={() => setPaymentType("FULL")}
      />
    </label>
  </div>
)}


    {paymentType && (
<button
  onClick={async () => {
    try {
      setCheckoutLoading(true);

      const payload = {
        draft_id: draftId,
        payment_type: paymentType,
      };

     const res = await checkoutBooking(payload);
console.log("CHECKOUT RESPONSE 👉", res);

const cfData = res?.cashfree;

if (!cfData?.payment_session_id) {
  throw new Error("Payment session missing");
}

// ✅ IMPORTANT: window.Cashfree
const cashfree = window.Cashfree({
  mode: cfData.environment === "sandbox" ? "sandbox" : "production",
});

// ✅ HOSTED CHECKOUT (DOCS MATCH)
cashfree.checkout({
  paymentSessionId: cfData.payment_session_id,
  redirectTarget: "_modal",
})

.then(async () => {
          // 🔥 PAYMENT POPUP CLOSE HONE KE BAAD
          const status = await fetchPaymentStatus(res.booking_id);

          if (status === "SEARCHING_PROVIDER" || status === "COMPLETED") {
            setPaymentPopup({ open: true, status: "SUCCESS" });
          } else if (status === "PAYMENT_PENDING") {
            setPaymentPopup({ open: true, status: "PENDING" });
          } else if (status === "PAYMENT_DROPPED") {
            setPaymentPopup({ open: true, status: "DROPPED" });
          } else if (status === "CANCELLED") {  
            setPaymentPopup({ open: true, status: "FAILED" });
          }
        });

    

   } catch (err) {
      console.error(err);
      setPaymentPopup({ open: true, status: "FAILED" });
    } finally {
      setCheckoutLoading(false);
    }
  }}
  disabled={checkoutLoading}
  className="mt-4 w-full bg-[#00C389] text-white py-3 rounded-full font-semibold disabled:opacity-50"
>
  {checkoutLoading ? "Redirecting to payment..." : "Proceed to Checkout"}
</button>

)}
      </>
    )}
  </>
)}
            <p className="mt-4 text-xs text-center text-[#6B7280]">
              <ShieldCheck
                size={14}
                className="inline mr-1 text-[#00C389]"
              />
              Safe & secure service guaranteed
            </p>
          </div>

        </div>
        {paymentPopup.open && paymentPopup.status === "SUCCESS" && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
    <div className="bg-white rounded-3xl p-8 w-[380px] text-center shadow-2xl animate-scaleIn">

      <div className="mx-auto h-18 w-18 rounded-full bg-[#00C389]/10 flex items-center justify-center">
        <ShieldCheck size={42} className="text-[#00C389]" />
      </div>

      <h2 className="mt-5 text-xl font-bold text-[#111827]">
        Payment Successful 🎉
      </h2>

      <p className="mt-2 text-sm text-[#6B7280]">
        Your payment is confirmed. Providers are being notified.
      </p>

      <button
        onClick={closeAndGoHome}
        className="
          mt-6 w-full py-3 rounded-full
          bg-gradient-to-r from-[#00C389] to-[#007A57]
          text-white font-semibold
          hover:opacity-90 transition
        "
      >
        Go to Home
      </button>
    </div>
  </div>
)}

    {paymentPopup.open && paymentPopup.status === "PENDING" && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div className="bg-white rounded-3xl p-8 w-[360px] text-center shadow-xl animate-scaleIn">

      <div className="mx-auto h-16 w-16 rounded-full bg-[#00C389]/10 flex items-center justify-center">
        <Loader2 size={36} className="text-[#00C389] animate-spin" />
      </div>

      <h2 className="mt-4 text-lg font-semibold text-[#111827]">
        Payment Processing
      </h2>

      <p className="mt-2 text-sm text-[#6B7280]">
        Please wait while we confirm your payment.
      </p>
    </div>
  </div>
)}

{paymentPopup.open &&
  (paymentPopup.status === "FAILED" ||
    paymentPopup.status === "DROPPED") && (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl p-8 w-[360px] text-center shadow-2xl animate-scaleIn">

        <div className="mx-auto h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
          <XCircle size={38} className="text-red-500" />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-red-600">
          Payment Failed
        </h2>

        <p className="mt-2 text-sm text-[#6B7280]">
          Your payment could not be completed. Please try again.
        </p>

        <button
          onClick={closeAndGoHome}
          className="
            mt-6 w-full py-3 rounded-full
            bg-red-500 text-white font-semibold
            hover:bg-red-600 transition
          "
        >
          Go to Home
        </button>
      </div>
    </div>
  )}

      </section>

      <Footer />
    </>
  );
}

export default ServiceDetails;
