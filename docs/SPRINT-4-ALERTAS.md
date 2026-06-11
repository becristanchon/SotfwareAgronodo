# Sprint 4: Alertas

## Objetivo

Convertir lecturas simuladas en alertas accionables para el productor o tecnico.

Este modulo acerca AgroNodo a usuarios reales porque responde la pregunta mas valiosa del MVP: que lote necesita atencion y por que.

## Casos de Uso

- Consultar alertas activas.
- Consultar alertas por lote.
- Ver severidad de una alerta.
- Ver valor detectado contra umbral.
- Ver recomendacion operativa.

## Modelo de Datos

Entidad principal:

- Alert.

Campos iniciales:

- id.
- plotId.
- sensorId.
- type.
- severity.
- status.
- message.
- recommendation.
- detectedValue.
- threshold.
- unit.
- createdAt.

Tipos iniciales:

- LOW_SOIL_MOISTURE.
- FROST_RISK.
- HIGH_AMBIENT_HUMIDITY.

Estados iniciales:

- ACTIVE.
- ACKNOWLEDGED.
- RESOLVED.

## Reglas Iniciales

- Humedad del suelo baja: menor a 25%.
- Riesgo de helada: temperatura ambiente menor a 4 C.
- Humedad ambiental alta: mayor a 90%.

## APIs

- `GET /api/alerts`
- `GET /api/alerts?status=ACTIVE`
- `GET /api/alerts?plotId={plotId}`

## Interfaces

- `/alertas`: panel de alertas accionables.
- `/`: conteo de alertas por lote.
- `/lotes`: conteo de alertas por lote.

## Riesgos

- Que las recomendaciones parezcan asesoria agronomica definitiva.
- Generar demasiadas alertas repetidas.
- Usar umbrales fijos sin calibracion por cultivo o etapa fenologica.

## Estrategia de Pruebas

- Validar lint.
- Validar build.
- Validar respuesta de `/api/alerts`.
- Validar filtro por estado activo.
- Validar filtro por lote.
- Validar que `/alertas` renderice correctamente.

## Siguiente Sprint

Sprint 5 debe mejorar el dashboard con una lectura ejecutiva mas clara y preparar formularios o persistencia real segun prioridad.
