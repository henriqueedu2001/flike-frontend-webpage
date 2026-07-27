"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import UsersTable from "@/components/UsersTable";
import UserFormModal from "@/components/modals/UserFormModal";

import { useUsers } from "@/hooks/useUsers";

export default function Page() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const {
    users,
    loading,
    error,
    refresh,
  } = useUsers();

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
            <h2>Usuários Cadastrados</h2>

            <button
              className="btn-action success"
              onClick={() => setModalOpen(true)}
            >
              + Novo Usuário
            </button>
          </div>

          <UsersTable users={users} />

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