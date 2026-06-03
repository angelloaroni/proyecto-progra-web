import { useState } from "react";
import "./Login.css";
import logoNombre from "../../assets/Universidad_de_Lima_logo_nombre.png";

const Login = ({ onLogin }) => {
  const [codigo, setCodigo] = useState("");
  const [rol, setRol] = useState("student");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(codigo, rol);
  };

  return (
    <section className="login-section">
      <div className="login-card">
        <div className="login-header">
          <img className="login-logo" src={logoNombre} alt="Universidad de Lima" />
          <p className="login-tagline">Sistema de Objetos Perdidos del Campus</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="codigo">Código de usuario</label>
            <input
              id="codigo"
              type="text"
              placeholder="Ej: 20231456"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input id="password" type="password" placeholder="••••••••" required />
          </div>
          <fieldset className="role-group">
            <legend>Tipo de usuario</legend>
            <div className="role-options">
              <label className={`role-label ${rol === "student" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="rol"
                  value="student"
                  checked={rol === "student"}
                  onChange={(e) => setRol(e.target.value)}
                />
                <span className="role-icon">🎓</span>
                <span>Alumno</span>
              </label>
              <label className={`role-label ${rol === "admin" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="rol"
                  value="admin"
                  checked={rol === "admin"}
                  onChange={(e) => setRol(e.target.value)}
                />
                <span className="role-icon">🛡️</span>
                <span>Administrador</span>
              </label>
            </div>
          </fieldset>
          <button type="submit" className="btn login-btn">Ingresar al Sistema</button>
        </form>
        <div className="login-footer-text">
          ¿No tienes cuenta?{" "}
          <a href="#">Regístrate aquí</a>
        </div>
      </div>
    </section>
  );
};

export default Login;
