# Sprint 3: Lecturas Simuladas

## Objetivo

Construir historicos agricolas usando lecturas simuladas por sensor.

Este modulo acerca AgroNodo a usuarios reales porque permite mostrar evolucion temporal, detectar tendencias y preparar alertas sin depender todavia de hardware real.

## Casos de Uso

- Consultar lecturas historicas por sensor.
- Consultar todas las lecturas simuladas.
- Ver tendencia de los ultimos 7 dias.
- Comparar lectura inicial contra lectura actual.
- Alimentar graficas y proximas reglas de alerta.

## Modelo de Datos

Entidad principal:

- Reading.

Campos iniciales:

- id.
- sensorId.
- value.
- unit.
- origin.
- takenAt.

Origenes:

- SIMULATED.
- DEVICE.
- MANUAL.

## APIs

- `GET /api/readings`
- `GET /api/readings?sensorId={sensorId}`

## Interfaces

- `/historicos`: vista de lecturas historicas por sensor.
- `/sensores`: tendencia de 7 dias por sensor.
- `/`: conteo global de lecturas.

## Riesgos

- Que los datos simulados parezcan exactitud cientifica.
- Generar datos aleatorios que cambien en cada render y rompan la demo.
- Graficas complejas antes de validar si el usuario entiende la tendencia.

## Estrategia de Pruebas

- Validar lint.
- Validar build.
- Validar respuesta de `/api/readings`.
- Validar filtro por `sensorId`.
- Validar que `/historicos` renderice correctamente.

## Siguiente Sprint

Sprint 4 debe construir alertas accionables sobre las lecturas simuladas.
