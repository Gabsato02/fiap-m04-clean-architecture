# 💻 Projeto: Microfrontends com React + Node.js

Este repositório implementa uma arquitetura baseada em **microfrontends com React e single-spa**, além de um **backend em Node.js** para autenticação e transações. O projeto é totalmente containerizado com **Docker**, com suporte para **ambiente de desenvolvimento com hot reload** e produção.

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
├── tasks/             # Configurações de tarefas por módulo
├── startall.bat       # Script para iniciar todos os módulos (Windows)
├── tree.txt           # Estrutura gerada do projeto
└── treeView.py        # Script Python para geração da tree view
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

### 2. Rodar com Docker (Produção)

```bash
docker-compose up --build
```

### 3. Rodar com Docker (Desenvolvimento com Hot Reload)

```bash
docker-compose -f docker-compose.dev.yml up
```

### 4. Rodar Localmente Sem Docker

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
- **Single-SPA**: para orquestração dos microfrontends
- **Webpack 5** + `webpack-config-single-spa`
- **Husky** + **Prettier** + **ESLint**: para qualidade de código
- **Jest** + **Testing Library**: para testes

### Backend

- **Node.js + Express**
- **JWT (jsonwebtoken)** para autenticação
- **Cors**, **body-parser**
- **JSON Server** (mock de banco de dados)

---

## 🧪 Qualidade de Código e Testes

- **Lint:** `npm run lint`
- **Format:** `npm run format`
- **Testes:** `npm run test`
- **Coverage:** `npm run coverage`
- **Hooks com Husky:** pré-commit, commit-msg e mais

---

## 🧰 Scripts Úteis

| Comando                           | Descrição                                 |
| --------------------------------- | ----------------------------------------- |
| `start`                           | Inicia o módulo com hot reload            |
| `start:standalone`                | Inicia isoladamente o microfrontend       |
| `lint`                            | Verifica padrões de código                |
| `format`                          | Aplica formatação com Prettier            |
| `test`, `coverage`, `watch-tests` | Executa testes com cobertura ou em watch  |
| `build`, `build:types`            | Gera build de produção e tipos TypeScript |

---

## 🎯 Atendendo aos Requisitos do Desafio

| Requisito do Desafio                                            | Como foi atendido                                                                                  | Onde no Código                                                                                  |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Arquitetura modular / microfrontends**                        | Cada domínio exposto como micro‑app registrado no single‑spa                                       | `orchestrator/root-config/src/index.js`                                                         |
| **State Management Pattern avançado**                           | Context API + `useReducer` no Auth e cache automático com **React‑Query**                          | `auth/src/presentation/context/AuthContext.tsx` & `dashboard/src/infrastructure/queryClient.ts` |
| **Clean Architecture (presentation / domain / infrastructure)** | Pastas `presentation`, `domain`, `infrastructure` em todos os MFEs; entidades e use‑cases isolados | Ex.: `auth/src/domain/entities/User.ts`, `auth/src/domain/usecases/AuthenticateUser.ts`         |
| **Lazy loading & pré‑carregamento**                             | Importação dinâmica (`React.lazy`) com `webpackPrefetch: true`                                     | `dashboard/src/routes/index.tsx`                                                                |
| **Armazenamento em cache**                                      | `QueryClient` configurado com `staleTime` e `cacheTime`                                            | `dashboard/src/infrastructure/queryClient.ts`                                                   |
| **Programação reativa**                                         | Hooks customizados baseados em **RxJS**                                                            | `dashboard/src/infrastructure/observables/useObservable.ts`                                     |
| **Autenticação segura (JWT)**                                   | Token assinado e verificado no backend                                                             | `backend/src/controllers/authController.js`                                                     |
| **Criptografia de dados sensíveis**                             | Hash da senha com **bcrypt** antes de persistir                                                    | `backend/src/models/userModel.js`                                                               |
| **Segurança HTTP**                                              | Middleware **Helmet** + CORS restrito                                                              | `backend/src/app.js` & `backend/src/config/cors.js`                                             |
| **Otimização de assets para produção**                          | `Dockerfile` multistage (builder → nginx) para cada MFE                                            | `auth/Dockerfile`, `dashboard/Dockerfile`, `notfound/Dockerfile`                                |

---

## 📌 Observações

- Todos os módulos seguem convenções semelhantes para facilitar o onboarding.
- Para garantir isolamento, cada microfrontend tem seu `Dockerfile` e `webpack.config.js` próprio.
