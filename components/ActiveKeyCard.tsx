"use client";

import { DashboardKeyRow } from "@/hooks/useClientDashboard";

interface ActiveKeyCardProps {
  keyRow: DashboardKeyRow;
  onGenerateAccess: (keyId: number) => void;
}

export default function ActiveKeyCard({
  keyRow,
  onGenerateAccess,
}: ActiveKeyCardProps) {
  return (
    <div className="key-card" onClick={() => onGenerateAccess(keyRow.id)}>
      <span className="status-badge status-active">Pronta para uso</span>

      <h3>{keyRow.roomName}</h3>
      <p>{keyRow.buildingName}</p>

      <p className="key-card-expiration">
        Expira em {new Date(keyRow.expiration).toLocaleString("pt-BR")}
      </p>
    </div>
  );
}
