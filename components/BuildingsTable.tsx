"use client";

import { useEffect, useState } from "react";

interface Building {
  id: number;
  institution_id: number;
  name: string;
  city: string;
  state: string;
  created_at: string;
}

export default function BuildingsTable() {
  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/building/all")
      .then((res) => res.json())
      .then(setBuildings);
  }, []);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Instituição</th>
            <th>Cidade</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {buildings.map((building) => (
            <tr key={building.id}>
              <td>{building.id}</td>
              <td>
                <strong>{building.name}</strong>
              </td>
              <td>{building.institution_id}</td>
              <td>{building.city}</td>
              <td>{building.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}