"use client";

import { DashboardKeyRow } from "@/hooks/useClientDashboard";

const STATUS_LABELS: Record<DashboardKeyRow["status"], string> = {
  active: "Pronta para uso",
  used: "Já utilizada",
  rejected: "Recusada",
};

const STATUS_CLASSES: Record<DashboardKeyRow["status"], string> = {
  active: "status-active",
  used: "status-used",
  rejected: "status-rejected",
};

interface DigitalKeysTableProps {
  keys: DashboardKeyRow[];
  onGenerateAccess: (keyId: number) => void;
}

export default function DigitalKeysTable({
  keys,
  onGenerateAccess,
}: DigitalKeysTableProps) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Sala</th>
            <th>Prédio</th>
            <th>Status</th>
            <th>Expira em</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {keys.map((key) => (
            <tr key={`${key.status}-${key.id}`}>
              <td>{key.roomName}</td>

              <td>{key.buildingName}</td>

              <td>
                <span
                  className={`status-badge ${STATUS_CLASSES[key.status]}`}
                >
                  {STATUS_LABELS[key.status]}
                </span>
              </td>

              <td>
                {key.expiration
                  ? new Date(key.expiration).toLocaleString("pt-BR")
                  : "—"}
              </td>

              <td>
                {key.status !== "rejected" ? (
                  <button
                    className="btn-action success small"
                    onClick={() => onGenerateAccess(key.id)}
                  >
                    Gerar chave de acesso
                  </button>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}

          {keys.length === 0 && (
            <tr>
              <td colSpan={5}>Nenhuma chave digital encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
