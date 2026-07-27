"use client";

import Link from "next/link";

import SignupForm from "@/components/SignupForm";
import useSignup from "@/hooks/useSignup";

export default function Page() {

  const {
    signUp,
    loading,
    error,
  } = useSignup();

  return (
    <main className="login-page">

      <div className="login-container">

        <div className="login-card">

          <div className="login-header">

            <h1>FLIKE</h1>

            <p>
              Criar Conta
            </p>

          </div>

          <SignupForm
            onSubmit={signUp}
            loading={loading}
            error={error}
          />

          <p className="auth-switch-link">
            Já tem uma conta? <Link href="/login">Entrar</Link>
          </p>

        </div>

        <p className="login-footer">
          Faculdade de Direito da USP
        </p>

      </div>

    </main>
  );
}
