import { CreateDigitalKeyRequest } from "@/types/digitalKey";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

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