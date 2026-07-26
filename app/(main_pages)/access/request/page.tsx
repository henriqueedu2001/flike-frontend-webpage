"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAdminData } from "@/hooks/useAdminData";
import { useAccessRequest } from "@/hooks/useAccessRequest";
import SelectableTable from "@/components/SelectableTable";
import { Institution } from "@/types/institution";
import { Building } from "@/types/building";
import { Room } from "@/types/room";

export default function Page() {
  const router = useRouter();

  const {
    institutions,
    buildings,
    rooms,
    loading: dataLoading,
    error: dataError,
  } = useAdminData();

  const {
    institution,
    selectInstitution,
    clearInstitution,
    building,
    selectBuilding,
    clearBuilding,
    room,
    selectRoom,
    clearRoom,
    lock,
    lockLoading,
    lockError,
    requesting,
    requestError,
    requestSuccess,
    requestKey,
  } = useAccessRequest();

  const [institutionQuery, setInstitutionQuery] = useState("");
  const [buildingQuery, setBuildingQuery] = useState("");
  const [roomQuery, setRoomQuery] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    if (!requestSuccess) return;

    const timer = setTimeout(() => router.push("/dashboard"), 1800);
    return () => clearTimeout(timer);
  }, [requestSuccess, router]);

  function handleSelectInstitution(next: Institution) {
    selectInstitution(next);
    setBuildingQuery("");
    setRoomQuery("");
  }

  function handleClearInstitution() {
    clearInstitution();
    setBuildingQuery("");
    setRoomQuery("");
  }

  function handleSelectBuilding(next: Building) {
    selectBuilding(next);
    setRoomQuery("");
  }

  function handleClearBuilding() {
    clearBuilding();
    setRoomQuery("");
  }

  const filteredInstitutions = institutions.filter((item) =>
    item.name.toLowerCase().includes(institutionQuery.toLowerCase())
  );

  const filteredBuildings = buildings
    .filter((item) => !institution || item.institution_id === institution.id)
    .filter((item) =>
      item.name.toLowerCase().includes(buildingQuery.toLowerCase())
    );

  const filteredRooms = rooms
    .filter((item) => !building || item.building_id === building.id)
    .filter((item) =>
      item.name.toLowerCase().includes(roomQuery.toLowerCase())
    );

  return (
    <main className="p-6">
      <div className="page-margin">
        <h1 className="text-3xl font-bold">Solicitar Acesso</h1>
        <p>Encontre a sala pela instituição, prédio e nome da sala.</p>

        <div className="content-padding">
          {requestSuccess ? (
            <div className="success-banner">
              Solicitação enviada! Aguarde a aprovação do administrador do
              espaço. Redirecionando para o dashboard...
            </div>
          ) : dataLoading ? (
            <p>Carregando...</p>
          ) : dataError ? (
            <p style={{ color: "red" }}>{dataError}</p>
          ) : (
            <>
              <div className="access-search-steps">
                <div className="access-search-step">
                  <label className="modal-label">Instituição</label>

                  <input
                    type="text"
                    className="modal-input"
                    placeholder="Buscar instituição..."
                    value={institutionQuery}
                    onChange={(e) => setInstitutionQuery(e.target.value)}
                  />

                  {institution && (
                    <button
                      type="button"
                      className="search-select-chip-clear"
                      onClick={handleClearInstitution}
                    >
                      Limpar seleção
                    </button>
                  )}

                  <SelectableTable<Institution>
                    items={filteredInstitutions}
                    getKey={(item) => item.id}
                    selectedKey={institution?.id ?? null}
                    onSelect={handleSelectInstitution}
                    emptyMessage="Nenhuma instituição encontrada."
                    columns={[
                      { header: "Nome", render: (item) => item.name },
                    ]}
                  />
                </div>

                <div className="access-search-step">
                  <label className="modal-label">Prédio</label>

                  <input
                    type="text"
                    className="modal-input"
                    placeholder="Buscar prédio..."
                    value={buildingQuery}
                    onChange={(e) => setBuildingQuery(e.target.value)}
                  />

                  {building && (
                    <button
                      type="button"
                      className="search-select-chip-clear"
                      onClick={handleClearBuilding}
                    >
                      Limpar seleção
                    </button>
                  )}

                  <SelectableTable<Building>
                    items={filteredBuildings}
                    getKey={(item) => item.id}
                    selectedKey={building?.id ?? null}
                    onSelect={handleSelectBuilding}
                    emptyMessage="Nenhum prédio encontrado."
                    columns={[
                      { header: "Nome", render: (item) => item.name },
                      { header: "Cidade", render: (item) => item.city },
                    ]}
                  />
                </div>

                <div className="access-search-step">
                  <label className="modal-label">Sala</label>

                  <input
                    type="text"
                    className="modal-input"
                    placeholder="Buscar sala..."
                    value={roomQuery}
                    onChange={(e) => setRoomQuery(e.target.value)}
                  />

                  {room && (
                    <button
                      type="button"
                      className="search-select-chip-clear"
                      onClick={clearRoom}
                    >
                      Limpar seleção
                    </button>
                  )}

                  <SelectableTable<Room>
                    items={filteredRooms}
                    getKey={(item) => item.id}
                    selectedKey={room?.id ?? null}
                    onSelect={selectRoom}
                    emptyMessage="Nenhuma sala encontrada."
                    columns={[
                      { header: "Nome", render: (item) => item.name },
                      { header: "Número", render: (item) => item.number },
                    ]}
                  />
                </div>
              </div>

              {room && (
                <div className="room-details-card">
                  <h2>{room.name}</h2>
                  <p>Número: {room.number}</p>
                  <p>
                    {building?.name} — {institution?.name}
                  </p>

                  {lockLoading && <p>Verificando fechadura da sala...</p>}

                  {!lockLoading && lockError && (
                    <p style={{ color: "red" }}>{lockError}</p>
                  )}

                  {!lockLoading && requestError && (
                    <p style={{ color: "red" }}>{requestError}</p>
                  )}

                  {!lockLoading && lock && (
                    <button
                      className="btn-action success"
                      disabled={requesting}
                      onClick={requestKey}
                    >
                      {requesting ? "Solicitando..." : "Solicitar Chave"}
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
