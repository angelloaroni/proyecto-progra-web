import { useState } from "react";
import "../Login/Login.css";

const CODIGO_ADMIN = "666";

export default function Register({ onRegister, onBack }) {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("student");
  const [codigoVerif, setCodigoVerif] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (rol === "admin" && codigoVerif !== CODIGO_ADMIN) {
      setError("Código de verificación de administrador incorrecto.");
      return;
    }

    onRegister({ codigo, nombre, password, rol, activo: true });
  };

  return (
    <section className="login-section">
      <div className="box login-container">
        <h2>Crear Cuenta</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Código universitario"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            value={rol}
            onChange={(e) => { setRol(e.target.value); setCodigoVerif(""); setError(""); }}
          >
            <option value="student">Alumno</option>
            <option value="admin">Administrador</option>
          </select>

          {rol === "admin" && (
            <input
              type="password"
              placeholder="Código de verificación de administrador"
              value={codigoVerif}
              onChange={(e) => setCodigoVerif(e.target.value)}
              required
            />
          )}

          {error && (
            <p style={{ color: "red", fontSize: "0.85rem", margin: "4px 0" }}>{error}</p>
          )}

          <button type="submit" className="btn">Registrarse</button>
        </form>

        <div style={{ textAlign: "center", marginTop: "15px", fontSize: "0.9rem" }}>
          ¿Ya tienes cuenta?{" "}
          <span
            onClick={onBack}
            style={{ color: "var(--ulima-orange)", cursor: "pointer", fontWeight: "bold" }}
          >
            Inicia sesión aquí
          </span>
        </div>
      </div>
    </section>
  );
}