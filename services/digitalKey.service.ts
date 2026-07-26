import {
  CreateDigitalKeyRequest,
  DigitalKey,
  RequestDigitalKeyResponse,
} from "@/types/digitalKey";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getDigitalKeys(): Promise<DigitalKey[]> {
  const response = await fetch(`${API_URL}/digital_key/all`);

  if (!response.ok) {
    throw new Error("Erro ao buscar chaves digitais.");
  }

  return response.json();
}

export async function createDigitalKey(
  data: CreateDigitalKeyRequest
) {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}/digital_key/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar chave digital.");
  }

  return response.json();
}

export async function requestDigitalKey(
  lockId: number
): Promise<RequestDigitalKeyResponse> {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}/digital_key/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ lock_id: lockId }),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(body, null, 2));
  }

  return body;
}