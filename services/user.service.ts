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
    throw new Error(extractErrorMessage(body));
  }

  return body;
}

// FastAPI's `detail` is a plain string for most errors (e.g. duplicate email)
// but an array of validation-error objects for a 422, so both need handling.
function extractErrorMessage(body: unknown): string {
  const detail = (body as { detail?: unknown })?.detail;

  if (typeof detail === "string") return detail;

  if (Array.isArray(detail)) {
    return detail
      .map((item) => (item as { msg?: string })?.msg)
      .filter(Boolean)
      .join(" ");
  }

  return "Erro ao criar usuário.";
}