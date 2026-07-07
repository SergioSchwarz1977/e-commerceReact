import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase/config";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { FormularioProducto } from "./FormularioProducto";
import { useLocation } from "react-router-dom";

export const FormularioContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const productoAEditar = location.state?.productoAEditar;
  const esModoEdicion = !!productoAEditar;

  const [loading, setLoading] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [imagenFile, setImagenFile] = useState(null);
  const [inputKey, setInputKey] = useState(0);
  const [datosForm, setDatosForm] = useState({
    nombre: productoAEditar?.nombre || "",
    categoria: productoAEditar?.categoria || "",
    descripcion: productoAEditar?.descripcion || "",
    precio: productoAEditar?.precio || "",
    stock: productoAEditar?.stock || "",
    imagen: productoAEditar?.imagen || "",
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    const camposNumericos = ["precio", "stock"];
    const valor =
      camposNumericos.includes(name) && value !== "" ? Number(value) : value;

    setDatosForm({
      ...datosForm,
      [name]: valor,
    });
  };
  const manejarCambioImagen = (e) => {
    setImagenFile(e.target.files[0]);
  };

  const resetearFormulario = () => {
    setDatosForm({
      nombre: "",
      categoria: "",
      descripcion: "",
      precio: "",
      stock: "",
      imagen: "",
    });
    setImagenFile(null);
    setInputKey((prev) => prev + 1);
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setMensajeExito("");
    setLoading(true);

    try {
      let urlImagenFinal = datosForm.imagen;
      if (imagenFile) {
        console.log("Subiendo nueva imagen a Imgbb...");
        const apiKey = "44b3d4487541aa1dd039a57671ad3e26";
        const formData = new FormData();
        formData.append("image", imagenFile);

        const respuestaImgbb = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: "POST",
            body: formData,
          },
        );
        const datosImgbb = await respuestaImgbb.json();

        if (datosImgbb.success) {
          urlImagenFinal = datosImgbb.data.url;
        } else {
          throw new Error("La subida de la imagen a Imgbb falló.");
        }
      } else if (!esModoEdicion) {
        setLoading(false);
        alert("Debe seleccionar una imagen para el producto");
        return;
      }

      const productoFinal = {
        ...datosForm,
        precio: Number(datosForm.precio),
        stock: Number(datosForm.stock),
        imagen: urlImagenFinal,
      };

      if (esModoEdicion) {
        console.log("Editando producto en Firebase...");
        const docRef = doc(db, "productos", productoAEditar.idFirestore);
        await updateDoc(docRef, productoFinal);

        alert("Producto editado con éxito 🎉");
        navigate("/consulta");
      } else {
        console.log("Guardando nuevo producto en Firebase...");
        const productoNuevo = { ...productoFinal, id: Date.now() };

        const producFirebase = collection(db, "productos");
        await addDoc(producFirebase, productoNuevo);

        setMensajeExito("Producto guardado correctamente.");
        resetearFormulario();
      }
    } catch (error) {
      console.error("Error en el proceso de envío:", error);
      swal.fire("Ocurrió un error al guardar el producto", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FormularioProducto
        manejarCambio={manejarCambio}
        manejarEnvio={manejarEnvio}
        manejarCambioImagen={manejarCambioImagen}
        loading={loading}
        mensajeExito={mensajeExito}
        inputKey={inputKey}
        datosForm={datosForm}
        esModoEdicion={esModoEdicion}
      />
    </>
  );
};
