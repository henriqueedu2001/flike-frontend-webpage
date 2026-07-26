"use client";

import { useRouter } from "next/navigation";
import { DashboardKeyRow } from "@/hooks/useClientDashboard";

interface ActiveKeyCardProps {
  keyRow: DashboardKeyRow;
}

export default function ActiveKeyCard({ keyRow }: ActiveKeyCardProps) {
  const router = useRouter();

  return (
    <div
      className="key-card"
      onClick={() => router.push(`/access/${keyRow.id}`)}
    >
      <span className="status-badge status-active">Pronta para uso</span>

      <h3>{keyRow.roomName}</h3>
      <p>{keyRow.buildingName}</p>

      <p className="key-card-expiration">
        Expira em {new Date(keyRow.expiration).toLocaleString("pt-BR")}
      </p>
    </div>
  );
}
