# Sprint 14: Flujo Operativo de Alertas

## Objetivo

Permitir gestionar el ciclo de vida de una alerta: activa, revisada y resuelta.

Este modulo acerca AgroNodo a usuarios reales porque convierte la alerta en una tarea operativa que puede ser atendida y cerrada por un productor o tecnico.

## Casos de Uso

- Marcar una alerta como revisada.
- Marcar una alerta como resuelta.
- Bloquear cambios en modo demo sin simular persistencia.
- Preparar persistencia de estado de alerta en PostgreSQL.

## Modelo de Datos

Entidad cubierta:

- Alert.

Campos actualizados:

- status.
- acknowledgedAt.
- resolvedAt.

Estados:

- ACTIVE.
- ACKNOWLEDGED.
- RESOLVED.

## APIs

Nuevo metodo:

- `PATCH /api/alerts`

Payload:

```json
{
  "alertId": "alert-id",
  "status": "ACKNOWLEDGED"
}
```

Comportamiento:

- En `AGRONODO_DATA_SOURCE=demo`: retorna `409 READ_ONLY_DEMO_MODE`.
- En `AGRONODO_DATA_SOURCE=database`: valida con Zod y actualiza con Prisma.

## Interfaces

- `AlertActions`.
- `/alertas`.

## Riesgos

- Cerrar alertas sin evidencia real en campo.
- Confundir revisada con resuelta.
- No registrar quien atendio la alerta en futuras versiones.

## Estrategia de Pruebas

- Validar lint.
- Validar build.
- Validar que `/alertas` renderice.
- Validar que `PATCH /api/alerts` bloquee escritura en modo demo.

## Siguiente Sprint

Agregar filtros de alertas por estado/severidad o activar PostgreSQL para probar el ciclo completo.
