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
            </tr>
          ))}

          {keyHolders.length === 0 && (
            <tr>
              <td colSpan={3}>Nenhum portador de chave para esta sala.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
