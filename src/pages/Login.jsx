import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";
import { Apple, Play } from "lucide-react";

function Login() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  console.log("API URL:", API_URL);

 const handleContinue = async () => {
  if (phone.length !== 10) return;

  try {


    const res = await fetch(`${API_URL}/api/auth/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
        country_code: "+91",
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to send OTP");
    }

    const data = await res.json();

    navigate("/verify-otp", {
      state: {
        phone,
        user_id: data.user_id,
        debug_otp: data.debug_otp,
      },
    });

  } catch (err) {
    console.error("Send OTP Error:", err);
    alert("OTP send failed");
  }
};

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center px-6">

      {/* CARD */}
      <div className="relative w-full max-w-4xl h-[450px] bg-white rounded-[36px] shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="relative bg-gradient-to-b w-[110%] from-[#00C389] to-[#003D2B] text-white p-10 hidden lg:flex flex-col justify-between overflow-hidden">

          {/* CONTENT */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
               <div
    className="
      h-10 w-10
      rounded-xl
      flex items-center justify-center
      shadow-md
    "
    style={{
      background:
        "linear-gradient(180deg, #00C389 0%, #007A57 70%, #003D2B 100%)",
    }}
  >
    <span className="text-white font-extrabold text-xl tracking-wide">
      Z
    </span>
  </div>
              <div className="flex items-center gap-1">
  <h2 className="text-2xl font-bold tracking-wider text-[#022C22]">
    ZAN
    <span className="text-[#ffffff] font-extrabold">VITO</span>
  </h2>
</div>
            </div>

            <h2 className="text-3xl font-bold leading-snug">
              Reliable Home Services
              <br /> at Your Doorstep
            </h2>

            <p className="mt-4 text-white/80 text-sm max-w-xs">
              Book trusted professionals for AC, plumbing, cleaning & more —
              fast, transparent and secure.
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

            <h2 className="text-2xl font-bold text-[#111827]">
              Login / Sign up
            </h2>

            <p className="mt-2 text-sm text-[#6B7280]">
              Enter your mobile number to continue
            </p>

            {/* INPUT */}
            <div className="mt-6">
              <label className="text-sm font-medium text-[#374151]">
                Mobile Number
              </label>

              <div className="mt-2 flex items-center gap-3 border rounded-xl px-4 py-3 focus-within:border-[#00C389]">
                <Phone size={18} className="text-[#00C389]" />
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Enter 10-digit number"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleContinue}
              disabled={phone.length !== 10}
              className="
                mt-6 w-full bg-[#00C389] text-white
                py-3 rounded-full font-semibold
                hover:bg-emerald-600 transition
                disabled:opacity-50
              "
            >
              Continue
            </button>

            <p className="mt-4 text-xs text-center text-[#6B7280]">
              By continuing, you agree to our{" "}
              <span className="text-[#00C389] font-medium">
                Terms & Privacy Policy
              </span>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;