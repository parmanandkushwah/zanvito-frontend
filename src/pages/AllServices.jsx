import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getHomeData } from "../api/homeApi";
import AllServicesSkeleton from "../components/skeletons/AllServicesSkeleton";

function AllServices() {
  const navigate = useNavigate();

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

      {/* 🔥 SKELETON OR CONTENT */}
      {loading ? (
        <AllServicesSkeleton />
      ) : (
        <>
          {/* PAGE */}
          <section className="pt-24 pb-16 bg-[#F9FAFB]">
            <div className="max-w-7xl mx-auto px-6">

              {/* HEADER */}
              <div className="mb-10 mt-4">
                <h1 className="text-2xl md:text-3xl font-bold text-[#111827]">
                  All Services
                </h1>
                <p className="mt-2 text-[#6B7280] max-w-xl">
                  Choose from our wide range of professional home services at
                  transparent and affordable pricing.
                </p>
              </div>

              {/* SEARCH + FILTER */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">

                {/* SEARCH BAR */}
                <div className="w-full md:w-1/2">
                  <div className="relative">
                    <Search
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
                    />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search for AC repair, plumbing, cleaning..."
                      className="
                        w-full pl-11 pr-4 py-3 rounded-full
                        border border-[#E5E7EB]
                        focus:border-[#00C389]
                        outline-none text-sm
                      "
                    />
                  </div>
                </div>

                {/* FILTER CHIPS */}
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() => setActiveFilter("All")}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium transition
                      ${
                        activeFilter === "All"
                          ? "bg-[#00C389] text-white"
                          : "bg-white border border-[#E5E7EB] text-[#374151] hover:border-[#00C389]"
                      }
                    `}
                  >
                    All
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveFilter(cat.id)}
                      className={`
                        px-4 py-2 rounded-full text-sm font-medium transition
                        ${
                          Number(activeFilter) === Number(cat.id)
                            ? "bg-[#00C389] text-white"
                            : "bg-white border border-[#E5E7EB] text-[#374151] hover:border-[#00C389]"
                        }
                      `}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* META */}
              <p className="text-sm text-[#6B7280] mb-6">
                {filteredServices.length} services available
              </p>

              {/* SERVICES GRID */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    onClick={() =>
                      navigate(`/services/${service.id}`)
                    }
                    className="
                      bg-white rounded-3xl p-6
                      border border-[#E5E7EB]
                      shadow-sm
                      hover:shadow-lg hover:border-[#00C389]
                      transition cursor-pointer
                    "
                  >
                    <div className="h-12 w-12 rounded-xl bg-[#E6FBF4] flex items-center justify-center">
                      <img
                        src={service.icon}
                        alt={service.name}
                        className="h-6 w-6"
                      />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-[#111827]">
                      {service.name}
                    </h3>

                    <p className="mt-1 text-sm text-[#6B7280]">
                      Starting from{" "}
                      <span className="font-bold text-[#111827]">
                        ₹{service.starting_from}
                      </span>
                    </p>

                    <button className="mt-6 text-sm font-medium text-[#00C389] hover:underline">
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
    </>
  );
}

export default AllServices;
