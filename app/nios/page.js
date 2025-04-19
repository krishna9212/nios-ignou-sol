import { FaBookOpen, FaGraduationCap } from 'react-icons/fa';
import NiosCategoryCard from '@/app/components/Nios'; // adjust path

function Nios() {
  const categories = [
    {
      title: 'NIOS 10th ',
      description: 'Perfectly written assignments and practical files for NIOS Class 10th students. Easy to understand and ready to submit.',
      route: '/nios/nios-10th',
      icon: <FaBookOpen size={22} />,
      bgColor: 'bg-blue-500',
    },
    {
      title: 'NIOS 12th ',
      description: 'Accurate, high-scoring assignments and practical files for NIOS Class 12th. Trusted by hundreds of students.',
      route: '/nios/nios-12th',
      icon: <FaGraduationCap size={22} />,
      bgColor: 'bg-green-500',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
        The National Institute of Open Schooling (NIOS) Assignments & Practicals
      </h1>
      <p className="text-center  text-gray-600 font-extralight text-[1.05rem] mb-12">
        Buy pre-written, high-quality assignments and practical files for NIOS Class 10th & 12th. Instant access, trusted by thousands of students.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, idx) => (
          <NiosCategoryCard key={idx} {...cat} />
        ))}
      </div>
    </div>
  );
}

export default Nios;
