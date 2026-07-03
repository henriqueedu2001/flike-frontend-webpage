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