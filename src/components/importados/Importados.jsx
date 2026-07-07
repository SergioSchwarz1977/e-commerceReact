import style from "./Importados.module.css";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useState, useEffect } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";

export const Importados = () => {
  const [producto, setProducto] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productosDB = collection(db, "productos");
    getDocs(productosDB).then((resp) => {
      setProducto(
        resp.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        }),
      );
    });
  }, []);
  return (
    <>
      <Header />
      <h1 className={style.title}>Productos Importados</h1>
      <div className={style.container}>
        {producto.map((producto) => (
          <article className={style.card} key={producto.id}>
            <h3 className={style.nombre}>{producto.nombre}</h3>
            <img
              src={producto.imagen}
              alt=""
              width={200}
              className={style.img}
            />
            <p>Categoria: {producto.categoria}</p>
            <p>{producto.descripcion}</p>
            <p>Stock: {producto.stock}</p>
            <p>Precio: ${producto.precio}</p>
            <Link
              to={`/products/importados/${producto.id}`}
              className={style.detailLink}
            >
              Ver Detalles
            </Link>
          </article>
        ))}
      </div>
      <Footer />
    </>
  );
};
