import { useCallback, useEffect, useState } from "react";

import { getKeyHolders } from "@/services/admin.service";
import { KeyHolder } from "@/types/keyHolder";

export function useKeyHolders() {
  const [keyHolders, setKeyHolders] = useState<KeyHolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getKeyHolders();

      setKeyHolders(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar usuários.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    keyHolders,
    loading,
    error,
    refresh,
  };
}
