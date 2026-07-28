"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import UsersTable from "@/components/UsersTable";
import UserFormModal from "@/components/modals/UserFormModal";

import { useKeyHolders } from "@/hooks/useKeyHolders";

export default function Page() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const {
    keyHolders,
    loading,
    error,
    refresh,
  } = useKeyHolders();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.replace("/login");
    }
  }, [router]);

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
            <h2>Portadores de Chave</h2>

            <button
              className="btn-action success"
              onClick={() => setModalOpen(true)}
            >
              + Novo Usuário
            </button>
          </div>

          <p>
            Usuários que geraram chaves para salas das suas instituições.
            Clique em um usuário para ver o histórico de uso.
          </p>

          <UsersTable users={keyHolders} />

          <UserFormModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSuccess={refresh}
          />

        </div>
      </div>
    </main>
  );
}