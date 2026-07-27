"use client";

import { useEffect, useState } from "react";
import FormModal, { FormField, FormValues } from "./FormModal";
import EntityPicker from "@/components/EntityPicker";
import { createRoom, updateRoom, getMyBuildings } from "@/services/admin.service";
import { Room } from "@/types/room";
import { Building } from "@/types/building";

const FIELDS: FormField[] = [
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
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null
  );

  useEffect(() => {
    if (!isOpen) return;

    getMyBuildings()
      .then((data) => {
        setBuildings(data);

        if (room) {
          setSelectedBuilding(
            data.find((item) => item.id === room.building_id) ?? null
          );
        }
      })
      .catch(() => setBuildings([]));
  }, [isOpen, room]);

  async function handleSubmit(form: FormValues) {
    if (!selectedBuilding) {
      alert("Selecione um prédio válido antes de criar a sala.");
      return false;
    }

    const data = {
      building_id: selectedBuilding.id,
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
      extraContent={
        <EntityPicker<Building>
          label="Prédio"
          placeholder="Buscar prédio..."
          items={buildings}
          columns={[
            { header: "Nome", render: (item) => item.name },
            { header: "Cidade", render: (item) => item.city },
          ]}
          getKey={(item) => item.id}
          getLabel={(item) => `${item.name} — ${item.city}/${item.state}`}
          selected={selectedBuilding}
          onSelect={setSelectedBuilding}
          onClear={() => setSelectedBuilding(null)}
          emptyMessage="Nenhum prédio encontrado."
        />
      }
      initialValues={
        room
          ? {
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
