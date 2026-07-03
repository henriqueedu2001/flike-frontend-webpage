import { useEffect, useState } from "react";
import { DigitalLock } from "@/types/digitalLock";
import { getDigitalLocks } from "@/services/digitalLock.service";

export function useDigitalLocks() {
  const [digitalLocks, setDigitalLocks] = useState<DigitalLock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDigitalLocks() {
      try {
        const data = await getDigitalLocks();
        setDigitalLocks(data);
      } catch {
        setError("Erro ao carregar fechaduras digitais.");
      } finally {
        setLoading(false);
      }
    }

    loadDigitalLocks();
  }, []);

  return {
    digitalLocks,
    loading,
    error,
  };
}