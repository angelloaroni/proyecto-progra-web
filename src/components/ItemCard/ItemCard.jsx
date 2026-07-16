import "./ItemCard.css";

const ItemCard = ({ objeto, onClaim, rol, onEdit, onView }) => {
  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (rol === "admin") {
      onEdit(objeto);
    } else {
      onClaim(objeto.id, objeto.nombre);
    }
  };

  const buttonText = rol === "admin" ? "✏️ Editar" : "Reclamar Objeto";

  return (
    <div className="item-card" onClick={() => onView(objeto)}>
      <div className="item-image">{objeto.icono}</div>
      <div className="item-details">
        <div className="item-tags">
          <span className="tag">{objeto.categoria}</span>
          {rol === "admin" && objeto.estado && (
            <span className={`estado-badge ${objeto.estado === "disponible" ? "disponible" : "reclamado"}`}>
              {objeto.estado === "disponible" ? "Disponible" : "Reclamado"}
            </span>
          )}
        </div>
        <h3>{objeto.nombre}</h3>
        <p className="item-description">{objeto.descripcion}</p>
        {objeto.ubicacion && (
          <p className="item-ubicacion">📍 {objeto.ubicacion}</p>
        )}
        <button className="btn item-btn" onClick={handleButtonClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ItemCard;