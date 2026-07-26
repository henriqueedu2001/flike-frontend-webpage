"use client";

import { useState } from "react";

interface Props {
  onSubmit:(
      email:string,
      password:string
  )=>void;

  loading:boolean;
  error:string;
}

export default function LoginForm({
  onSubmit,
  loading,
  error
}:Props){

  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  return(

    <form
      className="login-form"
      onSubmit={(e)=>{
        e.preventDefault();
        onSubmit(email,password);
      }}
    >

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
      {error &&
        <div className="login-error">
          {error}
        </div>

      }

      <button className="login-button" disabled={loading}>
        {
          loading ?
          "Entrando..."
          :
          "Entrar"
        }

      </button>
    </form>
  );

}