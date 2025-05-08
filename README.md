# Projeto FIAP M04 Clean Architecture

Este projeto contém a refarotação do projeto FIAP-M02 para Clean Architecture. Também foi revisado para melhorar a segurança do sistema. São quatro microfrontends desenvolvidos em React, além de um servidor backend simples utilizando `json-server`. Cada serviço é contido em uma pasta separada, e o projeto utiliza `Docker` e `Docker Compose` para orquestração e execução.

## Estrutura do Projeto

```
/fiap-m02-react-microfrontends (root)
├── fiap-m02-react-microfrontend-backend
│   ├── Dockerfile
│   └── db.json
├── fiap-m02-react-microfrontend-dashboard
│   ├── Dockerfile
│   └── (código React do dashboard)
├── fiap-m02-react-microfrontend-auth
│   ├── Dockerfile
│   └── (código React de autenticação)
├── fiap-m02-react-microfrontend-notfound
│   ├── Dockerfile
│   └── (código React de fallback de rotas)
├── fiap-m02-react-microfrontend-orchestrator
│   ├── Dockerfile
│   └── (código React do orchestrator)
└── docker-compose.yml
```

### Descrição dos Serviços

1. **Backend**
   - Local: `fiap-m02-react-microfrontend-backend`
   - Descrição: Servidor JSON utilizando `json-server`.
   - Porta: `3000`

2. **Dashboard**
   - Local: `fiap-m02-react-microfrontend-dashboard`
   - Descrição: Microfrontend em React que fornece o painel do dashboard.
   - Porta: `8501`

3. **Auth**
   - Local: `fiap-m02-react-microfrontend-auth`
   - Descrição: Microfrontend em React que gerencia autenticação e criação de usuário.
   - Porta: `8500`

4. **Not Found**
   - Local: `fiap-m02-react-microfrontend-notfound`
   - Descrição: Microfrontend em React para fallback de rotas.
   - Porta: `8500`

5. **Orchestrator**
   - Local: `fiap-m02-react-microfrontend-orchestrator`
   - Descrição: Microfrontend em React que orquestra os demais microfrontends.
   - Porta: `9000`

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados no seu sistema:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) (geralmente incluído com o Docker Desktop)

## Como Executar o Projeto

### 1. Clonar o Repositório

Clone este repositório e navegue até o diretório raiz:

```bash
git clone https://github.com/Gabsato02/fiap-m02-react-microfrontends
cd fiap-m02-react-microfrontends
```

### 2. Construir e Executar os Serviços

No diretório raiz, execute o seguinte comando para construir e subir os containers:

```bash
docker-compose up --build
```

Para desenvolvimento, dentro dos respectivos diretórios, execute o `npm install` e depois
os comandos para build local:

- **Backend**: `json-server --watch db.json --port 3000`
- **Dashboard**: `npm start -- --port 8501`
- **Auth**: `npm start -- --port 8500`
- **Not Found**: `npm start -- --port 8502`
- **Orchestrator**: `npm start`

### 3. Verificar os Serviços

Acesse os serviços nos seguintes endereços:

- **Backend**: [http://localhost:3000](http://localhost:3000)
- **Dashboard**: [http://localhost:8501](http://localhost:8501) ou [http://localhost:9000/dashboard](http://localhost:9000/dashboard)
- **Auth**: [http://localhost:8500](http://localhost:8500) ou [http://localhost:9000/login](http://localhost:9000/login)
- **Not Found**: [http://localhost:8502](http://localhost:8502) ou [http://localhost:9000/*](http://localhost:9000/*)
- **Orchestrator**: [http://localhost:9000](http://localhost:9000)

## Comandos Úteis

- **Parar os Serviços**:
  ```bash
  docker-compose down
  ```

- **Reiniciar os Serviços**:
  ```bash
  docker-compose up
  ```

- **Verificar Containers em Execução**:
  ```bash
  docker ps
  ```

- **Acessar Logs de um Serviço**:
  ```bash
  docker logs <nome-do-container>
  ```

## Notas

- Certifique-se de que as portas necessárias (`3000`, `8501`, `8500`, `9000`) estão livres no seu sistema.
- Se você encontrar problemas, entre em contato ou verifique os logs dos containers para identificar erros.
- Ao instalar uma dependência em um dos microfrontends, certifique-se de adicioná-la como dependência externa
nos arquivos de webpack, localmente via npm e também no `injector-importmap` do microfrontend orquestrador, no arquivo `index.ejs`
---

