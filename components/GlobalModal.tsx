"use client";

import { useEffect, useState } from "react";

type ModalType = "user" | "institution" | "building" | "room";

interface Props {
  isOpen: boolean;
  type: ModalType | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function GlobalModal({
  isOpen,
  type,
  onClose,
  onSuccess,
}: Props) {
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    setForm({});
  }, [type]);

  if (!isOpen || !type) return null;

  const endpoints: Record<ModalType, string> = {
    user: "http://127.0.0.1:8000/user/new",
    institution: "http://127.0.0.1:8000/institution/new",
    building: "http://127.0.0.1:8000/building/new",
    room: "http://127.0.0.1:8000/room/new",
  };

  const fields: Record<ModalType, any[]> = {
    user: [
      { name: "name", label: "Nome" },
      { name: "email", label: "Email" },
    ],
    institution: [
      { name: "owner_id", label: "Owner ID", type: "number" },
      { name: "name", label: "Nome" },
    ],
    building: [
      { name: "institution_id", label: "Institution ID", type: "number" },
      { name: "name", label: "Nome" },
      { name: "address_line_1", label: "Endereço" },
      { name: "city", label: "Cidade" },
      { name: "state", label: "Estado" },
      { name: "zip_code", label: "CEP" },
      { name: "country", label: "País" },
    ],
    room: [
      { name: "building_id", label: "Building ID", type: "number" },
      { name: "name", label: "Nome" },
      { name: "number", label: "Número" },
    ],
  };

  const handleSubmit = async () => {
    await fetch(endpoints[type], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    onSuccess?.();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Novo {type}</h2>

        {fields[type].map((field) => (
          <div key={field.name} className="modal-field">
            <label className="modal-label">{field.label}</label>
            <input
              type={field.type || "text"}
              className="modal-input"
              onChange={(e) =>
                setForm({
                  ...form,
                  [field.name]:
                    field.type === "number"
                      ? Number(e.target.value)
                      : e.target.value,
                })
              }
            />
          </div>
        ))}

        <div className="modal-actions">
          <button className="modal-cancel" onClick={onClose}>
            Cancelar
          </button>

          <button className="modal-save" onClick={handleSubmit}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}