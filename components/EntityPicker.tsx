"use client";

import { useState } from "react";
import SelectableTable, { SelectableTableColumn } from "./SelectableTable";

interface EntityPickerProps<T> {
  label: string;
  placeholder: string;
  items: T[];
  columns: SelectableTableColumn<T>[];
  getKey: (item: T) => number;
  getLabel: (item: T) => string;
  selected: T | null;
  onSelect: (item: T) => void;
  onClear: () => void;
  emptyMessage: string;
}

export default function EntityPicker<T>({
  label,
  placeholder,
  items,
  columns,
  getKey,
  getLabel,
  selected,
  onSelect,
  onClear,
  emptyMessage,
}: EntityPickerProps<T>) {
  const [query, setQuery] = useState("");

  const filtered = items.filter((item) =>
    getLabel(item).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="modal-field">
      <label className="modal-label">{label}</label>

      {selected ? (
        <div className="entity-picker-selected">
          <span>{getLabel(selected)}</span>

          <button
            type="button"
            className="search-select-chip-clear"
            onClick={onClear}
          >
            Trocar
          </button>
        </div>
      ) : (
        <>
          <input
            type="text"
            className="modal-input"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="entity-picker-table">
            <SelectableTable<T>
              items={filtered}
              columns={columns}
              getKey={getKey}
              selectedKey={null}
              onSelect={onSelect}
              emptyMessage={emptyMessage}
            />
          </div>
        </>
      )}
    </div>
  );
}
