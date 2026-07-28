"use client";

import { KeyUsageHistoryEntry } from "@/types/keyUsageHistory";

interface KeyUsageHistoryTableProps {
  history: KeyUsageHistoryEntry[];
}

export default function KeyUsageHistoryTable({
  history,
}: KeyUsageHistoryTableProps) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Sala</th>
            <th>Prédio</th>
            <th>Status</th>
            <th>Usada em</th>
            <th>Expira em</th>
            <th>Criada em</th>
          </tr>
        </thead>

        <tbody>
          {history.map((entry) => (
            <tr key={entry.key_id}>
              <td>{entry.room_name}</td>

              <td>{entry.building_name}</td>

              <td>
                <span
                  className={`status-badge ${
                    entry.used ? "status-used" : "status-active"
                  }`}
                >
                  {entry.used ? "Já utilizada" : "Ainda não utilizada"}
                </span>
              </td>

              <td>
                {entry.used_at
                  ? new Date(entry.used_at).toLocaleString("pt-BR")
                  : "—"}
              </td>

              <td>{new Date(entry.expires_at).toLocaleString("pt-BR")}</td>

              <td>{new Date(entry.created_at).toLocaleString("pt-BR")}</td>
            </tr>
          ))}

          {history.length === 0 && (
            <tr>
              <td colSpan={6}>
                Nenhuma chave gerada por este usuário para as suas
                instituições.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
