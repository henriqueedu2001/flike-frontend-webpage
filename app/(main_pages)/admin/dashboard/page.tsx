"use client";

import { useState } from "react";

import { useAdminData } from "@/hooks/useAdminData";
import AdminSection from "@/components/admin/AdminSection";
import GlobalModal from "@/components/GlobalModal";
import InstitutionsTable from "@/components/InstitutionsTable";
import BuildingsTable from "@/components/BuildingsTable";
import RoomsTable from "@/components/RoomsTable";

type ModalType = "user" | "institution" | "building" | "room";

export default function Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const {
    institutions,
    buildings,
    rooms,
    refresh,
  } = useAdminData();

  function openModal(type: ModalType) {
    setModalType(type);
    setModalOpen(true);
  }

  return (
    <main className="p-6">
      <div className="page-margin">
        <h1 className="text-3xl font-bold">
          Painel Administrativo
        </h1>

        <div className="content-padding">
          <AdminSection
              title="Instituições"
              buttonText="+ Nova Instituição"
              onClick={() => openModal("institution")}
          >
              <InstitutionsTable institutions={institutions} />
          </AdminSection>

          <AdminSection
              title="Prédios"
              buttonText="+ Novo Prédio"
              onClick={() => openModal("building")}
          >
              <BuildingsTable buildings={buildings} />
          </AdminSection>

          <AdminSection
              title="Salas"
              buttonText="+ Nova Sala"
              onClick={() => openModal("room")}
          >
              <RoomsTable rooms={rooms} />
          </AdminSection>

          <GlobalModal
            isOpen={modalOpen}
            type={modalType}
            onClose={() => setModalOpen(false)}
            onSuccess={refresh}
          />

        </div>
      </div>
    </main>
  );
}