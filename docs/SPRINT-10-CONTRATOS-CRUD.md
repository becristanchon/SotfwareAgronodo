# Sprint 10: Contratos CRUD

## Objetivo

Preparar escrituras validadas para productores, fincas y lotes sin romper el modo demo.

Este modulo acerca AgroNodo a usuarios reales porque permite pasar de consulta a captura de datos reales cuando PostgreSQL este activo.

## Casos de Uso

- Crear productor desde API.
- Crear finca desde API.
- Crear lote desde API.
- Validar entradas antes de persistir.
- Bloquear escrituras en modo demo con respuesta clara.

## Modelo de Datos

Entidades cubiertas:

- Producer.
- Farm.
- Plot.

Validacion:

- `createProducerSchema`.
- `createFarmSchema`.
- `createPlotSchema`.

## APIs

Nuevos metodos:

- `POST /api/producers`
- `POST /api/farms`
- `POST /api/plots`

Comportamiento:

- En `AGRONODO_DATA_SOURCE=demo`: retorna `409 READ_ONLY_DEMO_MODE`.
- En `AGRONODO_DATA_SOURCE=database`: valida con Zod y crea con Prisma.

## Interfaces

No se agregan formularios en este sprint.

## Riesgos

- Permitir formularios antes de tener persistencia real.
- Aceptar datos sin validacion.
- Mezclar datos demo con datos persistentes.

## Estrategia de Pruebas

- Validar lint.
- Validar build.
- Probar que `POST /api/producers` en demo retorne 409.
- Probar que APIs de lectura sigan funcionando.

## Siguiente Sprint

Cuando PostgreSQL este activo:

- Validar POST en modo database.
- Crear formularios para productores, fincas y lotes.
- Mostrar errores de validacion en UI.
