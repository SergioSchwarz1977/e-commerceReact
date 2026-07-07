import { Destacados } from "../destacados/Destacados";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <>
    <Header />
      <div className={styles.home}>
        <h1 className={styles.homeTitle}>Bienvenidos a E-commerce React!💕</h1>
        <img src="./Flair.png" alt="Home Image" className={styles.homeImage} />
        <img src="./Flair2.png" alt="Home Image" className={styles.homeImage} />
      </div>
      <Destacados />
      <Footer />
    </>
  );
};
