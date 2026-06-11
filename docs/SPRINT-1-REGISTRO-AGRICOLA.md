# Sprint 1: Registro Agricola

## Objetivo

Construir la primera capa funcional de AgroNodo: productores, fincas y lotes.

Este modulo acerca AgroNodo a usuarios reales porque permite representar una operacion agricola concreta antes de hablar de sensores, IA o hardware.

## Casos de Uso

- Consultar productores registrados.
- Consultar fincas asociadas a productores.
- Consultar lotes por finca.
- Ver estado agricola inicial de cada lote.
- Exponer datos base mediante APIs de lectura.

## Modelo de Datos

Entidades usadas:

- Producer.
- Farm.
- Plot.

Relaciones:

- Un Producer tiene muchas Farms.
- Una Farm tiene muchos Plots.
- Un Plot contiene variables iniciales simuladas.

## APIs

- `GET /api/health`
- `GET /api/producers`
- `GET /api/farms`
- `GET /api/plots`

Estas APIs usan datos demo tipados. La siguiente iteracion debe reemplazar el origen demo por Prisma/PostgreSQL sin cambiar la forma del producto.

## Interfaces

- `/`: dashboard general.
- `/productores`: registro y contexto de productores.
- `/fincas`: unidades productivas.
- `/lotes`: zonas monitoreables y estado agricola.

## Riesgos

- Confundir datos demo con persistencia real.
- Agregar formularios antes de validar si los campos son suficientes.
- Capturar demasiada informacion para productores rurales en la primera version.

## Estrategia de Pruebas

- Validar que la app compile.
- Validar lint.
- Validar que las rutas principales rendericen.
- Validar que las APIs respondan JSON.

## Siguiente Sprint

Sprint 2 debe construir sensores virtuales asociados a lotes.
