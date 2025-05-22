# 💻 Projeto: Microfrontends com React + Node.js

Este repositório implementa uma arquitetura baseada em **microfrontends com React e single-spa**, além de um **backend em Node.js** para autenticação e transações. O projeto é totalmente containerizado com **Docker**, com suporte para **ambiente de desenvolvimento com hot reload** e produção.

---

## 🎯 Requisitos do Desafio e Como Foram Atendidos

| Requisito                                                       | Implementação                                                             | Local no Código                                                                                |
| --------------------------------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Arquitetura modular / microfrontends**                        | Cada domínio como micro‑app registrado no single‑spa                      | `orchestrator/root-config/src/index.js`                                                        |
| **State Management Pattern avançado**                           | Context API + `useReducer` no Auth e cache automático com **React‑Query** | `auth/src/presentation/context/AuthContext.tsx`, `dashboard/src/infrastructure/queryClient.ts` |
| **Clean Architecture (presentation / domain / infrastructure)** | Separação por camadas e responsabilidades em todos os MFEs                | Ex: `auth/src/domain/entities/User.ts`, `auth/src/domain/usecases/AuthenticateUser.ts`         |
| **Lazy loading & pré‑carregamento**                             | `React.lazy` com `webpackPrefetch: true`                                  | `dashboard/src/routes/index.tsx`                                                               |
| **Armazenamento em cache**                                      | `QueryClient` com `staleTime` e `cacheTime`                               | `dashboard/src/infrastructure/queryClient.ts`                                                  |
| **Programação reativa**                                         | Hooks personalizados com **RxJS**                                         | `dashboard/src/infrastructure/observables/useObservable.ts`                                    |
| **Autenticação segura (JWT)**                                   | Backend assina e valida tokens JWT                                        | `backend/src/controllers/authController.js`                                                    |
| **Criptografia de dados sensíveis**                             | Senhas com hash via **bcrypt**                                            | `backend/src/models/userModel.js`                                                              |
| **Segurança HTTP**                                              | Middleware **Helmet** + política de CORS restritiva                       | `backend/src/app.js`, `backend/src/config/cors.js`                                             |
| **Otimização de assets para produção**                          | `Dockerfile` multistage (builder → nginx) por microfrontend               | `auth/Dockerfile`, `dashboard/Dockerfile`, `notfound/Dockerfile`                               |

---

## 📁 Estrutura do Projeto

```txt
├── README.md
├── auth/               # Microfrontend de Autenticação (porta 8500)
├── backend/            # Backend em Node.js (porta 3000)
├── dashboard/          # Microfrontend do Dashboard (porta 8501)
├── notfound/           # Microfrontend de página 404 (porta 8502)
├── orchestrator/       # Configuração do single-spa root-config (porta 9000)
├── docker-compose.yml             # Ambiente de produção
├── docker-compose.dev.yml        # Ambiente de desenvolvimento (hot reload)
└── tasks/             # Configurações de tarefas por módulo
```

---

## 🚀 Como Executar o Projeto

### ✅ Pré-requisitos

- [Node.js 18+](https://nodejs.org/)
- [Docker + Docker Compose](https://www.docker.com/)
- [Git](https://git-scm.com/)

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Executar com Docker (Produção)

```bash
docker-compose up --build
```

### 3. Executar com Docker (Desenvolvimento com Hot Reload)

```bash
docker-compose -f docker-compose.dev.yml up
```

### 4. Executar Localmente Sem Docker

Execute cada módulo em terminais separados:

#### Backend

```bash
cd backend
npm install
node app.js
```

#### Auth (porta 8500)

```bash
cd auth
npm install
npm start -- --port 8500
```

#### Dashboard (porta 8501)

```bash
cd dashboard
npm install
npm start -- --port 8501
```

#### NotFound (porta 8502)

```bash
cd notfound
npm install
npm start -- --port 8502
```

#### Orchestrator (porta 9000)

```bash
cd orchestrator
npm install
npm start
```

---

## 📦 Tecnologias Utilizadas

### Frontend (por microfrontend)

- **React + TypeScript**
- **Single-SPA**
- **Webpack 5** com `webpack-config-single-spa`
- **Husky**, **Prettier**, **ESLint**
- **Jest** + **Testing Library**

### Backend

- **Node.js + Express**
- **JWT**
- **bcrypt**, **Cors**, **body-parser**
- **JSON Server**

---

## 🧪 Qualidade de Código e Testes

- `npm run lint` — verificação de estilo
- `npm run format` — formatação com Prettier
- `npm run test` — execução dos testes
- `npm run coverage` — cobertura de testes
- Husky para hooks: pré-commit, commit-msg etc.

---

## 🧰 Scripts Úteis

| Comando                           | Descrição                            |
| --------------------------------- | ------------------------------------ |
| `start`                           | Inicia com hot reload                |
| `start:standalone`                | Executa microfrontend isoladamente   |
| `lint`                            | Verifica padrões de código           |
| `format`                          | Formata com Prettier                 |
| `test`, `coverage`, `watch-tests` | Testes com cobertura e modo watch    |
| `build`, `build:types`            | Build de produção e geração de tipos |

---

## 📌 Observações

- Cada módulo é independente e segue convenções consistentes para facilitar manutenção e onboarding.
- Os `Dockerfile`s e `webpack.config.js` são individualizados por microfrontend para garantir isolamento completo.
