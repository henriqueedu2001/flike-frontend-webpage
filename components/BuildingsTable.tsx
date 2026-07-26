"use client";

import { Building } from "@/types/building";

interface BuildingsTableProps {
  buildings: Building[];
  onEdit?: (building: Building) => void;
  onDelete?: (building: Building) => void;
}

export default function BuildingsTable({
  buildings,
  onEdit,
  onDelete,
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
            <th>Ações</th>
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

              <td>
                <div className="table-actions">
                  <button
                    className="btn-action secondary small"
                    onClick={() => onEdit?.(building)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn-action danger small"
                    onClick={() => onDelete?.(building)}
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