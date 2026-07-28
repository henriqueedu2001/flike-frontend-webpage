"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { getKeyHolderHistory } from "@/services/admin.service";
import { getUserById } from "@/services/user.service";
import KeyUsageHistoryTable from "@/components/KeyUsageHistoryTable";
import { KeyUsageHistoryEntry } from "@/types/keyUsageHistory";
import { User } from "@/types/user";

export default function Page() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const userId = Number(params.id);

  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<KeyUsageHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    if (Number.isNaN(userId)) return;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const [historyData, userData] = await Promise.all([
          getKeyHolderHistory(userId),
          getUserById(userId),
        ]);

        setHistory(historyData);
        setUser(userData);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Erro ao carregar histórico de uso."
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [userId]);

  return (
    <main className="p-6">
      <div className="page-margin">
        <Link href="/users" className="back-link">
          &larr; Voltar aos usuários
        </Link>

        <h1 className="text-3xl font-bold">
          Histórico de Uso{user ? ` — ${user.name}` : ""}
        </h1>

        <div className="content-padding">
          {loading && <p>Carregando...</p>}

          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && <KeyUsageHistoryTable history={history} />}
        </div>
      </div>
    </main>
  );
}
