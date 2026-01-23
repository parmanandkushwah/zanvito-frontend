import React from "react";

export default function HeroSkeleton() {
  return (
    <div className="h-[100vh] bg-[#00C389]/10 flex items-center justify-center">
      <div className="w-full max-w-3xl px-6 space-y-6 animate-pulse">
        <div className="h-10 w-3/4 bg-gray-200 rounded-full" />
        <div className="h-5 w-full bg-gray-200 rounded-full" />
        <div className="h-5 w-5/6 bg-gray-200 rounded-full" />

        <div className="flex gap-4 justify-center mt-6">
          <div className="h-12 w-2/3 bg-gray-200 rounded-full" />
          <div className="h-12 w-32 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}
