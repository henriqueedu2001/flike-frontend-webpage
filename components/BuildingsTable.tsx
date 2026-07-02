"use client";

export interface Building {
  id: number;
  institution_id: number;
  name: string;
  city: string;
  state: string;
  created_at: string;
}

interface BuildingsTableProps {
  buildings: Building[];
}

export default function BuildingsTable({
  buildings,
}: BuildingsTableProps) {
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
            <th>Criado em</th>
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

              <td>
                {new Date(building.created_at).toLocaleString("pt-BR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}