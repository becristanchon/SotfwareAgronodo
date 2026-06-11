# Despliegue AgroNodo en Neon + Vercel

Esta guia deja el camino minimo para ejecutar AgroNodo con PostgreSQL administrado en Neon y despliegue en Vercel.

## Variables requeridas en Vercel

Configurar en Project Settings > Environment Variables:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB?sslmode=require"
AGRONODO_DATA_SOURCE="database"
AGRONODO_AUTH_SECRET="valor-largo-aleatorio-para-produccion"
NEXT_TELEMETRY_DISABLED=1
```

Notas:

- `DATABASE_URL` debe ser la cadena de conexion de Neon para PostgreSQL.
- `AGRONODO_DATA_SOURCE=database` activa persistencia real. Si queda en `demo`, la app no usara Neon.
- `AGRONODO_AUTH_SECRET` reemplaza cualquier variable antigua llamada `JWT_SECRET`.
- No subir `.env` al repositorio.

## Migraciones en Neon

Antes o despues del primer despliegue, aplicar el esquema en Neon:

```bash
npm run prisma:deploy
```

Ese comando ejecuta:

```bash
prisma migrate deploy
```

Para datos demo iniciales, solo si se quieren usuarios y fincas de prueba:

```bash
npm run prisma:seed
```

Usuarios demo creados por seed:

- `productor@agronodo.local`
- `tecnico@agronodo.local`
- `agronomo@agronodo.local`
- `entidad@agronodo.local`
- `admin@agronodo.local`

Clave demo:

```text
agronodo-demo
```

## Build en Vercel

Vercel puede usar la configuracion por defecto de Next.js:

```bash
npm run build
```

El proyecto incluye `postinstall` para ejecutar `prisma generate` despues de instalar dependencias.

## Checklist de verificacion

1. Variables creadas en Vercel para Production, Preview y Development si aplica.
2. `AGRONODO_DATA_SOURCE` en `database`.
3. `AGRONODO_AUTH_SECRET` no usa el valor local de desarrollo.
4. Migraciones aplicadas con `npm run prisma:deploy`.
5. Seed ejecutado solo si se necesitan usuarios demo.
6. Login probado en `/login`.
7. CRUD probado creando productor, finca, lote, sensor y lectura.

## Riesgos conocidos

- Si `DATABASE_URL` apunta a local, Vercel no podra conectarse.
- Si `AGRONODO_DATA_SOURCE` queda en `demo`, la app funcionara pero no guardara en Neon.
- Si falta `AGRONODO_AUTH_SECRET`, las sesiones pueden quedar usando el secreto de desarrollo.
- Si no se ejecutan migraciones, Neon estara vacio y las APIs fallaran al consultar tablas inexistentes.
