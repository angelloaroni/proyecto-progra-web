import { useState } from "react";
import "../Login/Login.css";
import "./Register.css";

const CODIGO_ADMIN = "666";

const Register = ({ onRegister, onBack }) => {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("student");
  const [codigoVerif, setCodigoVerif] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (rol === "admin" && codigoVerif !== CODIGO_ADMIN) {
      setError("Código de verificación de administrador incorrecto.");
      return;
    }

    setLoading(true);
    const resultado = await onRegister({ codigo, nombre, password, rol });
    setLoading(false);

    if (!resultado.success) {
      setError(resultado.message || "No se pudo crear la cuenta.");
    }
  };

  const handleRolChange = (nuevoRol) => {
    setRol(nuevoRol);
    setCodigoVerif("");
    setError("");
  };

  return (
    <section className="login-section">
      <div className="box login-card">
        <div className="login-header">
          <h2>Crear Cuenta</h2>
          <p className="login-tagline">Regístrate para acceder a la plataforma</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="reg-codigo">Código universitario</label>
            <input
              id="reg-codigo"
              type="text"
              placeholder="Ej: 20241234"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="reg-nombre">Nombre completo</label>
            <input
              id="reg-nombre"
              type="text"
              placeholder="Ej: Juan Pérez García"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="reg-password">Contraseña</label>
            <input
              id="reg-password"
              type="password"
              placeholder="Crea una contraseña segura"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <fieldset className="role-group">
            <legend>Tipo de cuenta</legend>
            <div className="role-options">
              <label className={`role-label ${rol === "student" ? "selected" : ""}`}>
                <input type="radio" value="student" checked={rol === "student"} onChange={() => handleRolChange("student")} />
                <span className="role-icon">🎓</span>
                Alumno
              </label>
              <label className={`role-label ${rol === "admin" ? "selected" : ""}`}>
                <input type="radio" value="admin" checked={rol === "admin"} onChange={() => handleRolChange("admin")} />
                <span className="role-icon">🛡️</span>
                Administrador
              </label>
            </div>
          </fieldset>
          {rol === "admin" && (
            <div className="input-group">
              <label htmlFor="reg-verif">Código de verificación</label>
              <input
                id="reg-verif"
                type="password"
                placeholder="Código de acceso para administradores"
                value={codigoVerif}
                onChange={(e) => setCodigoVerif(e.target.value)}
                required
              />
            </div>
          )}
          {error && (
            <p className="login-error">{error}</p>
          )}
          <button type="submit" className="btn login-btn" disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear Cuenta"}
          </button>
        </form>
        <p className="login-footer-text">
          ¿Ya tienes cuenta?{" "}
          <a onClick={onBack} role="button" tabIndex={0}>Inicia sesión aquí</a>
        </p>
      </div>
    </section>
  );
};

export default Register;