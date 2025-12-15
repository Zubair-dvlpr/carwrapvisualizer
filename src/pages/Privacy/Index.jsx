import React, { useRef } from "react";

const NAVBAR_HEIGHT = 96; // 🔥 adjust to your navbar height
const sections = [
  { id: "intro", label: "Introduction" },
  { id: "acceptance", label: "Acceptance & Scope" },
  { id: "collection", label: "Information We Collect" },
  { id: "mobile", label: "Mobile App Data" },
  { id: "usage", label: "How We Use Data" },
  { id: "sharing", label: "Sharing & Disclosure" },
  { id: "retention", label: "Data Retention" },
  { id: "security", label: "Data Security" },
  { id: "rights", label: "User Rights" },
  { id: "children", label: "Children’s Privacy" },
  { id: "changes", label: "Policy Updates" },
  { id: "contact", label: "Contact Information" },
];


const Privacy = () => {
  const contentRef = useRef(null);

  const scrollToSection = (id) => {
    const container = contentRef.current;
    const section = container.querySelector(`#${id}`);

    if (!section) return;

    const scrollPosition = section.offsetTop - NAVBAR_HEIGHT;

    container.scrollTo({
      top: scrollPosition,
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

        {/* Scrollable Content */}
        <div
          ref={contentRef}
          className="lg:col-span-3 h-[calc(100vh-6rem)] overflow-y-auto space-y-16 pr-6"
        >

                    {/* Intro */}
                    <section id="intro">
                        <h1 className="text-4xl font-extrabold uppercase mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-gray-600">
                            Last Updated: December 14, 2025
                        </p>
                        <p className="mt-4 text-gray-700">
                            Car Wrap Visualizer™ is committed to protecting the privacy and
                            security of personal and business information across our website,
                            mobile applications, visualizer tools, APIs, and integrations.
                        </p>
                    </section>

                    {/* Acceptance */}
                    <section id="acceptance">
                        <h2 className="text-2xl font-bold mb-3">
                            Acceptance, Scope, and Applicability
                        </h2>
                        <p className="text-gray-700">
                            This Privacy Policy applies to all users of the Services, including
                            visitors, registered users, dealerships, wrap shops, partners,
                            and end users accessing embedded visualizers.
                        </p>
                    </section>

                    {/* Collection */}
                    <section id="collection">
                        <h2 className="text-2xl font-bold mb-3">
                            Information We Collect
                        </h2>
                        <ul className="list-disc pl-6 text-gray-700 space-y-1">
                            <li>Name, email address, phone number</li>
                            <li>Business or dealership information</li>
                            <li>Vehicle data (make, model, year, trim)</li>
                            <li>Uploaded images, wrap designs, configurations</li>
                            <li>Support messages and communications</li>
                            <li>Usage credits and transaction history</li>
                        </ul>
                    </section>

                    {/* Mobile */}
                    <section id="mobile">
                        <h2 className="text-2xl font-bold mb-3">
                            Mobile Application Data
                        </h2>
                        <p className="text-gray-700">
                            When using our Android or iOS applications, we may collect device
                            type, OS version, app usage data, crash logs, and push notification
                            preferences, subject to your device permissions.
                        </p>
                    </section>

                    {/* Usage */}
                    <section id="usage">
                        <h2 className="text-2xl font-bold mb-3">
                            How We Use Information
                        </h2>
                        <ul className="list-disc pl-6 text-gray-700 space-y-1">
                            <li>Operate and improve the Services</li>
                            <li>Generate wrap visualizations</li>
                            <li>Manage accounts and access</li>
                            <li>Provide support and service updates</li>
                            <li>Prevent fraud and enforce policies</li>
                        </ul>
                    </section>

                    {/* Sharing */}
                    <section id="sharing">
                        <h2 className="text-2xl font-bold mb-3">
                            Sharing & Disclosure
                        </h2>
                        <p className="text-gray-700">
                            We do not sell personal information. Data may be shared with
                            infrastructure providers, payment processors, messaging services,
                            wrap shops, or legal authorities when required.
                        </p>
                    </section>

                    {/* Retention */}
                    <section id="retention">
                        <h2 className="text-2xl font-bold mb-3">
                            Data Retention
                        </h2>
                        <p className="text-gray-700">
                            Information is retained only as long as necessary to operate the
                            Services, comply with legal obligations, and maintain system
                            integrity.
                        </p>
                    </section>

                    {/* Security */}
                    <section id="security">
                        <h2 className="text-2xl font-bold mb-3">
                            Data Security
                        </h2>
                        <p className="text-gray-700">
                            We implement reasonable administrative, technical, and
                            organizational safeguards, but no system can guarantee absolute
                            security.
                        </p>
                    </section>

                    {/* Rights */}
                    <section id="rights">
                        <h2 className="text-2xl font-bold mb-3">
                            User Rights
                        </h2>
                        <p className="text-gray-700">
                            Depending on your jurisdiction, you may request access,
                            correction, or deletion of your personal information by contacting
                            us.
                        </p>
                    </section>

                    {/* Children */}
                    <section id="children">
                        <h2 className="text-2xl font-bold mb-3">
                            Children’s Privacy
                        </h2>
                        <p className="text-gray-700">
                            The Services are not intended for individuals under 16 years of
                            age.
                        </p>
                    </section>

                    {/* Changes */}
                    <section id="changes">
                        <h2 className="text-2xl font-bold mb-3">
                            Changes to This Policy
                        </h2>
                        <p className="text-gray-700">
                            We may update this Privacy Policy from time to time. Continued use
                            of the Services constitutes acceptance of the revised policy.
                        </p>
                    </section>

                    {/* Contact */}
                    <section id="contact">
                        <h2 className="text-2xl font-bold mb-3">
                            Contact Information
                        </h2>
                        <p className="text-gray-700">
                            Car Wrap Visualizer<br />
                            Ontario, Canada<br />
                            📧 support@carwrapvisualizer.com
                        </p>
                    </section>

                </div>
            </div>
        </section>
    );
};

export default Privacy;
