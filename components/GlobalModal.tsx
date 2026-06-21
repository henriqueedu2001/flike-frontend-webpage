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
  const [form, setForm] = useState<Record<string, any>>({});

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

  const labels: Record<ModalType, string> = {
    user: "Novo Usuário",
    institution: "Nova Instituição",
    building: "Novo Prédio",
    room: "Nova Sala",
  };

  const fields: Record<ModalType, any[]> = {
    user: [
      { name: "name", label: "Nome" },
      { name: "email", label: "Email" },
      { name: "password", label: "Senha", type: "password" },
    ],

    institution: [
      { name: "user_id", label: "User ID", type: "number" }, // 🔥 CORRIGIDO
      { name: "name", label: "Nome" },
    ],

    building: [
      { name: "institution_id", label: "Institution ID", type: "number" },
      { name: "name", label: "Nome" },
      { name: "address_line_1", label: "Endereço" },
      { name: "address_line_2", label: "Complemento" },
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
    try {
      console.log("Enviando:", form);

      let url = endpoints[type];

      /**
       * 🔥 FIX PRINCIPAL DO SEU ERRO 422
       * Institution espera QUERY PARAMS
       */
      if (type === "institution") {
        url += `?user_id=${form.user_id}&building_name=${form.name}`;

        const response = await fetch(url, {
          method: "POST",
        });

        const data = await response.json();

        if (!response.ok) {
          alert(JSON.stringify(data, null, 2));
          return;
        }

        onSuccess?.();
        onClose();
        return;
      }

      /**
       * 🔥 FIX PARA ROOM (evita 500 no frontend)
       */
      if (type === "room") {
        if (!form.building_id) {
          alert("Selecione um building válido antes de criar a sala.");
          return;
        }
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      console.log("Status:", response.status);
      console.log("Resposta:", data);
      console.log("Payload:", form);

      if (!response.ok) {
        alert(JSON.stringify(data, null, 2));
        return;
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com a API.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{labels[type]}</h2>

        {fields[type].map((field) => (
          <div key={field.name} className="modal-field">
            <label className="modal-label">{field.label}</label>

            <input
              type={field.type || "text"}
              className="modal-input"
              value={form[field.name] ?? ""}
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