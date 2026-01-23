import React from "react";

export default function CategoriesSkeleton() {
  return (
    <section className="py-12 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6 animate-pulse">
        <div className="h-6 w-40 bg-gray-200 rounded mb-6" />

        <div className="flex gap-6 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="min-w-[150px] h-[135px] bg-gray-200 rounded-3xl"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
