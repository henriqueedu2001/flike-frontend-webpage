"use client";

import { User } from "@/types/user";

interface UsersTableProps {
  users: User[];
}

export default function UsersTable({
  users,
}: UsersTableProps) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Criado em</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>

              <td>
                <strong>{user.name}</strong>
              </td>

              <td>{user.email}</td>

              <td>
                {new Date(user.created_at).toLocaleString("pt-BR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}