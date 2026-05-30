import { useState } from "react";
import "./Modal.css";

export default function ClaimModal({ itemNombre, onClose, onSubmit }) {
  const [evidencia, setEvidencia] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(evidencia);
    setEvidencia("");
  };

  return (
    <div className="modal active">
      <div className="modal-content">
        <h2>Reclamar: {itemNombre}</h2>
        <p className="modal-hint">
          Para reclamar este objeto, por favor proporciona evidencia contundente
          (marcas específicas, contenido del objeto, color exacto o detalles internos)
          para validar que te pertenece.
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
}