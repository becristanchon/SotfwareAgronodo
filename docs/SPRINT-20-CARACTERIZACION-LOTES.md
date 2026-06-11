# Sprint 20: Caracterizacion de lotes

## Objetivo

Convertir los lotes en unidades agronomicas vivas, con etapa del cultivo, riesgo dominante, decision actual y progreso de monitoreo.

## Casos de uso

- Ver cada lote con contexto agricola, no solo variables.
- Consultar una pagina de detalle por lote.
- Entender la decision actual recomendada para el lote.
- Navegar desde finca hacia lote.
- Ver una ruta operativa: caracterizacion, sensores, alertas y decision registrada.

## Modelo de datos demo

- `PlotProfile`: etapa del cultivo, dias desde siembra, riesgo dominante, decision actual, accion recomendada, observacion de campo, necesidad de agua, avance de monitoreo y etiquetas.

## Interfaces

- `/lotes`: tarjetas enriquecidas con estado agricola.
- `/lotes/[plotId]`: perfil de lote, decision de campo, variables actuales, ruta operativa y sensores asociados.
- `/fincas/[farmId]`: los lotes ahora enlazan al detalle.
- `/caracterizacion`: lote pasa a ser una capa activa del flujo.

## Riesgos

- Simular demasiada precision agronomica sin validacion de campo.
- Volver la caracterizacion demasiado larga para pequenos productores.
- Confundir recomendaciones demo con asesoria agronomica definitiva.

## Estrategia de pruebas

- Validar compilacion y lint.
- Probar rutas estaticas de lotes.
- Mantener los perfiles consistentes con alertas, sensores y variables simuladas.

## Decision CTO

La caracterizacion de lote es clave para que AgroNodo deje de verse como dashboard generico. En el MVP se modela como datos demo conectados a `Plot`; en base de datos deberia evolucionar a una tabla `PlotProfile` o campos extendidos de `Plot`, segun complejidad real del piloto.
