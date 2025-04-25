import React from "react";
import Head from "next/head";
import Image from "next/image";
import img1 from "@/public/Business mission-bro.svg";
import { FaBookOpen } from "react-icons/fa";

function AboutUs() {
  return (
    <>
      <Head>
        <title>About Us - NIOS IGNOU DU SOL Solved Assignments | Nios-Ignou-Sol</title>
        <meta
          name="description"
          content="Learn more about Nios-Ignou-Sol.com, your trusted source for NIOS, IGNOU, and DU SOL solved assignments. We provide plagiarism-free, ready-to-download academic solutions."
        />
        <meta name="keywords" content="NIOS solved assignments, IGNOU TMA, DU SOL assignments, academic help, assignment solutions" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.nios-ignou-sol.com/about" />
      </Head>

      <main className="bg-gradient-to-b from-white to-gray-50 text-gray-800 font-inter px-6 py-16 sm:px-10 lg:px-36">
        {/* Hero Section */}
        <section className="text-center mb-20" data-aos="fade-up">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
            <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              About Us
            </span>
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 leading-relaxed">
            Welcome to <strong className="text-blue-600">nios-ignou-sol.com</strong>! We simplify academic
            assignments for students of <strong>NIOS</strong>, <strong>IGNOU</strong>, and <strong>DU SOL</strong>.
            Our ready-to-use assignments are designed to help you succeed and reduce the stress of studying.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-24 grid md:grid-cols-2 gap-12 items-center" data-aos="fade-up">
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-gray-900">
              🚀 <span className="text-blue-600">Our Mission</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Our mission is simple: to provide students with accurate, plagiarism-free assignments that save
              time and reduce stress. We want to make your academic journey easier and help you stay confident
              throughout your studies.
            </p>
          </div>
          <div className="w-full flex justify-center">
            <Image
              src={img1}
              alt="Illustration showing business mission and goals"
              width={500}
              height={400}
              className="rounded-xl object-cover drop-shadow-lg"
            />
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-24" data-aos="fade-up">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 ">
            <span className="text-blue-600">What We Offer</span>
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {[
              "NIOS 10th & 12th Solved Assignments (2025 Edition)",
              "IGNOU TMA (Tutor Marked Assignments)",
              "Delhi University SOL Assignments",
              "Instant PDF Downloads After Payment",
              "100% Secure Razorpay Checkout",
            ].map((item, idx) => (
              <article
                key={idx}
                className="flex items-start gap-4 bg-white hover:shadow-2xl transition-all duration-300 shadow-md p-5 rounded-xl border border-gray-100"
              >
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaBookOpen className="text-blue-600 text-xl" />
                </div>
                <p className="text-gray-700 text-base sm:text-lg leading-snug">{item}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default AboutUs;
