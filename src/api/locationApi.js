// src/api/locationApi.js
import api from "./axios";

/* ===============================
   1️⃣ Reverse Geocoding (OpenStreet)
   =============================== */
export const reverseGeocode = async (lat, lng) => {
  console.log("🌍 reverseGeocode()", lat, lng);

  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
    {
      headers: {
        "Accept": "application/json",
        "Accept-Language": "en",
        // 🔴 REQUIRED BY OPENSTREET
        "User-Agent": "Zanvito-Web-App/1.0 (contact@zanvito.com)",
      },
    }
  );

  if (!res.ok) {
    throw new Error("OpenStreet reverse geocode failed");
  }

  const data = await res.json();

  if (!data?.display_name) {
    throw new Error("Address not found");
  }

  console.log("🏠 Address:", data.display_name);
  return data.display_name;
};

/* ===============================
   2️⃣ Save Customer Location
   =============================== */
export const saveCustomerLocation = async ({
  latitude,
  longitude,
  address,
}) => {
  console.log("💾 saveCustomerLocation()", {
    latitude,
    longitude,
    address,
  });

  const res = await api.patch("/customer/location", {
    latitude,
    longitude,
    address,
  });

  console.log("✅ Location saved:", res.data);
  return res.data;
};

/* ===============================
   3️⃣ Check Provider Availability
   =============================== */
export const checkProviderAvailability = async (lat, lng) => {
  console.log("🔍 checkProviderAvailability()", lat, lng);

  const res = await api.get(
    `/providers/availability?lat=${lat}&lng=${lng}`
  );

  console.log("📊 Availability:", res.data);
  return res.data; // { available: true / false }
};


export const searchLocation = async (query) => {
  if (!query) return [];

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&format=json&addressdetails=1&limit=5`,
    {
      headers: {
        "Accept": "application/json",
        "User-Agent": "Zanvito-Web-App/1.0 (contact@zanvito.com)",
      },
    }
  );

  if (!res.ok) return [];

  return await res.json();
};