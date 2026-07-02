"use client";

export interface Room {
  id: number;
  building_id: number;
  name: string;
  number: string;
  created_at: string;
}

interface RoomsTableProps {
  rooms: Room[];
}

export default function RoomsTable({
  rooms,
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}