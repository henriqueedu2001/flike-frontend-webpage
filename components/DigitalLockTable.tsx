"use client";

import { DigitalLock } from "@/types/digitalLock";
interface DigitalLockTableProps {
  digitalLocks: DigitalLock[];
}

export default function DigitalLockTable({
  digitalLocks = [],
}: DigitalLockTableProps) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sala</th>
            <th>Gerar chave de acesso</th>
          </tr>
        </thead>

        <tbody>
          {digitalLocks.map((digitalLock) => (
            <tr key={digitalLock.id}>
              <td>{digitalLock.id}</td>

              <td>{digitalLock.room_id}</td>

              <td>
                <button  className="btn-action success"> 
                  + Nova chave
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}