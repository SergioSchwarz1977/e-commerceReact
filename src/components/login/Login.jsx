import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        swal.fire("¡Bienvenido!",user.email + " 😊 " + " Has iniciado sesión correctamente.");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        swal.fire("Error", "Error al iniciar sesión: " + errorMessage);
        console.error("Error al iniciar sesión:", errorMessage);
        navigate("/login");
      });
  };


  return (
    <>
    <h2 className={styles.title}>Iniciar Sesión</h2>
      <div className={styles.login}>
        <h1>Iniciar Sesión</h1>
        <form className={styles.loginForm} onSubmit={handleLogin} > 
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              E-Mail:
            </label>
            <input
              type="email"
              placeholder="Ingrese su correo electrónico"
              value={email}
              name="email"
              className={styles.input}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Contraseña:
            </label>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              id="password"
              name="password"
              className={styles.input}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <section className={styles.loginActions}>
            <div className={styles.rememberMe}>
              <label htmlFor="rememberMe" className={styles.label}>
                Recordarme:
              </label>
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className={styles.input}
              />
            </div>
          </section>
          <section className={styles.forgotPassword}>
            <button
              type="submit"
              className={styles.loginButton}
              onClick={() => {
                navigate("/");
              }}
            >
              Iniciar Sesión
            </button>
            <Link to="/" className={styles.cancelButton}>
              Cancelar
            </Link>
            <section className={styles.forgotPassword}>
              <Link to="/registro">
                ¿No estas registrado?, Regístrate aquí ⬅️
              </Link>
            </section>
          </section>
        </form>
      </div>
    </>
  );
};
