# Sprint 15: Perfil Demo

## Objetivo

Agregar una primera capa de perfiles por rol sin implementar login completo todavia.

Este modulo acerca AgroNodo a usuarios reales porque prepara la experiencia para distintos actores: administrador, tecnico, productor o aliado lector.

## Casos de Uso

- Consultar perfil actual.
- Ver rol operativo.
- Ver organizacion asociada.
- Ver capacidades disponibles.
- Preparar permisos basicos por rol.

## Modelo de Datos

Entidades base:

- User.
- Organization.

Roles actuales:

- ADMIN.
- TECHNICIAN.
- VIEWER.

Capacidades:

- Gestionar productores.
- Gestionar fincas.
- Gestionar lotes.
- Gestionar sensores.
- Registrar lecturas.
- Atender alertas.
- Ver reportes.

## APIs

- `GET /api/me`

## Interfaces

- `/perfil`.

## Riesgos

- Construir autenticacion compleja antes de necesitarla.
- Crear permisos demasiado finos sin usuarios reales.
- Confundir perfil demo con seguridad real.

## Estrategia de Pruebas

- Validar lint.
- Validar build.
- Validar que `/perfil` renderice.
- Validar que `/api/me` responda.

## Siguiente Sprint

Agregar permisos visuales basicos:

- VIEWER no ve formularios.
- TECHNICIAN puede registrar lecturas y atender alertas.
- ADMIN ve todas las acciones.
