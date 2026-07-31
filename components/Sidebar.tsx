"use client";

import Image from "next/image";
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
      icon: "/icons/home.png",
    },
    {
      label: "Solicitar acesso",
      href: "/access/request",
      icon: "/icons/key-hole.png",
    },
    {
      label: "Dashboard do Administrador",
      href: "/admin/dashboard",
      icon: "/icons/dashboard.png",
    },
    {
      label: "Gestão de Chaves",
      href: "/admin/keys",
      icon: "/icons/key.png",
    },
    {
      label: "Usuários",
      href: "/users",
      icon: "/icons/group.png",
    },
    {
      label: "Configurações",
      href: "/profile",
      icon: "/icons/settings.png",
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
          <strong>FLIKE</strong>
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
              <Image
                src={link.icon}
                alt=""
                width={20}
                height={20}
                className="nav-link-icon"
              />
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}