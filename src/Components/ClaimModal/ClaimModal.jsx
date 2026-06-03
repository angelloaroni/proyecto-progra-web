import { useState } from "react";
import "./ClaimModal.css";

const ClaimModal = ({ itemNombre, onClose, onSubmit }) => {
  const [evidencia, setEvidencia] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(evidencia);
    setEvidencia("");
  };

  return (
    <div className="modal active" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Reclamar Objeto</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-item-name">
          <span className="modal-item-label">Objeto:</span>
          <span>{itemNombre}</span>
        </div>
        <p className="modal-hint">
          Proporciona evidencia contundente (marcas específicas, contenido del objeto,
          color exacto o detalles internos) para validar que te pertenece.
        </p>
        <form className="flex-column" onSubmit={handleSubmit}>
          <textarea
            rows="4"
            placeholder="Describe características únicas que solo el dueño sabría..."
            value={evidencia}
            onChange={(e) => setEvidencia(e.target.value)}
            required
          />
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn">
              Enviar Reclamo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClaimModal;
