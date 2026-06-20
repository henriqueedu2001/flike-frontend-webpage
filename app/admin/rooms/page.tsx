"use client";

import InstitutionsTable from "@/components/InstitutionsTable";
import BuildingsTable from "@/components/BuildingsTable";
import RoomsTable from "@/components/RoomsTable";

import { useState } from "react";
import GlobalModal from "@/components/GlobalModal";

export default function Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "user" | "institution" | "building" | "room" | null
  >(null);
  return (
    <main className="p-6">
      <div className= "page-margin">
        <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        <div className="content-padding">

          <div className="page-title">
            <h2>Instituições</h2>
            <button className="btn-action success" onClick={() => { setModalType("institution"); setModalOpen(true); }}>
              + Nova Instituição
            </button>
          </div>

          <InstitutionsTable />

          <div style={{ height: "30px" }} />

          <div className="page-title">
            <h2>Prédios</h2>
            <button className="btn-action success"  onClick={() => { setModalType("building"); setModalOpen(true); }}>
              + Novo Prédio
            </button>
          </div>

          <BuildingsTable />

          <div style={{ height: "30px" }} />

          <div className="page-title">
            <h2>Salas</h2>
            <button className="btn-action success" onClick={() => { setModalType("room"); setModalOpen(true); }}>
              + Nova Sala 
            </button>
          </div>

          <RoomsTable />
          {/* MODAL GLOBAL */}
          <GlobalModal
            isOpen={modalOpen}
            type={modalType}
            onClose={() => setModalOpen(false)}
            onSuccess={() => window.location.reload()}
          />
        </div>
      </div>
    </main>
  );
}
