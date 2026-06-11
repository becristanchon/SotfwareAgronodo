# Sprint 30 - Estado Vivo por Finca

## Objetivo

Extender el Estado Vivo del Cultivo desde un lote individual hacia una lectura comparativa por finca.

## Decision de producto

La finca debe funcionar como centro de seguimiento. Por eso no basta con mostrar indicadores hidricos generales: el usuario necesita ver rapidamente que lote esta bien, que lote necesita agua y que lote requiere atencion.

## Implementacion

- `src/components/crop-live-summary-card.tsx`: ficha compacta del estado vivo de un lote.
- `/fincas`: cada finca muestra una grilla de estados vivos por lote.
- `/fincas/[farmId]`: la seccion de lotes ahora muestra estados vivos comparables.
- Las fichas enlazan al detalle completo de cada lote.

## Informacion visible por lote

- Cultivo.
- Nombre del lote.
- Estado principal.
- Titulo del estado vivo.
- Variable principal.
- Valor actual.
- Representacion visual de la planta.

## Valor UX

El productor no tiene que abrir cada lote para saber donde actuar primero. La finca se convierte en un tablero vivo y comprensible.

## Siguiente paso recomendado

Crear priorizacion automatica de finca:

- Lote mas urgente.
- Recomendacion principal de la finca.
- Conteo por estados.
- Semaforo hidrico de toda la finca.
