# Sprint 26 - Login y perfiles diferenciados demo

## Objetivo

Permitir probar AgroNodo con perfiles diferenciados antes de conectar autenticacion real con base de datos.

## Decision CTO

Para el MVP pre-productivo se implementa un login demo basado en cookie de rol. Esto permite validar experiencia, navegacion y dashboard por perfil sin bloquear el avance con infraestructura de autenticacion completa.

## Perfiles disponibles

- Productor
- Tecnico de campo
- Agronomo
- Entidad territorial
- Administrador AgroNodo

## Implementacion

- `src/app/login/page.tsx`: pantalla de seleccion de perfil demo.
- `src/app/api/auth/login/route.ts`: guarda el rol seleccionado en cookie.
- `src/app/api/auth/logout/route.ts`: limpia la cookie y vuelve al login.
- `src/lib/session.ts`: resuelve el perfil activo desde cookie.
- `src/components/app-shell.tsx`: usa el perfil activo para navegacion y header.
- `src/app/page.tsx`: usa el perfil activo para narrativa y KPIs.
- `src/app/perfil/page.tsx`: muestra el perfil activo.
- `src/app/api/me/route.ts`: expone el usuario activo demo.

## Lo que no se implementa todavia

- Login real con email y contrasena.
- JWT productivo.
- Middleware de proteccion de rutas.
- Recuperacion de contrasena.
- Gestion real de usuarios.

## Siguiente paso recomendado

Conectar este flujo demo con autenticacion real:

- Validar usuario por email y password.
- Emitir JWT o cookie segura de sesion.
- Migrar roles de Prisma a roles de experiencia.
- Proteger rutas segun capacidades.
