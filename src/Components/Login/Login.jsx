import { useState } from "react";
import "./Login.css";
import logoNombre from "../../assets/Universidad_de_Lima_logo_nombre.png";

export default function Login({ onLogin }) {
  const [codigo, setCodigo] = useState("");
  const [rol, setRol] = useState("student");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(codigo, rol);
  };

  return (
    <section className="login-section">
      <div className="box login-container">
        <img className="login-logo" src={logoNombre} alt="Universidad de Lima" />
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Código de alumno o Admin"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />
          <input type="password" placeholder="Contraseña" required />
          <fieldset className="role-group">
            <legend>Tipo de usuario</legend>
            <label>
              <input
                type="radio"
                name="rol"
                value="student"
                checked={rol === "student"}
                onChange={(e) => setRol(e.target.value)}
              />
              Alumno
            </label>
            <label>
              <input
                type="radio"
                name="rol"
                value="admin"
                checked={rol === "admin"}
                onChange={(e) => setRol(e.target.value)}
              />
              Administrador
            </label>
          </fieldset>
          <button type="submit" className="btn">Ingresar</button>
        </form>
        <div className="login-footer-text">
          ¿No tienes cuenta?{" "}
          <a href="#">Regístrate aquí</a>
        </div>
      </div>
    </section>
  );
}