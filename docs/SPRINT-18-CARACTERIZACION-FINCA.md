# Sprint 18: Caracterizacion de Finca

## Objetivo

Agregar identidad, contexto y personalizacion a las fincas.

Este modulo acerca AgroNodo a usuarios reales porque una finca no es solo un registro: tiene historia productiva, agua, suelo, retos y objetivos. Ese contexto hace que las alertas y recomendaciones se sientan mas utiles y menos planas.

## Casos de Uso

- Ver perfil enriquecido de una finca.
- Consultar objetivo productivo.
- Consultar fuente de agua.
- Consultar tipo de suelo.
- Consultar metodo de riego.
- Consultar retos y notas de campo.
- Ver tags productivos por finca.

## Modelo de Datos

Entidad conceptual:

- FarmProfile.

Campos:

- farmId.
- shortStory.
- productionGoal.
- waterSource.
- soilType.
- irrigationMethod.
- mainChallenge.
- fieldNotes.
- tags.

## Interfaces

- `/fincas`.
- `/fincas/[farmId]`.
- `FarmProfileCard`.

## Riesgos

- Convertir la ficha de finca en un formulario demasiado largo.
- Recoger datos que el productor no sabe responder.
- Hacer recomendaciones contextuales antes de validar reglas simples.

## Estrategia de Pruebas

- Validar lint.
- Validar build.
- Validar `/fincas`.
- Validar `/fincas/farm-boyaca-demo`.

## Siguiente Sprint

Persistir FarmProfile en PostgreSQL o agregar personalizacion de lotes/cultivos.
