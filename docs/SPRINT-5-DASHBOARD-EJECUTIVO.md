# Sprint 5: Dashboard Ejecutivo

## Objetivo

Convertir el dashboard en una vista de decision, no solo en una lista de datos.

Este modulo acerca AgroNodo a usuarios reales porque responde rapidamente:

- Que atender primero.
- En que finca ocurre.
- Que lote esta comprometido.
- Que accion debe revisarse.

## Casos de Uso

- Ver acciones recomendadas por prioridad.
- Ver estado agregado por finca.
- Ver conteo de alertas criticas.
- Ver salud territorial de la demo.
- Consultar resumen ejecutivo via API.

## Modelo de Datos

El dashboard deriva informacion de:

- Farm.
- Plot.
- Sensor.
- Reading.
- Alert.

Estructuras derivadas:

- FarmHealth.
- NextAction.
- DashboardSummary.

## APIs

- `GET /api/dashboard`

Respuesta:

- summary.
- nextActions.
- farmHealth.

## Interfaces

- `/`: centro de decision principal.

## Riesgos

- Sobrecargar el dashboard con demasiada informacion.
- Mostrar recomendaciones como si fueran diagnostico agronomico definitivo.
- Esconder el detalle operativo necesario para validar la demo.

## Estrategia de Pruebas

- Validar lint.
- Validar build.
- Validar respuesta de `/api/dashboard`.
- Validar que `/` renderice correctamente.

## Siguiente Sprint

El siguiente paso debe ser decidir entre:

- Persistencia real con Prisma/PostgreSQL.
- Formularios CRUD para productores, fincas y lotes.
- Reporte demo para pilotos y aliados.
