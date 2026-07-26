"use client";

import { useState } from "react";

export interface FormField {
  name: string;
  label: string;
  type?: "text" | "number" | "password";
}

export type FormValues = Record<string, string | number>;

interface Props {
  isOpen: boolean;
  title: string;
  fields: FormField[];
  /**
   * Prefills the form, e.g. for editing an existing row. Only read on mount —
   * callers editing different rows should remount via a `key` prop (see the
   * per-entity modal components) so each row gets its own fresh initial state.
   */
  initialValues?: FormValues;
  onClose: () => void;
  /** Return true once the submission succeeded, so the modal can reset and close. */
  onSubmit: (form: FormValues) => Promise<boolean>;
}

export default function FormModal({
  isOpen,
  title,
  fields,
  initialValues,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<FormValues>(initialValues ?? {});
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  function handleChange(field: FormField, value: string) {
    setForm((prev) => ({
      ...prev,
      [field.name]: field.type === "number" ? Number(value) : value,
    }));
  }

  async function handleSave() {
    setSaving(true);

    try {
      const success = await onSubmit(form);

      if (success) {
        setForm({});
        onClose();
      }
    } finally {
      setSaving(false);
    }
  }

  function handleClose() {
    setForm({});
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{title}</h2>

        {fields.map((field) => (
          <div key={field.name} className="modal-field">
            <label className="modal-label">{field.label}</label>

            <input
              type={field.type || "text"}
              className="modal-input"
              value={form[field.name] ?? ""}
              onChange={(e) => handleChange(field, e.target.value)}
            />
          </div>
        ))}

        <div className="modal-actions">
          <button
            className="modal-cancel"
            onClick={handleClose}
            disabled={saving}
          >
            Cancelar
          </button>

          <button
            className="modal-save"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
