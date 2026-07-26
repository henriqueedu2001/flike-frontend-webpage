import { LoginRequest, LoginResponse } from "@/types/login";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function login(
  credentials: LoginRequest
): Promise<LoginResponse> {

  const response = await fetch(`${API_URL}/auth/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    throw new Error("Email ou senha inválidos.");
  }

  const data: LoginResponse = await response.json();
  localStorage.setItem("access_token", data.token);

  return data;
}