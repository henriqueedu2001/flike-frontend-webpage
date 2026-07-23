"use client";

import { useEffect, useState } from "react";
import DigitalLockTable from "@/components/DigitalLockTable";
import { DigitalLock } from "@/types/digitalLock";
import { getDigitalLocks } from "@/services/digitalLock.service";

export default function Page() {
  const [digitalLocks, setDigitalLocks] = useState<DigitalLock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDigitalLocks() {
      try {
        const data = await getDigitalLocks();
        setDigitalLocks(data);
      } catch (err) {
        setError("Erro ao carregar fechaduras digitais.");
      } finally {
        setLoading(false);
      }
    }

    loadDigitalLocks();
  }, []);

  return (
    <main className="p-6">
      <div className="page-margin">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <h2>Chaves ativas</h2>
        <div className="content-padding">
          {loading && <p>Carregando...</p>}

          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && (
            <DigitalLockTable digitalLocks={digitalLocks} />
          )}
        </div>
      </div>
    </main>
  );
}