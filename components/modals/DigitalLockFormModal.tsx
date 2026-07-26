"use client";

import FormModal, { FormField, FormValues } from "./FormModal";
import { createDigitalLock } from "@/services/digitalLock.service";

const FIELDS: FormField[] = [
  { name: "room_id", label: "Room ID", type: "number" },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function DigitalLockFormModal({
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  async function handleSubmit(form: FormValues) {
    try {
      await createDigitalLock({
        room_id: Number(form.room_id ?? 0),
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
      title="Nova Fechadura Digital"
      fields={FIELDS}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
