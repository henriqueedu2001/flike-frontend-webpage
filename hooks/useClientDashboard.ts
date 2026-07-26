"use client";

import { useCallback, useEffect, useState } from "react";

import { getCurrentUser } from "@/services/user.service";
import { getDigitalKeys } from "@/services/digitalKey.service";
import { getDigitalLocks } from "@/services/digitalLock.service";
import { getRooms, getBuildings } from "@/services/admin.service";
import { User } from "@/types/user";

export interface DashboardKeyRow {
  id: number;
  roomName: string;
  buildingName: string;
  expiration: string;
  isActive: boolean;
}

export function useClientDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [keys, setKeys] = useState<DashboardKeyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const currentUser = await getCurrentUser();

      const [allKeys, locks, rooms, buildings] = await Promise.all([
        getDigitalKeys(),
        getDigitalLocks(),
        getRooms(),
        getBuildings(),
      ]);

      const lockById = new Map(locks.map((lock) => [lock.id, lock]));
      const roomById = new Map(rooms.map((room) => [room.id, room]));
      const buildingById = new Map(
        buildings.map((building) => [building.id, building])
      );

      const now = Date.now();

      // The backend only exposes /digital_key/all (no per-user filter), so
      // "my keys" is derived client-side by matching user_id.
      const rows: DashboardKeyRow[] = allKeys
        .filter((key) => key.user_id === currentUser.id)
        .map((key) => {
          const lock = lockById.get(key.digital_lock_id);
          const room = lock ? roomById.get(lock.room_id) : undefined;
          const building = room
            ? buildingById.get(room.building_id)
            : undefined;

          return {
            id: key.id,
            roomName: room?.name ?? "Sala desconhecida",
            buildingName: building?.name ?? "Prédio desconhecido",
            expiration: key.expires_at,
            isActive: key.used === 0 && new Date(key.expires_at).getTime() > now,
          };
        });

      setUser(currentUser);
      setKeys(rows);
    } catch {
      setError("Erro ao carregar suas chaves digitais.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { user, keys, loading, error, refresh };
}
