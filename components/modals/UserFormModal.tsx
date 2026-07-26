"use client";

import FormModal, { FormField, FormValues } from "./FormModal";
import { createUser } from "@/services/user.service";

const FIELDS: FormField[] = [
  { name: "name", label: "Nome" },
  { name: "email", label: "Email" },
  { name: "password", label: "Senha", type: "password" },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function UserFormModal({ isOpen, onClose, onSuccess }: Props) {
  async function handleSubmit(form: FormValues) {
    try {
      await createUser({
        name: String(form.name ?? ""),
        email: String(form.email ?? ""),
        password: String(form.password ?? ""),
      });

      onSuccess?.();
      return true;
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao conectar com a API.");
      return false;
    }
  }

  return (
    <FormModal
      isOpen={isOpen}
      title="Novo Usuário"
      fields={FIELDS}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
