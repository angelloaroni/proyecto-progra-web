import "./ItemCard.css";

const ItemCard = ({ objeto, onClaim }) => {
  return (
    <div className="item-card">
      <div className="item-image">{objeto.icono}</div>
      <div className="item-details">
        <span className="tag">{objeto.categoria}</span>
        <h3>{objeto.nombre}</h3>
        <p className="item-description">
          {objeto.descripcion}
        </p>
        <button className="btn" onClick={() => onClaim(objeto.id, objeto.nombre)}>
          Reclamar Objeto
        </button>
      </div>
    </div>
  );
};

export default ItemCard;