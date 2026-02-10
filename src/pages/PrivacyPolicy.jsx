import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Plus, Minus, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const privacyData = [
  {
    title: "What kind of information do we collect from you?",
    content: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>Personal Information</li>
          <p className="ml-5 text-xs">When you use our service, we might need certain personal details to communicate with you or recognize you. This includes:</p>
            <li className="ml-5 text-xs">Your email address</li>
            <li className="ml-5 text-xs">Your first and last name</li>
            <li className="ml-5 text-xs">Your Phone number</li>
            <li className="ml-5 text-xs">Your address, including state/province, ZIP/postal code, and city</li>
            <li className="ml-5 text-xs">Information gathered through cookies and how you use our Service</li>
          <li>Usage Information</li>
           <p className="ml-5 text-xs">We gather data on how you use our website, known as "Usage Data." This includes:</p>
            <li className="ml-5 text-xs">Your computer's unique Internet Protocol (IP) address.</li>
            <li className="ml-5 text-xs">The type and version of your web browser.</li>
            <li className="ml-5 text-xs">Which pages of our website you visit.</li>
                <li className="ml-5 text-xs">The date and time of your visit.</li>
                <li className="ml-5 text-xs">How long you spend on each page.</li>
            <li className="ml-5 text-xs">Unique identifiers for your device.</li>
            <li className="ml-5 text-xs">Other technical information we might need for diagnostics.</li>
            <p className="ml-5 text-xs">This helps us understand how our website is used and improves your experience.</p>

          <li>Tracking & Cookies Data</li>
          <p className="ml-5 text-xs">We use cookies and similar technologies to understand how you use our website.</p>
          <p className="ml-5 text-xs">Cookies are small files that store information about your browsing activity. They include an anonymous unique identifier and are stored on your device when you visit our website.</p>
          <p className="ml-5 text-xs">We use cookies, along with beacons, tags, and scripts, to gather and analyze information about your interactions with our website. This helps us improve and personalize your experience.</p>
          <p className="ml-5 text-xs">You can choose to accept or reject cookies. However, if you reject them, some parts of our website may not work properly.</p>
          <p className="ml-5 text-xs">Examples of Cookies We Use:</p>

            <li className="ml-5 text-xs">Session Cookies: These are essential for the operation of our website.</li>
            <li className="ml-5 text-xs">Preference Cookies: These remember your preferences and settings.</li>
            <li className="ml-5 text-xs">Security Cookies: These help keep your information safe</li>
                {/* <li className="ml-5 text-xs">The date and time of your visit.</li>
                <li className="ml-5 text-xs">How long you spend on each page.</li>
            <li className="ml-5 text-xs">Unique identifiers for your device.</li>
            <li className="ml-5 text-xs">Other technical information we might need for diagnostics.</li>
            <p className="ml-5 text-sm">This helps us understand how our website is used and improves your experience.</p> */}
        </ul>
      </>
    ),
  },
  {
    title: "How Your Information Is Used by Us?",
    content:
      (
        <>
        <ul className="list-disc pl-5 space-y-2">
          
          <li>Optimizing Services</li>
                <li className="ml-5 text-xs">Payment processing</li>
            <li className="ml-5 text-xs">Customer support</li>
            <li className="ml-5 text-xs">Experience personalization</li>
           
          <li>Compliance Through Data Utilization</li>
            <p className="ml-5 text-xs">we use the data we gather to deliver, manage, and enhance our services.</p>
          
            <li className="ml-5 text-xs">Legal compliance</li>
            <li className="ml-5 text-xs">Trend analysis</li>
            <li className="ml-5 text-xs">Marketing initiatives</li>
                
        </ul>
      </>
      )
  },
 {
  title: "Information Exchange",
  content: (
    <>
      <ul className="list-disc pl-5 space-y-2">
        <li>How We Protect and Collaborate</li>

        <li className="ml-5 text-xs">
          We share information with third-party service providers.
        </li>

        <li className="ml-5 text-xs">
          We disclose information in response to legal requests or for
          protection of rights and safety.
        </li>

        <li className="ml-5 text-xs">
          We provide aggregated or anonymized data that does not personally
          identify you.
        </li>
      </ul>
    </>
  )
},
 {
  title: "Options You Select",
  content: (
    <>
      <ul className="list-disc pl-5 space-y-2">
        <li>Managing Data Collection and Service Functionality</li>

        <li className="ml-5 text-xs">
          You have the option to limit the collection and use of certain
          information.
        </li>

        <li className="ml-5 text-xs">
          Adjust your device settings to control data collection practices.
        </li>

        <li className="ml-5 text-xs">
          Opt out of specific data collection methods if preferred.
        </li>

        <li className="ml-5 text-xs">
          Be aware that disabling cookies or other tracking mechanisms may
          impact the functionality of some features in our Services.
        </li>
      </ul>
    </>
  )
},
{
  title: "Security",
  content: (
    <>
      <ul className="list-disc pl-5 space-y-2">
        <li>Commitment to Information Security</li>

        <li className="ml-5 text-xs">
          We take reasonable measures to protect the information we collect.
        </li>

        <li className="ml-5 text-xs">
          Our efforts include safeguarding against loss, misuse, and
          unauthorized access.
        </li>

        <li className="ml-5 text-xs">
          Despite our measures, no security system is infallible.
        </li>

        <li className="ml-5 text-xs">
          We cannot guarantee complete security of your information.
        </li>
      </ul>
    </>
  )
},

{
  title: "Revisions to Our Privacy Policy",
  content: (
    <>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Our Privacy Policy might get updated periodically. If we do, we will
          inform you by updating the Privacy Policy on this page.
        </li>

        <li className="ml-5 text-xs">
          We will bring it to your knowledge via email or clear notice on our
          website before any changes to this Privacy Policy take effect.
        </li>

        <li className="ml-5 text-xs">
          Remember to check this Privacy Policy from time to time for updates.
          Changes are effective when posted here.
        </li>
      </ul>
    </>
  )
},


  {
  title: "Contact Us",
  content: (
    <>
      <p className="text-sm mb-3">
        If you have any questions about this Privacy Policy, you can connect
        with us here!
      </p>

      <Link
        to="/contact"
        className="inline-flex items-center justify-center rounded-xl px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
      >
        Contact us
      </Link>
    </>
  ),
}
];

function PrivacyPolicy() {
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-[#ECFDF7] to-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-[#00C389]/15 flex items-center justify-center">
            <ShieldCheck className="text-[#00C389]" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#111827]">
            Privacy Policy
          </h1>

          <p className="mt-3 text-[#6B7280]">
            Your privacy is important to us at Zanvito.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="pb-20 bg-[#F9FAFB]">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          {privacyData.map((item, index) => {
            const open = openIndex === index;

            return (
              <div
                key={index}
                className={`bg-white rounded-3xl border transition-all ${
                  open
                    ? "border-[#00C389] shadow-md"
                    : "hover:shadow-sm"
                }`}
              >
                <button
                  onClick={() =>
                    setOpenIndex(open ? null : index)
                  }
                  className="w-full flex items-center justify-between px-6 py-5"
                >
                  <span className="font-semibold text-[#111827]">
                    {index + 1}. {item.title}
                  </span>

                  <span className="text-[#00C389]">
                    {open ? <Minus /> : <Plus />}
                  </span>
                </button>

                {open && (
                  <div className="px-6 pb-6 text-sm text-[#374151] leading-relaxed">
                    {item.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default PrivacyPolicy;
