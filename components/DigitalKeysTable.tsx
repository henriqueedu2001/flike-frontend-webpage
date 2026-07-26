"use client";

import { DashboardKeyRow } from "@/hooks/useClientDashboard";

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
            <tr key={key.id}>
              <td>{key.roomName}</td>

              <td>{key.buildingName}</td>

              <td>
                <span
                  className={`status-badge ${
                    key.isActive ? "status-active" : "status-used"
                  }`}
                >
                  {key.isActive ? "Pronta para uso" : "Já utilizada"}
                </span>
              </td>

              <td>{new Date(key.expiration).toLocaleString("pt-BR")}</td>

              <td>
                <button
                  className="btn-action success small"
                  onClick={() => onGenerateAccess(key.id)}
                >
                  Gerar chave de acesso
                </button>
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
