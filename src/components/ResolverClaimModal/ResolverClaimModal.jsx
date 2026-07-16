import { useState } from "react";
import "./ResolverClaimModal.css";

// Formulario de validación de reclamos: le muestra al admin todo el
// contexto del objeto (ícono, categoría, descripción, ubicación donde se
// encontró) junto a la evidencia del alumno, para que pueda decidir con
// información completa. Si rechaza, puede escribir un motivo que queda
// guardado y se le puede mostrar después al alumno.
const ResolverReclamoModal = ({ reclamo, onClose, onResolver }) => {
  const [motivoRechazo, setMotivoRechazo] = useState("");
  const [modoRechazo, setModoRechazo] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleAceptar = async () => {
    if (!window.confirm(`¿Confirmas que el objeto "${reclamo.objetoNombre}" le pertenece a este alumno?`)) {
      return;
    }
    setEnviando(true);
    try {
      await onResolver(reclamo.id, true, null);
    } finally {
      setEnviando(false);
    }
  };

  const handleConfirmarRechazo = async () => {
    setEnviando(true);
    try {
      await onResolver(reclamo.id, false, motivoRechazo);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="modal active" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content resolver-modal-content">
        <div className="modal-header">
          <h2>
            <span className="resolver-icono">{reclamo.objetoIcono}</span> Revisar Reclamo
          </h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="resolver-section">
          <h3>Objeto reclamado</h3>
          <div className="resolver-item-tags">
            <span className="tag">{reclamo.objetoCategoria}</span>
          </div>
          <p className="resolver-item-nombre">{reclamo.objetoNombre}</p>
          {reclamo.objetoDescripcion && (
            <p className="resolver-item-descripcion">{reclamo.objetoDescripcion}</p>
          )}
          {reclamo.objetoUbicacion && (
            <p className="resolver-item-ubicacion">📍 {reclamo.objetoUbicacion}</p>
          )}
        </div>

        <div className="resolver-section">
          <h3>Datos del alumno</h3>
          <p className="resolver-alumno">
            {reclamo.alumnoNombre} — <code className="codigo">{reclamo.alumnoCodigo}</code>
          </p>
        </div>

        <div className="resolver-section">
          <h3>Evidencia presentada</h3>
          <p className="resolver-evidencia">"{reclamo.evidencia}"</p>
        </div>

        {modoRechazo && (
          <div className="resolver-section">
            <label htmlFor="motivoRechazo">Motivo del rechazo (opcional)</label>
            <textarea
              id="motivoRechazo"
              rows="3"
              placeholder="Ej: La evidencia no coincide con las características registradas del objeto..."
              value={motivoRechazo}
              onChange={(e) => setMotivoRechazo(e.target.value)}
            />
          </div>
        )}

        <div className="modal-actions">
          {modoRechazo ? (
            <>
              <button type="button" className="btn btn-secondary" onClick={() => setModoRechazo(false)} disabled={enviando}>
                Volver
              </button>
              <button type="button" className="btn btn-danger" onClick={handleConfirmarRechazo} disabled={enviando}>
                {enviando ? "Rechazando..." : "Confirmar Rechazo"}
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={enviando}>
                Cancelar
              </button>
              <button type="button" className="btn btn-danger" onClick={() => setModoRechazo(true)} disabled={enviando}>
                Rechazar
              </button>
              <button type="button" className="btn btn-accept" onClick={handleAceptar} disabled={enviando}>
                {enviando ? "Aceptando..." : "Aceptar"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResolverReclamoModal;