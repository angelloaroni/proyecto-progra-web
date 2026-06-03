import { useState } from "react";
import ItemCard from "./ItemCard";
import "./ItemTable.css";

const ItemTable = ({ objetos, onClaim, rol, onEdit }) => {
  const [query, setQuery] = useState("");

  const filtrados = objetos.filter(
    (obj) =>
      obj.nombre.toLowerCase().includes(query.toLowerCase()) ||
      obj.categoria.toLowerCase().includes(query.toLowerCase()) ||
      obj.descripcion.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="student-view">
      <div className="search-bar box">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar por nombre, categoría, descripción..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button className="btn">Buscar</button>
      </div>
      <div className="items-header">
        <h2>Objetos Encontrados Recientemente</h2>
        <span className="items-count">{filtrados.length} objeto{filtrados.length !== 1 ? "s" : ""}</span>
      </div>
      <div className="items-grid">
        {filtrados.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🔎</span>
            <p>No se encontraron objetos que coincidan con la búsqueda.</p>
          </div>
        ) : (
          filtrados.map((obj) => (
            <ItemCard key={obj.id} objeto={obj} onClaim={onClaim} rol={rol} onEdit={onEdit} />
          ))
        )}
      </div>
    </section>
  );
};

export default ItemTable;
