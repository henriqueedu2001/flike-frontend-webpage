## Lista de Páginas (Resumo)

1. [X] **Página Inicial** – Apresentação institucional e portal para login/cadastro.
2. [X] **Login** – Autenticação de usuários existentes.
3. [X] **Cadastro** – Criação de nova conta de usuário.
4. [ ] **Dashboard do Cliente** – Visão geral das chaves ativas e atalho para solicitar acesso.
5. [ ] **Busca e Solicitação de Acesso** – Localização hierárquica de salas e emissão de chave digital.
6. [ ] **Tela de Acesso (QR Code)** – Exibição do QR Code para leitura na fechadura.
7. [ ] **Dashboard do Administrador** – CRUD de instituições, edifícios, salas e fechaduras.
8. [ ] **Gestão de Usuários e Chaves** – Emissão/revogação de chaves e listagem de clientes.
9. [ ] **Perfil e Configurações** – Alteração de dados pessoais e preferências de acessibilidade.

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
  - `POST /auth/user` – Recebe `email` e `password`; retorna `access_token` (JWT).

---

### 3. Cadastro (signup_page)
- **URL**: `/signup`
- **Descrição geral**: Formulário para criação de nova conta (nome, e-mail, senha, confirmação de senha).
- **Funcionalidades/Proposta**: Após o cadastro, o usuário é redirecionado para o login. Por padrão, todo novo usuário nasce como "cliente".
- **Endpoints Sugeridos**:
  - `POST /user/new` – Recebe `name`, `email`, `password`; retorna `id` do usuário criado.

---

### 4. Dashboard do Cliente (client_dashboard)
- **URL**: `/dashboard`
- **Descrição geral**: Tela principal do usuário final. Exibe as chaves digitais ativas em cards e um botão de destaque para solicitar novo acesso.
- **Funcionalidades/Proposta**: Cada card mostra Sala, Prédio, status ("Pronta para uso" / "Já utilizada") e horário de expiração. Ao clicar na chave, redireciona para `/acesso/{key_id}`.
- **Endpoints Sugeridos**:
  - `GET /user?id={id}` – Retorna dados do usuário logado.
  - `GET /digital_key?id={id}` – Lista todas as chaves digitais do usuário.

---

### 5. Busca e Solicitação de Acesso (search_request_page)
- **URL**: `/acesso/solicitar`
- **Descrição geral**: Permite ao cliente encontrar uma sala por busca textual ou navegação hierárquica (Instituição > Edifício > Sala) e solicitar a chave.
- **Funcionalidades/Proposta**: Campo de busca com autocompletar. Ao selecionar a sala, exibe detalhes e botão "Solicitar Chave". Após a solicitação, redireciona para `/acesso/{nova_key_id}`.
- **Endpoints Sugeridos**:
  - `GET /institutions/search?q={query}` – Lista instituições compatíveis com uma query.
  - `GET /buildings/search?q={query}` – Lista edifícios de uma instituição compatíveis com uma query.
  - `GET /rooms/search?q={query}` – Lista salas de um edifício compatíveis com uma query.
  - `GET /digital_lock?room_id={room_id}` – Lista as trancas de um edifício. Na maioria dos casos, há somente uma tranca.
  - `POST /digital_key/request` – Recebe `user_id` (do token) e `lock_id`; cria uma request para o administrador do espaço.

---

### 6. Tela de Acesso (access_page)
- **URL**: `/acesso/{key_id}`
- **Descrição geral**: Exibição do QR Code gigante e do código alfanumérico para leitura na câmera da fechadura (ESP32-CAM).
- **Funcionalidades/Proposta**: Mostra dados da sala, horário de expiração e status (válido/já usado). Fundo branco puro para facilitar a leitura ótica.
- **Endpoints Sugeridos**:
  - `GET /digital_key?key_id={key_id}` – Retorna os dados da chave (`payload` para gerar o QR Code, `expires_at`, `used`, e dados da `Room/Lock`).

---

### 7. Dashboard do Administrador (admin_dashboard)
- **URL**: `/admin/infra`
- **Descrição geral**: Interface para CRUD (criar, listar, editar, deletar) de Instituições, Edifícios, Salas e Fechaduras. Visualização de métricas das salas. Visualização dos logs das trancas.
- **Funcionalidades/Proposta**: Organizada em abas ou steps hierárquicos. Formulários com campos correspondentes ao modelo de dados (ex: `address_line_1`, `city` para edifícios; `status` e `secret_key` para fechaduras).
- **Endpoints Sugeridos**:
  - **Instituições**: `GET /admin/institutions`, `POST /admin/institutions`, `PUT /admin/institutions/{id}`, `DELETE /admin/institutions/{id}`.
  - **Edifícios**: `GET /admin/buildings`, `POST /admin/buildings`, `PUT /admin/buildings/{id}`, `DELETE /admin/buildings/{id}`.
  - **Salas**: `GET /admin/rooms`, `POST /admin/rooms`, `PUT /admin/rooms/{id}`, `DELETE /admin/rooms/{id}`.
  - **Fechaduras**: `GET /admin/locks`, `POST /admin/locks`, `PUT /admin/locks/{id}`, `DELETE /admin/locks/{id}`.

---

### 8. Gestão de Chaves (keys_management_page)
- **URL**: `/admin/keys`
- **Descrição geral**: Dashboard com a administração das chaves, tanto emissão para usuários específicos, quanto aceitação/rejeição de pedidos de acesso.
- **Funcionalidades/Proposta**: Visualização dos pedidos de acesso, aceitação/rejeição de pedidos, emissão de chaves para um cliente.
- **Endpoints Sugeridos**:
  - `POST /admin/keys/issue` – Recebe `user_id`, `lock_id`, `expires_at` (opcional); retorna chave criada.

---

### 9. Perfil e Configurações (profile_page)
- **URL**: `/perfil`
- **Descrição geral**: Exibição e edição dos dados do usuário logado (nome, e-mail, alteração de senha).
- **Funcionalidades/Proposta**: Para administradores, opção de "Alternar para visualização de cliente" (útil para testes). Preferências de acessibilidade (ex: modo de alto contraste) são ajustadas aqui.
- **Endpoints Sugeridos**:
  - `GET /user/me` – Retorna dados atuais.
  - `PUT /user/me` – Atualiza `name` e `email`.
  - `POST /user/change-password` – Recebe `current_password` e `new_password`.