import "./ItemDetailModal.css";

// Muestra el detalle completo de un objeto, incluyendo el lugar donde se
// encontró. Se usa tanto para alumnos (para reclamar) como para el admin
// (para editar), reutilizando el mismo modal.
const ItemDetailModal = ({ objeto, rol, onClose, onClaim, onEdit }) => {
  const handleAccion = () => {
    onClose();
    if (rol === "admin") {
      onEdit(objeto);
    } else {
      onClaim(objeto.id, objeto.nombre);
    }
  };

  return (
    <div className="modal active" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content detail-modal-content">
        <div className="modal-header">
          <h2>
            <span className="detail-icono">{objeto.icono}</span> {objeto.nombre}
          </h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="item-tags">
          <span className="tag">{objeto.categoria}</span>
          {objeto.estado && (
            <span className={`estado-badge ${objeto.estado === "disponible" ? "disponible" : "reclamado"}`}>
              {objeto.estado === "disponible" ? "Disponible" : "Reclamado"}
            </span>
          )}
        </div>

        <p className="detail-descripcion">{objeto.descripcion}</p>

        <div className="detail-ubicacion">
          <span className="detail-ubicacion-label">📍 Lugar donde se encontró:</span>
          <span>{objeto.ubicacion || "No especificado"}</span>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
          <button type="button" className="btn" onClick={handleAccion}>
            {rol === "admin" ? "✏️ Editar" : "Reclamar Objeto"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailModal;