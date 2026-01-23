import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User, Phone, Mail, Check } from "lucide-react";
import { Apple, Play } from "lucide-react";

function Signup() {
  const navigate = useNavigate();
 const { state } = useLocation();
const phone = state?.phone || "";
const userId = state?.user_id; // 👈 ADD

const [loading, setLoading] = useState(false);
const [profilePhoto, setProfilePhoto] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = email === "" || emailRegex.test(email);

  const handleSignup = async () => {
  if (!name || !isEmailValid || !userId) return;

  setLoading(true);

  try {
    const API_URL =
      process.env.REACT_APP_API_URL || "http://localhost:5000";

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("country_code", "+91");

    if (profilePhoto) {
      formData.append("profile_photo", profilePhoto);
    }

    const res = await fetch(
      `${API_URL}/api/auth/complete-profile`,
      {
        method: "PATCH",
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok || data.success === false) {
      throw new Error(data.message || "Profile update failed");
    }

    setLoading(false);
    navigate("/");

  } catch (err) {
    console.error("Complete Profile Error:", err);
    setLoading(false);
    alert(err.message || "Profile update failed");
  }
};

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center px-6">

      {/* CARD */}
      <div className="relative w-full max-w-4xl h-[555px] bg-white rounded-[36px] shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* LEFT PANEL (SAME AS OTP) */}
       <div className="relative bg-gradient-to-b w-[110%] from-[#00C389] to-[#003D2B]
                text-white p-8 hidden lg:flex flex-col justify-start gap-6 overflow-hidden">


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

              <h2 className="text-2xl font-bold tracking-wider text-[#022C22]">
                ZAN<span className="text-white font-extrabold">VITO</span>
              </h2>
            </div>

            <h2 className="text-3xl font-bold leading-snug">
              Complete Your <br /> Profile
            </h2>

            <p className="mt-4 text-white/80 text-sm max-w-xs">
              Create your account to start booking trusted home service
              professionals instantly.
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Check size={16} /> Quick booking
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} /> Verified providers
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} /> Secure payments
              </li>
            </ul>
          </div>

          {/* APP DOWNLOAD */}
          <div className="mt-8 mb-4">
            <p className="text-sm text-white/70 mb-3">
              Download our app
            </p>

            <div className="flex gap-3">
              <a
                href="#"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20
                           border border-white/20 px-4 py-2 rounded-xl transition"
              >
                <Play size={20} />
                <div>
                  <p className="text-[10px] uppercase text-white/70">
                    Get it on
                  </p>
                  <p className="text-sm font-semibold">
                    Google Play
                  </p>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20
                           border border-white/20 px-4 py-2 rounded-xl transition"
              >
                <Apple size={20} />
                <div>
                  <p className="text-[10px] uppercase text-white/70">
                    Download on
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
        <div className="px-8 py-6 flex items-center">
          <div className="w-50% max-w-sm mx-auto">

            <h2 className="text-2xl font-bold text-[#111827]">
              Create Account
            </h2>

            <p className="mt-2 text-sm text-[#6B7280]">
              Just one last step to get started
            </p>
{/* PROFILE PHOTO */}
<div className="mt-3">
  <label className="text-xs font-medium text-[#374151] mb-1 block">
    Profile Photo <span className="text-xs text-gray-400">(optional)</span>
  </label>

  <div className="flex items-center gap-4">
    {/* AVATAR */}
    <label
      htmlFor="profilePhoto"
      className="
        relative
        h-16 w-16
        rounded-full
        cursor-pointer
        border-2 border-dashed border-[#00C389]/60
        flex items-center justify-center
        bg-[#00C389]/10
        hover:bg-[#00C389]/20
        transition
        overflow-hidden
      "
    >
      {profilePhoto ? (
        <img
          src={URL.createObjectURL(profilePhoto)}
          alt="profile"
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-xs text-[#047857] font-medium text-center px-2">
          Upload Photo
        </span>
      )}

      {/* HOVER OVERLAY */}
      <div
        className="
          absolute inset-0
          bg-black/40
          text-white
          text-xs
          flex items-center justify-center
          opacity-0 hover:opacity-100
          transition
        "
      >
        Change
      </div>
    </label>

    {/* TEXT */}
    <div className="text-sm text-[#6B7280] leading-snug">
      <p>PNG, JPG up to 5MB</p>
      <p className="text-xs">
        Used for your public profile
      </p>
    </div>
  </div>

  {/* HIDDEN INPUT */}
  <input
    id="profilePhoto"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => setProfilePhoto(e.target.files[0])}
  />
</div>
            {/* NAME */}
            <div className="mt-3">
              <label className="text-sm font-medium text-[#374151]">
                Full Name
              </label>

              <div className="mt-1 flex items-center gap-3 border rounded-xl px-3 py-2 focus-within:border-[#00C389]">
                <User size={18} className="text-[#00C389]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="mt-3">
              <label className="text-sm font-medium text-[#374151]">
                Email (optional)
              </label>

              <div
                className={`mt-1 flex items-center gap-3 border rounded-xl px-3 py-2
                  ${
                    !isEmailValid
                      ? "border-red-400"
                      : "focus-within:border-[#00C389]"
                  }`}
              >
                <Mail size={18} className="text-[#00C389]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full outline-none text-sm"
                />
              </div>

              {!isEmailValid && (
                <p className="mt-1 text-xs text-red-500">
                  Please enter a valid email
                </p>
              )}
            </div>

            {/* PHONE */}
            <div className="mt-3">
              <label className="text-sm font-medium text-[#374151]">
                Mobile Number
              </label>

              <div className="mt-1 flex items-center gap-2 border rounded-xl px-3 py-2 bg-gray-50">
                <Phone size={18} className="text-[#00C389]" />
                <input
                  type="text"
                  value={`+91 ${phone}`}
                  disabled
                  className="w-full outline-none text-sm bg-transparent"
                />
              </div>
            </div>

            {/* CTA */}
            <button
  onClick={handleSignup}
  disabled={!name || !isEmailValid || loading}
  className="mt-6 w-full bg-[#00C389] text-white py-3 rounded-full
             font-semibold hover:bg-emerald-600 transition
             disabled:opacity-50"
>
  {loading ? "Creating Account..." : "Create Account"}
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

export default Signup;
