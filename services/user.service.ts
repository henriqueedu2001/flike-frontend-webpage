import { User } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/user/all`);

  if (!response.ok) {
    throw new Error("Erro ao buscar usuários.");
  }

  return response.json();
}

export async function getCurrentUser(): Promise<User> {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao carregar dados do usuário.");
  }

  return response.json();
}

interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export async function createUser(data: CreateUserData) {
  const response = await fetch(`${API_URL}/user/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(body, null, 2));
  }

  return body;
}