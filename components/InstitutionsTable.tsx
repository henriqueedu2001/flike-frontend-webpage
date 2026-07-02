"use client";

export interface Institution {
  id: number;
  owner_id: number;
  name: string;
  created_at: string;
}

interface InstitutionsTableProps {
  institutions: Institution[];
}

export default function InstitutionsTable({
  institutions,
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}