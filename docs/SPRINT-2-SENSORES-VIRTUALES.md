# Sprint 2: Sensores Virtuales

## Objetivo

Permitir que AgroNodo represente fuentes de medicion sin depender de hardware real.

Este modulo acerca AgroNodo a usuarios reales porque permite validar el flujo de monitoreo agricola antes de instalar sensores ESP32, LoRaWAN o estaciones agroclimaticas.

## Casos de Uso

- Consultar sensores virtuales configurados.
- Ver a que lote pertenece cada sensor.
- Ver tipo de variable monitoreada.
- Ver estado operativo del sensor.
- Ver ultima lectura simulada.

## Modelo de Datos

Entidad principal:

- Sensor.

Campos iniciales:

- id.
- plotId.
- name.
- type.
- unit.
- status.
- relativeLocation.
- lastValue.
- lastReadingAt.

Tipos iniciales:

- SOIL_MOISTURE.
- AMBIENT_TEMPERATURE.
- AMBIENT_HUMIDITY.

Estados iniciales:

- ACTIVE.
- INACTIVE.
- MAINTENANCE.

## APIs

- `GET /api/sensors`

## Interfaces

- `/sensores`: listado de sensores virtuales.
- `/`: dashboard con conteo de sensores activos.
- `/lotes`: conteo de sensores por lote.

## Riesgos

- Disenar sensores pensando demasiado pronto en hardware real.
- Agregar configuraciones tecnicas que el productor no necesita ver.
- Prometer precision agricola sin calibracion real en campo.

## Estrategia de Pruebas

- Validar lint.
- Validar build.
- Validar respuesta de `/api/sensors`.
- Validar que `/sensores` renderice correctamente.

## Siguiente Sprint

Sprint 3 debe generar lecturas simuladas historicas por sensor para alimentar graficas, alertas e historicos.
