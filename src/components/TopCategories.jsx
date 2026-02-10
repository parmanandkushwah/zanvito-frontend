import React, {
  useRef,
  useState,
  useMemo,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { getImageUrl } from "../utils/getImageUrl";

function TopCategories({ categories = [], services = [] }) {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  // ❗ start with null (IMPORTANT)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  /* ---------- SET DEFAULT CATEGORY AFTER API LOAD ---------- */
  useEffect(() => {
    if (categories.length && !selectedCategoryId) {
      setSelectedCategoryId(categories[0].id ?? categories[0].category_id);
    }
  }, [categories, selectedCategoryId]);

  /* ---------- SCROLL ---------- */
  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -900, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 900, behavior: "smooth" });
  };

  /* ---------- SERVICES FILTERED BY CATEGORY ---------- */
  // const filteredServices = useMemo(() => {
  //   if (!selectedCategoryId) return [];

  //   return services.filter(
  //     (service) =>
  //       Number(service.category_id) === Number(selectedCategoryId)
  //   );
  // }, [services, selectedCategoryId]);

  // ---------- SUBCATEGORIES FILTERED BY CATEGORY ----------

  const filteredSubCategories = useMemo(() => {
  if (!selectedCategoryId) return [];

  const category = categories.find(
   (cat) =>
  Number(cat.id ?? cat.category_id) ===
  Number(selectedCategoryId)
  );

  return category?.sub_categories || [];
}, [categories, selectedCategoryId]);

  /* ---------- CURRENT CATEGORY ---------- */
  const activeCategory = categories.find(
  (cat) =>
    Number(cat.id ?? cat.category_id) ===
    Number(selectedCategoryId)
);


// const subCategories = activeCategory?.subCategories || [];
  return (
    <section className="py-12 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-[#111827]">
            Top Categories
          </h2>

          <button
            onClick={() => navigate("/categories")}
            className="text-sm font-medium text-[#00C389] hover:underline"
          >
            View All →
          </button>
        </div>

        {/* CATEGORY SLIDER */}
        <div className="relative mb-10">
          <button
            onClick={scrollLeft}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10
                       bg-white/70 backdrop-blur shadow p-2 rounded-full"
          >
            <ChevronLeft size={22} />
          </button>

          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-hidden scroll-smooth"
          >
        {categories.map((cat) => {
  const catId = cat.id ?? cat.category_id;
  const catName = (cat.name ?? cat.category_name)?.trim();
  const catIcon = cat.icon ?? cat.category_icon;

  const isActive =
    Number(selectedCategoryId) === Number(catId);

              return (
                <div
  key={catId}
  onClick={() => setSelectedCategoryId(catId)}
                  className={`
                    min-w-[150px] h-[135px]
                    flex flex-col items-center justify-center
                    rounded-3xl cursor-pointer
                    border transition
                    ${
                      isActive
                        ? "bg-[#00C389] text-white shadow-xl"
                        : "bg-[#00C389]/10 border-[#00C389]/40"
                    }
                  `}
                >
                  <div
                    className={`h-14 w-14 rounded-full flex items-center justify-center
                      ${
                        isActive
                          ? "bg-white"
                          : "bg-[#00C389]"
                      }
                    `}
                  >
                    <img
                      src={getImageUrl(catIcon) ||
    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"} 
                      alt={catName}
                      
                      className="h-7 w-7"
                    />
                  </div>

                  <p
                    className={`mt-3 text-sm font-semibold ${
                      isActive
                        ? "text-white"
                        : "text-[#111827]"
                    }`}
                  >
                    {catName}
                  </p>
                </div>
              );
            })}
          </div>

          <button
            onClick={scrollRight}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10
                       bg-white/70 backdrop-blur shadow p-2 rounded-full"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* SERVICES LIST */}
        <div className="bg-white rounded-3xl p-6 shadow-sm max-w-5xl">
          <h3 className="text-lg font-bold text-[#111827] mb-5">
  {activeCategory?.name} Sub Categories
</h3>

<div className="grid sm:grid-cols-2 gap-4">
  {filteredSubCategories.map((sub) => (
    <div
      key={sub.id}
      onClick={() => navigate(`/sub-category/${sub.id}`)}
      className="
        flex items-center justify-between
        px-4 py-3
        rounded-xl
        border border-[#E5E7EB]
        hover:border-[#00C389]
        hover:shadow-md
        transition
        bg-white
        cursor-pointer
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-[#00C389]/10 flex items-center justify-center">
          <img
            src={getImageUrl(sub.icon) ||
    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
            alt={sub.name}
            className="h-5 w-5 object-contain"
          />
        </div>

        <p className="font-medium text-[#111827] text-sm">
          {sub.name}
        </p>
      </div>

      {/* RIGHT */}
      <div className="h-8 w-8 rounded-full bg-[#00C389]/10 flex items-center justify-center">
        <ArrowRight size={16} className="text-[#00C389]" />
      </div>
    </div>
  ))}

  {!filteredSubCategories.length && (
    <p className="text-sm text-[#6B7280]">
      No sub-categories available for this category
    </p>
  )}
</div>
        </div>

      </div>
    </section>
  );
}

export default TopCategories;
