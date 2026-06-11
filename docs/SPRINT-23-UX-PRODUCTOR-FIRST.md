# Sprint 23: Experiencia productor-first

## Objetivo

Reducir carga cognitiva y reorganizar AgroNodo alrededor de preguntas simples del productor:

- Debo regar hoy?
- Que lote reviso primero?
- Estoy usando bien el agua?
- Que accion debo hacer?
- Voy mejor o peor?

## Cambios aplicados

- Navegacion principal orientada al productor:
  - Hoy.
  - Agua.
  - Mi finca.
  - Que hacer.
  - Avance.
- Modulos tecnicos movidos a Avanzado:
  - Productores.
  - Mediciones.
  - Avisos.
  - Dispositivos.
  - Reporte.
- Dashboard convertido en respuesta diaria:
  - Respuesta.
  - Motivo.
  - Ahorro posible.
- Alertas convertidas en recomendaciones de accion.

## Criterio UX

La experiencia principal no debe mostrar sensores, umbrales o configuraciones si antes puede mostrar una accion simple.

## Librerias interactivas

No se instalaron nuevas librerias en este sprint. La prioridad es aclarar lenguaje, flujo y jerarquia.

Evaluacion:

- Framer Motion podria ayudar mas adelante para microinteracciones del progreso.
- Recharts podria ayudar cuando existan graficas reales de consumo y ahorro.
- Una libreria de componentes no es prioritaria porque podria aumentar complejidad visual.

Decision CTO: no instalar librerias hasta que el flujo productor-first este validado con usuarios.
