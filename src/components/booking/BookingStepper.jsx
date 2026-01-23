import React, { useState } from "react";
import { MapPin, Calendar, Clock, CheckCircle } from "lucide-react";

function BookingStepper({ service }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    address: "",
    date: "",
    time: "",
  });

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#00C389]/30">

      {/* STEPS HEADER */}
      <div className="flex justify-between mb-6">
        {["Address", "Slot", "Confirm"].map((label, i) => (
          <div key={i} className="flex-1 text-center">
            <div
              className={`h-9 w-9 mx-auto rounded-full flex items-center justify-center text-sm font-semibold
                ${
                  step >= i + 1
                    ? "bg-[#00C389] text-white"
                    : "bg-gray-200 text-gray-500"
                }
              `}
            >
              {i + 1}
            </div>
            <p className="mt-2 text-xs font-medium text-[#374151]">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* STEP 1: ADDRESS */}
      {step === 1 && (
        <>
          <h3 className="font-semibold text-[#111827] mb-4">
            Enter Service Address
          </h3>

          <div className="flex items-center gap-2 border rounded-xl px-4 py-3 mb-6">
            <MapPin size={18} className="text-[#00C389]" />
            <input
              type="text"
              placeholder="House no, street, area"
              className="w-full outline-none text-sm"
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />
          </div>

          <button
            disabled={!form.address}
            onClick={() => setStep(2)}
            className="w-full bg-[#00C389] text-white py-3 rounded-full font-semibold disabled:opacity-50"
          >
            Continue
          </button>
        </>
      )}

      {/* STEP 2: SLOT */}
      {step === 2 && (
        <>
          <h3 className="font-semibold text-[#111827] mb-4">
            Select Date & Time
          </h3>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-2 border rounded-xl px-4 py-3">
              <Calendar size={18} className="text-[#00C389]" />
              <input
                type="date"
                className="w-full outline-none text-sm"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
              />
            </div>

            <div className="flex items-center gap-2 border rounded-xl px-4 py-3">
              <Clock size={18} className="text-[#00C389]" />
              <input
                type="time"
                className="w-full outline-none text-sm"
                value={form.time}
                onChange={(e) =>
                  setForm({ ...form, time: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 border py-3 rounded-full"
            >
              Back
            </button>
            <button
              disabled={!form.date || !form.time}
              onClick={() => setStep(3)}
              className="flex-1 bg-[#00C389] text-white py-3 rounded-full font-semibold disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        </>
      )}

      {/* STEP 3: CONFIRM */}
      {step === 3 && (
        <>
          <div className="text-center mb-6">
            <CheckCircle size={48} className="mx-auto text-[#00C389]" />
            <h3 className="mt-3 text-lg font-bold text-[#111827]">
              Confirm Booking
            </h3>
          </div>

          <div className="bg-[#F9FAFB] rounded-2xl p-4 text-sm mb-6">
            <p><b>Service:</b> {service.name}</p>
            <p><b>Price:</b> {service.price}</p>
            <p><b>Address:</b> {form.address}</p>
            <p><b>Date:</b> {form.date}</p>
            <p><b>Time:</b> {form.time}</p>
          </div>

          <button
            onClick={() => alert("Booking confirmed (API later)")}
            className="w-full bg-[#00C389] text-white py-3 rounded-full font-semibold"
          >
            Confirm & Book
          </button>
        </>
      )}
    </div>
  );
}

export default BookingStepper;