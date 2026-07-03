"use client";

import { useState } from "react";

import { login } from "@/services/auth.service";

export default function useLogin() {

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function signIn(email: string, password: string) {

    try {

      setLoading(true);

      setError("");

      const data = await login({
        email,
        password,
      });

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      window.location.href = "admin/dashboard";

    } catch (err) {

      console.error(err);

      setError("Email ou senha inválidos.");

    } finally {

      setLoading(false);

    }
  }

  return {
    signIn,
    loading,
    error,
  };
}