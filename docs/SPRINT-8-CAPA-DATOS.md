# Sprint 8: Capa de Acceso a Datos

## Objetivo

Separar las APIs del origen directo de datos demo para preparar el cambio gradual a Prisma/PostgreSQL.

Este modulo acerca AgroNodo a usuarios reales porque reduce el riesgo de migrar la demo funcional a persistencia real. Las pantallas y endpoints pueden mantenerse mientras se cambia el origen de datos por debajo.

## Casos de Uso

- Consultar APIs con una fuente de datos uniforme.
- Saber si AgroNodo esta usando datos demo o base de datos.
- Preparar conexion incremental a Prisma.
- Mantener la demo estable mientras se desarrolla persistencia.

## Modelo de Datos

No cambia el modelo agricola.

Se agrega una capa logica:

- `dataRepository`.
- `getDataSourceStatus`.
- `AGRONODO_DATA_SOURCE`.

## APIs

APIs migradas al repositorio:

- `GET /api/producers`
- `GET /api/farms`
- `GET /api/plots`
- `GET /api/sensors`
- `GET /api/readings`
- `GET /api/alerts`
- `GET /api/dashboard`
- `GET /api/report`

API nueva:

- `GET /api/system/status`

## Interfaces

No se cambian pantallas en este sprint.

## Riesgos

- Activar modo database sin tener PostgreSQL listo.
- Duplicar logica entre demo y Prisma.
- Migrar todo de una vez y romper la demo.

## Estrategia de Pruebas

- Validar lint.
- Validar build.
- Validar APIs principales.
- Validar `/api/system/status`.

## Siguiente Sprint

Implementar adaptador Prisma para:

- Producers.
- Farms.
- Plots.

Solo despues de tener PostgreSQL disponible.
