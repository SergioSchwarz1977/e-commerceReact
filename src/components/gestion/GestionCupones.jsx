import style from "./GestionCupones.module.css";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
export const GestionCupones = () => {
  const [codigo, setCodigo] = useState("");
  const [descuento, setDescuento] = useState("");
  const [cupones, setCupones] = useState([]);

  const navigate = useNavigate();

  //Obtener los cuopnes de firebase
  const obtenerCupones = async () => {
    try {
      const response = await getDocs(collection(db, "cupones"));
      const cuponData = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCupones(cuponData);
    } catch (error) {
      console.error("Error al obtener los cupones:", error);
      Swal.fire("Ocurrio un error al obtener los cupones", "error");
    }
  };

  useEffect(() => {
    obtenerCupones();
  }, []);

  //crearemos un cupon en firebase
  const crearCupon = async (e) => {
    e.preventDefault();
    if (!codigo || !descuento) {
      Swal.fire("Por favor complete todos los campos", "error");
      return;
    }
    const porcentaje = Number(descuento);
    if (porcentaje < 0 || porcentaje > 100) {
      Swal.fire("El descuento debe ser un número entre 0 y 100", "error");
      return;
    }

    try {
      await addDoc(collection(db, "cupones"), {
        codigo: codigo,
        descuento: Number(descuento),
      });
      setCodigo("");
      setDescuento("");
      Swal.fire("Cupón creado correctamente", "👌");
      await obtenerCupones();
    } catch (error) {
      console.error("Error al crear el cupón:", error);
      Swal.fire("Ocurrio un error al crear el cupón", "error");
    }
  };

  //Eliminar un cupon de firebase
  const eliminarCupon = async (id) => {
    try {
      await deleteDoc(doc(db, "cupones", id));
      await obtenerCupones();
      Swal.fire("Cupón eliminado correctamente", "👌");
    } catch (error) {
      console.error("Error al eliminar el cupón:", error);
      Swal.fire("Ocurrio un error al eliminar el cupón", "error");
    }
  };

  return (
    <>
      <h2 className={style.title}>Gestión de Cupones</h2>
      <div className={style.gestionProducto}>
        <form onSubmit={crearCupon} className={style.form}>
          <input
            type="text"
            placeholder="Código del cupón"
            required
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <input
            type="number"
            placeholder="Descuento (%)"
            min="0"
            max="100"
            required
            value={descuento}
            onChange={(e) => setDescuento(e.target.value)}
          />
          <button type="submit" className={style.submitButton}>
            Crear Cupón
          </button>
        </form>
        <h3 className={style.title}>Listado de Cupones</h3>
        {cupones.map((cupon) => (
          <div className={style.cupon} key={cupon.id}  >
            <p>
              <strong>Código:</strong> {cupon.codigo} ✨
            </p>
            <p>
              <strong>Descuento:</strong> {cupon.descuento}%
            </p>
            <button onClick={() => eliminarCupon(cupon.id)} className={style.submitButton}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
      <button className={style.submitButton} onClick={() => navigate("/menu")}>
        Volver al menu
      </button>
    </>
  );
};
