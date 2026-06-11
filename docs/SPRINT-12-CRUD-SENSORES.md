# Sprint 12: CRUD Sensores Virtuales

## Objetivo

Permitir configurar sensores virtuales desde la interfaz y preparar su persistencia real.

Este modulo acerca AgroNodo a usuarios reales porque permite modelar que variable se quiere monitorear por lote antes de instalar hardware.

## Casos de Uso

- Crear sensor virtual desde `/sensores`.
- Asociar sensor a un lote.
- Seleccionar variable monitoreada.
- Asignar estado operativo.
- Bloquear guardado en modo demo sin simular persistencia.

## Modelo de Datos

Entidad cubierta:

- Sensor.

Campos capturados:

- plotId.
- name.
- type.
- unit.
- status.
- relativeLocation.

## APIs

Nuevo metodo:

- `POST /api/sensors`

Comportamiento:

- En `AGRONODO_DATA_SOURCE=demo`: retorna `409 READ_ONLY_DEMO_MODE`.
- En `AGRONODO_DATA_SOURCE=database`: valida con Zod y crea con Prisma.

## Interfaces

- `SensorForm`.
- `/sensores`.

## Riesgos

- Mezclar configuracion virtual con especificaciones fisicas reales antes de tiempo.
- Pedir datos tecnicos innecesarios para productores.
- Crear sensores sin lote asociado.

## Estrategia de Pruebas

- Validar lint.
- Validar build.
- Validar que `/sensores` renderice.
- Validar que `POST /api/sensors` bloquee escritura en modo demo.

## Siguiente Sprint

Agregar CRUD de lecturas manuales o preparar formularios para filtros historicos por sensor/lote.
