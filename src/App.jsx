import { useState } from "react";
import { initialObjetos, initialReclamos, initialUsuarios } from "./data/mockData";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import StudentView from "./Components/Student/StudentView";
import AdminView from "./Components/Admin/AdminView";
import ClaimModal from "./Components/Modal/ClaimModal";
import "./App.css";

export default function App() {
  const [view, setView] = useState("login");
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [objetos, setObjetos] = useState(initialObjetos);
  const [reclamos, setReclamos] = useState(initialReclamos);
  const [usuarios, setUsuarios] = useState(initialUsuarios);
  const [modal, setModal] = useState({ open: false, itemId: null, itemNombre: "" });

  const handleLogin = (codigo, password, rol) => {
    const usuario = usuarios.find(
      (u) => u.codigo === codigo && u.password === password && u.rol === rol && u.activo
    );
    if (!usuario) return false;
    setUsuarioActual({ codigo: usuario.codigo, rol: usuario.rol });
    setView(usuario.rol === "admin" ? "admin" : "student");
    return true;
  };

  const handleRegister = (nuevoUsuario) => {
    const existe = usuarios.some((u) => u.codigo === nuevoUsuario.codigo);
    if (existe) {
      alert("Ya existe un usuario con ese código.");
      return;
    }
    setUsuarios((prev) => [...prev, nuevoUsuario]);
    alert("¡Cuenta creada correctamente! Ahora puedes iniciar sesión.");
    setView("login");
  };

  const handleLogout = () => {
    setUsuarioActual(null);
    setView("login");
  };

  const openClaimModal = (id, nombre) => setModal({ open: true, itemId: id, itemNombre: nombre });
  const closeClaimModal = () => setModal({ open: false, itemId: null, itemNombre: "" });

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
      <Header
        view={view}
        rol={usuarioActual?.rol}
        onNavigate={setView}
        onLogout={handleLogout}
      />
      <main>
        {view === "login" && (
          <Login
            onLogin={handleLogin}
            onGoRegister={() => setView("register")}
          />
        )}
        {view === "register" && (
          <Register
            onRegister={handleRegister}
            onBack={() => setView("login")}
          />
        )}
        {view === "student" && (
          <StudentView objetos={objetos} onClaim={openClaimModal} />
        )}
        {view === "admin" && (
          <AdminView
            reclamos={reclamos}
            usuarios={usuarios}
            onRegistrar={registrarObjeto}
            onResolver={resolverReclamo}
            onToggleAcceso={toggleAccesoUsuario}
          />
        )}
      </main>
      {modal.open && (
        <ClaimModal
          itemNombre={modal.itemNombre}
          onClose={closeClaimModal}
          onSubmit={enviarReclamo}
        />
      )}
    </>
  );
}