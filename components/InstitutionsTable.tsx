"use client";

import { Institution } from "@/types/institution";

interface InstitutionsTableProps {
  institutions: Institution[];
  onEdit?: (institution: Institution) => void;
  onDelete?: (institution: Institution) => void;
}

export default function InstitutionsTable({
  institutions,
  onEdit,
  onDelete,
}: InstitutionsTableProps) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Owner ID</th>
            <th>Criado em</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {institutions.map((institution) => (
            <tr key={institution.id}>
              <td>{institution.id}</td>

              <td>
                <strong>{institution.name}</strong>
              </td>

              <td>{institution.owner_id}</td>

              <td>
                {new Date(institution.created_at).toLocaleString("pt-BR")}
              </td>

              <td>
                <div className="table-actions">
                  <button
                    className="btn-action secondary small"
                    onClick={() => onEdit?.(institution)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn-action danger small"
                    onClick={() => onDelete?.(institution)}
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