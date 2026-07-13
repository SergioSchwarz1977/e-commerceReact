import styles from "./Registro.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        const quiereLoguearse = window.confirm(
          "Este correo electrónico ya está registrado. ¿Desea intentar iniciar sesión ? ",
        );
        if (quiereLoguearse) {
          // eslint-disable-next-line no-undef
          login;
          navigate("/login");
        } else {
          // eslint-disable-next-line no-undef
          inicio;
          navigate("/");
        }
      } else {
        setError(
          "Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente.",
        );
        console.error("Error en el registro:", error.message);
      }
    }
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Crear una nueva cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Mínimo 6 caracteres"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className={styles.btn}>
          <button type="submit" className={styles.submitButton}>
            Registrarse
          </button>
          <button
            type="button"
            className={styles.submitButtonCancel}
            onClick={() => navigate("/login")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
