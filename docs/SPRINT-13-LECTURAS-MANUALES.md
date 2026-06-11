# Sprint 13: Lecturas Manuales

## Objetivo

Permitir registrar lecturas manuales asociadas a sensores virtuales.

Este modulo acerca AgroNodo a usuarios reales porque permite ejecutar pilotos sin hardware instalado: un tecnico puede tomar una medicion en campo y cargarla a la plataforma.

## Casos de Uso

- Registrar lectura manual desde `/historicos`.
- Asociar lectura a un sensor.
- Guardar valor y unidad.
- Preparar persistencia real para lecturas manuales.
- Bloquear guardado en modo demo sin simular persistencia.

## Modelo de Datos

Entidad cubierta:

- Reading.

Campos capturados:

- sensorId.
- value.
- unit.
- origin.
- takenAt.

Origen:

- MANUAL.

## APIs

Nuevo metodo:

- `POST /api/readings`

Comportamiento:

- En `AGRONODO_DATA_SOURCE=demo`: retorna `409 READ_ONLY_DEMO_MODE`.
- En `AGRONODO_DATA_SOURCE=database`: valida con Zod y crea con Prisma.

## Interfaces

- `ReadingForm`.
- `/historicos`.

## Riesgos

- Confundir lectura manual con lectura de sensor real.
- Registrar datos sin calibracion o sin criterio tecnico.
- No diferenciar origen de dato.

## Estrategia de Pruebas

- Validar lint.
- Validar build.
- Validar que `/historicos` renderice.
- Validar que `POST /api/readings` bloquee escritura en modo demo.

## Siguiente Sprint

Agregar filtros en historicos por sensor/lote o conectar base PostgreSQL para probar persistencia real.
