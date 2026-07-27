"use client";

import { useEffect, useState } from "react";
import FormModal, { FormField, FormValues } from "./FormModal";
import EntityPicker from "@/components/EntityPicker";
import { createBuilding, updateBuilding, getMyInstitutions } from "@/services/admin.service";
import { Building } from "@/types/building";
import { Institution } from "@/types/institution";

const FIELDS: FormField[] = [
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
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [selectedInstitution, setSelectedInstitution] =
    useState<Institution | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    getMyInstitutions()
      .then((data) => {
        setInstitutions(data);

        if (building) {
          setSelectedInstitution(
            data.find((item) => item.id === building.institution_id) ?? null
          );
        }
      })
      .catch(() => setInstitutions([]));
  }, [isOpen, building]);

  async function handleSubmit(form: FormValues) {
    if (!selectedInstitution) {
      alert("Selecione uma instituição válida antes de criar o prédio.");
      return false;
    }

    const data = {
      institution_id: selectedInstitution.id,
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
      extraContent={
        <EntityPicker<Institution>
          label="Instituição"
          placeholder="Buscar instituição..."
          items={institutions}
          columns={[{ header: "Nome", render: (item) => item.name }]}
          getKey={(item) => item.id}
          getLabel={(item) => item.name}
          selected={selectedInstitution}
          onSelect={setSelectedInstitution}
          onClear={() => setSelectedInstitution(null)}
          emptyMessage="Nenhuma instituição encontrada."
        />
      }
      initialValues={
        building
          ? {
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
