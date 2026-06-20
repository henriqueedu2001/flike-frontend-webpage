"use client";

import { useState } from "react";
import UserSidebar from "@/components/UserSidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <UserSidebar
        isOpen={open}
        onClose={() => setOpen(false)}
      />

      <main>
        <div className="top-bar">
          <div className="top-bar-left">
            <div
              className="menu-icon"
              onClick={() => setOpen(true)}
            >
              ☰
            </div>

            <div className="page-title">
              Acesso
            </div>
          </div>
        </div>

        {children}
      </main>
    </>
  );
}