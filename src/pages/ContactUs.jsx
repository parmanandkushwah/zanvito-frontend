import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
} from "lucide-react";

function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      alert("Thanks for contacting us! We’ll get back to you soon 💚");
      setForm({ name: "", email: "", message: "" });
      setLoading(false);
    }, 1200);
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-[#ECFDF7] to-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-[#00C389]/15 flex items-center justify-center">
            <MessageCircle className="text-[#00C389]" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#111827]">
            Contact Us
          </h1>

          <p className="mt-3 text-[#6B7280] max-w-xl mx-auto">
            Have questions, feedback or need support?  
            We’re here to help you anytime.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="pb-20 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10">

          {/* LEFT INFO */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border shadow-sm">
              <h3 className="text-xl font-semibold text-[#111827] mb-4">
                Get in touch
              </h3>

              <p className="text-sm text-[#6B7280] mb-6">
                Reach out to Zanvito for service support, partnerships or
                general enquiries.
              </p>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#00C389]/10 flex items-center justify-center">
                    <Mail className="text-[#00C389]" size={18} />
                  </div>
                  <span className="text-[#374151]">
                    support@zanvito.com
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#00C389]/10 flex items-center justify-center">
                    <Phone className="text-[#00C389]" size={18} />
                  </div>
                  <span className="text-[#374151]">
                    +91 90000 00000
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#00C389]/10 flex items-center justify-center">
                    <MapPin className="text-[#00C389]" size={18} />
                  </div>
                  <span className="text-[#374151]">
                    Indore, Madhya Pradesh, India
                  </span>
                </div>
              </div>
            </div>

            {/* TRUST CARD */}
            <div className="bg-white rounded-3xl p-8 border shadow-sm">
              <h4 className="font-semibold text-[#111827] mb-2">
                Why contact Zanvito?
              </h4>

              <ul className="list-disc pl-5 text-sm text-[#374151] space-y-2">
                <li>Quick customer support</li>
                <li>Verified service professionals</li>
                <li>Transparent pricing & bookings</li>
                <li>Trusted by thousands of users</li>
              </ul>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white rounded-3xl p-8 border shadow-md">
            <h3 className="text-xl font-semibold text-[#111827] mb-6">
              Send us a message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-[#374151]">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="mt-2 w-full px-4 py-3 rounded-xl border focus:border-[#00C389] outline-none text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#374151]">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="mt-2 w-full px-4 py-3 rounded-xl border focus:border-[#00C389] outline-none text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#374151]">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="mt-2 w-full px-4 py-3 rounded-xl border focus:border-[#00C389] outline-none text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00C389] text-white py-3 rounded-full font-semibold hover:bg-emerald-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default ContactUs;
