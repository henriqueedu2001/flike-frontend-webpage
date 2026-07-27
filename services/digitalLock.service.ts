import { DigitalLock } from "@/types/digitalLock";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("access_token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

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

// Scoped to locks under institutions the logged-in user owns — use this for
// the admin dashboard. getDigitalLocks above stays in use for the client
// dashboard, which needs to resolve any lock tied to the user's own keys,
// regardless of institution ownership.
export async function getMyDigitalLocks(): Promise<DigitalLock[]> {
  const response = await fetch(`${API_URL}/admin/locks`, {
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar suas fechaduras digitais.");
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

interface DigitalLockData {
  room_id: number;
}

export async function createDigitalLock(data: DigitalLockData) {
  const response = await fetch(`${API_URL}/admin/locks`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(body, null, 2));
  }

  return body;
}

export async function updateDigitalLock(id: number, data: DigitalLockData) {
  const response = await fetch(`${API_URL}/admin/locks/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(body, null, 2));
  }

  return body;
}

export async function deleteDigitalLock(id: number) {
  const response = await fetch(`${API_URL}/admin/locks/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(body, null, 2));
  }

  return body;
}
