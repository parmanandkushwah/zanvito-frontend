import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useAvailability } from "../context/AvailabilityContext";


import {
  reverseGeocode,
  saveCustomerLocation,
  checkProviderAvailability,
} from "../api/locationApi";

function Navbar() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
const { setServiceAvailable } = useAvailability();
  // 🌍 LOCATION STATE
  const [selectedLocation, setSelectedLocation] = useState(
    localStorage.getItem("user_location") || ""
  );

  // 🔎 MANUAL SEARCH
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // 🔐 AUTH
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  /* SCROLL EFFECT */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* CLICK OUTSIDE */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
        setLocationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ===============================
     📡 USE CURRENT LOCATION
  =============================== */
  const handleUseCurrentLocation = () => {
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          const address = await reverseGeocode(lat, lng);

          await saveCustomerLocation({
            latitude: lat,
            longitude: lng,
            address,
          });

          localStorage.setItem("user_location", address);
          setSelectedLocation(address);

          const availability = await checkProviderAvailability(lat, lng);
          setLocationOpen(false);
if (!availability.available) {
  setServiceAvailable(false);
  localStorage.setItem("service_available", "false");
} else {
  setServiceAvailable(true);
  localStorage.setItem("service_available", "true");
}
        } catch (err) {
          console.error(err);
          setLocationError("Unable to detect location");
        } finally {
          setLoadingLocation(false);
        }
      },
      () => {
        setLocationError("Location permission denied");
        setLoadingLocation(false);
      }
    );
  };

  /* ===============================
     🔍 MANUAL LOCATION SEARCH
  =============================== */
  const handleSearchLocation = async (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.length < 3) {
      setSearchResults([]);
      return;
    }

    try {
      setSearchLoading(true);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${value}&format=json&limit=5`
      );
      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setSearchLoading(false);
    }
  };

  /* ===============================
     📍 SELECT MANUAL LOCATION
  =============================== */
  const handleSelectLocation = async (loc) => {
    try {
      setLoadingLocation(true);

      const lat = loc.lat;
      const lng = loc.lon;
      const address = loc.display_name;

      await saveCustomerLocation({
        latitude: lat,
        longitude: lng,
        address,
      });

      localStorage.setItem("user_location", address);
      setSelectedLocation(address);

      const availability = await checkProviderAvailability(lat, lng);
      setLocationOpen(false);

      if (!availability.available) {
  setServiceAvailable(false);
  localStorage.setItem("service_available", "false");
} else {
  setServiceAvailable(true);
  localStorage.setItem("service_available", "true");
}
    } catch (err) {
      console.error(err);
      setLocationError("Service not available in this area");
    } finally {
      setLoadingLocation(false);
    }
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Categories", path: "/categories" },
    { label: "Services", path: "/services" },
    { label: "My Bookings", path: "/my-bookings" },
    { label: "Blogs", path: "/blogs" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#00C389]/30 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer"
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
          </div>

          {/* LOCATION */}
          <div className="relative hidden md:block" ref={dropdownRef}>
            <button
            id="location-button"
              onClick={() => setLocationOpen(!locationOpen)}
              className="
                flex items-center gap-2
                bg-white/80 backdrop-blur
                px-4 py-2 rounded-full
                text-sm font-medium
                border border-black/5
                hover:shadow-md transition
                max-w-[220px]
              "
            >
              📍
              <span className="truncate">
                {selectedLocation
                  ? selectedLocation.split(",").slice(0, 2).join(", ")
                  : "Select location"}
              </span>
            </button>

            {locationOpen && (
              <div className="absolute left-0 mt-3 w-[360px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-black/5 p-5 z-50">

                <p className="text-sm font-semibold text-[#111827] mb-3">
                  📍 Choose your location
                </p>

                {/* CURRENT LOCATION */}
                <button
                  onClick={handleUseCurrentLocation}
                  disabled={loadingLocation}
                  className="
                    w-full mb-4 flex items-center justify-center gap-2
                    border border-[#00C389]
                    text-[#00C389]
                    px-4 py-2 rounded-xl
                    text-sm font-medium
                    hover:bg-[#00C389] hover:text-white
                    transition disabled:opacity-60
                  "
                >
                  {loadingLocation ? "Detecting..." : "📡 Use Current Location"}
                </button>

                {/* MANUAL SEARCH */}
                <input
                  value={searchText}
                  onChange={handleSearchLocation}
                  placeholder="Search area / city"
                  className="w-full border px-4 py-2 rounded-xl mb-3 text-sm"
                />

                {searchLoading && (
                  <p className="text-xs text-[#00C389]">Searching...</p>
                )}

                <div className="max-h-52 overflow-y-auto space-y-1">
                  {searchResults.map((loc, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectLocation(loc)}
                      className="
                        w-full text-left px-3 py-2 rounded-lg
                        hover:bg-[#00C389]/10 text-sm
                      "
                    >
                      📍 {loc.display_name}
                    </button>
                  ))}
                </div>

                {locationError && (
                  <p className="text-sm text-red-500 mt-2">
                    {locationError}
                  </p>
                )}
              </div>
            )}
          </div>
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
        <div className="flex items-center gap-4 relative">
          {!token ? (
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
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="
                  h-10 w-10 rounded-full
                  flex items-center justify-center
                  text-white font-semibold
                  shadow-md transition hover:scale-105
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

              <div
                className={`absolute right-0 mt-3 w-52 rounded-2xl
                bg-white/90 backdrop-blur-lg shadow-xl border border-black/5
                transform transition-all duration-200 origin-top-right
                ${
                  open
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-0 pointer-events-none"
                }`}
              >
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-semibold text-[#111827]">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">Logged in</p>
                </div>

                <button
                  onClick={() => {
                    navigate("/profile");
                    setOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-[#00C389]/10"
                >
                  My Profile
                </button>

                <button
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                    window.location.reload();
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
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
