# Sprint 33 - Revision CRUD por perfiles

## Objetivo

Revisar que los CRUD y acciones operativas de AgroNodo correspondan al perfil correcto.

## Diagnostico

El sistema ya tenia permisos por ruta y por accion, pero faltaba una matriz visible que permitiera auditar quien puede consultar, crear, actualizar o eliminar cada modulo.

Tambien existian dos inconsistencias:

- El tecnico de campo podia entrar a Productores, pero no podia registrar productores.
- Productor tenia capacidad de ver reportes, pero la ruta `/reporte` no estaba habilitada.

## Ajustes implementados

- El tecnico de campo ahora puede gestionar productores.
- Productor puede acceder a `/reporte`.
- Se creo `crudPermissionMatrix` en `src/lib/profile.ts`.
- `/perfil` ahora muestra:
  - capacidades del perfil activo,
  - acciones disponibles,
  - matriz CRUD completa por perfil,
  - experiencia progresiva por rol.
- `Reglas` ahora diferencia consulta vs edicion:
  - tecnico de campo puede consultar reglas,
  - agronomo y admin pueden ajustar umbrales.

## Matriz de criterio

- Productor: consulta finca/lotes, atiende recomendaciones y revisa reportes.
- Tecnico de campo: registra productores, fincas, lotes, sensores, mediciones y atiende recomendaciones.
- Agronomo: analiza, registra mediciones, atiende recomendaciones y configura reglas.
- Entidad territorial: gestiona productores/fincas y consulta impacto.
- Admin: acceso completo.

## Validacion

- UI condicionada por capacidades.
- API protegida por capacidades.
- Rutas alineadas con permisos.
- Matriz visible en perfil.

## Siguiente paso recomendado

Persistir esta matriz en roles reales cuando se implemente autenticacion productiva con PostgreSQL.
