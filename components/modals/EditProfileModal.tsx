"use client";

import FormModal, { FormField, FormValues } from "./FormModal";
import { updateCurrentUser } from "@/services/user.service";
import { User } from "@/types/user";

const FIELDS: FormField[] = [
  { name: "name", label: "Nome" },
  { name: "email", label: "Email" },
];

interface Props {
  isOpen: boolean;
  user: User;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function EditProfileModal({
  isOpen,
  user,
  onClose,
  onSuccess,
}: Props) {
  async function handleSubmit(form: FormValues) {
    try {
      await updateCurrentUser({
        name: String(form.name ?? ""),
        email: String(form.email ?? ""),
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
      title="Editar Perfil"
      fields={FIELDS}
      initialValues={{ name: user.name, email: user.email }}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
