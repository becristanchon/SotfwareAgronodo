# Sprint 38 - Roles reales en Prisma

## Objetivo

Alinear el enum de roles de Prisma con los roles reales de experiencia de AgroNodo.

## Problema

Prisma todavia usaba:

- `ADMIN`
- `TECHNICIAN`
- `VIEWER`

Pero el producto ya opera con:

- Productor
- Tecnico de campo
- Agronomo
- Entidad territorial
- Administrador

Esta diferencia generaba una capa de traduccion temporal y podia causar inconsistencias al activar usuarios reales.

## Implementacion

- `prisma/schema.prisma`
  - `UserRole` ahora contiene:
    - `PRODUCER`
    - `FIELD_TECH`
    - `AGRONOMIST`
    - `INSTITUTION`
    - `ADMIN`
- `src/lib/profile.ts`
  - `mapDatabaseRoleToExperienceRole` acepta roles nuevos directamente.
  - Mantiene compatibilidad temporal con `TECHNICIAN` y `VIEWER`.
- `prisma/seed.mjs`
  - Crea usuarios reales demo para cada perfil.
  - Todos usan contrasena `agronodo-demo`.
- `/login`
  - Informa los usuarios seed por rol.

## Usuarios seed

```txt
productor@agronodo.local
tecnico@agronodo.local
agronomo@agronodo.local
entidad@agronodo.local
admin@agronodo.local
```

Contrasena:

```txt
agronodo-demo
```

## Validacion

- `npx prisma validate`
- `npx prisma generate`
- `npm run lint`
- `npm run build`

## Pendiente para BD real

Cuando PostgreSQL este activo, crear migracion:

```bash
npx prisma migrate dev --name align-user-roles
npx prisma db seed
```

Si ya existen usuarios con roles antiguos, preparar migracion de datos:

- `TECHNICIAN` -> `FIELD_TECH`
- `VIEWER` -> `PRODUCER`
- `ADMIN` -> `ADMIN`
