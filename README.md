# SaaS Backend – User & Role Management API

API REST profesional para gestión de usuarios y roles, construida con Node.js y enfocada en buenas prácticas de backend para producción.

## 🧩 Features

-   Autenticación JWT (access + refresh tokens)

-   Registro, login, refresh y logout

-   RBAC (roles y permisos)

-   CRUD de usuarios (solo ADMIN)

-   Endpoint de perfil /profile

-   Validaciones con Zod

-   Hash de passwords con bcrypt

-   Prisma ORM + PostgreSQL

-   Tests de integración (Jest + Supertest)

-   Dockerizado (API + DB)

-   Lista para deploy en AWS EC2

## 🛠️ Stack

-   Node.js + Express

-   TypeScript

-   PostgreSQL

-   Prisma ORM

-   JWT

-   Zod

-   bcrypt

-   Jest + Supertest

-   Docker / Docker Compose

## 🗂️ Estructura del proyecto

```bash
src/
├── config/ # Prisma, env, configuración
├── middlewares/ # auth, roles, validation
├── modules/
│ ├── auth/ # register, login, refresh, logout
│ └── users/ # profile + CRUD admin
├── utils/ # jwt helpers
├── types/ # extensiones de Express
├── app.ts
└── server.ts
tests/
docker-compose.yml
```

## 🔐 Autenticación

-   Access Token

-   JWT stateless

-   Expiración corta

-   Se envía por header Authorization: Bearer

-   Refresh Token

-   Persistido en base de datos

-   Revocable

-   Permite logout real y múltiples sesiones

## 🔑 Variables de entorno

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/saas
JWT_SECRET=super-secret
NODE_ENV=development
```

## 🐳 Docker

```bash
docker-compose up --build
```

## 🧪 Tests

```bash
npm run test
```

### Incluye tests para:

-   Auth (register, login, refresh, logout)
-   Perfil /me
-   CRUD de usuarios (ADMIN)

## 📦 Endpoints principales

#### Auth

-   POST /api/auth/register

-   POST /api/auth/login

-   POST /api/auth/refresh

-   POST /api/auth/logout

#### Users

-   GET /api/users/me

-   GET /api/users (ADMIN)

-   POST /api/users (ADMIN)

-   PUT /api/users/:id (ADMIN)

-   DELETE /api/users/:id (ADMIN)
