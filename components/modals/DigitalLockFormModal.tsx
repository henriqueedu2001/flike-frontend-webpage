"use client";

import { useEffect, useState } from "react";
import FormModal from "./FormModal";
import EntityPicker from "@/components/EntityPicker";
import {
  createDigitalLock,
  updateDigitalLock,
} from "@/services/digitalLock.service";
import { getMyRooms } from "@/services/admin.service";
import { DigitalLock } from "@/types/digitalLock";
import { Room } from "@/types/room";

interface Props {
  isOpen: boolean;
  digitalLock?: DigitalLock | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function DigitalLockFormModal({
  isOpen,
  digitalLock,
  onClose,
  onSuccess,
}: Props) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    getMyRooms()
      .then((data) => {
        setRooms(data);

        if (digitalLock) {
          setSelectedRoom(
            data.find((item) => item.id === digitalLock.room_id) ?? null
          );
        }
      })
      .catch(() => setRooms([]));
  }, [isOpen, digitalLock]);

  async function handleSubmit() {
    if (!selectedRoom) {
      alert("Selecione uma sala válida antes de salvar a fechadura.");
      return false;
    }

    try {
      if (digitalLock) {
        await updateDigitalLock(digitalLock.id, { room_id: selectedRoom.id });
      } else {
        await createDigitalLock({ room_id: selectedRoom.id });
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
      title={digitalLock ? "Editar Fechadura Digital" : "Nova Fechadura Digital"}
      fields={[]}
      extraContent={
        <EntityPicker<Room>
          label="Sala"
          placeholder="Buscar sala..."
          items={rooms}
          columns={[
            { header: "Nome", render: (item) => item.name },
            { header: "Número", render: (item) => item.number },
          ]}
          getKey={(item) => item.id}
          getLabel={(item) => `${item.name} (nº ${item.number})`}
          selected={selectedRoom}
          onSelect={setSelectedRoom}
          onClear={() => setSelectedRoom(null)}
          emptyMessage="Nenhuma sala encontrada."
        />
      }
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
