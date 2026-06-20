import ListUsersTable from '@/components/UsersTable';


export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Gerenciar Usuários</h1>

      <div className="page-title">
        <h2>Usuários Cadastrados</h2>

        <button className="btn-action success">
          + Novo Usuário
        </button>
      </div>
      <ListUsersTable/>
    </main>
  );
}
