# Sprint 25 - Dashboard por audiencia

## Objetivo

Hacer que el inicio de AgroNodo responda a la logica de experiencia progresiva: una misma fuente de datos, distintas lecturas segun el usuario.

## Problema

El dashboard estaba centrado en el productor, pero AgroNodo tambien debe ser util para tecnicos de campo, agronomos, entidades territoriales y administradores.

## Decision de producto

El dashboard no se duplica por perfil. Se parametriza por rol:

- Cambia la pregunta principal.
- Cambia la narrativa.
- Cambian los KPI prioritarios.
- Se mantiene la misma informacion base.

## Implementacion

- `src/app/page.tsx` ahora consume `demoProfile.role`.
- Se agrego contenido principal por rol:
  - Productor: decision del dia.
  - Tecnico de campo: seguimiento operativo.
  - Agronomo: diagnostico agronomico.
  - Entidad territorial: impacto del programa.
  - Administrador: salud del piloto.
- Se agrego seleccion de estadisticas por rol.
- La vista activa se muestra en el panel lateral del dashboard.

## Criterio UX

El productor no debe entrar a interpretar tableros tecnicos. El sistema debe responder que hacer hoy.

El tecnico necesita priorizacion operativa.

El agronomo necesita ver patrones, diagnostico y variables.

La entidad necesita cobertura, ahorro e impacto.

## Riesgos

- Si se agregan demasiadas excepciones por rol, el dashboard puede volverse dificil de mantener.
- La siguiente fase debe mover parte de esta configuracion a helpers reutilizables si crece demasiado.

## Siguiente paso recomendado

Crear selector de vista en modo demo para validar rapidamente como cambia AgroNodo entre productor, tecnico, agronomo y entidad sin cambiar codigo.
