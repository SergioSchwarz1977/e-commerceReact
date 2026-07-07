import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContex";
import style from "../cart/Cart.module.css";
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";


export const Cart = () => {
  const { cartItems, clearCart, getCartTotal, removeItem } = useCart();
  const [cupon, setCupon] = useState("");
  const [descuento, setDescuento] = useState(0);


  const aplicarCupon = async() => {
    try {
    const cuponesRef = collection(db, "cupones");
    const snapshot = await getDocs(cuponesRef);
    
    const cuponEncontrado = snapshot.docs.find((doc) => doc.data().codigo ===cupon.trim());

      if(cuponEncontrado){
        const porcentajeDescuento = cuponEncontrado.data().descuento;
        setDescuento(porcentajeDescuento);
        swal.fire(`Cupón aplicado: ${porcentajeDescuento} % de descuento`, "👌");
        setCupon("");
      }else{
        swal.fire("Cupón inválido", "error");
        setDescuento(0);
      }

    } catch (error) {
      console.log('Error al aplicar el cupon' , error);      
    }
  };
const totalDescuento = getCartTotal() * (1 - descuento / 100); 
  if (cartItems.length === 0) {
    return (
      <div className={style.cart}>
        <h1 className={style.title}>El carrito esta vacio</h1>
        <div className={style.cartVacio}>
          <p className={style.p}>Agregar productos para continuar la compra</p>
          <Link to="/importados" className={style.btnvolver}>
            Ver Productos ⬅️
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className={style.container}>
      <h1>Carrito de Compras</h1>
      {cartItems.map((item) => (
        <div className={style.cartItem} key={item.id}>
          <h3>{item.title || item.nombre}</h3>
          <img
            src={item.thumbnail || item.imagen || item.urlImagen}
            alt={item.title || item.nombre}
            width={150}
          />
          <p>Cantidad: {item.quantity ?? 0}</p>
          <p>Precio Unitario: ${item.price ?? item.precio ?? 0}</p>
          <p>
            Sub-total: $
            {((item.price ?? item.precio ?? 0) * (item.quantity ?? 0)).toFixed(
              2,
            )}
          </p>
          <button
            onClick={() => removeItem(item.id)}
            className={style.btnBorrar}
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      ))}
      <br />
      <div className={style.botones}>
        <fieldset className={style.desc}>
          <legend>Ingrese cupon de descuento</legend>
          <input
            type="text"
            value={cupon}
            onChange={(e) => setCupon(e.target.value)}
            placeholder="Código de cupón"
          />
          <button className={style.btnaplicar} onClick={aplicarCupon} >Aplicar</button>
        </fieldset>
        <h3>Antes: $ {getCartTotal().toFixed(2)}</h3>
        <h3>Descuento: {descuento}%</h3>
        <h3>Total a pagar: $ {totalDescuento.toFixed(2)}</h3>
        <button onClick={clearCart} className={style.btnvaciar}>
          Vaciar carrito
        </button>
        <br />
        <div className={style.botonesFin}>
          <Link
            to="/"
            onClick={() => {
              clearCart();
              swal.fire("Compra finalizada con exito");
            }}
            className={style.btnvolver}
          >
            Finalizar compra
          </Link>
          <Link to="/importados" className={style.btnvolver}>
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
};
