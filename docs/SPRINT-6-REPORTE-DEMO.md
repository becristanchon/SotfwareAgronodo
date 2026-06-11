# Sprint 6: Reporte Demo

## Objetivo

Crear una salida ejecutiva presentable para pilotos, productores, asociaciones o aliados institucionales.

Este modulo acerca AgroNodo a usuarios reales porque permite mostrar el valor del MVP en una conversacion concreta: estado de fincas, alertas prioritarias y acciones recomendadas.

## Casos de Uso

- Consultar reporte demo del estado agricola.
- Ver conclusiones operativas.
- Ver salud por finca.
- Ver alertas prioritarias.
- Guardar el reporte como PDF desde el navegador.
- Consumir el reporte mediante API.

## Modelo de Datos

El reporte deriva de:

- DashboardSummary.
- FarmHealth.
- Alert.
- NextAction.

Estructura principal:

- PilotReport.

## APIs

- `GET /api/report`

## Interfaces

- `/reporte`: reporte ejecutivo imprimible.

## Riesgos

- Que el reporte se interprete como diagnostico agronomico certificado.
- Que los datos simulados parezcan mediciones reales.
- Que se quiera personalizar demasiado antes de tener pilotos.

## Estrategia de Pruebas

- Validar lint.
- Validar build.
- Validar respuesta de `/api/report`.
- Validar que `/reporte` renderice correctamente.

## Siguiente Sprint

La siguiente decision CTO debe ser una de estas:

- Persistencia real con Prisma/PostgreSQL.
- Formularios CRUD conectados a una capa temporal.
- Preparar deploy publico en Render/Railway.
