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

      await login({
        email,
        password,
      });

      window.location.href = "/dashboard";

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