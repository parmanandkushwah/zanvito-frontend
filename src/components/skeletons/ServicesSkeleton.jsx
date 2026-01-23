import React from "react";

export default function ServicesSkeleton() {
  return (
    <section className="py-12 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6 animate-pulse">
        <div className="h-6 w-44 bg-gray-200 rounded mb-6" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-44 bg-gray-200 rounded-3xl"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
