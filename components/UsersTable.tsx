"use client";

import { useRouter } from "next/navigation";

import { KeyHolder } from "@/types/keyHolder";

interface UsersTableProps {
  users: KeyHolder[];
}

export default function UsersTable({ users }: UsersTableProps) {
  const router = useRouter();

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Chave Utilizada</th>
            <th>Data de Uso</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.user_id}
              className="clickable-row"
              onClick={() => router.push(`/users/${user.user_id}/history`)}
            >
              <td>{user.user_id}</td>

              <td>
                <strong>{user.name}</strong>
              </td>

              <td>{user.email}</td>

              <td>
                <span
                  className={`status-badge ${
                    user.used ? "status-used" : "status-active"
                  }`}
                >
                  {user.used ? "Já utilizada" : "Ainda não utilizada"}
                </span>
              </td>

              <td>
                {user.used_at
                  ? new Date(user.used_at).toLocaleString("pt-BR")
                  : "—"}
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan={5}>
                Nenhum usuário gerou chaves para as suas instituições.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
