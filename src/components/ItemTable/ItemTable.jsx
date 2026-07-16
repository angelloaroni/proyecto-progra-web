import { useEffect, useState } from "react";
import objetoService from "../../services/objeto.service";
import reclamoService from "../../services/reclamo.service";
import getErrorMessage from "../../services/getErrorMessage";
import ItemCard from "../ItemCard/ItemCard";
import ClaimModal from "../ClaimModal/ClaimModal";
import EditModal from "../EditModal/EditModal";
import ItemDetailModal from "../ItemDetailModal/ItemDetailModal";
import "./ItemTable.css";

const ItemTable = ({ rol }) => {
  const [objetos, setObjetos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState({ open: false, itemId: null, itemNombre: "" });
  const [editItem, setEditItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);
  const [objetosReclamadosPorMi, setObjetosReclamadosPorMi] = useState(new Set());

  const cargarObjetos = async () => {
    setCargando(true);
    try {
      const data = await objetoService.listar();
      setObjetos(data);
    } catch (error) {
      console.error("Error al cargar objetos:", getErrorMessage(error));
    } finally {
      setCargando(false);
    }
  };

  const cargarMisReclamos = async () => {
    if (rol !== "student") return;
    try {
      const data = await reclamoService.listarMios();
      setObjetosReclamadosPorMi(new Set(data.map((r) => r.objetoId)));
    } catch (error) {
      console.error("Error al cargar mis reclamos:", getErrorMessage(error));
    }
  };

  useEffect(() => {
    cargarObjetos();
    cargarMisReclamos();
  }, []);

  const openClaimModal = (id, nombre) => setModal({ open: true, itemId: id, itemNombre: nombre });
  const closeClaimModal = () => setModal({ open: false, itemId: null, itemNombre: "" });

  const enviarReclamo = async (evidencia) => {
    try {
      const response = await reclamoService.crear({ objetoId: modal.itemId, evidencia });
      alert(response.message);
      if (response.success) {
        closeClaimModal();
        cargarMisReclamos();
      }
    } catch (error) {
      alert(getErrorMessage(error, "No se pudo enviar el reclamo."));
    }
  };

  const handleEditSubmit = async (updatedItem) => {
    try {
      const { id, nombre, categoria, descripcion, icono, ubicacion } = updatedItem;
      const response = await objetoService.actualizar(id, { nombre, categoria, descripcion, icono, ubicacion });
      if (response.success) {
        setEditItem(null);
        cargarObjetos();
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert(getErrorMessage(error, "No se pudo actualizar el objeto."));
    }
  };

  const objetosVisibles = rol === "student" ? objetos.filter((o) => o.estado === "disponible") : objetos;

  const filtrados = objetosVisibles.filter(
    (obj) =>
      obj.nombre.toLowerCase().includes(query.toLowerCase()) ||
      obj.categoria.toLowerCase().includes(query.toLowerCase()) ||
      obj.descripcion.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
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
          {cargando ? (
            <div className="empty-state">
              <span className="empty-icon">⏳</span>
              <p>Cargando catálogo...</p>
            </div>
          ) : filtrados.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🔎</span>
              <p>No se encontraron objetos que coincidan con la búsqueda.</p>
            </div>
          ) : (
            filtrados.map((obj) => (
              <ItemCard
                key={obj.id}
                objeto={obj}
                onClaim={openClaimModal}
                rol={rol}
                onEdit={setEditItem}
                onView={setDetailItem}
                yaReclamado={objetosReclamadosPorMi.has(obj.id)}
              />
            ))
          )}
        </div>
      </section>
      {modal.open && (
        <ClaimModal
          itemNombre={modal.itemNombre}
          onClose={closeClaimModal}
          onSubmit={enviarReclamo}
        />
      )}
      {editItem && (
        <EditModal
          item={editItem}
          onClose={() => setEditItem(null)}
          onSubmit={handleEditSubmit}
        />
      )}
      {detailItem && (
        <ItemDetailModal
          objeto={detailItem}
          rol={rol}
          onClose={() => setDetailItem(null)}
          onClaim={openClaimModal}
          onEdit={setEditItem}
          yaReclamado={objetosReclamadosPorMi.has(detailItem.id)}
        />
      )}
    </>
  );
};

export default ItemTable;