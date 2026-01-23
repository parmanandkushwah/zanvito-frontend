import React from "react";

const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

function AllServicesSkeleton() {
  return (
    <section className="pt-24 pb-16 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-10 space-y-3">
          <div className={`h-8 w-64 bg-gray-200 rounded ${shimmer}`} />
          <div className={`h-4 w-[420px] bg-gray-200 rounded ${shimmer}`} />
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className={`h-12 w-full md:w-1/2 bg-gray-200 rounded-full ${shimmer}`} />

          <div className="flex gap-3 flex-wrap">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`h-10 w-24 bg-gray-200 rounded-full ${shimmer}`}
              />
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`h-52 bg-gray-200 rounded-3xl ${shimmer}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default AllServicesSkeleton;
