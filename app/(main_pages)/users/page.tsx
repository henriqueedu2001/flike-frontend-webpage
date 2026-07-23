"use client";

import { useState } from "react";

import UsersTable from "@/components/UsersTable";
import GlobalModal from "@/components/GlobalModal";

import { useUsers } from "@/hooks/useUsers";

type ModalType = "user" | "institution" | "building" | "room";

export default function Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const {
    users,
    loading,
    error,
    refresh,
  } = useUsers();

  function openModal(type: ModalType) {
    setModalType(type);
    setModalOpen(true);
  }

  if (loading) {
    return (
      <main className="p-6">
        <h2>Carregando usuários...</h2>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6">
        <h2>{error}</h2>
      </main>
    );
  }

  return (
    <main className="p-6">
      <div className="page-margin">
        <h1 className="text-3xl font-bold">
          Gerenciar Usuários
        </h1>

        <div className="content-padding">

          <div className="page-title">
            <h2>Usuários Cadastrados</h2>

            <button
              className="btn-action success"
              onClick={() => openModal("user")}
            >
              + Novo Usuário
            </button>
          </div>

          <UsersTable users={users} />

          <GlobalModal
            isOpen={modalOpen}
            type={modalType}
            onClose={() => setModalOpen(false)}
            onSuccess={refresh}
          />

        </div>
      </div>
    </main>
  );
}