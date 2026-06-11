# Sprint 34 - Segunda revision API y preparacion BD

## Objetivo

Revisar que los CRUD, permisos, APIs y modelo Prisma esten alineados para sincronizar AgroNodo con PostgreSQL.

## Hallazgo principal

La UX ya tenia bitacora de decisiones de campo, pero la base de datos y la API aun no tenian un contrato persistente para guardar esas decisiones.

Sin este contrato, AgroNodo podia mostrar decisiones demo, pero no podia medir adopcion ni impacto hidrico real cuando se activara la base de datos.

## Implementacion

- `prisma/schema.prisma`
  - Enum `FieldDecisionStatus`.
  - Modelo `FieldDecision`.
  - Relaciones con `Farm`, `Plot`, `Alert` y `User`.
  - Indices por finca, lote y alerta.
- `src/lib/validation.ts`
  - `createFieldDecisionSchema`.
  - `CreateFieldDecisionInput`.
- `src/lib/data-repository.ts`
  - Repositorio demo para listar decisiones.
  - Repositorio database para listar y crear decisiones con Prisma.
- `src/app/api/field-decisions/route.ts`
  - `GET` filtrable por `farmId`, `plotId` y `alertId`.
  - `POST` protegido por capacidad `manage_alerts`.
- `src/components/field-decision-recorder.tsx`
  - Ahora usa `/api/field-decisions` cuando tiene finca/lote/alerta.
- `prisma/seed.mjs`
  - Seed de decisiones demo.

## Validacion

- `npx prisma validate`
- `npx prisma generate`
- `npm run lint`
- `npm run build`

## Estado para base de datos

El schema y el cliente Prisma ya estan listos.

Cuando PostgreSQL este activo, falta ejecutar una migracion real:

```bash
npx prisma migrate dev --name add-field-decisions
npx prisma db seed
```

## Riesgos pendientes

- El login todavia es demo.
- Los roles de experiencia aun no estan persistidos como enum formal en Prisma.
- Las decisiones ya tienen modelo persistente, pero la UI sigue usando datos demo para timelines en detalle de finca/lote.

## Siguiente paso recomendado

Conectar timelines de decision a `/api/field-decisions` o al repositorio de datos para que en modo database lean desde PostgreSQL.
