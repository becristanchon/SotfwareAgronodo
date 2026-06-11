# Sprint 32 - Bitacora de decisiones de campo

## Objetivo

Cerrar el ciclo entre recomendacion, decision de campo e impacto esperado.

## Diagnostico CTO

AgroNodo ya muestra datos, estados vivos, prioridades y recomendaciones. El hueco principal del MVP era que no habia evidencia de lo que el productor o tecnico hizo despues de recibir una recomendacion.

Sin bitacora, AgroNodo no puede demostrar:

- Si la recomendacion fue aplicada.
- Si fue descartada por criterio del productor.
- Si quedo pendiente de revision.
- Que impacto hidrico se estima.
- Como evoluciona la adopcion basada en decisiones reales.

## Implementacion

- `src/lib/field-decisions.ts`: datos demo y helpers de decisiones de campo.
- `src/components/field-decision-timeline.tsx`: historial de decisiones.
- `src/components/field-decision-recorder.tsx`: registrador interactivo demo.
- `src/components/alert-queue-card.tsx`: cada recomendacion permite registrar decision.
- `/lotes/[plotId]`: muestra bitacora del lote.
- `/fincas/[farmId]`: muestra decisiones recientes de la finca.

## Estados de decision

- `APPLIED`: accion aplicada.
- `DISCARDED`: recomendacion descartada.
- `PENDING_REVIEW`: queda pendiente de revision.

## Nota tecnica

El registrador actual confirma la decision en pantalla, pero aun no persiste en base de datos. Esto es intencional para validar experiencia antes de implementar el modelo persistente.

## Siguiente paso recomendado

Persistir decisiones de campo en PostgreSQL:

- Crear modelo `FieldDecision`.
- Relacionar decision con finca, lote, alerta y usuario.
- Registrar impacto hidrico estimado.
- Usar decisiones para calcular ahorro comprobado y adopcion.
