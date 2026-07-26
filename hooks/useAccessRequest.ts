"use client";

import { useCallback, useState } from "react";

import { Institution } from "@/types/institution";
import { Building } from "@/types/building";
import { Room } from "@/types/room";
import { DigitalLock } from "@/types/digitalLock";
import { getDigitalLocksByRoom } from "@/services/digitalLock.service";
import { requestDigitalKey } from "@/services/digitalKey.service";

export function useAccessRequest() {
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [building, setBuilding] = useState<Building | null>(null);
  const [room, setRoom] = useState<Room | null>(null);

  const [lock, setLock] = useState<DigitalLock | null>(null);
  const [lockLoading, setLockLoading] = useState(false);
  const [lockError, setLockError] = useState("");

  const [requesting, setRequesting] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [requestSuccess, setRequestSuccess] = useState(false);

  const selectInstitution = useCallback((next: Institution) => {
    setInstitution(next);
    setBuilding(null);
    setRoom(null);
    setLock(null);
  }, []);

  const clearInstitution = useCallback(() => {
    setInstitution(null);
    setBuilding(null);
    setRoom(null);
    setLock(null);
  }, []);

  const selectBuilding = useCallback((next: Building) => {
    setBuilding(next);
    setRoom(null);
    setLock(null);
  }, []);

  const clearBuilding = useCallback(() => {
    setBuilding(null);
    setRoom(null);
    setLock(null);
  }, []);

  const selectRoom = useCallback(async (next: Room) => {
    setRoom(next);
    setLock(null);
    setLockError("");
    setLockLoading(true);

    try {
      const locks = await getDigitalLocksByRoom(next.id);

      if (locks.length === 0) {
        setLockError("Nenhuma fechadura cadastrada para esta sala.");
      }

      setLock(locks[0] ?? null);
    } catch {
      setLockError("Erro ao buscar a fechadura desta sala.");
    } finally {
      setLockLoading(false);
    }
  }, []);

  const clearRoom = useCallback(() => {
    setRoom(null);
    setLock(null);
    setLockError("");
  }, []);

  const requestKey = useCallback(async () => {
    if (!lock) return;

    setRequesting(true);
    setRequestError("");

    try {
      await requestDigitalKey(lock.id);
      setRequestSuccess(true);
    } catch (err) {
      setRequestError(
        err instanceof Error ? err.message : "Erro ao solicitar a chave."
      );
    } finally {
      setRequesting(false);
    }
  }, [lock]);

  return {
    institution,
    selectInstitution,
    clearInstitution,
    building,
    selectBuilding,
    clearBuilding,
    room,
    selectRoom,
    clearRoom,
    lock,
    lockLoading,
    lockError,
    requesting,
    requestError,
    requestSuccess,
    requestKey,
  };
}
