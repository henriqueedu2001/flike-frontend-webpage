"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { getRoomKeyHolders, getMyRooms } from "@/services/admin.service";
import KeyHoldersTable from "@/components/KeyHoldersTable";
import { KeyHolder } from "@/types/keyHolder";
import { Room } from "@/types/room";

type UsedFilter = "all" | "used" | "unused";

const FILTERS: { label: string; value: UsedFilter }[] = [
  { label: "Todos", value: "all" },
  { label: "Já utilizaram", value: "used" },
  { label: "Ainda não utilizaram", value: "unused" },
];

export default function Page() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const roomId = Number(params.id);

  const [room, setRoom] = useState<Room | null>(null);
  const [keyHolders, setKeyHolders] = useState<KeyHolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usedFilter, setUsedFilter] = useState<UsedFilter>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    if (Number.isNaN(roomId)) return;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const [holders, rooms] = await Promise.all([
          getRoomKeyHolders(roomId),
          getMyRooms(),
        ]);

        setKeyHolders(holders);
        setRoom(rooms.find((item) => item.id === roomId) ?? null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Erro ao carregar portadores de chave."
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [roomId]);

  const filteredKeyHolders = keyHolders.filter((holder) => {
    if (usedFilter === "used" && !holder.used) return false;
    if (usedFilter === "unused" && holder.used) return false;

    if (dateFrom || dateTo) {
      if (!holder.used_at) return false;

      const usedAt = new Date(holder.used_at);

      if (dateFrom && usedAt < new Date(`${dateFrom}T00:00:00`)) return false;
      if (dateTo && usedAt > new Date(`${dateTo}T23:59:59`)) return false;
    }

    return true;
  });

  return (
    <main className="p-6">
      <div className="page-margin">
        <Link href="/admin/dashboard" className="back-link">
          &larr; Voltar ao painel
        </Link>

        <h1 className="text-3xl font-bold">
          Portadores de Chave{room ? ` — ${room.name}` : ""}
        </h1>

        <div className="content-padding">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "24px",
              margin: "12px 0",
            }}
          >
            <div className="status-filter">
              {FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  className={
                    usedFilter === filter.value ? "status-filter-active" : ""
                  }
                  onClick={() => setUsedFilter(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: "32px",
                alignItems: "flex-end",
              }}
            >
              <div className="input-group">
                <label htmlFor="date-from">Usada de</label>
                <input
                  id="date-from"
                  type="date"
                  className="input"
                  value={dateFrom}
                  max={dateTo || undefined}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label htmlFor="date-to">Usada até</label>
                <input
                  id="date-to"
                  type="date"
                  className="input"
                  value={dateTo}
                  min={dateFrom || undefined}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>

              {(dateFrom || dateTo) && (
                <button
                  className="btn-action small"
                  onClick={() => {
                    setDateFrom("");
                    setDateTo("");
                  }}
                >
                  Limpar datas
                </button>
              )}
            </div>
          </div>

          {loading && <p>Carregando...</p>}

          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && (
            <KeyHoldersTable keyHolders={filteredKeyHolders} />
          )}
        </div>
      </div>
    </main>
  );
}
