## Lista de Páginas (Resumo)

1. **Página Inicial** – Apresentação institucional e portal para login/cadastro.
2. **Login** – Autenticação de usuários existentes.
3. **Cadastro** – Criação de nova conta de usuário.
4. **Dashboard do Cliente** – Visão geral das chaves ativas e atalho para solicitar acesso.
5. **Busca e Solicitação de Acesso** – Localização hierárquica de salas e emissão de chave digital.
6. **Tela de Acesso (QR Code)** – Exibição do QR Code para leitura na fechadura.
7. **Histórico do Cliente** – Registro das tentativas de acesso do usuário logado.
8. **Dashboard do Administrador** – Painel estatístico e atalhos para gestão do sistema.
9. **Gestão de Infraestrutura** – CRUD de instituições, edifícios, salas e fechaduras.
10. **Gestão de Usuários e Chaves** – Emissão/revogação de chaves e listagem de clientes.
11. **Log Completo do Sistema** – Auditoria de todos os eventos de todas as fechaduras.
12. **Perfil e Configurações** – Alteração de dados pessoais e preferências de acessibilidade.

---

## Detalhamento por Página

### 1. Página Inicial (landing_page)
- **URL**: `/`
- **Descrição geral**: Porta de entrada pública do sistema. Apresenta o propósito do FLIKE, a localização (Faculdade de Direito da USP) e os botões de navegação para login e cadastro.
- **Funcionalidades/Proposta**: Sem distrações (sem animações, vídeos ou pop-ups). Informações estáticas e objetivas sobre o espaço de amamentação/regulação sensorial.
- **Endpoints Sugeridos**:
  - Nenhum endpoint específico (página estática). Apenas links para `/login` e `/signup`.

---

### 2. Login (login_page)
- **URL**: `/login`
- **Descrição geral**: Formulário para autenticação de usuários com e-mail e senha.
- **Funcionalidades/Proposta**: Redireciona para `/dashboard` (cliente) ou `/admin` (administrador) conforme o `type` do usuário. Possui link para recuperação de senha.
- **Endpoints Sugeridos**:
  - `POST /auth/login` – Recebe `email` e `password`; retorna `access_token` (JWT) e `user_type`.

---

### 3. Cadastro (signup_page)
- **URL**: `/signup`
- **Descrição geral**: Formulário para criação de nova conta (nome, e-mail, senha, confirmação de senha).
- **Funcionalidades/Proposta**: Após o cadastro, o usuário é redirecionado para o login. Por padrão, todo novo usuário nasce como "cliente".
- **Endpoints Sugeridos**:
  - `POST /auth/signup` – Recebe `name`, `email`, `password`; retorna `id` do usuário criado.

---

### 4. Dashboard do Cliente (client_dashboard)
- **URL**: `/dashboard`
- **Descrição geral**: Tela principal do usuário final. Exibe as chaves digitais ativas em cards e um botão de destaque para solicitar novo acesso.
- **Funcionalidades/Proposta**: Cada card mostra Sala, Prédio, status ("Pronta para uso" / "Já utilizada") e horário de expiração. Ao clicar na chave, redireciona para `/acesso/{key_id}`.
- **Endpoints Sugeridos**:
  - `GET /user/me` – Retorna dados do usuário logado.
  - `GET /user/keys/active` – Lista todas as `DigitalKey` ativas do usuário (com dados da `Room` e `Building` aninhados).

---

### 5. Busca e Solicitação de Acesso (search_request_page)
- **URL**: `/solicitar`
- **Descrição geral**: Permite ao cliente encontrar uma sala por busca textual ou navegação hierárquica (Instituição > Edifício > Sala) e solicitar a chave em 2 cliques.
- **Funcionalidades/Proposta**: Campo de busca com autocompletar. Ao selecionar a sala, exibe detalhes e botão "Solicitar Chave". Após a solicitação, redireciona para `/acesso/{nova_key_id}`.
- **Endpoints Sugeridos**:
  - `GET /search?q={texto}` – Busca global por nome de instituição, edifício ou sala.
  - `GET /institutions` – Lista todas as instituições.
  - `GET /buildings?institution_id={id}` – Lista edifícios de uma instituição.
  - `GET /rooms?building_id={id}` – Lista salas de um edifício (com o `digital_lock_id` associado).
  - `POST /key/request` – Recebe `user_id` (do token) e `lock_id`; retorna a `DigitalKey` criada (com `id`, `expiration`, `payload`).

---

### 6. Tela de Acesso (access_page)
- **URL**: `/acesso/{key_id}`
- **Descrição geral**: Exibição do QR Code gigante e do código alfanumérico para leitura na câmera da fechadura (ESP32-CAM).
- **Funcionalidades/Proposta**: Mostra dados da sala, horário de expiração e status (válido/já usado). Fundo branco puro para facilitar a leitura ótica. Botão "Atualizar" para reexibir o QR.
- **Endpoints Sugeridos**:
  - `GET /key/{id}` – Retorna os dados da chave (`payload` para gerar o QR Code, `expires_at`, `used`, e dados da `Room/Lock`).
  - `GET /key/{id}/status` – Verifica se a chave ainda é válida (usado para atualização em tempo real, se necessário).

---

### 7. Histórico do Cliente (client_history_page)
- **URL**: `/historico`
- **Descrição geral**: Tabela com todas as tentativas de acesso do usuário logado.
- **Funcionalidades/Proposta**: Colunas: Data/Hora, Sala, Tipo (abertura/tentativa inválida), Sucesso (sim/não) e Detalhes (motivo da falha). Filtros por período e status.
- **Endpoints Sugeridos**:
  - `GET /user/history` – Retorna lista de `EventLog` filtrados pelo `user_id` (via token), com dados da `DigitalLock` e `Room`.

---

### 8. Dashboard do Administrador (admin_dashboard)
- **URL**: `/admin`
- **Descrição geral**: Painel de controle com estatísticas gerais e atalhos para as funções de gestão.
- **Funcionalidades/Proposta**: Cards com totais (salas, fechaduras ativas, chaves emitidas no dia, taxa de sucesso). Feed com os últimos eventos (atualizável via botão). Acesso rápido a `/admin/infra`, `/admin/usuarios` e `/admin/logs`.
- **Endpoints Sugeridos**:
  - `GET /admin/stats` – Retorna métricas (total de locks, keys emitidas hoje, sucess rate, etc.).
  - `GET /admin/recent-events?limit=10` – Retorna os últimos `EventLog`.

---

### 9. Gestão de Infraestrutura (infra_management_page)
- **URL**: `/admin/infra`
- **Descrição geral**: Interface para CRUD (criar, listar, editar, deletar) de Instituições, Edifícios, Salas e Fechaduras.
- **Funcionalidades/Proposta**: Organizada em abas ou steps hierárquicos. Formulários com campos correspondentes ao modelo de dados (ex: `address_line_1`, `city` para edifícios; `status` e `secret_key` para fechaduras).
- **Endpoints Sugeridos**:
  - **Instituições**: `GET /admin/institutions`, `POST /admin/institutions`, `PUT /admin/institutions/{id}`, `DELETE /admin/institutions/{id}`.
  - **Edifícios**: `GET /admin/buildings`, `POST /admin/buildings`, `PUT /admin/buildings/{id}`, `DELETE /admin/buildings/{id}`.
  - **Salas**: `GET /admin/rooms`, `POST /admin/rooms`, `PUT /admin/rooms/{id}`, `DELETE /admin/rooms/{id}`.
  - **Fechaduras**: `GET /admin/locks`, `POST /admin/locks`, `PUT /admin/locks/{id}`, `DELETE /admin/locks/{id}`.

---

### 10. Gestão de Usuários e Chaves (user_key_management_page)
- **URL**: `/admin/usuarios`
- **Descrição geral**: Lista de todos os usuários cadastrados e emissão/revogação manual de chaves.
- **Funcionalidades/Proposta**: Busca por usuário. Ao selecionar um cliente, o admin pode emitir uma chave para uma fechadura específica (com expiração personalizável) ou revogar uma chave ativa.
- **Endpoints Sugeridos**:
  - `GET /admin/users` – Lista todos os usuários (com `type`).
  - `GET /admin/users/{id}/keys` – Lista chaves ativas de um usuário específico.
  - `POST /admin/keys/issue` – Recebe `user_id`, `lock_id`, `expires_at` (opcional); retorna chave criada.
  - `DELETE /admin/keys/revoke/{key_id}` – Revoga (marca como used ou deleta logicamente) a chave.

---

### 11. Log Completo do Sistema (system_log_page)
- **URL**: `/admin/logs`
- **Descrição geral**: Auditoria completa contendo todos os registros de `EventLog` de todas as fechaduras.
- **Funcionalidades/Proposta**: Tabela com colunas: ID, Fechadura, Tipo, Log (texto), Timestamp. Filtros por fechadura específica, tipo de evento e intervalo de datas.
- **Endpoints Sugeridos**:
  - `GET /admin/eventlogs` – Lista todos os logs, com suporte a query params `lock_id`, `type`, `start_date`, `end_date`, `limit`, `offset`.

---

### 12. Perfil e Configurações (profile_page)
- **URL**: `/perfil`
- **Descrição geral**: Exibição e edição dos dados do usuário logado (nome, e-mail, alteração de senha).
- **Funcionalidades/Proposta**: Para administradores, opção de "Alternar para visualização de cliente" (útil para testes). Preferências de acessibilidade (ex: modo de alto contraste) são ajustadas aqui.
- **Endpoints Sugeridos**:
  - `GET /user/me` – Retorna dados atuais.
  - `PUT /user/me` – Atualiza `name` e `email`.
  - `POST /user/change-password` – Recebe `current_password` e `new_password`.