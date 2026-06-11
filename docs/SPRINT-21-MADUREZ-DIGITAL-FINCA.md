# Sprint 21: Estado AgroNodo de la finca

## Objetivo

Replantear el modelo conceptual del modulo Finca para que represente un unico proceso BPM: la incorporacion y gestion de una finca dentro de AgroNodo.

## Problema corregido

El modelo anterior mezclaba objetos, actividades, capacidades y resultados:

- Finca caracterizada.
- Productor capacitado.
- Finca monitoreada.
- Impacto productivo.

Esto no era una linea de madurez consistente porque no todas las etapas describian el mismo objeto de negocio.

## Objeto principal

El activo principal es la finca como unidad productiva gestionable dentro de AgroNodo.

## Que se mide

Se mide el grado en que una finca esta incorporada, operando y generando valor dentro del sistema AgroNodo.

## Ciclo de incorporacion y gestion

La finca avanza por siete estados:

- Registrada.
- Diagnosticada.
- Planificada.
- Implementada.
- Operativa.
- Gestionada.
- Evaluada.

## Dimensiones paralelas

Las dimensiones explican la solidez del avance, pero no son etapas principales:

- Caracterizacion.
- Capacitacion.
- Implementacion.
- Monitoreo.
- Uso de datos.
- Impacto.

## Evidencia de avance

Cada estado debe avanzar con evidencias:

- Datos basicos registrados.
- Diagnostico productivo.
- Riesgos priorizados.
- Plan de monitoreo.
- Sensores o variables activas.
- Lecturas recientes.
- Alertas revisadas.
- Acciones de campo documentadas.
- Reportes o evidencias de impacto.

## Interfaces

- `/fincas`: muestra Estado AgroNodo e indice de adopcion.
- `/fincas/[farmId]`: muestra el ciclo de incorporacion y gestion, dimensiones, criterios y proxima accion.

## Decision CTO

El termino principal para productores sera `Estado AgroNodo`. El termino `madurez digital` puede reservarse para analitica institucional, pero no debe guiar la experiencia principal del productor.
