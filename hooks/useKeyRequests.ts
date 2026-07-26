"use client";

import { useCallback, useEffect, useState } from "react";

import {
  getKeyRequests,
  approveKeyRequest,
  rejectKeyRequest,
} from "@/services/keyRequest.service";
import {
  DigitalKeyRequest,
  DigitalKeyRequestStatus,
} from "@/types/digitalKey";

export function useKeyRequests(status?: DigitalKeyRequestStatus) {
  const [requests, setRequests] = useState<DigitalKeyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actioningId, setActioningId] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getKeyRequests(status);
      setRequests(data);
    } catch {
      setError("Erro ao carregar pedidos de acesso.");
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function approve(id: number) {
    setActioningId(id);

    try {
      await approveKeyRequest(id);
      await refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao aprovar pedido.");
    } finally {
      setActioningId(null);
    }
  }

  async function reject(id: number) {
    setActioningId(id);

    try {
      await rejectKeyRequest(id);
      await refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao rejeitar pedido.");
    } finally {
      setActioningId(null);
    }
  }

  return { requests, loading, error, actioningId, approve, reject, refresh };
}
