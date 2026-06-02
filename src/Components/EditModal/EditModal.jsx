import { useState } from "react";
import "./EditModal.css";

export default function EditModal({ item, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    nombre: item.nombre,
    categoria: item.categoria,
    descripcion: item.descripcion,
    icono: item.icono,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...item, ...formData });
  };

  return (
    <div className="modal active">
      <div className="modal-content edit-modal-content">
        <h2>Editar Objeto: {item.nombre}</h2>
        <form className="flex-column" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre del Objeto</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoria">Categoría</label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
            >
              <option value="Electrónicos">Electrónicos</option>
              <option value="Deportes">Deportes</option>
              <option value="Útiles Estudiantiles">Útiles Estudiantiles</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Ropa">Ropa</option>
              <option value="Otros">Otros</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="icono">Emoji/Icono</label>
            <input
              type="text"
              id="icono"
              name="icono"
              value={formData.icono}
              onChange={handleChange}
              maxLength="2"
              placeholder="ej: 📱"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

