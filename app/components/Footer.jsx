'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaExternalLinkAlt } from 'react-icons/fa';

function Footer() {
    const router = useRouter();

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
                { title: 'Student Login Dashboard', url: 'https://web.sol.du.ac.in/login' },
                { title: 'Assignment Section', url: 'https://web.sol.du.ac.in/info/assignments' },
                { title: 'Download Admit Card', url: 'https://web.sol.du.ac.in/info/admit-card' },
                { title: 'Date Sheet', url: 'https://web.sol.du.ac.in/info/datesheet' },
                { title: 'Check Results', url: 'https://web.sol.du.ac.in/info/results' },
                { title: 'Download Marksheet', url: 'https://web.sol.du.ac.in/info/marksheets' },
            ]
        }
    ];

    return (
        <footer className="w-full bg-gray-50 text-gray-800 pt-16 pb-8 px-6 border-t border-gray-200">
            {/* Top Section */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Brand */}
                <div>
                    <h2
                        onClick={() => router.push('/')}
                        className="text-3xl font-bold text-gray-900 mb-4 cursor-pointer"
                    >
                        nios-ignou-sol.com
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Empowering students with reliable resources and guidance for NIOS, IGNOU, and DU SOL.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Navigation</h3>
                    <ul className="space-y-2">
                        {navLinks.map((link, index) => (
                            <li
                                key={index}
                                onClick={() => router.push(link.route)}
                                className="text-sm hover:text-blue-600 cursor-pointer transition-colors"
                            >
                                {link.title}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Our Programs */}
                <div className="md:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {programs.map((program, index) => (
                            <div key={index}>
                                <h4 className="font-semibold text-gray-700 mb-2">{program.title}</h4>
                                <ul className="space-y-2">
                                    {program.links.map((link, idx) => (
                                        <li
                                            key={idx}
                                            onClick={() => router.push(link.route)}
                                            className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer transition-colors"
                                        >
                                            {link.title}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* External Quick Links */}
            <div className="max-w-7xl mx-auto mt-16">
                <h3 className="text-2xl font-semibold mb-10  text-gray-900">
                    Quick Educational Links
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {externalLinks.map((section, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-sm rounded-lg p-4 border border-gray-200 hover:shadow-md transition"
                        >
                            <h4 className="font-semibold text-gray-800 mb-3 text-base">{section.category}</h4>
                            <ul className="space-y-2">
                                {section.links.map((link, idx) => (
                                    <li key={idx}>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
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
            </div>

            {/* Bottom Section */}
            <div className="mt-12 text-center text-xs text-gray-500">
                &copy; {new Date().getFullYear()}{' '}
                <span className="font-medium">nios-ignou-sol.com</span>. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
