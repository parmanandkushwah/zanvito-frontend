import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import TopCategories from "../components/TopCategories";
import TopServices from "../components/TopServices";
import FeaturedServices from "../components/FeaturedServices";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

import { getHomeData } from "../api/homeApi";

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

      <div className="bg-[#F9FAFB]">

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
