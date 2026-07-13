# Frontend - Objetos Perdidos (Campus)

SPA en React + Vite para el sistema de objetos perdidos del campus. Ya está
conectada a la API real del backend (Express + Sequelize + PostgreSQL) —
no usa datos simulados (`mockData.js` fue eliminado).

## Stack
- React 19 + Vite
- React Router DOM 7
- Axios (cliente HTTP hacia el backend)

## Arquitectura

```
src/
├── api/                     # capa de acceso a la API (una función por endpoint)
│   ├── axiosClient.js       # instancia de axios: baseURL + interceptor JWT
│   ├── authService.js       # /auth (login, registro, usuarios)
│   ├── objetoService.js     # /objeto (catálogo)
│   ├── reclamoService.js    # /reclamo
│   └── getErrorMessage.js   # helper para mostrar errores del backend
├── Components/               # componentes de UI (sin cambios de diseño)
└── App.jsx                   # estado global, rutas protegidas por rol, sesión
```

### Convenciones
- El JWT se guarda en `localStorage` (`token`) y se adjunta automáticamente a
  cada petición vía el interceptor de `axiosClient.js`.
- El usuario autenticado también se guarda en `localStorage` (`usuario`) para
  no perder la sesión al recargar la página.
- Las rutas `/student` y todas las `/admin/*` están protegidas: si no hay
  sesión iniciada (o el rol no corresponde), se redirige a `/`.
- Los alumnos solo ven en el catálogo los objetos con `estado: "disponible"`;
  el panel admin muestra todos, con una etiqueta de estado.

## Puesta en marcha

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Copia `.env.example` a `.env` y ajusta `VITE_API_URL` si tu backend no
   corre en `http://localhost:3006`.
3. Asegúrate de que el backend esté corriendo y con la base de datos ya
   migrada (`npm run migrate` en la carpeta `backend`, ver su README).
4. Levanta el frontend:
   ```bash
   npm run dev
   ```

## Usuarios semilla (creados por `backend/src/data/migrate.js`)
| Código      | Password | Rol     |
|-------------|----------|---------|
| admin       | admin    | admin   |
| 20231456    | 1234     | student |
| 20220890    | 1234     | student |

(el usuario `20210055` viene con acceso bloqueado, útil para probar ese caso)

## Pendiente / próximos pasos
- Crear la base de datos real y ejecutar la migración del backend.
- Definir `VITE_API_URL` apuntando al backend desplegado (producción).
