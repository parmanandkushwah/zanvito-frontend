import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // 🔐 AUTH STATE
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  /* SCROLL EFFECT */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* CLICK OUTSIDE CLOSE */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Categories", path: "/categories" },
    { label: "Services", path: "/services" },
    { label: "My Bookings", path: "/my-bookings" },
    { label: "Blogs", path: "/blogs" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-[#00C389]/30 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center shadow-md"
            style={{
              background:
                "linear-gradient(180deg, #00C389 0%, #007A57 70%, #003D2B 100%)",
            }}
          >
            <span className="text-white font-bold text-xl">Z</span>
          </div>

          <span className="font-bold text-xl tracking-wide text-[#111827]">
            ZANVITO
          </span>

          <button className="hidden md:flex items-center gap-2 bg-white/70 text-[#111827] px-4 py-2 rounded-full text-sm backdrop-blur border border-black/5 ml-3">
            📍 User location
          </button>
        </div>

        {/* CENTER */}
        <nav className="hidden lg:flex gap-8 text-[#111827] font-medium">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="
                relative hover:text-[#00C389] transition
                after:absolute after:left-0 after:-bottom-1
                after:h-[2px] after:w-0 after:bg-[#00C389]
                hover:after:w-full after:transition-all
              "
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          {!token ? (
            /* LOGIN BUTTON */
            <button
              onClick={() => navigate("/login")}
              className="
                border border-[#111827]/30 px-6 py-2 rounded-full
                text-[#111827] font-medium
                hover:bg-[#00C389] hover:text-white transition
              "
            >
              Login now
            </button>
          ) : (
            /* USER AVATAR */
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="
                  h-10 w-10 rounded-full
                  flex items-center justify-center
                  text-white font-semibold
                  shadow-md transition
                  hover:scale-105
                "
                style={{
                  background:
                    "linear-gradient(180deg, #00C389 0%, #007A57 70%, #003D2B 100%)",
                }}
              >
                {user?.name
                  ? user.name.charAt(0).toUpperCase()
                  : <User size={18} />}
              </button>

              {/* DROPDOWN */}
              <div
                className={`
                  absolute right-0 mt-3 w-52
                  rounded-2xl
                  bg-white/90 backdrop-blur-lg
                  shadow-xl border border-black/5
                  transform transition-all duration-200 origin-top-right
                  ${
                    open
                      ? "scale-100 opacity-100"
                      : "scale-95 opacity-0 pointer-events-none"
                  }
                `}
              >
                {/* USER INFO */}
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-semibold text-[#111827]">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Logged in
                  </p>
                </div>

                {/* ACTIONS */}
                <button
                  onClick={() => {
                    navigate("/profile");
                    setOpen(false);
                  }}
                  className="
                    w-full px-4 py-3 text-left text-sm
                    hover:bg-[#00C389]/10 transition
                  "
                >
                  My Profile
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/login");
                    window.location.reload();
                  }}
                  className="
                    w-full px-4 py-3 text-left text-sm
                    text-red-600
                    hover:bg-red-50
                    flex items-center gap-2
                  "
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
