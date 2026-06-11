# Sprint 9: Adaptador Prisma

## Objetivo

Preparar el repositorio de datos para leer desde PostgreSQL con Prisma cuando la base este disponible.

Este modulo acerca AgroNodo a usuarios reales porque deja listo el camino para persistencia real sin reescribir endpoints ni pantallas.

## Casos de Uso

- Mantener modo demo como fuente estable.
- Activar modo database con `AGRONODO_DATA_SOURCE=database`.
- Leer productores, fincas, lotes, sensores, lecturas y alertas desde Prisma.
- Mantener las APIs existentes.

## Modelo de Datos

Se usa el schema Prisma existente:

- Producer.
- Farm.
- Plot.
- Sensor.
- Reading.
- Alert.

## APIs

No se agregan rutas nuevas.

Las rutas existentes ya pasan por `dataRepository`:

- `GET /api/producers`
- `GET /api/farms`
- `GET /api/plots`
- `GET /api/sensors`
- `GET /api/readings`
- `GET /api/alerts`
- `GET /api/dashboard`
- `GET /api/report`

## Interfaces

No se cambian pantallas.

## Riesgos

- Activar `database` sin tener PostgreSQL corriendo.
- Que la forma de respuesta Prisma difiera de la demo.
- Completar dashboard/reportes con agregaciones SQL antes de validar persistencia basica.

## Estrategia de Pruebas

- Validar lint.
- Validar build.
- Validar APIs en modo demo.
- Validar schema Prisma.
- Cuando exista PostgreSQL: migrar, seed y probar `AGRONODO_DATA_SOURCE=database`.

## Siguiente Sprint

Con PostgreSQL disponible:

- Ejecutar `npm run db:up`.
- Ejecutar `npm run prisma:migrate`.
- Ejecutar `npm run prisma:seed`.
- Cambiar `AGRONODO_DATA_SOURCE=database`.
- Validar APIs principales contra base real.
