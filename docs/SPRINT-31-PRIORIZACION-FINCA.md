# Sprint 31 - Priorizacion automatica de finca

## Objetivo

Hacer que AgroNodo indique que lote de una finca requiere atencion primero y cual es la accion principal recomendada.

## Decision de producto

El modulo Finca debe responder una pregunta practica:

> ¿Donde debo mirar primero?

La grilla de estados vivos ayuda a comparar, pero la plataforma debe priorizar automaticamente para reducir carga cognitiva.

## Implementacion

- `src/lib/farm-live-summary.ts`: calcula resumen vivo de finca.
- `src/components/farm-priority-panel.tsx`: muestra prioridad, recomendacion y conteo por estados.
- `/fincas`: cada finca muestra su prioridad automatica.
- `/fincas/[farmId]`: el detalle de finca muestra el panel de prioridad antes del ciclo de madurez.

## Reglas iniciales de prioridad

1. Sin datos recientes.
2. Riesgo de frio.
3. Estres hidrico.
4. Exceso de agua.
5. Humedad baja.
6. Condicion favorable.

## Informacion visible

- Estado principal de la finca.
- Lote que requiere revision.
- Accion recomendada.
- Conteo de lotes por estado.
- Enlace directo al lote prioritario.

## Valor UX

El productor no necesita comparar manualmente todos los lotes. AgroNodo convierte datos y estados visuales en una prioridad accionable.

## Siguiente paso recomendado

Crear un resumen territorial con fincas priorizadas para tecnicos, asociaciones y entidades.
