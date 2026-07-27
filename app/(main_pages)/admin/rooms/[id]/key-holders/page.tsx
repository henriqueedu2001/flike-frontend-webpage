"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { getRoomKeyHolders, getMyRooms } from "@/services/admin.service";
import KeyHoldersTable from "@/components/KeyHoldersTable";
import { KeyHolder } from "@/types/keyHolder";
import { Room } from "@/types/room";

export default function Page() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const roomId = Number(params.id);

  const [room, setRoom] = useState<Room | null>(null);
  const [keyHolders, setKeyHolders] = useState<KeyHolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          {loading && <p>Carregando...</p>}

          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && <KeyHoldersTable keyHolders={keyHolders} />}
        </div>
      </div>
    </main>
  );
}
