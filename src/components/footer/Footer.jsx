import style from "./Footer.module.css";

export const Footer = () => {
  return (
    <>
      <div className={style.footer}>
        <div className="logo">
          <img src="./Tienda React.png" alt="logo" width="200" />
        </div>
        
        <div className={style.derechos}>
          <p className={style.copy}>© 2026 - Todos los derechos reservados</p>
          <p className={style.copy}>Creado por: Sergio Schwarz</p>
        </div>
        <div className={style.redes}>
          <a href="https://www.facebook.com/" aria-label="Facebook">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com/" aria-label="Instagram">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://www.x.com/" aria-label="X">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
          <a href="https://www.youtube.com/" aria-label="YouTube">
            <i className="fa-brands fa-youtube"></i>
          </a>
        </div>
      </div>
    </>
  );
};
export default Footer;
