import { useState } from "react";
import "./EditModal.css";

const CATEGORIAS = ["Electrónicos", "Deportes", "Útiles Estudiantiles", "Accesorios", "Ropa", "Otros"];
const NUEVA_CATEGORIA = "__nueva_categoria__";

const EditModal = ({ item, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: item.nombre,
    categoria: item.categoria,
    descripcion: item.descripcion,
    icono: item.icono,
  });
  // Si el objeto ya tiene una categoría que no está en la lista predefinida
  // (por ejemplo, una agregada manualmente antes), se abre directamente en modo texto
  // para no perder ni sobrescribir su valor original.
  const [categoriaPersonalizada, setCategoriaPersonalizada] = useState(
    !CATEGORIAS.includes(item.categoria)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoriaChange = (e) => {
    const valor = e.target.value;
    if (valor === NUEVA_CATEGORIA) {
      setCategoriaPersonalizada(true);
      setFormData((prev) => ({ ...prev, categoria: "" }));
    } else {
      setFormData((prev) => ({ ...prev, categoria: valor }));
    }
  };

  const cancelarCategoriaNueva = () => {
    setCategoriaPersonalizada(false);
    setFormData((prev) => ({ ...prev, categoria: CATEGORIAS[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...item, ...formData });
  };

  return (
    <div className="modal active" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content edit-modal-content">
        <div className="modal-header">
          <h2>Editar Objeto</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
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
            {categoriaPersonalizada ? (
              <div className="custom-field-row">
                <input
                  type="text"
                  id="categoria"
                  name="categoria"
                  placeholder="Escribe el nombre de la nueva categoría"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                  autoFocus
                />
                <button type="button" className="link-btn" onClick={cancelarCategoriaNueva}>
                  Cancelar
                </button>
              </div>
            ) : (
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleCategoriaChange}
                required
              >
                <option value="Electrónicos">Electrónicos</option>
                <option value="Deportes">Deportes</option>
                <option value="Útiles Estudiantiles">Útiles Estudiantiles</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Ropa">Ropa</option>
                <option value="Otros">Otros</option>
                <option value={NUEVA_CATEGORIA}>+ Agregar nueva categoría</option>
              </select>
            )}
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
              maxLength="4"
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
};

export default EditModal;