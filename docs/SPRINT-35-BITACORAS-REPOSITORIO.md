# Sprint 35 - Bitacoras conectadas al repositorio

## Objetivo

Conectar las bitacoras de decisiones de finca y lote al repositorio de datos para que funcionen tanto en modo demo como en modo PostgreSQL.

## Problema

Aunque ya existia `/api/field-decisions` y el modelo `FieldDecision`, las pantallas de finca y lote seguian leyendo decisiones desde helpers demo directos.

Eso dejaba una brecha entre UX y persistencia.

## Implementacion

- `/lotes/[plotId]` ahora consulta `dataRepository.fieldDecisions.list({ plotId })`.
- `/fincas/[farmId]` ahora consulta `dataRepository.fieldDecisions.list({ farmId })`.
- `FieldDecisionTimeline` soporta valores provenientes de Prisma, incluyendo decimales convertibles a string.

## Resultado

- En modo demo, las bitacoras siguen mostrando datos simulados.
- En modo database, las bitacoras leen desde PostgreSQL a traves de Prisma.
- La UI no necesita cambiar entre fuentes de datos.

## Validacion

- `npm run lint`
- `npm run build`

## Siguiente paso recomendado

Implementar autenticacion real y asociar decisiones de campo al usuario autenticado.
