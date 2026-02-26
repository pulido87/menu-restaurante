# Plataforma de Transporte (Cliente + Conductor)

Proyecto monorepo con dos aplicaciones web separadas (cliente y conductor) que comparten un backend unificado, base de datos PostgreSQL, OpenStreetMap + Leaflet y comunicación en tiempo real con Socket.IO.

## Estructura

- `backend/`: API REST + WebSockets + JWT + roles + PostgreSQL.
- `client-app/`: Aplicación web para clientes.
- `driver-app/`: Aplicación web para conductores.

## Stack

- **Frontend**: React + Vite + Leaflet + Socket.IO client.
- **Backend**: Node.js + Express + MVC + Socket.IO + JWT.
- **DB**: PostgreSQL con tablas normalizadas, índices y relaciones.

## Modelo de datos

Script en `backend/sql/init.sql`:

- `users`: usuarios cliente/conductor.
- `rides`: viajes con estados (`requested`, `accepted`, `on_the_way`, `in_progress`, `completed`, `cancelled`).
- `driver_locations`: geolocalización de conductores en tiempo real.

## Ejecutar localmente

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run db:init
npm run dev
```

### 2) App Cliente

```bash
cd client-app
cp .env.example .env
npm install
npm run dev
```

### 3) App Conductor

```bash
cd driver-app
cp .env.example .env
npm install
npm run dev
```

## Variables importantes

Backend (`backend/.env`):
- `DATABASE_URL`
- `JWT_SECRET`
- `CORS_ORIGIN`
- `DRIVER_SEARCH_RADIUS_KM`
- `SURGE_MULTIPLIER`

Frontend (`client-app/.env` y `driver-app/.env`):
- `VITE_API_URL`
- `VITE_SOCKET_URL`

## Flujo en tiempo real

1. Cliente solicita viaje.
2. Backend busca conductores cercanos (radio configurable).
3. Se notifica a conductores disponibles vía Socket.IO.
4. Primer conductor en aceptar queda asignado.
5. Estado del viaje y ubicación del conductor se propagan en vivo.

## Producción (Insforge)

- Backend listo para deploy como servicio Node (incluye `Dockerfile` opcional).
- Asegurar `DATABASE_URL` de PostgreSQL administrado.
- Configurar `CORS_ORIGIN` con dominios de cliente y conductor.
- Levantar frontend cliente y conductor como sitios estáticos separados.
- Ejecutar `npm run db:init` en el backend antes de abrir tráfico.

## Seguridad y operación

- Helmet + CORS + Rate limit.
- Manejo centralizado de errores.
- Logs estructurados JSON.
- Autenticación JWT y autorización por roles.
