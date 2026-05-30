import "./Student.css";

export default function ItemCard({ objeto, onClaim }) {
  return (
    <div className="item-card">
      <div className="item-image">{objeto.icono}</div>
      <div className="item-details">
        <span className="tag">{objeto.categoria}</span>
        <h3>{objeto.nombre}</h3>
        <p style={{ fontSize: "0.9rem", marginBottom: "15px", flex: 1, color: "#555" }}>
          {objeto.descripcion}
        </p>
        <button className="btn" onClick={() => onClaim(objeto.id, objeto.nombre)}>
          Reclamar Objeto
        </button>
      </div>
    </div>
  );
}