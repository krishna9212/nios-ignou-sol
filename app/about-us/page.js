import React from 'react'
import AboutUs from '../components/AboutUs';

export const metadata = {
  title: "About Us ",
  description: "Get ready-to-submit, plagiarism-free solved assignments for NIOS, IGNOU, and DU SOL at affordable prices. Instant delivery and secure payment methods!",
  keywords: "NIOS solved assignments, IGNOU assignments, DU SOL assignments, academic assignments, ready-to-use assignments, plagiarism-free assignments, assignment store, assignment help, TMA solutions",
  robots: "index, follow", // Ensures the page gets indexed by search engines
  author: "NIOS-IGNOU-SOL.com",
  og: {
    title: "Buy Solved Assignments for NIOS, IGNOU, and DU SOL | Assignment Store",
    description: "Get ready-to-submit, plagiarism-free solved assignments for NIOS, IGNOU, and DU SOL at affordable prices. Instant delivery and secure payment methods!",
    // image: "/public/assignment-image.jpg", // Replace with an actual image URL
    url: "https://www.nios-ignou-sol.com", // Ensure this URL matches your website's actual URL
    type: "website",
  },
};

const aboutus = () => {

  return (
    <div className=''>
      <AboutUs></AboutUs>
      </div>
  )
}

export default aboutus