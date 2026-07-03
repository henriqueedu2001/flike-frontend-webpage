"use client";

import LoginForm from "@/components/LoginForm";
import useLogin from "@/hooks/useLogin";

export default function Page() {

  const {
    signIn,
    loading,
    error,
  } = useLogin();

  return (
    <main className="login-page">

      <div className="login-container">

        <div className="login-card">

          <div className="login-header">

            <h1>FLIKE</h1>

            <p>
              Sistema de Controle de Acesso
            </p>

          </div>

          <LoginForm
            onSubmit={signIn}
            loading={loading}
            error={error}
          />

        </div>

        <p className="login-footer">
          Faculdade de Direito da USP
        </p>

      </div>

    </main>
  );
}