import { useNavigate } from "react-router-dom";
import styles from "./FormularioProducto.module.css";
export const FormularioProducto = ({
  manejarCambio,
  manejarEnvio,
  datosForm,
  manejarCambioImagen,
  loading,
  mensajeExito,
  inputKey,
  esModoEdicion,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className={styles.title} onSubmit={manejarEnvio}>
        Bienvenido al panel de administración
      </h1>
      <h3 className={styles.title}>{esModoEdicion ? "Editar Producto" : "Agregar Nuevo Producto"}</h3>
      {mensajeExito && <p className={styles.successMessage}>{mensajeExito}</p>}
      <form className={styles.form} onSubmit={manejarEnvio}>
        <label htmlFor="">Nombre</label>
        <input
          type="text"
          placeholder="ingrese nombre se producto"
          required
          name="nombre"
          value={datosForm.nombre}
          onChange={manejarCambio}
        />

        <label htmlFor="">Categoria</label>
        <input
          type="text"
          placeholder="ingerse la categoria"
          required
          name="categoria"
          value={datosForm.categoria}
          onChange={manejarCambio}
        />

        <label htmlFor="">Descripcion</label>
        <input
          type="text"
          placeholder="ingrese la descripcion"
          name="descripcion"
          required
          value={datosForm.descripcion}
          onChange={manejarCambio}
        />

        <label htmlFor="">Precio</label>
        <input
          type="number"
          placeholder="ingrese el precio"
          name="precio"
          required
          value={datosForm.precio}
          onChange={manejarCambio}
        />

        <label htmlFor="">Stock</label>
        <input
          type="number"
          placeholder="ingrese el stock"
          name="stock"
          required
          value={datosForm.stock}
          onChange={manejarCambio}
        />
        <label>Imagen</label>
        {esModoEdicion && datosForm.imagen && (
          <img
            src={datosForm.imagen}
            alt="Actual"
            className={styles.imgPreview}
            style={{ width: "80px", marginBottom: "10px" }}
          />
        )}
        <input
          required={!esModoEdicion}
          key={inputKey}
          type="file"
          onChange={manejarCambioImagen}
        />

        <div className={styles.btnForm}>
          <button className={styles.btnAdd} type="submit" disabled={loading}>
            {loading
              ? "Procesando producto..."
              : esModoEdicion
                ? "Guardar Cambios"
                : "Guardar Producto"}
          </button>
          <button
            className={styles.btnCancel}
            type="button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
