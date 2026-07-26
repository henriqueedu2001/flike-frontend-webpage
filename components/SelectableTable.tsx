"use client";

import { ReactNode } from "react";

export interface SelectableTableColumn<T> {
  header: string;
  render: (item: T) => ReactNode;
}

interface SelectableTableProps<T> {
  items: T[];
  columns: SelectableTableColumn<T>[];
  getKey: (item: T) => number;
  selectedKey: number | null;
  onSelect: (item: T) => void;
  emptyMessage: string;
}

export default function SelectableTable<T>({
  items,
  columns,
  getKey,
  selectedKey,
  onSelect,
  emptyMessage,
}: SelectableTableProps<T>) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.header}>{column.header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {items.map((item) => {
            const key = getKey(item);

            return (
              <tr
                key={key}
                className={
                  key === selectedKey ? "selectable-row-selected" : "selectable-row"
                }
                onClick={() => onSelect(item)}
              >
                {columns.map((column) => (
                  <td key={column.header}>{column.render(item)}</td>
                ))}
              </tr>
            );
          })}

          {items.length === 0 && (
            <tr>
              <td colSpan={columns.length}>{emptyMessage}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
