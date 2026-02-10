import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Plus, Minus, FileText } from "lucide-react";

const termsData = [
  {
    title: "Introduction",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Welcome to Zanvito. The following terms and conditions govern your use of our platform. By visiting or using our website and services, you accept these terms
          and conditions.
        </li>
        {/* <li>
          The following terms and conditions govern your use of our platform.
        </li>
        <li>
          By visiting or using our website and services, you accept these terms
          and conditions.
        </li> */}
      </ul>
    ),
  },

  {
    title: "User Agreement",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          To use our services, You must be at least eighteen (18) years old and able to enter into contracts. You certify that you meet these requirements by using our services.
        </li>
        {/* <li>
          You must be legally capable of entering into contracts.
        </li>
        <li>
          By using our services, you certify that you meet these requirements.
        </li> */}
      </ul>
    ),
  },

  {
    title: "Service Description",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Users can access On-Demand Services through our website. We act as an intermediary, connecting service providers with users, rather than directly providing the services ourselves.
        </li>
        {/* <li>
          We act as an intermediary between users and service providers.
        </li>
        <li>
          We do not directly provide the services ourselves.
        </li> */}
      </ul>
    ),
  },

  {
    title: "Payment Terms",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          All services must be paid for via our platform. By processing payments, you accept the terms and conditions of any third-party payment processors we use.
        </li>
        {/* <li>
          By processing payments, you agree to the terms of third-party payment
          processors.
        </li> */}
        <li>
          Service fees are set by service providers and may vary. We are not responsible for any disputes related to payments or the quality of services provided.
        </li>
        {/* <li>
          We are not responsible for payment disputes or service quality issues.
        </li> */}
      </ul>
    ),
  },

  {
    title: "User Responsibilities",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Users are responsible for their interactions with service providers. We do not support or guarantee the quality of services provided by these providers.
        </li>
        {/* <li>
          We do not guarantee or endorse the quality of services provided.
        </li>
        <li>
          Users must treat service providers with respect.
        </li> */}
        <li>
          Users commit to treating service providers with respect and using our platform exclusively for legal purposes.
        </li>
        <li>
          Our website, along with its content, trademarks, and logos, is protected by intellectual property laws. Users are not allowed to use our intellectual property without proper authorization.
        </li>
      
      </ul>
    ),
  },

  {
    title: "Privacy Policy",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          How we handle the gathering, using, and disclosing of personal data is outlined in our privacy policy. You acknowledge and agree to our privacy policy by using our services.
        </li>
        
      </ul>
    ),
  },

  {
    title: "Limitation on Liability",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Our services may not always be available, accurate, or reliable, and we disclaim all liability for any damages or losses you may incur as a result of depending on them.
        </li>
        <li>
         The laws of [Your Jurisdiction] apply to these terms and conditions. Any disagreements arising out of these terms and conditions will be settled in Services' courts.
        </li>
        <li>
         If you utilize our services and suffer any direct, indirect, incidental, special, or consequential damages, we will not be held responsible.
        </li>
        <li>
         You agree to protect and indemnify us from any claims, losses, damages, liabilities, or expenses resulting from your use of our services or any violation of these terms and conditions.
        </li>
        <li>
          We are not liable for direct, indirect, incidental, special, or
          consequential damages.
        </li>
       
      </ul>
    ),
  },

  {
    title: "Revisions to Our Terms & Conditions",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Our Privacy Policy might get updated periodically. If we do, we will inform you by updating the Privacy Policy on this page.
        </li>
        <li>
          Updates will be posted on this page.We will bring it to your knowledge via email or clear notice on our website before any changes to this Privacy Policy take effect. Remember to check this Privacy Policy from time to time for updates. Changes are effective when posted here.
        </li>
        
      </ul>
    ),
  },
];

function Terms() {
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
            <FileText className="text-[#00C389]" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#111827]">
            Terms & Conditions
          </h1>

          <p className="mt-3 text-[#6B7280]">
            Please read these terms carefully before using Zanvito services.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="pb-20 bg-[#F9FAFB]">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          {termsData.map((item, index) => {
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

export default Terms;
