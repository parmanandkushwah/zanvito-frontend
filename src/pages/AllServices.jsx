import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getHomeData } from "../api/homeApi";
import AllServicesSkeleton from "../components/skeletons/AllServicesSkeleton";
import { useAvailability } from "../context/AvailabilityContext";

function AllServices() {
  const navigate = useNavigate();
  const { serviceAvailable } = useAvailability(); // 🔥 IMPORTANT

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  /* ---------- FETCH DATA ---------- */
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getHomeData();
      if (res?.success) {
        setServices(res.services || []);
        setCategories(res.categories || []);
      }
    } catch (err) {
      console.error("All Services Error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- FILTERED SERVICES ---------- */
  const filteredServices = useMemo(() => {
    return services
      .filter((service) =>
        service.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((service) => {
        if (activeFilter === "All") return true;
        return (
          Number(service.category_id) ===
          Number(activeFilter)
        );
      });
  }, [services, search, activeFilter]);

  return (
    <>
      <Navbar />

      {/* 🔴 COMING SOON OVERLAY */}
      {!serviceAvailable && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              🚧 Coming Soon
            </h2>
            <p className="text-gray-600 mb-4">
              Services are not available in your area yet.
              Please change your location.
            </p>

            <button
              onClick={() =>
                document.getElementById("location-button")?.click()
              }
              className="bg-[#00C389] text-white px-6 py-2 rounded-xl hover:bg-emerald-600 transition"
            >
              Change Location
            </button>
          </div>
        </div>
      )}

      {/* 🔒 PAGE CONTENT */}
      <div
        className={`transition-all duration-300 ${
          !serviceAvailable
            ? "grayscale opacity-60 pointer-events-none"
            : ""
        }`}
      >
        {loading ? (
          <AllServicesSkeleton />
        ) : (
          <>
            <section className="pt-24 pb-16 bg-[#F9FAFB]">
              <div className="max-w-7xl mx-auto px-6">

                {/* HEADER */}
                <div className="mb-10 mt-4">
                  <h1 className="text-2xl md:text-3xl font-bold text-[#111827]">
                    All Services
                  </h1>
                  <p className="mt-2 text-[#6B7280] max-w-xl">
                    Choose from our wide range of professional home services.
                  </p>
                </div>

                {/* SEARCH + FILTER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">

                  {/* SEARCH */}
                  <div className="w-full md:w-1/2">
                    <div className="relative">
                      <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
                      />
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search services"
                        className="w-full pl-11 pr-4 py-3 rounded-full border focus:border-[#00C389] outline-none text-sm"
                      />
                    </div>
                  </div>

                  {/* FILTER */}
                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => setActiveFilter("All")}
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        activeFilter === "All"
                          ? "bg-[#00C389] text-white"
                          : "bg-white border"
                      }`}
                    >
                      All
                    </button>

                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveFilter(cat.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          Number(activeFilter) === Number(cat.id)
                            ? "bg-[#00C389] text-white"
                            : "bg-white border"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SERVICES GRID */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {filteredServices.map((service) => (
                    <div
                      key={service.id}
                      onClick={() =>
                        navigate(`/services/${service.id}`)
                      }
                      className="bg-white rounded-3xl p-6 border shadow-sm hover:shadow-lg hover:border-[#00C389] transition cursor-pointer"
                    >
                      <div className="h-12 w-12 rounded-xl bg-[#E6FBF4] flex items-center justify-center">
                        <img
                          src={service.icon}
                          alt={service.name}
                          className="h-6 w-6"
                        />
                      </div>

                      <h3 className="mt-5 text-lg font-semibold">
                        {service.name}
                      </h3>

                      <p className="mt-1 text-sm text-[#6B7280]">
                        Starting from{" "}
                        <span className="font-bold text-[#111827]">
                          ₹{service.starting_from}
                        </span>
                      </p>

                      <button className="mt-6 text-sm font-medium text-[#00C389]">
                        Book now →
                      </button>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            <Footer />
          </>
        )}
      </div>
    </>
  );
}

export default AllServices;
