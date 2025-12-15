import React, { useRef } from "react";

const NAVBAR_HEIGHT = 96;

const sections = [
  { id: "intro", label: "Introduction" },
  { id: "services", label: "Description of Services" },
  { id: "guarantees", label: "No Guarantees" },
  { id: "eligibility", label: "Eligibility & Responsibilities" },
  { id: "content", label: "User Content & License" },
  { id: "ip", label: "Intellectual Property" },
  { id: "thirdparty", label: "Dealers & Third Parties" },
  { id: "fees", label: "Fees & Payments" },
  { id: "termination", label: "Suspension & Termination" },
  { id: "disclaimer", label: "Disclaimer of Warranties" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "indemnity", label: "Indemnification" },
  { id: "arbitration", label: "Arbitration & Waiver" },
  { id: "law", label: "Governing Law" },
  { id: "changes", label: "Changes to Terms" },
  { id: "agreement", label: "Entire Agreement" },
  { id: "contact", label: "Contact Information" },
];

const Terms = () => {
  const contentRef = useRef(null);

  const scrollToSection = (id) => {
    const container = contentRef.current;
    const section = container.querySelector(`#${id}`);
    if (!section) return;

    container.scrollTo({
      top: section.offsetTop - NAVBAR_HEIGHT,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 mt-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-12">

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-[96px] border-l-2 pl-4 space-y-2">
            {sections.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block text-left text-sm text-gray-600 hover:text-pink-600 transition"
              >
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Content */}
        <div
          ref={contentRef}
          className="lg:col-span-3 h-[calc(100vh-6rem)] overflow-y-auto space-y-16 pr-6"
        >

          {/* Intro */}
          <section id="intro">
            <h1 className="text-4xl font-extrabold uppercase mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600">
              Last Updated: December 14, 2025
            </p>
            <p className="mt-4 text-gray-700">
              These Terms govern your access to and use of Car Wrap Visualizer™,
              including all websites, mobile applications, embedded tools,
              APIs, and related services.
            </p>
          </section>

          <section id="services">
            <h2 className="text-2xl font-bold mb-3">
              Description of Services
            </h2>
            <p className="text-gray-700">
              Car Wrap Visualizer provides digital vehicle wrap visualization
              and simulation tools only. All outputs are illustrative and
              informational in nature.
            </p>
          </section>

          <section id="guarantees">
            <h2 className="text-2xl font-bold mb-3">
              No Guarantees; No Reliance
            </h2>
            <p className="text-gray-700">
              Visual outputs may differ from real-world results. Colors,
              finishes, proportions, and appearance are not guaranteed. You
              assume all risk related to reliance on generated results.
            </p>
          </section>

          <section id="eligibility">
            <h2 className="text-2xl font-bold mb-3">
              Eligibility & User Responsibilities
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>You must be of legal age in your jurisdiction</li>
              <li>All information provided must be accurate</li>
              <li>You may only upload content you own or have rights to</li>
              <li>You are responsible for all activity on your account</li>
            </ul>
          </section>

          <section id="content">
            <h2 className="text-2xl font-bold mb-3">
              User Content & License Grant
            </h2>
            <p className="text-gray-700">
              You retain ownership of your content. By uploading content, you
              grant Car Wrap Visualizer a worldwide, royalty-free license to
              use such content solely for operating and improving the Services.
            </p>
          </section>

          <section id="ip">
            <h2 className="text-2xl font-bold mb-3">
              Intellectual Property Rights
            </h2>
            <p className="text-gray-700">
              All software, algorithms, designs, branding, and technology are
              the exclusive property of Car Wrap Visualizer.
            </p>
          </section>

          <section id="thirdparty">
            <h2 className="text-2xl font-bold mb-3">
              Dealerships, Wrap Shops & Third Parties
            </h2>
            <p className="text-gray-700">
              Third-party dealers and wrap shops are independent entities.
              Car Wrap Visualizer is not responsible for their services or
              conduct.
            </p>
          </section>

          <section id="fees">
            <h2 className="text-2xl font-bold mb-3">
              Fees, Credits & Payments
            </h2>
            <p className="text-gray-700">
              Fees and credits are non-refundable unless required by law.
              Credits have no cash value and may expire or change.
            </p>
          </section>

          <section id="termination">
            <h2 className="text-2xl font-bold mb-3">
              Suspension & Termination
            </h2>
            <p className="text-gray-700">
              We may suspend or terminate access at any time for violations,
              misuse, or legal reasons.
            </p>
          </section>

          <section id="disclaimer">
            <h2 className="text-2xl font-bold mb-3">
              Disclaimer of Warranties
            </h2>
            <p className="text-gray-700">
              Services are provided “as is” and “as available” without any
              warranties of any kind.
            </p>
          </section>

          <section id="liability">
            <h2 className="text-2xl font-bold mb-3">
              Limitation of Liability
            </h2>
            <p className="text-gray-700">
              Total liability shall not exceed the amount paid by you in the
              twelve (12) months preceding the claim.
            </p>
          </section>

          <section id="indemnity">
            <h2 className="text-2xl font-bold mb-3">
              Indemnification
            </h2>
            <p className="text-gray-700">
              You agree to indemnify and hold harmless Car Wrap Visualizer from
              claims arising from your use of the Services.
            </p>
          </section>

          <section id="arbitration">
            <h2 className="text-2xl font-bold mb-3">
              Arbitration & Class Action Waiver
            </h2>
            <p className="text-gray-700">
              Disputes shall be resolved by binding arbitration on an individual
              basis, except where prohibited by law.
            </p>
          </section>

          <section id="law">
            <h2 className="text-2xl font-bold mb-3">
              Governing Law
            </h2>
            <p className="text-gray-700">
              These Terms are governed by the laws of Ontario, Canada.
            </p>
          </section>

          <section id="changes">
            <h2 className="text-2xl font-bold mb-3">
              Modifications to Terms
            </h2>
            <p className="text-gray-700">
              We reserve the right to modify these Terms at any time.
            </p>
          </section>

          <section id="agreement">
            <h2 className="text-2xl font-bold mb-3">
              Entire Agreement
            </h2>
            <p className="text-gray-700">
              These Terms and the Privacy Policy constitute the entire agreement
              between you and Car Wrap Visualizer.
            </p>
          </section>

          <section id="contact">
            <h2 className="text-2xl font-bold mb-3">
              Contact Information
            </h2>
            <p className="text-gray-700">
              📧 support@carwrapvisualizer.com<br />
              Car Wrap Visualizer<br />
              Ontario, Canada
            </p>
          </section>

        </div>
      </div>
    </section>
  );
};

export default Terms;
