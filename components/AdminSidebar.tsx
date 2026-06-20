"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({
  isOpen,
  onClose,
}: Props) {
  const pathname = usePathname();

  const links = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: "📊",
    },
    {
      label: "Usuários",
      href: "/admin/users",
      icon: "👥",
    },
    {
      label: "Salas",
      href: "/admin/rooms",
      icon: "🚪",
    },
    {
      label: "Histórico",
      href: "/admin/logs",
      icon: "📜",
    },
    {
      label: "Configurações",
      href: "/admin/settings",
      icon: "⚙️",
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="overlay-sidebar"
          onClick={onClose}
        />
      )}

      <nav
        className={`sidebar ${
          isOpen ? "sidebar-open" : ""
        }`}
      >
        <span
          className="close-btn"
          onClick={onClose}
        >
          ×
        </span>

        <div className="nav-header">
          <strong>CAUSP-LOCK</strong>
          <br />
          <small>Administrador</small>
        </div>

        <div className="nav-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? "active"
                  : ""
              }
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}