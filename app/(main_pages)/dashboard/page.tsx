"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useClientDashboard } from "@/hooks/useClientDashboard";
import ActiveKeyCard from "@/components/ActiveKeyCard";
import DigitalKeysTable from "@/components/DigitalKeysTable";

export default function Page() {
  const router = useRouter();
  const { user, keys, loading, error } = useClientDashboard();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.replace("/login");
    }
  }, [router]);

  const activeKeys = keys.filter((key) => key.isActive);

  return (
    <main className="p-6">
      <div className="page-margin">
        <div className="page-title">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            {user && <p>Olá, {user.name}</p>}
          </div>

          <button
            className="btn-action success"
            onClick={() => router.push("/access/request")}
          >
            + Solicitar novo acesso
          </button>
        </div>

        <div className="content-padding">
          {loading && <p>Carregando...</p>}

          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && (
            <>
              <h2>Chaves ativas</h2>

              {activeKeys.length === 0 ? (
                <p>Nenhuma chave ativa no momento.</p>
              ) : (
                <div className="key-cards">
                  {activeKeys.map((key) => (
                    <ActiveKeyCard key={key.id} keyRow={key} />
                  ))}
                </div>
              )}

              <div style={{ height: 30 }} />

              <h2>Todas as chaves</h2>

              <DigitalKeysTable keys={keys} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
