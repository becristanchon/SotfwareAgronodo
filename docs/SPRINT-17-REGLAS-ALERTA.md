# Sprint 17: Reglas de Alerta Configurables

## Objetivo

Permitir configurar umbrales de advertencia y criticidad para las variables monitoreadas.

Este modulo acerca AgroNodo a usuarios reales porque evita que el sistema sea rigido: cada piloto puede ajustar criterios de riesgo sin esperar sensores fisicos ni reglas avanzadas.

## Casos de Uso

- Consultar reglas de alerta.
- Ajustar umbral de advertencia.
- Ajustar umbral critico.
- Activar o desactivar una regla.
- Ver el alcance de la regla.

## Modelo de Datos

Entidad conceptual:

- AlertRule.

Campos:

- id.
- name.
- description.
- sensorType.
- enabled.
- operator.
- warningThreshold.
- criticalThreshold.
- unit.
- scope.

## APIs

- `GET /api/alert-rules`

## Interfaces

- `/reglas`.
- `AlertRuleCard`.

## Riesgos

- Permitir configuraciones demasiado libres antes de tener validacion agronomica.
- Generar falsas alarmas por umbrales mal ajustados.
- Confundir reglas demo con reglas persistentes.

## Estrategia de Pruebas

- Validar lint.
- Validar build.
- Validar que `/reglas` renderice.
- Validar que `/api/alert-rules` responda.

## Siguiente Sprint

Persistir reglas en PostgreSQL y conectar el motor de alertas a `AlertRule`.
