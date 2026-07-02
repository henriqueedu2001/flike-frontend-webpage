import { useCallback, useEffect, useState } from "react";

import { getUsers } from "@/services/user.service";
import { User } from "@/types/user";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getUsers();

      setUsers(data);
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
    users,
    loading,
    error,
    refresh,
  };
}