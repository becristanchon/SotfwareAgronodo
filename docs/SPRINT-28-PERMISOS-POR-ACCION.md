# Sprint 28 - Permisos por accion

## Objetivo

Hacer que los perfiles de AgroNodo controlen acciones concretas dentro de las pantallas, no solo acceso a rutas.

## Decision CTO

Los permisos deben vivir en una capa centralizada y reutilizable. La UI debe ocultar o reemplazar acciones no permitidas, pero la API tambien debe bloquearlas para evitar inconsistencias.

## Implementacion

- `hasCapability` en `src/lib/profile.ts`.
- `src/components/restricted-action.tsx` para explicar acciones restringidas sin romper la experiencia.
- `src/lib/authorization.ts` para proteger endpoints por capacidad.
- Formularios condicionados por perfil en:
  - `/productores`
  - `/fincas`
  - `/lotes`
  - `/sensores`
  - `/historicos`
- APIs protegidas por capacidad:
  - `POST /api/producers`
  - `POST /api/farms`
  - `POST /api/plots`
  - `POST /api/sensors`
  - `POST /api/readings`
  - `PATCH /api/alerts`
- El middleware deja pasar `/api/*` para que cada endpoint aplique su propia politica.

## Criterio por perfil

- Productor: consulta y atiende recomendaciones.
- Tecnico: registra fincas, lotes, sensores, mediciones y atiende recomendaciones.
- Agronomo: registra mediciones, atiende recomendaciones y configura reglas.
- Entidad: gestiona productores/fincas y consulta impacto.
- Admin: permisos completos.

## Siguiente paso recomendado

Crear gestion visual de usuarios y roles:

- Listar usuarios demo.
- Mostrar capacidades por usuario.
- Permitir cambiar rol desde una pantalla administrativa.
- Preparar migracion a usuarios reales con PostgreSQL.
