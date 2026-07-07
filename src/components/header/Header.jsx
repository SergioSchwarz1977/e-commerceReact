import { useCart } from "../../context/CartContex";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { getCartQuantity } = useCart();
  const totalItems = getCartQuantity();
  const { user, logout } = useAuth();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <video width="300" height="300" controls autoPlay loop muted>
            <source src="./Logo.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={styles.admin}>
          <Link to="/login" className={styles.adminLink}>
            Admin
          </Link>
        </div>
      </header>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/importados">Importados</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/carrito" className={styles.cartLink}>
              Carrito <i className="fas fa-shopping-cart"></i>
              <span className={styles.cartCount}> ({totalItems})</span>
            </Link>
          </li>
          {user ? (
            <>
              {/* Mostrar Gestion SOLO si el usuario es admin */}
              {user.rol === "admin" && (
                <li className={styles.navItem}>
                  <Link className={styles.navLink} to="/menu">
                    Gestión Productos
                  </Link>
                </li>
              )}
              <span>¡Hola, {user.email}!</span>
              <button onClick={logout} className={styles.logoutButton}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <li className={styles.navItem}>
              <Link className={styles.navLink} to="/login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;
