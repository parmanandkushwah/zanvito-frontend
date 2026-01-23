import React from "react";

function PromoBackground({ children }) {
  return (
    <div className="relative overflow-hidden rounded-[48px] bg-[#00C389]">

      {/* Slanted top effect */}
      <div className="absolute inset-0 bg-[#00C389] transform -skew-y-2 origin-top-left"></div>

      {/* Left concentric circles */}
      <div className="absolute -left-24 top-1/2 -translate-y-1/2">
        <div className="w-[340px] h-[340px] rounded-full bg-white/10 flex items-center justify-center">
          <div className="w-[260px] h-[260px] rounded-full bg-white/10"></div>
        </div>
      </div>

      {/* Right bottom circle cut */}
      <div className="absolute -right-28 -bottom-28 w-[360px] h-[360px] rounded-full bg-black/10"></div>

      {/* Dotted decoration */}
      <div className="absolute top-10 left-10 grid grid-cols-3 gap-2">
        {[...Array(9)].map((_, i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white/60"
          ></span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default PromoBackground;
