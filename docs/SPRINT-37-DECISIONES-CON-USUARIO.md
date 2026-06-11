# Sprint 37 - Decisiones asociadas a usuario

## Objetivo

Asociar las decisiones de campo al usuario autenticado cuando AgroNodo opera con sesion real.

## Problema

La bitacora de decisiones ya podia persistirse en PostgreSQL, pero el responsable de la decision no estaba siendo tomado desde la sesion real.

Para medir adopcion e impacto, AgroNodo necesita saber quien registro cada decision.

## Implementacion

- `src/lib/session.ts`
  - Nuevo helper `getAuthenticatedUserId`.
  - Lee la cookie de sesion real y verifica el JWT.
- `src/lib/validation.ts`
  - `createFieldDecisionSchema` acepta `userId` como campo opcional interno.
- `src/app/api/field-decisions/route.ts`
  - El `POST` toma `userId` desde la sesion real.
  - El cliente no controla el responsable de la decision.
- `src/components/field-decision-timeline.tsx`
  - Muestra `decision.user.name` cuando viene desde Prisma.
  - Mantiene compatibilidad con `decidedBy` en modo demo.

## Resultado

- En modo demo: la bitacora sigue mostrando responsables simulados.
- En modo database: las nuevas decisiones quedan asociadas al usuario autenticado.

## Validacion

- `npx prisma validate`
- `npm run lint`
- `npm run build`

## Siguiente paso recomendado

Migrar roles de Prisma a los roles de experiencia reales de AgroNodo:

- Productor
- Tecnico de campo
- Agronomo
- Entidad territorial
- Administrador
