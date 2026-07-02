import { User } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/user/all`);

  if (!response.ok) {
    throw new Error("Erro ao buscar usuários.");
  }

  return response.json();
}

export async function createUser(data: unknown) {
  const response = await fetch(`${API_URL}/user/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar usuário.");
  }

  return response.json();
}