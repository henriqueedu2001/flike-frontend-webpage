"use client";

import { KeyHolder } from "@/types/keyHolder";

interface KeyHoldersTableProps {
  keyHolders: KeyHolder[];
}

export default function KeyHoldersTable({ keyHolders }: KeyHoldersTableProps) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Chave Utilizada</th>
            <th>Data de Uso</th>
          </tr>
        </thead>

        <tbody>
          {keyHolders.map((holder) => (
            <tr key={holder.user_id}>
              <td>{holder.user_id}</td>

              <td>
                <strong>{holder.name}</strong>
              </td>

              <td>{holder.email}</td>

              <td>
                <span
                  className={`status-badge ${
                    holder.used ? "status-used" : "status-active"
                  }`}
                >
                  {holder.used ? "Já utilizada" : "Ainda não utilizada"}
                </span>
              </td>

              <td>
                {holder.used_at
                  ? new Date(holder.used_at).toLocaleString("pt-BR")
                  : "—"}
              </td>
            </tr>
          ))}

          {keyHolders.length === 0 && (
            <tr>
              <td colSpan={5}>Nenhum portador de chave para esta sala.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
