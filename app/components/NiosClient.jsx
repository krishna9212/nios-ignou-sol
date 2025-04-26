'use client';
import { FaBookOpen, FaGraduationCap } from 'react-icons/fa';
import NiosCategoryCard from '@/app/components/Nios';
import Script from 'next/script';

const currentYear = new Date().getFullYear();


function Nios() {
  const categories = [
    {
      title: 'NIOS 10th Assignments',
      description: 'Solved TMAs, practical files, and question answers for NIOS Class 10th students. Updated for the 2025 exam session.',
      route: '/nios/nios-10th',
      icon: <FaBookOpen size={22} aria-label="NIOS 10th icon" />,
      bgColor: 'bg-blue-500',
    },
    {
      title: 'NIOS 12th Assignments',
      description: 'Get accurate, high-quality solved assignments and practical files for NIOS Class 12th. Trusted by thousands of students.',
      route: '/nios/nios-12th',
      icon: <FaGraduationCap size={22} aria-label="NIOS 12th icon" />,
      bgColor: 'bg-green-500',
    },
  ];

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <Script type="application/ld+json" id="structured-data" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Solved NIOS Assignments 2025",
          description:
            "Solved NIOS TMA assignments and practical files for Class 10 and 12. Download updated 2025 session files instantly.",
          brand: { "@type": "Organization", name: "NIOS Assignment Store" },
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
          },
        })}
      </Script>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Header with Keywords */}
        <header>
          <h1 className="text-xl md:text-4xl font-extrabold text-center text-gray-800 mb-6">
            Solved NIOS Assignments – Class 10th & 12th (2025)
          </h1>
          <p className="text-center text-gray-600 font-light text-sm md:text-base mb-12">
            Download NIOS solved assignments (TMA), practical files, and answer sheets for Class 10 and 12. Ready-to-submit files for the {currentYear} exam session.
          </p>
        </header>

        {/* Assignment Cards */}
        <section aria-labelledby="category-section" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <NiosCategoryCard key={idx} {...cat} />
          ))}
        </section>

        {/* Hidden FAQs for SEO - visible to search engines, hidden from users */}
<section aria-hidden="true" className="sr-only">
  <h2>Frequently Asked Questions (FAQs)</h2>
  <ul>
    <li>
      <strong>Where can I buy NIOS Class 10th assignments?</strong><br />
      You can buy high-quality, ready-to-submit NIOS 10th TMAs right here.
    </li>
    <li>
      <strong>Are the NIOS TMAs updated for {currentYear}?</strong><br />
      Yes, every assignment is written specifically for the {currentYear} NIOS session.
    </li>
    <li>
      <strong>Is instant download available?</strong><br />
      Absolutely. All files are available for immediate download after purchase.
    </li>
    <li>
      <strong>Do you provide NIOS 12th practical files?</strong><br />
      Yes, we offer pre-written practicals for both Class 10 and Class 12 NIOS students.
    </li>
    <li>
      <strong>Are these assignments accepted by NIOS?</strong><br />
      Yes. These TMAs follow the latest NIOS guidelines and are created for maximum scoring.
    </li>
  </ul>
</section>

      </main>
    </>
  );
}

export default Nios;
