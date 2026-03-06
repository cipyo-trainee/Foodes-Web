"use client";

import { ReactNode } from "react";
import AdminSidebar from "../admin/Components/adminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1  p-5 bg-gray-50 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
