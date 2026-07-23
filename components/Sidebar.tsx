"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideBar({
  isOpen,
  onClose,
}: Props) {
  const pathname = usePathname();

  const links = [
    {
      label: "Dashboard usuário",
      href: "/dashboard",
      icon: "📊",
    },
    {
      label: "Solicitar acesso",
      href: "/access/request",
      icon: "📊",
    },
    {
      label: "Dashboard do Administrador",
      href: "/admin/dashboard",
      icon: "📊",
    },
    {
      label: "Gestão de Chaves",
      href: "/admin/keys",
      icon: "📊",
    },
    {
      label: "Usuários",
      href: "/users",
      icon: "👥",
    },
    {
      label: "Configurações",
      href: "/profile",
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