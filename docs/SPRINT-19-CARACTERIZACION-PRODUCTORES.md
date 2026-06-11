# Sprint 19: Caracterizacion de productores y progreso operativo

## Objetivo

Hacer que AgroNodo se sienta mas humano e interactivo, incorporando contexto de productores y una secuencia clara de avance para la finca.

## Casos de uso

- Ver productores como perfiles productivos, no solo como registros.
- Consultar la caracterizacion de un productor.
- Entrar desde un productor hacia sus fincas asociadas.
- Entender donde se registra la informacion de caracterizacion.
- Ver el progreso de adopcion de una finca hacia monitoreo inteligente.

## Modelo de datos demo

- `ProducerProfile`: historia, experiencia, cultivos, estilo de decision, acceso tecnologico, necesidad de apoyo, meta con AgroNodo, nivel de confianza y etiquetas.
- `FarmProgressStage`: etapas de caracterizacion, monitoreo virtual y decisiones guiadas.

## Interfaces

- `/productores`: tarjetas enriquecidas con perfil del productor.
- `/productores/[producerId]`: detalle de caracterizacion del productor.
- `/caracterizacion`: hub transversal para explicar y navegar el proceso.
- `/fincas/[farmId]`: progreso de adopcion de la finca.

## Riesgos

- Convertir caracterizacion en formularios demasiado largos.
- Confundir al usuario si el progreso no representa acciones reales.
- Sobrecargar el MVP antes de activar persistencia en base de datos.

## Estrategia de pruebas

- Validar compilacion y lint.
- Probar rutas de productor y finca.
- Mantener datos demo consistentes con productores y fincas existentes.

## Decision CTO

La caracterizacion no sera un microservicio ni un modulo aislado pesado. En el MVP vive como capa de producto dentro de Productores y Fincas, con un hub en `/caracterizacion`. Cuando activemos PostgreSQL, se modelara como tablas relacionadas con `Producer` y `Farm`.
