se client';

import React from 'react';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';
import logo from '@/public/logo3.png';

function Footer() {
  const navLinks = [
    { title: 'Home', route: '/' },
    { title: 'About', route: '/about-us' },
    { title: 'Contact', route: '/contact-us' },
  ];

  const programs = [
    {
      title: 'NIOS',
      links: [
        { title: 'NIOS 10th', route: '/nios/nios-10th' },
        { title: 'NIOS 12th', route: '/nios/nios-12th' },
      ],
    },
    {
      title: 'IGNOU',
      links: [
        { title: 'IGNOU Home', route: '/ignou' },
      ],
    },
    {
      title: 'DU SOL',
      links: [
        { title: 'SOL DU Home', route: '/sol-du' },
      ],
    },
  ];

  const externalLinks = [
    {
      category: 'NIOS (National Institute of Open Schooling)',
      links: [
        { title: 'NIOS Official Website', url: 'https://www.nios.ac.in' },
        { title: 'Student Login (SDMIS)', url: 'https://sdmis.nios.ac.in/auth' },
        { title: 'Download Hall Ticket', url: 'https://www.nios.ac.in/online-course-material.aspx' },
        { title: 'Check Admission Status', url: 'https://sdmis.nios.ac.in/search/admission' },
        { title: 'Download Assignment (TMA)', url: 'https://www.nios.ac.in/learner-support/tutor-marks-assignment-(tma).aspx' },
        { title: 'View Results', url: 'https://results.nios.ac.in' },
        { title: 'Rechecking / Re-evaluation', url: 'https://www.nios.ac.in/rechecking.aspx' },
        { title: 'Download ID Card', url: 'https://sdmis.nios.ac.in' },
      ]
    },
    {
      category: 'IGNOU (Indira Gandhi National Open University)',
      links: [
        { title: 'IGNOU Official Website', url: 'https://www.ignou.ac.in' },
        { title: 'Student Login (Samarth Portal)', url: 'https://ignou.samarth.edu.in' },
        { title: 'Download Assignment', url: 'https://www.ignou.ac.in/ignou/studentzone/assignments' },
        { title: 'eGyanKosh Study Material', url: 'https://www.egyankosh.ac.in' },
        { title: 'Result / Grade Card', url: 'https://gradecard.ignou.ac.in/gradecard' },
        { title: 'Download Hall Ticket', url: 'https://hall_ticket.ignou.ac.in' },
      ]
    },
    {
      category: 'DU SOL (School of Open Learning - Delhi University)',
      links: [
        { title: 'DU SOL Official Website', url: 'https://sol.du.ac.in' },
        { title: 'Student Login Dashboard', url: 'https://web.sol.du.ac.in/student-login?logout=true' },
        { title: 'Assignment Section', url: 'https://web.sol.du.ac.in/info/assignments' },
        { title: 'Download Admit Card', url: 'https://web.sol.du.ac.in/info/admit-card' },
        { title: 'Date Sheet', url: 'https://web.sol.du.ac.in/info/datesheet' },
        { title: 'Check Results', url: 'https://web.sol.du.ac.in/info/results' },
        { title: 'Download Marksheet', url: 'https://web.sol.du.ac.in/info/marksheets' },
      ]
    }
  ];

  return (
    <footer className="w-full bg-white text-gray-800 px-6 pt-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <section aria-label="Brand Information">
          <Link href="/" aria-label="Go to homepage" className="inline-block -ml-4 -mt-3">
            <Image src={logo} alt="NIOS IGNOU SOL logo" width={120} height={120} />
          </Link>
          <p className="text-sm text-gray-600 leading-relaxed">
            Empowering students with reliable resources and guidance for NIOS, IGNOU, and DU SOL.
          </p>
        </section>

        {/* Navigation Section */}
        <nav aria-label="Main Navigation">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Navigation</h3>
          <ul className="space-y-2">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.route}
                  title={link.title}
                  className="text-sm hover:text-blue-600 transition-colors"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Programs Section */}
        <section className="md:col-span-2" aria-label="Programs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <div key={index}>
                <h4 className="font-semibold text-gray-700 mb-2">{program.title}</h4>
                <ul className="space-y-2">
                  {program.links.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        href={link.route}
                        title={link.title}
                        className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* External Educational Resources */}
      <section className="max-w-7xl mx-auto mt-16" aria-label="External Educational Resources">
        <h3 className="text-2xl font-semibold mb-10 text-gray-900">Quick Educational Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {externalLinks.map((section, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all">
              <h4 className="font-semibold text-gray-800 mb-3 text-base">{section.category}</h4>
              <ul className="space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={link.title}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                    >
                      {link.title}
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Footer */}
      <div className="mt-12 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} <span className="font-medium">nios-ignou-sol.com</span>. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
