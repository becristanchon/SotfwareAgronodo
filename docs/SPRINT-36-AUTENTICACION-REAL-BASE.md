# Sprint 36 - Autenticacion real base

## Objetivo

Agregar autenticacion real con email y contrasena sin perder el flujo demo de perfiles.

## Decision CTO

AgroNodo necesita dos modos durante el MVP:

- Modo demo: seleccionar perfiles rapidamente para validar experiencia.
- Modo database: validar usuarios reales almacenados en PostgreSQL.

## Implementacion

- `src/lib/auth.ts`
  - Validacion de usuario con `bcryptjs`.
  - Generacion de JWT con `jose`.
  - Verificacion de sesion.
  - Mapeo de usuario Prisma a `CurrentProfile`.
- `src/lib/auth-constants.ts`
  - Cookie demo.
  - Cookie de sesion real.
- `src/lib/session.ts`
  - Resuelve primero sesion real.
  - Si no existe, usa perfil demo.
- `src/app/api/auth/login/route.ts`
  - Soporta login real con email/contrasena.
  - Soporta login demo con rol.
- `src/app/api/auth/logout/route.ts`
  - Limpia ambas cookies.
- `middleware.ts`
  - Permite sesion real o rol demo.
- `/login`
  - Incluye formulario de usuario real.
  - Mantiene selector de perfiles demo.

## Usuario seed

```txt
admin@agronodo.local
agronodo-demo
```

## Seguridad MVP

- Cookie HTTP-only.
- JWT con expiracion de 7 dias.
- `secure` activo en produccion.
- Se recomienda definir `AGRONODO_AUTH_SECRET` en despliegue real.

## Pendiente

- Migrar roles Prisma a roles de experiencia completos.
- Asociar `FieldDecision.userId` al usuario autenticado en el POST.
- Crear gestion administrativa de usuarios.
- Recuperacion/cambio de contrasena.
- Middleware con verificacion JWT completa en Edge o validacion server-side mas estricta.

## Validacion

- `npx prisma validate`
- `npm run lint`
- `npm run build`
