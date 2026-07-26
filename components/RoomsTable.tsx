"use client";

import { Room } from "@/types/room";

interface RoomsTableProps {
  rooms: Room[];
  onEdit?: (room: Room) => void;
  onDelete?: (room: Room) => void;
}

export default function RoomsTable({
  rooms,
  onEdit,
  onDelete,
}: RoomsTableProps) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Número</th>
            <th>Prédio</th>
            <th>Criado em</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.id}</td>

              <td>
                <strong>{room.name}</strong>
              </td>

              <td>{room.number}</td>

              <td>{room.building_id}</td>

              <td>
                {new Date(room.created_at).toLocaleString("pt-BR")}
              </td>

              <td>
                <div className="table-actions">
                  <button
                    className="btn-action secondary small"
                    onClick={() => onEdit?.(room)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn-action danger small"
                    onClick={() => onDelete?.(room)}
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