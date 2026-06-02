import "./ItemCard.css";

const ItemCard = ({ objeto, onClaim, rol, onEdit }) => {
  const handleButtonClick = () => {
    if (rol === "admin") {
      onEdit(objeto);
    } else {
      onClaim(objeto.id, objeto.nombre);
    }
  };

  const buttonText = rol === "admin" ? "Editar" : "Reclamar Objeto";

  return (
    <div className="item-card">
      <div className="item-image">{objeto.icono}</div>
      <div className="item-details">
        <span className="tag">{objeto.categoria}</span>
        <h3>{objeto.nombre}</h3>
        <p className="item-description">
          {objeto.descripcion}
        </p>
        <button className="btn" onClick={handleButtonClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ItemCard;