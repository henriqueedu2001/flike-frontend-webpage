"use client";

import { useEffect, useState } from "react";

interface Institution {
  id: number;
  owner_id: number;
  name: string;
  created_at: string;
}

export default function InstitutionsTable() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/institution/all")
      .then((res) => res.json())
      .then(setInstitutions);
  }, []);

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
                {new Date(
                  institution.created_at
                ).toLocaleString("pt-BR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}