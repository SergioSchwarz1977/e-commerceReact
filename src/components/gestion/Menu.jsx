import style from "./Menu.module.css";
import { Footer } from '../footer/Footer'
import { Link, useNavigate } from 'react-router-dom'

export const Menu = () => {

    const navigate = useNavigate();
  return (
    <>
    <h1 className={style.title}>Menu de Administracion de Productos</h1>
    <Link className={style.btnVolver} to={"/products"}>Salir ⬅️</Link>
      <div className={style.container}>
        <button className={style.btn} onClick={()=>{navigate('/alta')}}>Alta</button>
        <button className={style.btn} onClick={()=>{navigate('/consulta')}} >Baja</button>
        <button className={style.btn} onClick={()=>{navigate('/consulta')}} >Modificacion</button>
        <button className={style.btn} onClick={()=>{navigate('/gestionCupones')}}>Gestion de Cupones</button>
      </div>
      <Footer />
    </>
  );
};
