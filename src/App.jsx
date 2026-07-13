import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import authService from "./api/authService";
import objetoService from "./api/objetoService";
import reclamoService from "./api/reclamoService";
import getErrorMessage from "./api/getErrorMessage";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import ItemTable from "./Components/ItemsPage/ItemTable";
import AdminView from "./Components/Admin/AdminView";
import ClaimModal from "./Components/ClaimModal/ClaimModal";
import ClaimsTable from "./Components/ClaimsTable/ClaimsTable";
import RegisterForm from "./Components/RegisterForm/RegisterForm";
import UsersTable from "./Components/UsersTable/UsersTable";
import EditModal from "./Components/EditModal/EditModal";
import "./App.css";

// Recupera la sesión guardada en localStorage (si existe) para no perderla al recargar la página.
const cargarUsuarioGuardado = () => {
  try {
    const guardado = localStorage.getItem("usuario");
    return guardado ? JSON.parse(guardado) : null;
  } catch {
    return null;
  }
};

// Protege una ruta: exige sesión iniciada y, opcionalmente, un rol específico.
const RequireRole = ({ usuarioActual, rol, children }) => {
  if (!usuarioActual) return <Navigate to="/" replace />;
  if (rol && usuarioActual.rol !== rol) return <Navigate to="/" replace />;
  return children;
};

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [usuarioActual, setUsuarioActual] = useState(cargarUsuarioGuardado);
  const [objetos, setObjetos] = useState([]);
  const [reclamos, setReclamos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [modal, setModal] = useState({ open: false, itemId: null, itemNombre: "" });
  const [editItem, setEditItem] = useState(null);
  const [cargandoObjetos, setCargandoObjetos] = useState(false);

  // El catálogo de objetos es público: se carga siempre al iniciar la app.
  const cargarObjetos = async () => {
    setCargandoObjetos(true);
    try {
      const data = await objetoService.listar();
      setObjetos(data);
    } catch (error) {
      console.error("Error al cargar objetos:", getErrorMessage(error));
    } finally {
      setCargandoObjetos(false);
    }
  };

  const cargarReclamos = async () => {
    try {
      const data = await reclamoService.listarPendientes();
      setReclamos(data);
    } catch (error) {
      console.error("Error al cargar reclamos:", getErrorMessage(error));
    }
  };

  const cargarUsuarios = async () => {
    try {
      const data = await authService.listarUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", getErrorMessage(error));
    }
  };

  // Carga inicial del catálogo (no requiere autenticación).
  useEffect(() => {
    cargarObjetos();
  }, []);

  // Recarga los datos específicos de cada sección del panel admin al navegar a ella.
  useEffect(() => {
    if (location.pathname === "/admin/claims") cargarReclamos();
    if (location.pathname === "/admin/users") cargarUsuarios();
  }, [location.pathname]);

  const handleLogin = async (codigo, password, rol) => {
    try {
      const response = await authService.login(codigo, password, rol);
      if (!response.success) {
        return { success: false, message: response.message };
      }
      localStorage.setItem("token", response.token);
      localStorage.setItem("usuario", JSON.stringify(response.usuario));
      setUsuarioActual(response.usuario);
      navigate(response.usuario.rol === "admin" ? "/admin" : "/student");
      return { success: true };
    } catch (error) {
      return { success: false, message: getErrorMessage(error, "No se pudo iniciar sesión. Intenta más tarde.") };
    }
  };

  const handleRegister = async (nuevoUsuario) => {
    try {
      const response = await authService.registrar(nuevoUsuario);
      if (!response.success) {
        return { success: false, message: response.message };
      }
      alert("¡Cuenta creada correctamente! Ahora puedes iniciar sesión.");
      navigate("/");
      return { success: true };
    } catch (error) {
      return { success: false, message: getErrorMessage(error, "No se pudo crear la cuenta.") };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuarioActual(null);
    setReclamos([]);
    setUsuarios([]);
    navigate("/");
  };

  const openClaimModal = (id, nombre) => setModal({ open: true, itemId: id, itemNombre: nombre });
  const closeClaimModal = () => setModal({ open: false, itemId: null, itemNombre: "" });

  const enviarReclamo = async (evidencia) => {
    try {
      const response = await reclamoService.crear({ objetoId: modal.itemId, evidencia });
      alert(response.message);
      if (response.success) {
        closeClaimModal();
      }
    } catch (error) {
      alert(getErrorMessage(error, "No se pudo enviar el reclamo."));
    }
  };

  const registrarObjeto = async (nuevoObjeto) => {
    try {
      const response = await objetoService.crear(nuevoObjeto);
      alert(response.message);
      if (response.success) {
        cargarObjetos();
      }
    } catch (error) {
      alert(getErrorMessage(error, "No se pudo publicar el objeto."));
    }
  };

  const resolverReclamo = async (id, aprobado) => {
    try {
      const response = await reclamoService.resolver(id, aprobado);
      alert(response.message);
      if (response.success) {
        cargarReclamos();
        cargarObjetos(); // el objeto pasa a "reclamado" si el reclamo fue aprobado
      }
    } catch (error) {
      alert(getErrorMessage(error, "No se pudo resolver el reclamo."));
    }
  };

  const toggleAccesoUsuario = async (id) => {
    try {
      const response = await authService.toggleAcceso(id);
      if (response.success) {
        cargarUsuarios();
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert(getErrorMessage(error, "No se pudo actualizar el acceso del usuario."));
    }
  };

  const handleEditSubmit = async (updatedItem) => {
    try {
      const { id, nombre, categoria, descripcion, icono } = updatedItem;
      const response = await objetoService.actualizar(id, { nombre, categoria, descripcion, icono });
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

  // Los alumnos solo deben ver objetos que aún se pueden reclamar.
  const objetosDisponibles = objetos.filter((o) => o.estado === "disponible");

  return (
    <>
      <Header
        rol={usuarioActual?.rol}
        onNavigate={navigate}
        onLogout={handleLogout}
      />
      <main>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} onGoRegister={() => navigate("/register")} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} onBack={() => navigate("/")} />} />
          <Route
            path="/student"
            element={
              <RequireRole usuarioActual={usuarioActual} rol="student">
                <ItemTable objetos={objetosDisponibles} onClaim={openClaimModal} rol="student" cargando={cargandoObjetos} />
              </RequireRole>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireRole usuarioActual={usuarioActual} rol="admin">
                <AdminView onNavigate={navigate} />
              </RequireRole>
            }
          />
          <Route
            path="/admin/register"
            element={
              <RequireRole usuarioActual={usuarioActual} rol="admin">
                <RegisterForm onRegistrar={registrarObjeto} />
              </RequireRole>
            }
          />
          <Route
            path="/admin/claims"
            element={
              <RequireRole usuarioActual={usuarioActual} rol="admin">
                <ClaimsTable reclamos={reclamos} onResolver={resolverReclamo} />
              </RequireRole>
            }
          />
          <Route
            path="/admin/users"
            element={
              <RequireRole usuarioActual={usuarioActual} rol="admin">
                <UsersTable usuarios={usuarios} onToggleAcceso={toggleAccesoUsuario} />
              </RequireRole>
            }
          />
          <Route
            path="/admin/items"
            element={
              <RequireRole usuarioActual={usuarioActual} rol="admin">
                <ItemTable objetos={objetos} onClaim={openClaimModal} rol="admin" onEdit={setEditItem} cargando={cargandoObjetos} />
              </RequireRole>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
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
    </>
  );
};

export default App;
