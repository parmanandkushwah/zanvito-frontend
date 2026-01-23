import React from "react";

const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

function HomeSkeleton() {
  return (
    <div className="bg-[#F9FAFB]">
      {/* HERO */}
      <div className="h-[100vh] bg-[#00C389]/10 flex items-center justify-center">
        <div className="w-full max-w-3xl px-6 space-y-6">
          <div className={`h-10 w-3/4 bg-gray-200 rounded-full ${shimmer}`} />
          <div className={`h-5 w-full bg-gray-200 rounded-full ${shimmer}`} />
          <div className={`h-5 w-5/6 bg-gray-200 rounded-full ${shimmer}`} />

          <div className="mt-6 flex gap-4 justify-center">
            <div className={`h-12 w-2/3 bg-gray-200 rounded-full ${shimmer}`} />
            <div className={`h-12 w-32 bg-gray-200 rounded-full ${shimmer}`} />
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`h-6 w-40 bg-gray-200 rounded ${shimmer} mb-6`} />

          <div className="flex gap-6 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`min-w-[150px] h-[135px] bg-gray-200 rounded-3xl ${shimmer}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`h-6 w-44 bg-gray-200 rounded ${shimmer} mb-6`} />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`h-44 bg-gray-200 rounded-3xl ${shimmer}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeSkeleton;
