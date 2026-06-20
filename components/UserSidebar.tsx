"use client";

import Link from "next/link";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserSidebar({
  isOpen,
  onClose,
}: Props) {
  return (
    <>
      {isOpen && (
        <div
          className="overlay"
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
          <small>Portal do Usuário</small>
        </div>

        <div className="nav-links">
          <Link href="/user/dashboard">
            🏠 Início
          </Link>

          <Link href="/user/history">
            📜 Meu Histórico
          </Link>

          <Link href="/user/profile">
            👤 Perfil
          </Link>

          <Link href="/user/help">
            ❓ Ajuda
          </Link>
        </div>
      </nav>
    </>
  );
}