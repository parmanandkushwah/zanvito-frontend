import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search, ArrowRight } from "lucide-react";
import { getHomeData } from "../api/homeApi";
import AllCategoriesSkeleton from "../components/skeletons/AllCategoriesSkeleton";
import { useAvailability } from "../context/AvailabilityContext";

function AllCategories() {
  const navigate = useNavigate();
  const { serviceAvailable } = useAvailability(); // 🔥 IMPORTANT

  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getHomeData();
      if (res?.success) {
        setCategories(res.categories || []);
        setServices(res.services || []);
      }
    } catch (err) {
      console.error("AllCategories Error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DEFAULT CATEGORY ================= */
  useEffect(() => {
    if (categories.length && !activeCategoryId) {
      setActiveCategoryId(categories[0].id);
    }
  }, [categories, activeCategoryId]);

  /* ================= FILTER SERVICES ================= */
  const filteredServices = useMemo(() => {
    if (!activeCategoryId) return [];
    return services
      .filter(
        (s) => Number(s.category_id) === Number(activeCategoryId)
      )
      .filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
      );
  }, [services, activeCategoryId, search]);

  const activeCategory = categories.find(
    (c) => Number(c.id) === Number(activeCategoryId)
  );

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
          <AllCategoriesSkeleton />
        ) : (
          <>
            <section className="pt-28 pb-20">
              <div className="max-w-7xl mx-auto px-6">

                {/* HEADER */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-[#111827]">
                    Browse Services
                  </h1>
                  <p className="text-sm text-[#6B7280] mt-1">
                    Choose a category to explore trusted professionals
                  </p>
                </div>

                {/* SEARCH */}
                <div className="relative max-w-sm w-full mb-8">
                  <Search
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
                  />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search services"
                    className="w-full pl-10 pr-4 py-2.5 rounded-full border focus:border-[#00C389] outline-none text-sm"
                  />
                </div>

                <div className="grid lg:grid-cols-4 gap-8">

                  {/* LEFT */}
                  <div className="bg-white rounded-3xl border p-4 space-y-3 max-h-[70vh] overflow-y-auto">
                    {categories.map((cat) => {
                      const active =
                        Number(activeCategoryId) === Number(cat.id);

                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setActiveCategoryId(cat.id);
                            setSearch("");
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition ${
                            active
                              ? "bg-[#00C389] text-white shadow"
                              : "hover:bg-[#00C389]/10"
                          }`}
                        >
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center ${
                              active
                                ? "bg-white"
                                : "bg-[#00C389]/10"
                            }`}
                          >
                            <img
                              src={cat.icon}
                              alt={cat.name}
                              className="h-5 w-5"
                            />
                          </div>
                          <span className="font-medium text-sm">
                            {cat.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* RIGHT */}
                  <div className="lg:col-span-3 bg-white rounded-3xl p-8 border shadow-sm">
                    <h2 className="text-xl font-bold text-[#111827] mb-6">
                      {activeCategory?.name} Services
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {!filteredServices.length && (
                        <p className="text-sm text-[#6B7280]">
                          No services found
                        </p>
                      )}

                      {filteredServices.map((service) => (
                        <div
                          key={service.id}
                          onClick={() =>
                            navigate(`/services/${service.id}`)
                          }
                          className="cursor-pointer bg-[#F9FAFB] border rounded-2xl p-5 hover:border-[#00C389] hover:shadow-lg transition flex items-center justify-between"
                        >
                          <div>
                            <p className="font-semibold text-[#111827]">
                              {service.name}
                            </p>
                            <p className="text-sm text-[#6B7280] mt-1">
                              Starting from ₹{service.starting_from}
                            </p>
                          </div>

                          <div className="h-9 w-9 rounded-full bg-[#00C389]/10 flex items-center justify-center">
                            <ArrowRight size={16} className="text-[#00C389]" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

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

export default AllCategories;
