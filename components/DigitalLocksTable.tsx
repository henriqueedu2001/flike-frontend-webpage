"use client";

import { DigitalLock } from "@/types/digitalLock";

interface DigitalLocksTableProps {
  digitalLocks: DigitalLock[];
}

export default function DigitalLocksTable({
  digitalLocks,
}: DigitalLocksTableProps) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sala</th>
            <th>Chave Secreta</th>
            <th>Criado em</th>
          </tr>
        </thead>

        <tbody>
          {digitalLocks.map((digitalLock) => (
            <tr key={digitalLock.id}>
              <td>{digitalLock.id}</td>

              <td>{digitalLock.room_id}</td>

              <td>
                <strong>{digitalLock.secret_key}</strong>
              </td>

              <td>
                {new Date(digitalLock.created_at).toLocaleString("pt-BR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
