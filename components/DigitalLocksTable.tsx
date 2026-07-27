"use client";

import { DigitalLock } from "@/types/digitalLock";

interface DigitalLocksTableProps {
  digitalLocks: DigitalLock[];
  onEdit?: (digitalLock: DigitalLock) => void;
  onDelete?: (digitalLock: DigitalLock) => void;
}

export default function DigitalLocksTable({
  digitalLocks,
  onEdit,
  onDelete,
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
            <th>Ações</th>
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

              <td>
                <div className="table-actions">
                  <button
                    className="btn-action secondary small"
                    onClick={() => onEdit?.(digitalLock)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn-action danger small"
                    onClick={() => onDelete?.(digitalLock)}
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
