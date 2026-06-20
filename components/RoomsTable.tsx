"use client";

import { useEffect, useState } from "react";

interface Room {
  id: number;
  building_id: number;
  name: string;
  number: string;
  created_at: string;
}

export default function RoomsTable() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/room/all")
      .then((res) => res.json())
      .then(setRooms);
  }, []);

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
                {new Date(
                  room.created_at
                ).toLocaleString("pt-BR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}