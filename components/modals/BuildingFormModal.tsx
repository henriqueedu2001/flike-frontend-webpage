"use client";

import FormModal, { FormField, FormValues } from "./FormModal";
import { createBuilding, updateBuilding } from "@/services/admin.service";
import { Building } from "@/types/building";

const FIELDS: FormField[] = [
  { name: "institution_id", label: "Institution ID", type: "number" },
  { name: "name", label: "Nome" },
  { name: "address_line_1", label: "Endereço" },
  { name: "address_line_2", label: "Complemento" },
  { name: "city", label: "Cidade" },
  { name: "state", label: "Estado" },
  { name: "zip_code", label: "CEP" },
  { name: "country", label: "País" },
];

interface Props {
  isOpen: boolean;
  building?: Building | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function BuildingFormModal({
  isOpen,
  building,
  onClose,
  onSuccess,
}: Props) {
  async function handleSubmit(form: FormValues) {
    const data = {
      institution_id: Number(form.institution_id ?? 0),
      name: String(form.name ?? ""),
      address_line_1: String(form.address_line_1 ?? ""),
      address_line_2: String(form.address_line_2 ?? ""),
      city: String(form.city ?? ""),
      state: String(form.state ?? ""),
      zip_code: String(form.zip_code ?? ""),
      country: String(form.country ?? ""),
    };

    try {
      if (building) {
        await updateBuilding(building.id, data);
      } else {
        await createBuilding(data);
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
      title={building ? "Editar Prédio" : "Novo Prédio"}
      fields={FIELDS}
      initialValues={
        building
          ? {
              institution_id: building.institution_id,
              name: building.name,
              address_line_1: building.address_line_1,
              address_line_2: building.address_line_2 ?? "",
              city: building.city,
              state: building.state,
              zip_code: building.zip_code,
              country: building.country,
            }
          : undefined
      }
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
