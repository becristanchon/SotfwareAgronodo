# Sprint 7: Base de Persistencia

## Objetivo

Preparar persistencia real con PostgreSQL y Prisma sin interrumpir la demo funcional existente.

Este modulo acerca AgroNodo a usuarios reales porque permite pasar de datos simulados en codigo a datos administrables, persistentes y consultables.

## Casos de Uso

- Levantar PostgreSQL local con Docker.
- Ejecutar migraciones Prisma.
- Cargar datos demo persistentes.
- Explorar datos desde Prisma Studio.
- Preparar conexion gradual de APIs a base de datos.

## Modelo de Datos

Se usa el modelo existente en `prisma/schema.prisma`:

- Organization.
- User.
- Producer.
- Farm.
- Plot.
- Sensor.
- Reading.
- Alert.

## APIs

No se cambian APIs en este sprint. La prioridad es infraestructura de datos.

## Interfaces

No se cambian interfaces en este sprint. La demo sigue estable mientras se prepara persistencia.

## Riesgos

- Romper la demo al migrar todas las pantallas a base de datos de golpe.
- Depender de Docker sin documentar setup local.
- Duplicar datos si el seed no es idempotente.

## Estrategia de Pruebas

- Validar lint.
- Validar build.
- Validar Prisma schema.
- Mantener la app funcionando con datos demo.

## Siguiente Sprint

Conectar las APIs de lectura a Prisma de forma gradual, empezando por:

- `GET /api/producers`.
- `GET /api/farms`.
- `GET /api/plots`.
