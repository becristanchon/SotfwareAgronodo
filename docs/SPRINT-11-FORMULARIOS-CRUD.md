# Sprint 11: Formularios CRUD

## Objetivo

Agregar formularios para capturar productores, fincas y lotes desde la interfaz.

Este modulo acerca AgroNodo a usuarios reales porque permite validar el flujo de captura de informacion agricola, aunque la persistencia real se active despues con PostgreSQL.

## Casos de Uso

- Registrar productor desde `/productores`.
- Registrar finca desde `/fincas`.
- Registrar lote desde `/lotes`.
- Mostrar errores de API en pantalla.
- Bloquear guardado en modo demo sin simular persistencia.

## Modelo de Datos

Entidades cubiertas:

- Producer.
- Farm.
- Plot.

Los formularios usan los contratos ya definidos:

- `POST /api/producers`.
- `POST /api/farms`.
- `POST /api/plots`.

## APIs

No se agregan APIs nuevas.

## Interfaces

- `ProducerForm`.
- `FarmForm`.
- `PlotForm`.
- `FormStatus`.

## Riesgos

- Que el usuario crea que el modo demo guarda datos.
- Que se validen campos en frontend pero no en backend.
- Que se agreguen demasiados campos antes de pilotos reales.

## Estrategia de Pruebas

- Validar lint.
- Validar build.
- Validar que las paginas rendericen.
- Validar que los formularios muestren respuesta de modo demo.

## Siguiente Sprint

Activar PostgreSQL o base remota para probar guardado real con estos mismos formularios.
