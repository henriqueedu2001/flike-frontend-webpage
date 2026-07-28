"use client";

import FormModal, { FormField, FormValues } from "./FormModal";
import { changePassword } from "@/services/user.service";

const FIELDS: FormField[] = [
  { name: "current_password", label: "Senha atual", type: "password" },
  { name: "new_password", label: "Nova senha", type: "password" },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  async function handleSubmit(form: FormValues) {
    try {
      await changePassword({
        current_password: String(form.current_password ?? ""),
        new_password: String(form.new_password ?? ""),
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
      title="Alterar Senha"
      fields={FIELDS}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
