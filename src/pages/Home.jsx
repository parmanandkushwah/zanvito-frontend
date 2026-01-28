import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import TopCategories from "../components/TopCategories";
import TopServices from "../components/TopServices";
import FeaturedServices from "../components/FeaturedServices";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

import { getHomeData } from "../api/homeApi";
import { useAvailability } from "../context/AvailabilityContext";

/* SKELETONS */
import HeroSkeleton from "../components/skeletons/HeroSkeleton";
import CategoriesSkeleton from "../components/skeletons/CategoriesSkeleton";
import ServicesSkeleton from "../components/skeletons/ServicesSkeleton";
import FeaturedServicesSkeleton from "../components/skeletons/FeaturedServicesSkeleton";

function Home() {
  const [loading, setLoading] = useState(true);

  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [featuredServices, setFeaturedServices] = useState([]);

  // ✅ SINGLE SOURCE OF TRUTH
  const { serviceAvailable } = useAvailability();

  /* ===============================
     FETCH HOME DATA
  =============================== */
  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const res = await getHomeData();
      if (res?.success) {
        setBanners(res.banners || []);
        setCategories(res.categories || []);
        setServices(res.services || []);
        setFeaturedServices(res.featured_services || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

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
        {loading ? <HeroSkeleton /> : <HeroSection banners={banners} />}

        {loading ? (
          <CategoriesSkeleton />
        ) : (
          <TopCategories categories={categories} services={services} />
        )}

        {loading ? (
          <ServicesSkeleton />
        ) : (
          <TopServices services={services} />
        )}

        {loading ? (
          <FeaturedServicesSkeleton />
        ) : (
          <FeaturedServices services={featuredServices} />
        )}

        <Newsletter />
        <Footer />
      </div>
    </>
  );
}

export default Home;
