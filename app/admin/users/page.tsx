"use client";

import ListUsersTable from '@/components/UsersTable';
import { useState } from "react";
import GlobalModal from "@/components/GlobalModal";


export default function Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "user" | "institution" | "building" | "room" | null
  >(null);
  return (
    <main className="p-6">
      <div className='page-margin'>
        <h1 className="text-3xl font-bold">Gerenciar Usuários</h1>

        <div className="page-title">
          <h2>Usuários Cadastrados</h2>

          <button className="btn-action success" onClick={() => { setModalType("user"); setModalOpen(true); }}>
            + Novo Usuário
          </button>
        </div>
        <ListUsersTable/>
        {/* MODAL GLOBAL */}
        <GlobalModal
          isOpen={modalOpen}
          type={modalType}
          onClose={() => setModalOpen(false)}
          onSuccess={() => window.location.reload()}
        />
        </div>
    </main>
  );
}
