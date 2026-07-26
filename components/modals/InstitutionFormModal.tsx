"use client";

import FormModal, { FormField, FormValues } from "./FormModal";
import { createInstitution, updateInstitution } from "@/services/admin.service";
import { Institution } from "@/types/institution";

const CREATE_FIELDS: FormField[] = [
  { name: "user_id", label: "User ID", type: "number" },
  { name: "name", label: "Nome" },
];

const EDIT_FIELDS: FormField[] = [{ name: "name", label: "Nome" }];

interface Props {
  isOpen: boolean;
  institution?: Institution | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function InstitutionFormModal({
  isOpen,
  institution,
  onClose,
  onSuccess,
}: Props) {
  const isEditing = !!institution;

  async function handleSubmit(form: FormValues) {
    try {
      if (institution) {
        await updateInstitution(institution.id, {
          name: String(form.name ?? ""),
        });
      } else {
        await createInstitution({
          user_id: Number(form.user_id ?? 0),
          name: String(form.name ?? ""),
        });
      }

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
      title={isEditing ? "Editar Instituição" : "Nova Instituição"}
      fields={isEditing ? EDIT_FIELDS : CREATE_FIELDS}
      initialValues={institution ? { name: institution.name } : undefined}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
