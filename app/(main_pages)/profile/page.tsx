"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getCurrentUser } from "@/services/user.service";
import EditProfileModal from "@/components/modals/EditProfileModal";
import ChangePasswordModal from "@/components/modals/ChangePasswordModal";
import { User } from "@/types/user";

export default function Page() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCurrentUser();
      setUser(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar perfil."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.replace("/login");
      return;
    }

    load();
  }, [router, load]);

  return (
    <main className="p-6">
      <div className="page-margin">
        <h1 className="text-3xl font-bold">Perfil e Configurações</h1>

        <div className="content-padding">
          {loading && <p>Carregando...</p>}

          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && user && (
            <div className="room-details-card">
              <h2>{user.name}</h2>
              <p>Email: {user.email}</p>
              <p>
                Membro desde:{" "}
                {new Date(user.created_at).toLocaleDateString("pt-BR")}
              </p>

              <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                <button
                  className="btn-action success"
                  onClick={() => setEditOpen(true)}
                >
                  Editar Perfil
                </button>

                <button
                  className="btn-action secondary"
                  onClick={() => setPasswordOpen(true)}
                >
                  Alterar Senha
                </button>
              </div>
            </div>
          )}

          {user && (
            <>
              <EditProfileModal
                key={`edit-${user.id}`}
                isOpen={editOpen}
                user={user}
                onClose={() => setEditOpen(false)}
                onSuccess={load}
              />

              <ChangePasswordModal
                isOpen={passwordOpen}
                onClose={() => setPasswordOpen(false)}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
