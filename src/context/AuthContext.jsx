import { createContext, useContext, useState } from "react";
import authService from "../services/auth.service";

const AuthContext = createContext(null);

const cargarUsuarioGuardado = () => {
  try {
    const guardado = localStorage.getItem("usuario");
    return guardado ? JSON.parse(guardado) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [usuarioActual, setUsuarioActual] = useState(cargarUsuarioGuardado);

  const guardarSesion = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));
    setUsuarioActual(data.usuario);
  };

  const login = async (codigo, password, rol) => {
    const data = await authService.login(codigo, password, rol);
    if (data.success) guardarSesion(data);
    return data;
  };
  const registrar = async (nuevoUsuario) => {
    const data = await authService.registrar(nuevoUsuario);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuarioActual(null);
  };

  return (
    <AuthContext.Provider value={{ usuarioActual, login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
