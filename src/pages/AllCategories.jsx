import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search, ArrowRight, ChevronRight } from "lucide-react";
import { getHomeData } from "../api/homeApi";
import AllCategoriesSkeleton from "../components/skeletons/AllCategoriesSkeleton";
import { useAvailability } from "../context/AvailabilityContext";
import { getImageUrl } from "../utils/getImageUrl";

function AllCategories() {
  const navigate = useNavigate();
  const { serviceAvailable } = useAvailability(); // 🔥 IMPORTANT
const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [services, setServices] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeSubCategoryId, setActiveSubCategoryId] = useState(null);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    fetchData();
  }, []);

const getServicesBySubCategory = (subCategoryId) => {
  return services.filter(
    (s) => Number(s.sub_category_id) === Number(subCategoryId)
  );
};

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
     setActiveCategoryId(
  categories[0].id ?? categories[0].category_id
);
    }
  }, [categories, activeCategoryId]);

  /* ================= FILTER SERVICES ================= */
  // const filteredServices = useMemo(() => {
  //   if (!activeCategoryId) return [];
  //   return services
  //     .filter(
  //       (s) => Number(s.category_id) === Number(activeCategoryId)
  //     )
  //     .filter((s) =>
  //       s.name.toLowerCase().includes(search.toLowerCase())
  //     );
  // }, [services, activeCategoryId, search]);

  
 const activeCategory = useMemo(() => {
  return categories.find(
    (c) =>
      Number(c.id ?? c.category_id) ===
      Number(activeCategoryId)
  );
}, [categories, activeCategoryId]);

const filteredSubCategories = useMemo(() => {
  if (!activeCategory) return [];
  return activeCategory.sub_categories || [];
}, [activeCategory]);


  return (
    <>
      <Navbar />
   {/* 🔴 COMING SOON OVERLAY */}
      {!serviceAvailable && (
       <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">

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
                     <h2 className="text-2xl font-bold text-[#111827] mb-8">
    Categories
  </h2>
                   {categories.map((cat) => {
  const catId = cat.id ?? cat.category_id;
  const catName = (cat.name ?? cat.category_name)?.trim();
  const catIcon = cat.icon ?? cat.category_icon;

  const active =
    Number(activeCategoryId) === Number(catId);

                      return (
                        <button
                          key={catId}
                          onClick={() => {
                            setActiveCategoryId(catId);

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
                              src={getImageUrl(catIcon)}
                              alt={catName}
                              className="h-5 w-5"
                            />
                          </div>
                          <span className="font-medium text-sm">
                            {catName}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* RIGHT */}
                 <div className="lg:col-span-3 bg-white rounded-3xl p-8 border shadow-sm">
  {/* TITLE */}
  <h2 className="text-2xl font-bold text-[#111827] mb-8">
    {activeCategory?.category_name} Services
  </h2>

  <div className="space-y-5">
    {!filteredSubCategories.length && (
      <p className="text-sm text-[#6B7280]">
        No sub-categories found
      </p>
    )}

    {filteredSubCategories.map((sub) => {
      const isOpen = activeSubCategoryId === sub.id;
      const subServices = getServicesBySubCategory(sub.id);

      return (
        <div
          key={sub.id}
          className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] overflow-hidden transition"
        >
          {/* SUB CATEGORY HEADER */}
          <button
            onClick={() =>
              setActiveSubCategoryId(isOpen ? null : sub.id)
            }
            className="w-full flex items-center justify-between px-6 py-5 hover:bg-white transition"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-[#00C389]/10 flex items-center justify-center overflow-hidden">
                <img
                  src={getImageUrl(sub.icon)}
                  alt={sub.name}
                  className="h-7 w-7 object-contain"
                />
              </div>

              <div className="text-left">
                <p className="text-base font-semibold text-[#111827]">
                  {sub.name}
                </p>
                <p className="text-xs text-[#6B7280]">
                  {subServices.length} services available
                </p>
              </div>
            </div>

            <ChevronRight
              size={20}
              className={`text-[#00C389] transition-transform duration-300 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </button>

          {/* SERVICES */}
          {isOpen && (
            <div className="px-6 pb-6 pt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-fadeIn">
              {!subServices.length && (
                <p className="text-sm text-[#6B7280] col-span-full">
                  No services available
                </p>
              )}

              {subServices.map((service) => (
                <div
                  key={service.id}
                  onClick={() =>
                    navigate(`/services/${service.id}`)
                  }
                  className="group cursor-pointer bg-white rounded-2xl border hover:border-[#00C389] hover:shadow-xl transition overflow-hidden"
                >
                  {/* IMAGE */}
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={
                        getImageUrl(service.image) ||
                        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                      }
                      alt={service.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* PRICE BADGE */}
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-[#111827] shadow">
                      ₹{service.starting_from}
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div className="p-4">
                    <p className="font-semibold text-[#111827] text-sm">
                      {service.name}
                    </p>

                    <p className="text-xs text-[#6B7280] mt-1">
                      Professional & verified experts
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-[#00C389]">
                        Book Now
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-[#00C389]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    })}
  </div>
</div>

                </div>
              </div>
            </section>

            
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default AllCategories;
