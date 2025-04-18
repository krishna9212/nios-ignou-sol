"use client";
import React from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";

const actions = [
  {
    title: "Create Assignment",
    description: "Add a new assignment for NIOS Class 10th.",
    icon: <FaPlus size={26} />,
    route: "/admin/nios/nios-12th/create",
  },
  {
    title: "Update Assignment",
    description: "Edit existing assignments for NIOS Class 10th.",
    icon: <FaEdit size={26} />,
    route: "/admin/nios/nios-12th/edit",
  },
  {
    title: "Delete Assignment",
    description: "Remove assignments from the system.",
    icon: <FaTrash size={26} />,
    route: "/admin/nios/nios-12th/delete",
  },
];

const Nios12AdminPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
          NIOS 12th Admin Panel
        </h1>
        <p className="text-lg text-blue-800 mb-12">
          Manage assignments efficiently with create, update, and delete actions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {actions.map((action, index) => (
            <Link key={index} href={action.route}>
              <div className="p-6 md:p-8 bg-white/70 border border-blue-200 rounded-2xl shadow-lg backdrop-blur-md  transition-all duration-300 hover:shadow-xl cursor-pointer">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full mb-4 mx-auto">
                  {action.icon}
                </div>
                <h2 className="text-xl font-bold text-blue-800 mb-2">
                  {action.title}
                </h2>
                <p className="text-sm text-blue-700">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Nios12AdminPage;
