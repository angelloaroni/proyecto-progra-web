import { useState } from "react";
import { initialObjetos, initialReclamos, initialUsuarios } from "./data/mockData";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import ItemTable from "./Components/ItemsPage/ItemTable";
import AdminView from "./Components/Admin/AdminView";
import RegisterForm from "./Components/RegisterForm/RegisterForm";
import ClaimsTable from "./Components/ClaimsTable/ClaimsTable";
import UsersTable from "./Components/UsersTable/UsersTable";
import ClaimModal from "./Components/ClaimModal/ClaimModal";
import EditModal from "./Components/EditModal/EditModal";
import "./App.css";

const App = () => {
  const [view, setView] = useState("login");
  const [usuarioActual, setUsuarioActual] = useState({ codigo: "20231456", rol: "student" });
  const [objetos, setObjetos] = useState(initialObjetos);
  const [reclamos, setReclamos] = useState(initialReclamos);
  const [usuarios, setUsuarios] = useState(initialUsuarios);
  const [modal, setModal] = useState({ open: false, itemId: null, itemNombre: "" });
  const [editModal, setEditModal] = useState({ open: false, item: null });

  const handleLogin = (codigo, rol) => {
    setUsuarioActual({ codigo: codigo || "20231456", rol });
    setView(rol === "admin" ? "admin" : "student");
  };

  const handleLogout = () => setView("login");

  const openClaimModal = (id, nombre) => setModal({ open: true, itemId: id, itemNombre: nombre });
  const closeClaimModal = () => setModal({ open: false, itemId: null, itemNombre: "" });

  const openEditModal = (item) => setEditModal({ open: true, item });
  const closeEditModal = () => setEditModal({ open: false, item: null });

  const actualizarObjeto = (objetoActualizado) => {
    setObjetos((prev) =>
      prev.map((obj) => (obj.id === objetoActualizado.id ? objetoActualizado : obj))
    );
    closeEditModal();
    alert("Objeto actualizado correctamente.");
  };

  const enviarReclamo = (evidencia) => {
    const objeto = objetos.find((o) => o.id === modal.itemId);
    setReclamos((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        objetoId: modal.itemId,
        objetoNombre: objeto.nombre,
        alumnoCodigo: usuarioActual.codigo,
        evidencia,
      },
    ]);
    closeClaimModal();
    alert("Tu reclamo ha sido enviado correctamente. El administrador validará las evidencias.");
  };

  const registrarObjeto = (nuevoObjeto) => {
    setObjetos((prev) => [{ id: prev.length + 1, ...nuevoObjeto }, ...prev]);
    alert("¡Objeto publicado con éxito en el catálogo del campus!");
  };

  const resolverReclamo = (index, aprobado) => {
    const rec = reclamos[index];
    if (aprobado) {
      alert(`Reclamo ACEPTADO. Se ha enviado una notificación al correo institucional del alumno para que recoja su "${rec.objetoNombre}".`);
      setObjetos((prev) => prev.filter((o) => o.id !== rec.objetoId));
    } else {
      alert("Reclamo RECHAZADO. Las evidencias no coinciden con el objeto registrado.");
    }
    setReclamos((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleAccesoUsuario = (index) => {
    setUsuarios((prev) =>
      prev.map((u, i) => (i === index ? { ...u, activo: !u.activo } : u))
    );
  };

  return (
    <>
      <Header view={view} rol={usuarioActual.rol} onNavigate={setView} onLogout={handleLogout} />
      <main>
        {view === "login" && <Login onLogin={handleLogin} />}
        {view === "student" && <ItemTable objetos={objetos} onClaim={openClaimModal} rol={usuarioActual.rol} onEdit={openEditModal} />}
        {view === "admin" && (
          <AdminView
            onNavigate={setView}
          />
        )}
        {view === "admin-register" && (
          <section className="admin-page">
            <RegisterForm onRegistrar={registrarObjeto} />
          </section>
        )}
        {view === "admin-claims" && (
          <section className="admin-page">
            <ClaimsTable reclamos={reclamos} onResolver={resolverReclamo} />
          </section>
        )}
        {view === "admin-users" && (
          <section className="admin-page">
            <UsersTable usuarios={usuarios} onToggleAcceso={toggleAccesoUsuario} />
          </section>
        )}
      </main>
      {modal.open && (
        <ClaimModal
          itemNombre={modal.itemNombre}
          onClose={closeClaimModal}
          onSubmit={enviarReclamo}
        />
      )}
      {editModal.open && (
        <EditModal
          item={editModal.item}
          onClose={closeEditModal}
          onSubmit={actualizarObjeto}
        />
      )}
    </>
  );
};

export default App;
