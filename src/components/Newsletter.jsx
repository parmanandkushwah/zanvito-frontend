import React from "react";
import guyImage from "../assets/newsletter-guy.png";

function Newsletter() {
  return (
    <section className="py-24 bg-[#F9FAFB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
  <div className="relative min-h-[380px]">

    {/* OUTER WRAPPER → only rounded corners */}
    <div
      className="
        absolute inset-0
        rounded-tl-[400px]
        rounded-tr-[58px]
        rounded-br-[48px]
        rounded-bl-[48px]
        overflow-hidden
      "
    >
      {/* INNER SHAPE → only clip-path + SAME COLOR */}
      <div
        className="absolute inset-0 bg-[#00C389]"
        style={{
          clipPath: 'polygon(1% 25%, 100% -3%, 100% 100%, 0% 100%)'
        }}
      />
    </div>


          {/* BACKGROUND DECORATIONS */}
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-white/10"></div>
          <div className="absolute -right-1 -bottom-1/5 w-[360px] h-[360px] rounded-full bg-black/10"></div>

          {/* CONTENT WRAPPER (unskew content) */}
          <div className="relative transform -skew-y-1/2 flex items-center min-h-[380px]">

            {/* GUY IMAGE (OUTSIDE FEEL) */}
            <img
              src={guyImage}
              alt="newsletter"
              className="
                absolute
                left-20
                bottom-0
                h-[440px]
                pointer-events-none
              "
            />

            {/* TEXT CONTENT */}
            <div className="ml-auto w-full md:w-[58%] px-10 md:px-16 text-white">
              <h2 className="text-2xl md:text-3xl font-bold">
                Subscribe to our Newsletter
              </h2>

              <p className="mt-2 text-white/85 max-w-md">
                Get latest offers, service updates & exclusive deals directly in
                your inbox.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-lg">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="
                    flex-1
                    px-5 py-4
                    rounded-xl
                    text-[#111827]
                    placeholder-[#6B7280]
                    focus:outline-none
                  "
                />
                <button
                  className="
                    px-8 py-4
                    rounded-xl
                    bg-[#111827]
                    text-white
                    font-semibold
                    hover:bg-black
                    transition
                  "
                >
                  Subscribe Now
                </button>
              </div>

              <p className="mt-3 text-xs text-white/80">
                We promise not to spam you 🙂
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Newsletter;
