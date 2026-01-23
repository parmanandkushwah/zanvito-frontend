import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ArrowRight,
} from "lucide-react";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#ECFDF7] text-[#064E3B]">
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-5">

        {/* BRAND */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center shadow-md"
              style={{
                background:
                  "linear-gradient(180deg, #00C389 0%, #007A57 70%, #003D2B 100%)",
              }}
            >
              <span className="text-white font-extrabold text-xl">Z</span>
            </div>

            <h2 className="text-2xl font-bold tracking-wider text-[#022C22]">
              ZAN<span className="text-[#00C389] font-extrabold">VITO</span>
            </h2>
          </div>

          <p className="mt-4 text-sm text-[#065F46] max-w-xs">
            Reliable home services by trusted professionals. Book easily, get
            transparent pricing & fast support.
          </p>

          <div className="flex gap-3 mt-6">
            <SocialIcon href="https://facebook.com"><Facebook size={16} /></SocialIcon>
            <SocialIcon href="https://instagram.com"><Instagram size={16} /></SocialIcon>
            <SocialIcon href="https://twitter.com"><Twitter size={16} /></SocialIcon>
            <SocialIcon href="https://linkedin.com"><Linkedin size={16} /></SocialIcon>
          </div>
        </div>

        {/* LINKS */}
        <FooterColumn title="Links">
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/categories">Categories</FooterLink>
          <FooterLink to="/services">Services</FooterLink>
          <FooterLink to="/blogs">Blogs</FooterLink>
        </FooterColumn>

        {/* POLICY */}
        <FooterColumn title="Policy">
          <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
          <FooterLink to="/terms">Terms & Conditions</FooterLink>
          <FooterLink to="/contact">Contact Us</FooterLink>
          <FooterLink to="/about">About Us</FooterLink>
        </FooterColumn>

        {/* OTHER */}
        <FooterColumn title="Other">
          <FooterLink to="/provider">Providers</FooterLink>
          <FooterLink to="/services">All Services</FooterLink>
        </FooterColumn>

        {/* BECOME PROVIDER */}
        <div className="md:col-span-1">
          <h3 className="flex items-center gap-2 font-semibold mb-4">
            <span className="w-6 h-[2px] bg-[#00C389]" />
            Become Provider
          </h3>

          <p className="text-sm text-[#065F46] mb-6">
            Earn more and deliver your service to customers across your city.
          </p>

          <button
            onClick={() => navigate("/provider/register")}
            className="flex items-center gap-2 bg-[#00C389] text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-600 transition"
          >
            Register
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-[#D1FAE5] py-4 text-center text-sm text-[#047857]">
        © {new Date().getFullYear()} Zanvito. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

/* ---------- HELPERS ---------- */

const FooterColumn = ({ title, children }) => (
  <div>
    <h3 className="flex items-center gap-2 font-semibold mb-4">
      <span className="w-6 h-[2px] bg-[#00C389]" />
      {title}
    </h3>
    <ul className="space-y-3 text-sm text-[#065F46]">{children}</ul>
  </div>
);

const FooterLink = ({ to, children }) => (
  <li>
    <Link to={to} className="hover:text-[#00C389] transition">
      {children}
    </Link>
  </li>
);

const SocialIcon = ({ children, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="p-2 rounded-full bg-[#D1FAE5] text-[#047857] hover:bg-[#00C389] hover:text-white transition"
  >
    {children}
  </a>
);
