"use client";

import { useState } from "react";

interface Props {
  onSubmit:(
      name:string,
      email:string,
      password:string,
      confirmPassword:string
  )=>void;

  loading:boolean;
  error:string;
}

export default function SignupForm({
  onSubmit,
  loading,
  error
}:Props){

  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[confirmPassword,setConfirmPassword]=useState("");
  return(

    <form
      className="login-form"
      onSubmit={(e)=>{
        e.preventDefault();
        onSubmit(name,email,password,confirmPassword);
      }}
    >

      <div className="input-group">
        <label>Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          placeholder="Digite seu nome"
          required
        />
      </div>

      <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Digite seu email"
          required
        />
      </div>

      <div className="input-group">
        <label>Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="Digite sua senha"
          required
        />
      </div>

      <div className="input-group">
        <label>Confirmar Senha</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          placeholder="Confirme sua senha"
          required
        />
      </div>

      {error &&
        <div className="login-error">
          {error}
        </div>

      }

      <button className="login-button" disabled={loading}>
        {
          loading ?
          "Criando conta..."
          :
          "Criar Conta"
        }

      </button>
    </form>
  );

}
