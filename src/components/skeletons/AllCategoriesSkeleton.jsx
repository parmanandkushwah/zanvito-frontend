import React from "react";

const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

function AllCategoriesSkeleton() {
  return (
    <section className="pt-28 pb-20 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-8 space-y-3">
          <div className={`h-8 w-64 bg-gray-200 rounded ${shimmer}`} />
          <div className={`h-4 w-96 bg-gray-200 rounded ${shimmer}`} />
        </div>

        {/* SEARCH */}
        <div className={`h-10 w-80 bg-gray-200 rounded-full mb-8 ${shimmer}`} />

        <div className="grid lg:grid-cols-4 gap-8">

          {/* LEFT CATEGORIES */}
          <div className="bg-white rounded-3xl border p-4 space-y-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`h-14 bg-gray-200 rounded-2xl ${shimmer}`}
              />
            ))}
          </div>

          {/* RIGHT SERVICES */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-8 border">
            <div className={`h-6 w-52 bg-gray-200 rounded mb-6 ${shimmer}`} />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`h-24 bg-gray-200 rounded-2xl ${shimmer}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AllCategoriesSkeleton;
