import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { db } from "../../firebase/config";
import style from "./Contacto.module.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";

export const Contacto = () => {
  const [contacto, setContacto] = useState([]);

  useEffect(() => {
     const contactoDB = collection(db, "staff");
     getDocs(contactoDB).then((resp) => {
       setContacto(
         resp.docs.map((doc) => {
           return { ...doc.data() };
         }),
       );
     });
   }, []);

  return (
    <>
      <Header />
      <h1 className={style.title}>Lista de Contactos</h1>
      <div className={style.container}>
        {contacto.map((c) => (
          <div key={c.id} className={style.card}>
            <p>
              Nombre: {c.nombre}
            </p>
            <hr /><br />
            <img src={c.fotoURL} alt="" width={200} className={style.img} />
            <p>
              <strong>Linkedin:</strong> {c.linkedinURL}
            </p>
            <p>
              <strong>Rol:</strong> {c.rol}
            </p>

          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};
