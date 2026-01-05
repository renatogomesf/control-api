# control-api

API para um aplicativo de controle financeiro.

Este repositório contém uma API REST escrita em TypeScript.

**O que faz:**

-   **Resumo:** Fornece endpoints para gerenciar receitas, despesas, metas e transferências.
-   **Documentação:** Disponível via Swagger UI para testar endpoints.

**Arquivos importantes:**

-   **Código do servidor:**: [src/server.ts](src/server.ts)
-   **Configuração Docker Compose:**: [docker-compose.yml](docker-compose.yml)
-   **Modelo de variáveis de ambiente:**: [CONFIG.env](CONFIG.env)
-   **Spec Swagger:**: [swagger.json](swagger.json)

**Pré-requisitos (muito simples):**

-   **Ter o Git instalado** para clonar o repositório.
-   **Ter o Docker e Docker Compose instalados** para rodar os serviços com facilidade.

Guia rápido (passo-a-passo)

1. Clonar o repositório

```bash
git clone https://github.com/renatogomesf/control-api.git
cd control-api
```

2. Preparar variáveis de ambiente

```env
==========1° - Remova "CONFIG" do arquivo "CONFIG.env==========
CONFIG.env --> .env

==========2° - Adicione os dados do banco de dados==========
(caso suba a api com docker, use o MYSQL_HOST como "db")
(caso rode a api localmente, use o MYSQL_HOST como "localhost")
MYSQL_HOST = ...

MYSQL_PORT = ...
MYSQL_PASSWORD = ...
MYSQL_DATABASE = ...

(mesma senha do MYSQL_PASSWORD)
(usado no container com o MySQL)
MYSQL_ROOT_PASSWORD = ...

DB_USER = ...

==========3° - Adicione os dados do servidor==========
SERVER_PORT = ...
SERVER_HOST = ...

==========4° - Crie uma chave jwt==========
JWT_KEY = ...
```

Salve como `.env` na raiz do projeto.

3. Subir Container com Docker Compose (recomendado)

```bash
docker compose up -d
```

**Ou**

```bash
npm run docker
```

-   **Parar e remover containers:**

```bash
docker compose down
```

Observação: o `docker-compose.yml` deste projeto mapeia a porta `3001` do host para a porta `3000` do container da API. Se você configurou o `.env` para rodar com docker, a documentação Swagger estará disponível em:

-   **Swagger UI (web):** http://localhost:3001/api-docs

4. Alternativa: rodar localmente sem Docker (desenvolvimento)

Se preferir rodar localmente (Node.js/TypeScript), instale dependências, faça as mudanças no `.env` e execute:

```bash
npm install
npm run dev
```

Por padrão o servidor irá escutar na porta informada em `.env` (veja `SERVER_PORT`) e o swagger usará essa mesma porta. Logo, http://localhost:`SERVER_PORT`/api-docs

Como usar o Swagger

-   Abra o navegador em http://localhost:3001/api-docs (caso use container docker)
-   Localmente, use a porta definida http://localhost:`SERVER_PORT`/api-docs
-   A interface permite ver os endpoints, exemplos de request/response e testar as rotas diretamente.
