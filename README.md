# Proyecto Progra Web — Objetos Perdidos del Campus

Este paquete contiene el proyecto organizado en dos carpetas, siguiendo el
mismo esquema de los repos de referencia de clase (uno para backend, otro
para frontend):

```
proyecto-progra-web/
├── backend/    ← NUEVO. API REST lista para conectar a PostgreSQL (aún no creada).
└── frontend/   ← Tal como estaba en tu repo (proyecto-progra-web), sin cambios todavía.
```

## ¿Qué se hizo?
Se avanzó el **backend** siguiendo la arquitectura usada en clase
(`route → middleware → controller → service → repository → model`, con
Express 5 + Sequelize + PostgreSQL), tomando como referencia
`prograweb-2026-1-deployment-back`. El dominio (usuarios, objetos, reclamos)
se modeló a partir de lo que ya existe en tu frontend
(`src/data/mockData.js` y los componentes `ItemsPage`, `ClaimsTable`,
`UsersTable`, etc.).

Todo el código del backend está probado y funcional (login, JWT, CRUD de
objetos, reclamos, gestión de usuarios), pero la base de datos real
**todavía no fue creada** — eso queda para cuando ustedes decidan hacerlo,
siguiendo las instrucciones de `backend/README.md`.

## Siguientes pasos
1. Revisar `backend/README.md` para poner en marcha la base de datos cuando estén listos.
2. Conectar el frontend a la API (reemplazar el estado local de `App.jsx` por llamadas a los endpoints del backend). Esto queda pendiente para la siguiente iteración, tal como lo conversamos.
