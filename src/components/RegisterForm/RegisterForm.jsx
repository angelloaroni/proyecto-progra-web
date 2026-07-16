import { useEffect, useState } from "react";
import objetoService from "../../services/objeto.service";
import categoriaService from "../../services/categoria.service";
import getErrorMessage from "../../services/getErrorMessage";
import EmojiPicker from "../EmojiPicker/EmojiPicker";
import LocationPicker from "../LocationPicker/LocationPicker";
import "./RegisterForm.css";

// Categorías de respaldo por si todavía no cargó la respuesta del backend.
const CATEGORIAS_RESPALDO = ["Electrónicos", "Deportes", "Útiles Estudiantiles", "Prendas de Vestir", "Otros"];
const NUEVA_CATEGORIA = "__nueva_categoria__";

const FORM_INICIAL = { nombre: "", categoria: "", descripcion: "", icono: "📦", ubicacion: "" };

const RegisterForm = () => {
  const [form, setForm] = useState(FORM_INICIAL);
  const [categorias, setCategorias] = useState(CATEGORIAS_RESPALDO);
  const [categoriaPersonalizada, setCategoriaPersonalizada] = useState(false);
  const [enviando, setEnviando] = useState(false);

  // Las categorías vienen del backend (tabla real "categorias"), así una
  // categoría creada por un admin queda disponible para todos, no solo local.
  const cargarCategorias = async () => {
    try {
      const data = await categoriaService.listar();
      if (data?.length) {
        setCategorias(data.map((c) => c.nombre));
      }
    } catch (error) {
      console.error("Error al cargar categorías:", getErrorMessage(error));
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.ubicacion) {
      alert("Selecciona el lugar donde se encontró el objeto.");
      return;
    }

    setEnviando(true);
    try {
      // Si es una categoría nueva, primero se registra de verdad en el
      // backend (tabla "categorias") para que quede disponible siempre,
      // no solo en este formulario.
      if (categoriaPersonalizada) {
        try {
          const resultadoCategoria = await categoriaService.crear(form.categoria.trim());
          if (!resultadoCategoria.success && resultadoCategoria.message !== "Esa categoría ya existe.") {
            alert(resultadoCategoria.message);
            setEnviando(false);
            return;
          }
        } catch (error) {
          alert(getErrorMessage(error, "No se pudo registrar la nueva categoría."));
          setEnviando(false);
          return;
        }
      }

      const response = await objetoService.crear(form);
      alert(response.message);
      if (response.success) {
        setForm(FORM_INICIAL);
        setCategoriaPersonalizada(false);
        cargarCategorias();
      }
    } catch (error) {
      alert(getErrorMessage(error, "No se pudo publicar el objeto."));
    } finally {
      setEnviando(false);
    }
  };

  const handleCategoriaChange = (e) => {
    const valor = e.target.value;
    if (valor === NUEVA_CATEGORIA) {
      setCategoriaPersonalizada(true);
      setForm({ ...form, categoria: "" });
    } else {
      setForm({ ...form, categoria: valor });
    }
  };

  const cancelarCategoriaNueva = () => {
    setCategoriaPersonalizada(false);
    setForm({ ...form, categoria: "" });
  };

  return (
    <div className="box register-box">
      <h2>Registrar Nuevo Objeto Perdido</h2>
      <form className="flex-column" onSubmit={handleSubmit}>
        <div className="register-form-row">
          <div className="form-group">
            <label>Nombre del objeto</label>
            <input
              type="text"
              placeholder="Ej: Casaca negra con logo azul"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Categoría</label>
            {categoriaPersonalizada ? (
              <div className="custom-field-row">
                <input
                  type="text"
                  placeholder="Escribe el nombre de la nueva categoría"
                  value={form.categoria}
                  onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                  required
                  autoFocus
                />
                <button type="button" className="link-btn" onClick={cancelarCategoriaNueva}>
                  Cancelar
                </button>
              </div>
            ) : (
              <select
                value={form.categoria}
                onChange={handleCategoriaChange}
                required
              >
                <option value="" disabled>Selecciona una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>{categoria}</option>
                ))}
                <option value={NUEVA_CATEGORIA}>+ Agregar nueva categoría</option>
              </select>
            )}
          </div>
        </div>
        <div className="form-group">
          <label>Descripción detallada</label>
          <textarea
            rows="3"
            placeholder="¿Qué características tiene el objeto?"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            required
          />
        </div>
        <div className="register-form-row">
          <div className="form-group icon-select-group">
            <EmojiPicker
              value={form.icono}
              onChange={(icono) => setForm({ ...form, icono })}
            />
          </div>
          <div className="form-group">
            <LocationPicker
              value={form.ubicacion}
              onChange={(ubicacion) => setForm({ ...form, ubicacion })}
            />
          </div>
        </div>
        <button type="submit" className="btn publish-btn" disabled={enviando}>
          {enviando ? "Publicando..." : "Publicar Objeto"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;