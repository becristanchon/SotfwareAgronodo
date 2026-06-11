# Revision del plan MVP AgroNodo

## Estado actual

AgroNodo ya tiene una base funcional para validar producto:

- Productores, fincas, lotes y sensores virtuales.
- Lecturas simuladas e historicos.
- Alertas y recomendaciones.
- Perfil demo, login demo y permisos por rol.
- Experiencia progresiva por productor, tecnico, agronomo, entidad y admin.
- Giro estrategico hacia gestion inteligente del agua.
- Estado Vivo del Cultivo.
- Priorizacion automatica de finca.
- Bitacora demo de decisiones de campo.

## Lo que faltaba con mayor impacto

El hueco principal era cerrar el ciclo de decision:

1. AgroNodo detecta una condicion.
2. AgroNodo recomienda una accion.
3. El usuario decide que hacer.
4. AgroNodo registra la decision.
5. AgroNodo estima impacto.

El sprint 32 cubre este hueco en modo demo.

## Riesgos pendientes

- Aun no hay persistencia real de decisiones.
- Login sigue siendo demo.
- Los roles de producto todavia no estan migrados formalmente al esquema Prisma.
- El ahorro hidrico es estimado, no comprobado.
- Falta una vista territorial fuerte para entidades.

## Proximos sprints recomendados

### Sprint 33 - Persistencia de decisiones

Crear modelo `FieldDecision` en Prisma y API real para registrar decisiones.

### Sprint 34 - Impacto hidrico

Calcular ahorro estimado vs ahorro comprobado usando decisiones registradas.

### Sprint 35 - Vista territorial

Crear dashboard para asociaciones, UMATAS y alcaldias con fincas priorizadas.

### Sprint 36 - Autenticacion real

Conectar login con usuarios reales, password hash, cookie segura y roles persistentes.

### Sprint 37 - Preparacion piloto

Crear flujo guiado para demo comercial/piloto con productor o entidad.
