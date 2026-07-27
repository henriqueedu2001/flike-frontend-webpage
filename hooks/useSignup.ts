"use client";

import { useState } from "react";

import { createUser } from "@/services/user.service";

export default function useSignup() {

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function signUp(
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {

      setLoading(true);

      setError("");

      await createUser({ name, email, password });

      window.location.href = "/login";

    } catch (err) {

      setError(
        err instanceof Error ? err.message : "Erro ao criar usuário."
      );

    } finally {

      setLoading(false);

    }
  }

  return {
    signUp,
    loading,
    error,
  };
}
