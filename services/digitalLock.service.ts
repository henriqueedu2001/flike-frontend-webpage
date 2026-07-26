import { DigitalLock } from "@/types/digitalLock";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getDigitalLocks(): Promise<DigitalLock[]> {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}/digital_lock/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar fechaduras digitais.");
  }

  return response.json();
}

export async function getDigitalLocksByRoom(
  roomId: number
): Promise<DigitalLock[]> {
  const response = await fetch(
    `${API_URL}/digital_lock?room_id=${roomId}`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar fechaduras da sala.");
  }

  return response.json();
}

interface CreateDigitalLockData {
  room_id: number;
}

export async function createDigitalLock(data: CreateDigitalLockData) {
  const response = await fetch(`${API_URL}/digital_lock/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(body, null, 2));
  }

  return body;
}