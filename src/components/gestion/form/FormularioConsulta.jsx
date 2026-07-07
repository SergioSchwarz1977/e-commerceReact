import style from "./FormularioProducto.module.css";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const FormularioConsulta = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const consultaProductos = async () => {
      try {
        const productoRef = collection(db, "productos");
        const datos = await getDocs(productoRef);

        const items = datos.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,              // 1. Esparcimos los datos del documento
            idFirestore: doc.id,  // 2. ID real y seguro de la Base de Datos (ej: "abcde123")
            idInterno: data.id,   // 3. Tu número de control (ej: 13)
          };
        });
        setProductos(items);
      } catch (error) {
        console.log("Error al obtener productos", error);
        swal.fire('Error al obtener productos', 'error');
      } finally {
        setLoading(false);
      }
    };
    consultaProductos();
  }, []);

  if (loading) return <p>Cargando Productos</p>;

  const manejarEliminar = async (idFirestore) => {
    console.log("Eliminamos el id de Firebase:", idFirestore);
    const confirmacion = window.confirm(
      "¿Esta seguro que desea eliminar este producto?",
    );
    if (confirmacion) {
      try {
        const docRef = doc(db, "productos", String(idFirestore));
        await deleteDoc(docRef);
        setProductos(
          productos.filter((prod) => prod.idFirestore !== idFirestore),
        );
        alert("Producto eliminado correctamente");
      } catch (error) {
        console.error("Error detallado al eliminar:", error);
      }
    }
  };

  return (
    <>
      <h1 className={style.title}>Consultas de Productos</h1>
      <button
        className={style.btnEditar}
        onClick={() => {
          navigate("../menu");
        }}
      >
        ⬅️ Volver
      </button>
      <section className={style.container}>
        {productos.map((p) => {
          return (
            
            <div key={p.idFirestore} className={style.card}>
              <p>ID: {p.idInterno || p.idFirestore}</p>
              <h3>{p.nombre}</h3>
              <img src={p.imagen} alt={p.nombre} className={style.img} />
              <p>Categoria: {p.categoria}</p>
              <p>{p.descripcion}</p>
              <div className={style.buttons}>
                <button
                  className={style.btnCancel}
                  onClick={() => manejarEliminar(p.idFirestore)}
                >
                  Eliminar
                </button>
                <button className={style.btnEditar} onClick={()=>navigate('../alta', {state:{productoAEditar: p}} )}>Editar</button>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};