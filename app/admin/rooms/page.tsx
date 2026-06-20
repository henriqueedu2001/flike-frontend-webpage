import InstitutionsTable from "@/components/InstitutionsTable";
import BuildingsTable from "@/components/BuildingsTable";
import RoomsTable from "@/components/RoomsTable";

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Painel Administrativo</h1>
      <div className="content-padding">

        <div className="page-title">
          <h2>Instituições</h2>
          <button className="btn-action success">
            + Nova Instituição
          </button>
        </div>

        <InstitutionsTable />

        <div style={{ height: "30px" }} />

        <div className="page-title">
          <h2>Prédios</h2>
          <button className="btn-action success">
            + Novo Prédio
          </button>
        </div>

        <BuildingsTable />

        <div style={{ height: "30px" }} />

        <div className="page-title">
          <h2>Salas</h2>
          <button className="btn-action success">
            + Nova Sala 
          </button>
        </div>

        <RoomsTable />

      </div>
    </main>
  );
}
