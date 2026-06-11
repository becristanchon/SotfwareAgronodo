# Sprint 24 - Experiencia progresiva multiusuario

## Objetivo

Convertir AgroNodo en una plataforma multinivel donde la misma informacion hidrica y agricola pueda consumirse con distinta profundidad segun el perfil del usuario.

## Decision de producto

AgroNodo no debe tener una unica interfaz universal. Debe tener capas de experiencia:

- Productor: respuestas simples y accionables.
- Tecnico de campo: seguimiento operativo.
- Agronomo: analisis y diagnostico.
- Entidad territorial: impacto, cobertura y adopcion.
- Administrador: gestion completa de la operacion.

## Ajustes implementados

- Se creo una capa local de roles de experiencia en `src/lib/profile.ts`.
- Se separo el concepto de rol de experiencia del rol tecnico actual de base de datos.
- Se agrego mapeo temporal desde roles antiguos de Prisma:
  - `VIEWER` -> `PRODUCER`
  - `TECHNICIAN` -> `FIELD_TECH`
  - `ADMIN` -> `ADMIN`
- La navegacion ahora se arma segun el rol activo.
- La vista demo queda configurada como `Productor`.
- La pantalla de Perfil ahora explica las capas de experiencia de AgroNodo.

## Lo que se evita por ahora

- No se agregaron nuevas librerias interactivas.
- No se migro todavia el enum `UserRole` de Prisma.
- No se duplicaron dashboards por perfil.

## Criterio CTO

La interactividad no debe depender todavia de librerias nuevas. Primero necesitamos claridad de producto, lenguaje correcto y navegacion por perfil. Mas adelante, si las pantallas de analisis lo justifican, se podrian evaluar librerias como Recharts, Tremor, React Aria o Framer Motion.

## Riesgos

- Si se activa PostgreSQL con usuarios reales, sera necesario migrar formalmente el modelo de roles.
- Si las vistas por rol crecen sin gobierno de producto, pueden convertirse en modulos duplicados.

## Siguiente paso recomendado

Crear contenido diferenciado por rol en la pantalla principal:

- Productor: decision del dia.
- Tecnico: fincas y alertas por atender.
- Agronomo: historicos, tendencias y reglas.
- Entidad: cobertura, ahorro hidrico e impacto territorial.
