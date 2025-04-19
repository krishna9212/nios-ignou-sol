"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie"; // Ensure you have 'js-cookie' installed for cookie handling
import { BookOpenIcon, AcademicCapIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

// Feature data
const features = [
  {
    title: "Manage NIOS 10th/12th",
    description: "Manage handwritten-style assignments and practicals ready for immediate submission.",
    href: "/admin/nios",
    icon: ClipboardDocumentListIcon,
  },
  {
    title: "Manage IGNOU",
    description: "Manage well-structured assignments and practical files for all IGNOU programs.",
    href: "/admin/ignou",
    icon: BookOpenIcon,
  },
  {
    title: "Manage DU SOL",
    description: "Manage neat and ready-to-use assignments and practicals prepared for DU SOL students.",
    href: "/admin/sol",
    icon: AcademicCapIcon,
  },
];

// Card Component
const Card = ({ feature }) => (
  <Link href={feature.href}>
    <div className="relative bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-200">
      <div className="flex items-center justify-center w-16 h-16 mb-5 rounded-xl bg-blue-500 text-white">
        <feature.icon className="h-8 w-8" />
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
      <p className="text-gray-600 text-sm">{feature.description}</p>

      <div className="mt-4 text-blue-600 font-semibold hover:underline">Manage</div>
    </div>
  </Link>
);

// Admin Page Component
const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if the 'admin' cookie exists and if its value is 'true'
    const isAdmin = Cookies.get('admin') === 'true';

    if (!isAdmin) {
      // Redirect user to the home page if they're not an admin
      router.push('/');
    }
  }, [router]);

  return (
    <section className="py-12 px-6 sm:px-10 lg:px-24 bg-gray-100">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Admin Dashboard</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Easily manage and edit assignments and practical files for NIOS, IGNOU, and DU SOL.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <Card key={index} feature={feature} />
        ))}
      </div>
    </section>
  );
};

export default AdminPage;
