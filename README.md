<img src="https://github.com/daniel-barbosaa/fincheck-frontend/blob/main/src/assets/Logo.svg" width="300px" height="300px" align="right"/>

# Fincheck API

![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-336791?logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

_API responsável por toda a lógica de negócio, autenticação e persistência de dados do Fincheck._

## Sobre o projeto

A **Fincheck API** é o backend do aplicativo Fincheck, responsável por
gerenciar usuários, autenticação, contas bancárias, transações financeiras
e fornecer dados consolidados para o dashboard.

A aplicação foi desenvolvida com foco em:

- Arquitetura modular
- Separação clara de responsabilidades
- Segurança
- Facilidade de manutenção e escalabilidade

🔗 **API em produção:**  
A API está publicada e é consumida diretamente pelo frontend.

> ⚠️ A maioria das rotas requer autenticação via JWT.

## Funcionalidades

- Cadastro e autenticação de usuários (JWT)
- Gerenciamento de contas bancárias
- CRUD de despesas e receitas
- Consolidação de dados financeiros
- Filtros por período e tipo de transação
- Validação de dados com schemas
- Documentação automática com Swagger

## Tecnologias utilizadas

- **Node.js**
- **TypeScript**
- **NestJS**
- **Prisma ORM**
- **PostgreSQL**
- **JWT**
- **Zod**
- **Swagger**
- **Docker**

## Como rodar o projeto

### Pré-requisitos

- Node.js 20+
- Docker e Docker Compose
- Yarn ou npm

> ⚠️ Caso não tenha o Docker e o Node.js instalados,
> instale-os antes de prosseguir, pois sem eles
> não será possível rodar a aplicação.

Guias de instalação:

- [Instalar Node.js](https://www.youtube.com/watch?v=VYo7hV7ua0c)
- [Instalar Docker](https://www.youtube.com/watch?v=qrvx6ivyrQw)

### Passos

```bash
# Clone o repositório
git clone https://github.com/daniel-barbosaa/fincheck-backend

# Acesse a pasta
cd fincheck-backend
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Variáveis ​​ambientais para o desenvolvimento local

JWT_SECRET=supersecretkey

# API
API_BASE_URL=http://localhost
API_PORT=3333

# Database
DB_HOST=localhost
DB_USER=fincheck_user
DB_PASSWORD=fincheck_password
DB_PORT=5432
DB_NAME=fincheck
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public"

# CORS origin
CORS_ORIGIN=http://localhost:*
```

### Subindo o banco e executando a aplicação

```bash
# Instala as dependências do projeto
yarn install

# Sobe os serviços necessários (PostgreSQL via Docker)
yarn services:up

# Executa as migrations do banco de dados
yarn migrate:dev

# Popula o banco com dados iniciais (seed)
yarn seed

# Inicia a aplicação em modo desenvolvimento
yarn dev
```

### A aplicação estará disponivel em:

[http://localhost:3333](http://localhost:3333)

### Documentação do swagger:

[http://localhost:3333/swagger](http://localhost:3333/swagger)

## Estrutura de pastas

A estrutura do projeto segue uma arquitetura modular,
facilitando a escalabilidade e manutenção do código.

```txt
src/
├─ modules/        # Módulos de domínio da aplicação
│  ├─ auth/
│  ├─ users/
│  ├─ bank-accounts/
│  ├─ transactions/
│  └─ categories/
│     ├─ dto/
│     ├─ entities/
│     └─ services/
│
├─ shared/         # Recursos compartilhados
│  ├─ config/      # Configurações globais
│  ├─ database/    # Prisma / conexão com banco
│  ├─ pipes/       # Pipes globais
│  └─ decorators/  # Decorators customizados
│
├─ swagger/        # Configuração da documentação
│  └─ setup.ts
│
└─ main.ts         # Bootstrap da aplicação
```

Cada módulo segue o mesmo padrão interno:
DTOs para validação, Entities para o domínio
e Services para as regras de negócio.
