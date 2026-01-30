import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { Apple, Play } from "lucide-react"; 

function OtpVerify() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const phone = state?.phone;

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  if (!phone) {
    navigate("/login");
    return null;
  }

  /* INPUT CHANGE */
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  /* BACKSPACE */
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleVerify = async () => {
  const enteredOtp = otp.join("");
  if (enteredOtp.length !== 6) return;

  setLoading(true);

  try {
    const API_URL =
      process.env.REACT_APP_API_URL || "http://localhost:5000";

    const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
        otp: enteredOtp,
      }),
    });

    const data = await res.json();

    if (!res.ok || data.success === false) {
      throw new Error(data.message || "Invalid OTP");
    }

    // ✅ OTP VERIFIED SUCCESSFULLY
    setLoading(false);

    // 🔐 Save token (if backend sends it)
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

 // OTP verify success ke baad
// localStorage.setItem("token", data.token);
// localStorage.setItem("user", JSON.stringify(data.user));

if (data.needs_registration) {
  navigate("/signup", {
    state: {
      phone,
      user_id: data.user.id, // ✅ CORRECT
    },
  });
} else {
  navigate("/");

    }

  } catch (err) {
    console.error("Verify OTP Error:", err);
    setLoading(false);
    alert(err.message || "OTP verification failed");
  }
};


  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center px-6">

      {/* CARD */}
      <div className="relative w-full max-w-4xl h-[450px] bg-white rounded-[36px] shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="relative bg-gradient-to-b w-[110%] from-[#00C389] to-[#003D2B] text-white p-10 hidden lg:flex flex-col justify-between overflow-hidden">

          <div className="relative z-10">
            {/* BRAND */}
            <div className="flex items-center gap-3 mb-10">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center shadow-md"
                style={{
                  background:
                    "linear-gradient(180deg, #00C389 0%, #007A57 70%, #003D2B 100%)",
                }}
              >
                <span className="text-white font-extrabold text-xl">Z</span>
              </div>

             <div className="flex items-center gap-1">
  <h2 className="text-2xl font-bold tracking-wider text-[#022C22]">
    ZAN
    <span className="text-[#ffffff] font-extrabold">VITO</span>
  </h2>
</div>
            </div>

            <h2 className="text-3xl font-bold leading-snug">
              Secure Login <br /> Verification
            </h2>

            <p className="mt-4 text-white/80 text-sm max-w-xs">
              We’ve sent a 6-digit verification code to your mobile number
              to keep your account safe.
            </p>
          </div>

           {/* APP DOWNLOAD */}
<div className="mt-8 mb-4">
  <p className="text-sm text-white/70 mb-3">
    Download our app
  </p>

  <div className="flex gap-3">
    {/* PLAY STORE */}
    <a
      href="https://play.google.com/store/apps/details?id=YOUR_APP_ID"
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex items-center gap-3
        bg-white/10 hover:bg-white/20
        border border-white/20
        px-4 py-2 rounded-xl
        transition
      "
    >
      <Play size={20} />
      <div className="leading-tight">
        <p className="text-[10px] uppercase text-white/70">
          Get it on
        </p>
        <p className="text-sm font-semibold">
          Google Play
        </p>
      </div>
    </a>

    {/* APP STORE */}
    <a
      href="https://apps.apple.com/app/idYOUR_APP_ID"
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex items-center gap-3
        bg-white/10 hover:bg-white/20
        border border-white/20
        px-4 py-2 rounded-xl
        transition
      "
    >
      <Apple size={20} />
      <div className="leading-tight">
        <p className="text-[10px] uppercase text-white/70">
          Download on the
        </p>
        <p className="text-sm font-semibold">
          App Store
        </p>
      </div>
    </a>
  </div>
</div>


          {/* CLOUD WAVE SVG - Positioned on the right edge */}
          <svg
            className="absolute top-0 right-0 h-full w-[120px] z-20"
            viewBox="0 0 120 600"
            preserveAspectRatio="none"
            fill="white"
          >
            <path
              d="
                M120 0
                L120 600
                L60 600
                C60 600, 80 580, 60 550
                C40 520, 80 500, 60 460
                C30 420, 90 380, 60 340
                C20 300, 80 260, 50 220
                C20 180, 70 150, 40 110
                C10 70, 60 40, 40 20
                C30 10, 50 0, 60 0
                L120 0
                Z
              "
            />
          </svg>

          {/* Extra cloud bubbles for depth */}
          <svg
            className="absolute top-0 right-[40px] h-full w-[100px] z-10 opacity-30"
            viewBox="0 0 100 600"
            preserveAspectRatio="none"
            fill="white"
          >
            <path
              d="
                M100 0
                C70 30, 90 80, 60 120
                C30 160, 80 200, 50 250
                C20 300, 70 350, 40 400
                C10 450, 60 500, 30 550
                C20 580, 50 600, 80 600
                L100 600
                Z
              "
            />
          </svg>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-10 flex items-center">
          <div className="w-50% max-w-sm mx-auto">

            <div className="h-14 w-14 rounded-full bg-[#00C389]/10 flex items-center justify-center mb-4">
              <ShieldCheck size={28} className="text-[#00C389]" />
            </div>

            <h2 className="text-2xl font-bold text-[#111827]">
              Verify OTP
            </h2>

            <p className="mt-2 text-sm text-[#6B7280]">
              Enter the 6-digit code sent to <br />
              <span className="font-semibold text-[#111827]">
                +91 {phone}
              </span>
            </p>

            {/* OTP BOXES */}
            <div className="mt-6 flex gap-3 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  maxLength={1}
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) =>
                    handleChange(e.target.value, index)
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(e, index)
                  }
                  className="
                    w-12 h-12 text-center text-lg font-semibold
                    border rounded-xl
                    focus:border-[#00C389]
                    focus:outline-none
                  "
                />
              ))}
            </div>

            {/* BUTTON */}
            <button
              onClick={handleVerify}
              disabled={otp.join("").length !== 6 || loading}
              className="
                mt-6 w-full bg-[#00C389] text-white
                py-3 rounded-full font-semibold
                hover:bg-emerald-600 transition
                disabled:opacity-50
              "
            >
              {loading ? "Verifying..." : "Verify & Continue"}
            </button>

            <p className="mt-4 text-xs text-center text-[#6B7280]">
              Didn’t receive OTP?
              <button className="ml-1 text-[#00C389] font-medium">
                Resend
              </button>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpVerify;
