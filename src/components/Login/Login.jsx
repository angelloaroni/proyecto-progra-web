import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import getErrorMessage from "../../services/getErrorMessage";
import "./Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [codigo, setCodigo] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await login(codigo, password, rol);
      if (!response.success) {
        setError(response.message || "Código o contraseña incorrectos, o cuenta inactiva.");
      } else {
        navigate(response.usuario.rol === "admin" ? "/admin" : "/student");
      }
    } catch (err) {
      setError(getErrorMessage(err, "No se pudo iniciar sesión. Intenta más tarde."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-section">
      <div className="box login-card">
        <div className="login-header">
          <h2>Iniciar Sesión</h2>
          <p className="login-tagline">Sistema de objetos perdidos del campus</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="codigo">Código universitario</label>
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
            <input
              id="password"
              type="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <fieldset className="role-group">
            <legend>Tipo de cuenta</legend>
            <div className="role-options">
              <label className={`role-label ${rol === "student" ? "selected" : ""}`}>
                <input type="radio" value="student" checked={rol === "student"} onChange={() => setRol("student")} />
                <span className="role-icon">🎓</span>
                Alumno
              </label>
              <label className={`role-label ${rol === "admin" ? "selected" : ""}`}>
                <input type="radio" value="admin" checked={rol === "admin"} onChange={() => setRol("admin")} />
                <span className="role-icon">🛡️</span>
                Administrador
              </label>
            </div>
          </fieldset>
          {error && (
            <p className="login-error">{error}</p>
          )}
          <button type="submit" className="btn login-btn" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
        <p className="login-footer-text">
          ¿No tienes cuenta?{" "}
          <a onClick={() => navigate("/register")} role="button" tabIndex={0}>Regístrate aquí</a>
        </p>
      </div>
    </section>
  );
};

export default Login;
