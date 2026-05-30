import { useState } from "react";
import "./Login.css";

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
          <select value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="student">Alumno</option>
            <option value="admin">Administrador</option>
          </select>
          <button type="submit" className="btn">Ingresar</button>
        </form>
        <div style={{ textAlign: "center", marginTop: "15px", fontSize: "0.9rem" }}>
          ¿No tienes cuenta?{" "}
          <a
            href="#"
            style={{ color: "var(--ulima-orange)", textDecoration: "none", fontWeight: "bold" }}
          >
            Regístrate aquí
          </a>
        </div>
      </div>
    </section>
  );
}