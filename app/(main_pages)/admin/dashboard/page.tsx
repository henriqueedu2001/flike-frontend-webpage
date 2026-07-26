"use client";

import { useState } from "react";

import { useAdminData } from "@/hooks/useAdminData";
import AdminSection from "@/components/admin/AdminSection";
import InstitutionFormModal from "@/components/modals/InstitutionFormModal";
import BuildingFormModal from "@/components/modals/BuildingFormModal";
import RoomFormModal from "@/components/modals/RoomFormModal";
import DigitalLockFormModal from "@/components/modals/DigitalLockFormModal";
import InstitutionsTable from "@/components/InstitutionsTable";
import BuildingsTable from "@/components/BuildingsTable";
import RoomsTable from "@/components/RoomsTable";
import DigitalLocksTable from "@/components/DigitalLocksTable";
import { Institution } from "@/types/institution";
import { Building } from "@/types/building";
import { Room } from "@/types/room";
import {
  deleteInstitution,
  deleteBuilding,
  deleteRoom,
} from "@/services/admin.service";

// undefined = modal closed, null = create mode, object = editing that row
export default function Page() {
  const [institutionModal, setInstitutionModal] = useState<
    Institution | null | undefined
  >(undefined);

  const [buildingModal, setBuildingModal] = useState<
    Building | null | undefined
  >(undefined);

  const [roomModal, setRoomModal] = useState<Room | null | undefined>(
    undefined
  );

  const [digitalLockModalOpen, setDigitalLockModalOpen] = useState(false);

  // Bumped on every open so the modal remounts (and re-reads initialValues)
  // even when re-opening the exact same row for editing.
  const [modalKey, setModalKey] = useState(0);

  const {
    institutions,
    buildings,
    rooms,
    digitalLocks,
    refresh,
  } = useAdminData();

  function openInstitutionModal(institution: Institution | null) {
    setInstitutionModal(institution);
    setBuildingModal(undefined);
    setRoomModal(undefined);
    setDigitalLockModalOpen(false);
    setModalKey((k) => k + 1);
  }

  function openBuildingModal(building: Building | null) {
    setBuildingModal(building);
    setInstitutionModal(undefined);
    setRoomModal(undefined);
    setDigitalLockModalOpen(false);
    setModalKey((k) => k + 1);
  }

  function openRoomModal(room: Room | null) {
    setRoomModal(room);
    setInstitutionModal(undefined);
    setBuildingModal(undefined);
    setDigitalLockModalOpen(false);
    setModalKey((k) => k + 1);
  }

  function openDigitalLockModal() {
    setDigitalLockModalOpen(true);
    setInstitutionModal(undefined);
    setBuildingModal(undefined);
    setRoomModal(undefined);
    setModalKey((k) => k + 1);
  }

  async function handleDeleteInstitution(institution: Institution) {
    if (!confirm(`Excluir a instituição "${institution.name}"?`)) return;

    try {
      await deleteInstitution(institution.id);
      refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao excluir instituição.");
    }
  }

  async function handleDeleteBuilding(building: Building) {
    if (!confirm(`Excluir o prédio "${building.name}"?`)) return;

    try {
      await deleteBuilding(building.id);
      refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao excluir prédio.");
    }
  }

  async function handleDeleteRoom(room: Room) {
    if (!confirm(`Excluir a sala "${room.name}"?`)) return;

    try {
      await deleteRoom(room.id);
      refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao excluir sala.");
    }
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
              onClick={() => openInstitutionModal(null)}
          >
              <InstitutionsTable
                institutions={institutions}
                onEdit={openInstitutionModal}
                onDelete={handleDeleteInstitution}
              />
          </AdminSection>

          <AdminSection
              title="Prédios"
              buttonText="+ Novo Prédio"
              onClick={() => openBuildingModal(null)}
          >
              <BuildingsTable
                buildings={buildings}
                onEdit={openBuildingModal}
                onDelete={handleDeleteBuilding}
              />
          </AdminSection>

          <AdminSection
              title="Salas"
              buttonText="+ Nova Sala"
              onClick={() => openRoomModal(null)}
          >
              <RoomsTable
                rooms={rooms}
                onEdit={openRoomModal}
                onDelete={handleDeleteRoom}
              />
          </AdminSection>

          <AdminSection
              title="Fechaduras Digitais"
              buttonText="+ Nova Fechadura"
              onClick={openDigitalLockModal}
          >
              <DigitalLocksTable digitalLocks={digitalLocks} />
          </AdminSection>

          <InstitutionFormModal
            key={`institution-${modalKey}`}
            isOpen={institutionModal !== undefined}
            institution={institutionModal}
            onClose={() => setInstitutionModal(undefined)}
            onSuccess={refresh}
          />

          <BuildingFormModal
            key={`building-${modalKey}`}
            isOpen={buildingModal !== undefined}
            building={buildingModal}
            onClose={() => setBuildingModal(undefined)}
            onSuccess={refresh}
          />

          <RoomFormModal
            key={`room-${modalKey}`}
            isOpen={roomModal !== undefined}
            room={roomModal}
            onClose={() => setRoomModal(undefined)}
            onSuccess={refresh}
          />

          <DigitalLockFormModal
            key={`digital-lock-${modalKey}`}
            isOpen={digitalLockModalOpen}
            onClose={() => setDigitalLockModalOpen(false)}
            onSuccess={refresh}
          />

        </div>
      </div>
    </main>
  );
}
