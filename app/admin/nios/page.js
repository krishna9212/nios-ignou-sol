import { FaBookOpen, FaGraduationCap } from 'react-icons/fa';
import NiosCategoryCard from '@/app/components/Nios'; // adjust path as needed

function NiosAdminDashboard() {
  const categories = [
    {
      title: 'Manage NIOS 10th',
      description: 'Upload, edit, or delete assignments for NIOS Class 10th students.',
      route: '/admin/nios/nios-10th',
      icon: <FaBookOpen size={22} />,
      bgColor: 'bg-blue-500',
    },
    {
      title: 'Manage NIOS 12th',
      description: 'Upload, edit, or delete assignments for NIOS Class 12th students.',
      route: '/admin/nios/nios-12th',
      icon: <FaGraduationCap size={22} />,
      bgColor: 'bg-green-500',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
        Admin Dashboard – NIOS Assignments
      </h1>
      <p className="text-center text-gray-600 text-lg mb-12">
        Manage assignment content for both Class 10th and 12th NIOS students. Use this panel to create, edit, or delete assignments.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, idx) => (
          <NiosCategoryCard key={idx} {...cat} />
        ))}
      </div>
    </div>
  );
}

export default NiosAdminDashboard;
