"use client";

import { DigitalKeyRequest } from "@/types/digitalKey";

const STATUS_LABELS: Record<DigitalKeyRequest["status"], string> = {
  pending: "Pendente",
  approved: "Aprovado",
  rejected: "Rejeitado",
};

const STATUS_CLASSES: Record<DigitalKeyRequest["status"], string> = {
  pending: "status-pending",
  approved: "status-active",
  rejected: "status-used",
};

interface KeyRequestsTableProps {
  requests: DigitalKeyRequest[];
  actioningId: number | null;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

export default function KeyRequestsTable({
  requests,
  actioningId,
  onApprove,
  onReject,
}: KeyRequestsTableProps) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Lock ID</th>
            <th>Status</th>
            <th>Solicitado em</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.user_id}</td>
              <td>{request.digital_lock_id}</td>

              <td>
                <span
                  className={`status-badge ${STATUS_CLASSES[request.status]}`}
                >
                  {STATUS_LABELS[request.status]}
                </span>
              </td>

              <td>{new Date(request.created_at).toLocaleString("pt-BR")}</td>

              <td>
                {request.status === "pending" ? (
                  <div className="table-actions">
                    <button
                      className="btn-action success small"
                      disabled={actioningId === request.id}
                      onClick={() => onApprove(request.id)}
                    >
                      Aprovar
                    </button>

                    <button
                      className="btn-action danger small"
                      disabled={actioningId === request.id}
                      onClick={() => onReject(request.id)}
                    >
                      Rejeitar
                    </button>
                  </div>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}

          {requests.length === 0 && (
            <tr>
              <td colSpan={6}>Nenhum pedido de acesso encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
