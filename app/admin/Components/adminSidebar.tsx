"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FaTachometerAlt,
  FaUpload,
  FaList,
  FaCalendarAlt,
  FaQuestionCircle,
} from "react-icons/fa";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <FaTachometerAlt /> },
  { label: "Upload", href: "/admin/upload", icon: <FaUpload /> },
  { label: "ListProducts", href: "/admin/ListProducts", icon: <FaList /> },
  { label: "Clendar", href: "/admin/calendar", icon: <FaCalendarAlt /> }, // Calendar icon
  {
    label: "Customer-query",
    href: "/admin/customerquery",
    icon: <FaQuestionCircle />,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="top-16 left-0 h-[calc(100vh-64px)] w-64 bg-gray-800 text-white flex flex-col z-50 shadow-lg">
      <div className="p-6 bg-gray-900 flex  text-center border-b border-gray-700">
        <h2 className="text-xl font-bold tracking-wide">Admin Panel</h2>
      </div>

      {/* Scrollable Menu */}
      <ul className="flex-1 mt-4 overflow-y-auto">
        {sidebarItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center px-6 py-3 transition-colors rounded-l-md mb-1 ${
                pathname === item.href
                  ? "bg-gray-700 font-semibold"
                  : "hover:bg-gray-700"
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Optional Footer */}
      <div className="p-4 text-center bg-gray-900 border-t border-gray-700 text-sm">
        @ 2026 Admin Panel
      </div>
    </aside>
  );
}
