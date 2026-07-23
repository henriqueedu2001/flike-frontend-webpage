"use client";

import { useState } from "react";
import AdminSidebar from "@/components/Sidebar";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({
  children,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main>
        <div className="top-bar">
          <div className="top-bar-div">
            <div
              className="menu-icon"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </div>

            <div className="page-title">
              <h1 className="text-3xl font-bold">
                FLIKE - ADMIN
              </h1>
            </div>
          </div>
        </div>

        <div className="content-padding">
          {children}
        </div>
      </main>
    </>
  );
}