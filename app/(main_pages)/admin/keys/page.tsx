"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useKeyRequests } from "@/hooks/useKeyRequests";
import KeyRequestsTable from "@/components/KeyRequestsTable";
import { DigitalKeyRequestStatus } from "@/types/digitalKey";

type StatusFilter = DigitalKeyRequestStatus | "all";

const FILTERS: { label: string; value: StatusFilter }[] = [
  { label: "Pendentes", value: "pending" },
  { label: "Aprovadas", value: "approved" },
  { label: "Rejeitadas", value: "rejected" },
  { label: "Todas", value: "all" },
];

export default function Page() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("pending");

  const { requests, loading, error, actioningId, approve, reject } =
    useKeyRequests(statusFilter === "all" ? undefined : statusFilter);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.replace("/login");
    }
  }, [router]);

  function handleReject(id: number) {
    if (confirm("Rejeitar esta solicitação de acesso?")) {
      reject(id);
    }
  }

  return (
    <main className="p-6">
      <div className="page-margin">
        <h1 className="text-3xl font-bold">Gestão de Chaves</h1>
        <p>Visualize e responda aos pedidos de acesso.</p>

        <div className="content-padding">
          <div className="status-filter">
            {FILTERS.map((filter) => (
              <button
                key={filter.value}
                className={
                  statusFilter === filter.value ? "status-filter-active" : ""
                }
                onClick={() => setStatusFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {loading && <p>Carregando...</p>}

          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && (
            <KeyRequestsTable
              requests={requests}
              actioningId={actioningId}
              onApprove={approve}
              onReject={handleReject}
            />
          )}
        </div>
      </div>
    </main>
  );
}
