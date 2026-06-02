import { useState } from "react";
import "./RegisterForm.css";

const RegisterForm = ({ onRegistrar }) => {
  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    icono: "⌨️",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegistrar(form);
    setForm({ nombre: "", categoria: "", descripcion: "", icono: "⌨️" });
  };

  return (
    <div className="box">
      <h2>Registrar Nuevo Objeto Perdido</h2>
      <form className="flex-column" onSubmit={handleSubmit}>
        <div className="register-form-row">
          <input
            type="text"
            placeholder="Nombre del objeto (Ej. Casaca negra)"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
          />
          <select
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            required
          >
            <option value="" disabled>Selecciona una categoría</option>
            <option value="Electrónicos">Electrónicos</option>
            <option value="Deportes">Deportes</option>
            <option value="Útiles Estudiantiles">Útiles Estudiantiles</option>
            <option value="Prendas de Vestir">Prendas de Vestir</option>
            <option value="Otros">Otros</option>
          </select>
        </div>
        <textarea
          rows="3"
          placeholder="Descripción detallada de dónde se encontró y características..."
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          required
        />
        <select
          value={form.icono}
          onChange={(e) => setForm({ ...form, icono: e.target.value })}
        >
          <option value="⌨️">Teclado (⌨️)</option>
          <option value="🎾">Deportes (🎾)</option>
          <option value="📘">Cuaderno / Libro (📘)</option>
          <option value="🧥">Ropa (🧥)</option>
          <option value="🎒">Mochila (🎒)</option>
          <option value="📱">Celular / Gadget (📱)</option>
        </select>
        <button type="submit" className="btn">Publicar Objeto</button>
      </form>
    </div>
  );
};

export default RegisterForm;