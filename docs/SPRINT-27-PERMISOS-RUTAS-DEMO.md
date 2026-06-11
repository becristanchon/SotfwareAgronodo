# Sprint 27 - Permisos y rutas por perfil demo

## Objetivo

Hacer que los perfiles diferenciados tengan impacto real en la experiencia, no solo en el menu.

## Decision CTO

Antes de implementar autenticacion productiva con JWT y base de datos, AgroNodo debe validar si la separacion por perfiles es comprensible y util. Para eso se agrega control de acceso demo basado en la cookie de rol.

## Implementacion

- `middleware.ts` protege rutas de la aplicacion.
- Si no existe perfil activo, el usuario va a `/login`.
- Si el perfil no puede acceder a una ruta, el usuario va a `/perfil?acceso=limitado`.
- `src/lib/access-policy.ts` centraliza rutas permitidas por perfil.
- `src/lib/auth-constants.ts` centraliza el nombre de la cookie demo.
- `/perfil` muestra un mensaje claro cuando el acceso fue limitado.

## Politica por perfil

- Productor: hoy, agua, lotes, recomendaciones, avance y perfil.
- Tecnico de campo: seguimiento operativo, productores, dispositivos y reglas.
- Agronomo: historicos, diagnostico, reglas, reporte y dispositivos.
- Entidad territorial: impacto, productores, reporte, adopcion y riesgos.
- Administrador: acceso completo.

## Lo que se valida

- Si un productor entiende AgroNodo sin ver complejidad tecnica.
- Si un tecnico puede operar el seguimiento de campo.
- Si un agronomo tiene acceso a analisis y reglas.
- Si una entidad ve informacion de cobertura e impacto.

## Siguiente paso recomendado

Pasar de permisos por ruta a permisos por accion:

- Crear botones condicionados por capacidades.
- Ocultar formularios de creacion a usuarios sin permiso.
- Separar lectura, edicion y administracion.
