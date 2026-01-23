import React from "react";

export default function FeaturedServicesSkeleton() {
  return (
    <section className="py-14 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6 animate-pulse">
        <div className="h-6 w-52 bg-gray-200 rounded mb-8" />

        <div className="flex gap-6 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="min-w-[260px] h-[260px] bg-gray-200 rounded-3xl"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
