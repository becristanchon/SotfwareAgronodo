# Sprint 29 - Estado Vivo del Cultivo

## Objetivo

Traducir datos tecnicos de humedad, temperatura, tendencia y alertas en una representacion visual simple y accionable para productores.

## Decision de producto

El productor no debe ver primero sensores ni tablas. Debe ver una respuesta comprensible sobre el estado del cultivo y la accion recomendada.

## Implementacion

- `src/lib/crop-live-state.ts`: motor de reglas para calcular el estado vivo del cultivo.
- `src/components/crop-visual.tsx`: representacion visual sobria de la planta segun estado.
- `src/components/crop-live-state-card.tsx`: tarjeta con planta, mensaje, recomendacion, confianza y detalle tecnico.
- `/`: muestra el estado vivo del lote prioritario.
- `/lotes/[plotId]`: muestra el estado vivo completo del lote con detalle tecnico.

## Estados soportados

- `OPTIMAL`: condicion hidrica favorable.
- `LOW_MOISTURE`: el cultivo empieza a necesitar agua.
- `WATER_STRESS`: se recomienda revisar riego.
- `EXCESS_WATER`: posible exceso de agua.
- `FROST_RISK`: condicion fria detectada.
- `NO_DATA`: no hay datos recientes.

## Reglas iniciales

- Sin datos recientes: no hay lecturas o la ultima lectura supera tres dias.
- Riesgo de helada: alerta activa de helada o temperatura menor o igual a 4 C.
- Estres hidrico: alerta activa de baja humedad o humedad de suelo menor o igual a 25%.
- Humedad baja: humedad menor a 34% o tendencia descendente.
- Exceso de agua: humedad de suelo mayor o igual a 58%, o humedad de suelo alta combinada con humedad ambiente alta.
- Optimo: sin alertas criticas y variables dentro de rango.

## Criterio UX

El componente no afirma salud vegetal absoluta. Comunica condicion hidrica estimada, nivel de confianza y recomendacion practica.

Para productor se muestra la capa simple.

Para tecnico/agronomo se habilita detalle tecnico.

## Siguiente paso recomendado

Crear version resumida por finca para ver varios lotes como una grilla de estados vivos.
