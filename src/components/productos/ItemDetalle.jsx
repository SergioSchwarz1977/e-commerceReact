import { useState, useEffect } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import styles from "./ItemList.module.css";
import { Link, useParams, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContex";
import { db } from "../../firebase/config";
import Swal from "sweetalert2";
import { getDocs, collection, query, where } from "firebase/firestore";

export const ItemDetalle = () => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contador, setContador] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    if (location.pathname.includes("importados")) {
      const productosRef = collection(db, "productos");
      const q = query(productosRef, where("id", "==", Number(id)));

      getDocs(q)
        .then((resp) => {
          if (!resp.empty) {
            const docSnap = resp.docs[0];
            setProduct({ id: docSnap.id, ...docSnap.data() });
          } else {
            setProduct(null);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error Firebase:", error);
          setLoading(false);
        });
    } else {
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("No se pudo obtener el producto");
          return res.json();
        })
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          setLoading(false);
        });
    }
  }, [id, location.pathname]);

  if (loading) return <p>Cargando...</p>;
  if (!product) return <p>Producto no encontrado</p>;

  const incrementar = () => {
    setContador(contador + 1);
  };
  const decrementar = () => {
    if (contador > 0) {
      setContador(contador - 1);
    }
  };

  const handleAddToCart = () => {
    if (contador < 1) return;

    addToCart(product, contador);
    Swal.fire(`Agregaste ${contador} unidades de ${product.title || product.nombre} al carrito 👌`,
    );
  };

  return (
    <>
      <Header />
      <div className={styles.productDetail}>
        <h2 className={styles.title}>{product.title || product.nombre}</h2>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.productImage}
        />
        <p className={styles.price}>
          Precio: ${product.price || product.precio}
        </p>
        <p className={styles.description}>
          {product.description || product.descripcion}
        </p>
        <div className={styles.count}>
          <button className={styles.btn} onClick={decrementar}>
            -
          </button>
          <span>{contador}</span>
          <button className={styles.btn} onClick={incrementar}>
            +
          </button>
        </div>
        <button className={styles.detailButton} onClick={handleAddToCart}>
          Agregar al Carrito <i className="fas fa-shopping-cart"></i>
        </button>
        <Link to="/importados" className={styles.backLink}>
          Volver a Productos
        </Link>
      </div>
      <Footer />
    </>
  );
};
