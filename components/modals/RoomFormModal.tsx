"use client";

import FormModal, { FormField, FormValues } from "./FormModal";
import { createRoom, updateRoom } from "@/services/admin.service";
import { Room } from "@/types/room";

const FIELDS: FormField[] = [
  { name: "building_id", label: "Building ID", type: "number" },
  { name: "name", label: "Nome" },
  { name: "number", label: "Número" },
];

interface Props {
  isOpen: boolean;
  room?: Room | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function RoomFormModal({
  isOpen,
  room,
  onClose,
  onSuccess,
}: Props) {
  async function handleSubmit(form: FormValues) {
    if (!form.building_id) {
      alert("Selecione um building válido antes de criar a sala.");
      return false;
    }

    const data = {
      building_id: Number(form.building_id),
      name: String(form.name ?? ""),
      number: String(form.number ?? ""),
    };

    try {
      if (room) {
        await updateRoom(room.id, data);
      } else {
        await createRoom(data);
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
      title={room ? "Editar Sala" : "Nova Sala"}
      fields={FIELDS}
      initialValues={
        room
          ? {
              building_id: room.building_id,
              name: room.name,
              number: room.number,
            }
          : undefined
      }
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
