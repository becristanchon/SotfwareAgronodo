# Setup PostgreSQL Local

## Objetivo

Preparar AgroNodo para persistencia real sin romper la demo actual con datos simulados.

## Requisitos

- Node.js instalado.
- npm instalado.
- Docker Desktop instalado y en ejecucion.

## Variables de Entorno

Crea `.env` usando `.env.example` como base:

```txt
DATABASE_URL="postgresql://agronodo:agronodo@localhost:5432/agronodo?schema=public"
AGRONODO_AUTH_SECRET="change-this-before-production"
```

## Comandos

Levantar PostgreSQL:

```bash
npm run db:up
```

Crear migracion y tablas:

```bash
npm run prisma:migrate
```

Cargar datos demo:

```bash
npm run prisma:seed
```

Abrir Prisma Studio:

```bash
npm run prisma:studio
```

Apagar PostgreSQL:

```bash
npm run db:down
```

## Usuario Demo

```txt
Email: admin@agronodo.local
Password: agronodo-demo
```

## Decision CTO

La UI sigue leyendo datos demo tipados por ahora. Esta capa de PostgreSQL queda lista para el siguiente incremento: conectar APIs y pantallas a Prisma de forma gradual, empezando por productores, fincas y lotes.
