import { useEffect, useState } from "react";
import style from "./Destacados.module.css";

export const Destacados = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products`)
      .then((res) => res.json())
      .then((data) => setProductos(data.products))
      .catch((error) => console.error("Error:", error));
  }, []);

  // Filtrar productos con precio menor a 10
  const productosDestacados = productos.filter((p) => p.price < 10);

  if (productosDestacados.length === 0) {
    return <p className={style.container}>No hay productos destacados aún.</p>;
  }

  return (
    <>
      <h2 className={style.title}>Productos destacados de menos de $10</h2>
      <section className={style.container}>
        {productosDestacados.map((p) => (
          <div key={p.id} className={style.card}>
            <h3>{p.title}</h3>
            <img src={p.thumbnail} alt=""  width={200} className={style.img}/>
            <p>Precio: ${p.price}</p>
          </div>
        ))}
      </section>
    </>
  );
};
