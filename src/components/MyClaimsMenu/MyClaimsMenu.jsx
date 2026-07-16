import { useEffect, useRef, useState } from "react";
import reclamoService from "../../services/reclamo.service";
import getErrorMessage from "../../services/getErrorMessage";
import { useAuth } from "../../context/AuthContext";
import "./MyClaimsMenu.css";

const ESTADO_INFO = {
  pendiente: { label: "Pendiente", className: "estado-pill pendiente" },
  aprobado: { label: "Aprobado", className: "estado-pill aprobado" },
  rechazado: { label: "Rechazado", className: "estado-pill rechazado" },
};

const claveDescartados = (usuarioId) => `reclamos_descartados_${usuarioId ?? "anon"}`;

const cargarDescartados = (usuarioId) => {
  try {
    const guardado = localStorage.getItem(claveDescartados(usuarioId));
    return guardado ? new Set(JSON.parse(guardado)) : new Set();
  } catch {
    return new Set();
  }
};

const guardarDescartados = (usuarioId, set) => {
  try {
    localStorage.setItem(claveDescartados(usuarioId), JSON.stringify([...set]));
  } catch {
    // Si falla el guardado (p. ej. localStorage lleno), simplemente no persiste.
  }
};

const MyClaimsMenu = () => {
  const { usuarioActual } = useAuth();
  const usuarioId = usuarioActual?.id;
  const [open, setOpen] = useState(false);
  const [reclamos, setReclamos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [descartados, setDescartados] = useState(() => cargarDescartados(usuarioId));
  const contenedorRef = useRef(null);

  const cargarReclamos = async () => {
    setCargando(true);
    try {
      const data = await reclamoService.listarMios();
      setReclamos(data);
    } catch (error) {
      console.error("Error al cargar mis reclamos:", getErrorMessage(error));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarReclamos();
  }, []);

  useEffect(() => {
    setDescartados(cargarDescartados(usuarioId));
  }, [usuarioId]);

  useEffect(() => {
    const handleClickFuera = (e) => {
      if (contenedorRef.current && !contenedorRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickFuera);
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  const toggleOpen = () => {
    const next = !open;
    setOpen(next);
    if (next) cargarReclamos();
  };

  const descartarNotificacion = (id) => {
    setDescartados((prev) => {
      const actualizado = new Set(prev);
      actualizado.add(id);
      guardarDescartados(usuarioId, actualizado);
      return actualizado;
    });
  };

  const visibles = reclamos.filter((r) => !descartados.has(r.id));
  const pendientes = visibles.filter((r) => r.estado === "pendiente");
  const resueltos = visibles
    .filter((r) => r.estado === "aprobado" || r.estado === "rechazado")
    .sort((a, b) => (b.id ?? 0) - (a.id ?? 0));

  return (
    <div className="my-claims-menu" ref={contenedorRef}>
      <button
        type="button"
        className="my-claims-bell"
        onClick={toggleOpen}
        aria-label="Mis reclamos"
      >
        🔔
        {pendientes.length > 0 && (
          <span className="my-claims-badge">{pendientes.length}</span>
        )}
      </button>

      {open && (
        <div className="my-claims-dropdown">
          <div className="my-claims-dropdown-header">
            <h3>Mis Reclamos</h3>
          </div>

          <div className="my-claims-dropdown-body">
            {cargando ? (
              <p className="my-claims-empty">Cargando...</p>
            ) : visibles.length === 0 ? (
              <p className="my-claims-empty">
                {reclamos.length === 0
                  ? "Aún no has hecho ningún reclamo."
                  : "No tienes notificaciones."}
              </p>
            ) : (
              <>
                <div className="my-claims-section">
                  <span className="my-claims-section-title">
                    Pendientes ({pendientes.length})
                  </span>
                  {pendientes.length === 0 ? (
                    <p className="my-claims-empty small">No tienes reclamos pendientes.</p>
                  ) : (
                    pendientes.map((rec) => (
                      <div className="my-claims-item" key={rec.id}>
                        <span className="my-claims-item-icono">{rec.objetoIcono}</span>
                        <div className="my-claims-item-info">
                          <span className="my-claims-item-nombre">{rec.objetoNombre}</span>
                          <span className={ESTADO_INFO.pendiente.className}>
                            {ESTADO_INFO.pendiente.label}
                          </span>
                        </div>
                        <button
                          type="button"
                          className="my-claims-item-close"
                          onClick={() => descartarNotificacion(rec.id)}
                          aria-label="Eliminar notificación"
                          title="Eliminar notificación"
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="my-claims-section">
                  <span className="my-claims-section-title">Resueltos</span>
                  {resueltos.length === 0 ? (
                    <p className="my-claims-empty small">Todavía no tienes reclamos resueltos.</p>
                  ) : (
                    resueltos.map((rec) => {
                      const info = ESTADO_INFO[rec.estado] ?? ESTADO_INFO.pendiente;
                      return (
                        <div className="my-claims-item" key={rec.id}>
                          <span className="my-claims-item-icono">{rec.objetoIcono}</span>
                          <div className="my-claims-item-info">
                            <span className="my-claims-item-nombre">{rec.objetoNombre}</span>
                            <span className={info.className}>{info.label}</span>
                            {rec.estado === "rechazado" && rec.motivoRechazo && (
                              <span className="my-claims-item-motivo">
                                Motivo: {rec.motivoRechazo}
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            className="my-claims-item-close"
                            onClick={() => descartarNotificacion(rec.id)}
                            aria-label="Eliminar notificación"
                            title="Eliminar notificación"
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyClaimsMenu;