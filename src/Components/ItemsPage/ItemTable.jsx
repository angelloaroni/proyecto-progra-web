import { useState } from "react";
import ItemCard from "./ItemCard";
import "./ItemTable.css";

export default function ItemTable({ objetos, onClaim, rol, onEdit }) {
  const [query, setQuery] = useState("");

  const filtrados = objetos.filter(
    (obj) =>
      obj.nombre.toLowerCase().includes(query.toLowerCase()) ||
      obj.categoria.toLowerCase().includes(query.toLowerCase()) ||
      obj.descripcion.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="student-view">
      <div className="box search-bar">
        <input
          type="text"
          placeholder="Buscar por etiqueta, color, marca..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn">Buscar</button>
      </div>
      <h2>Objetos Encontrados Recientemente</h2>
      <div className="items-grid">
        {filtrados.length === 0 ? (
          <p className="empty-message">
            No se encontraron objetos que coincidan con la búsqueda.
          </p>
        ) : (
          filtrados.map((obj) => (
            <ItemCard key={obj.id} objeto={obj} onClaim={onClaim} rol={rol} onEdit={onEdit} />
          ))
        )}
      </div>
    </section>
  );
}