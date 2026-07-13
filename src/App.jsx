import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/home/Home";
import { Cart } from "./components/cart/Cart";
import { ItemListContainer } from "./components/productos/ItemListContainer";
import { ItemDetalle } from "./components/productos/ItemDetalle";
import { Login } from "./components/login/Login";
import { Contacto } from "./components/contacto/Contacto";
import { Importados } from "./components/importados/Importados";
import { FormularioContainer } from "./components/gestion/form/FormularioContainer";
import { FormularioConsulta } from "./components/gestion/form/FormularioConsulta";
import { GestionCupones } from "./components/gestion/GestionCupones";
import { Menu } from "./components/gestion/Menu";
import { Registro } from "./components/registro/Registro";
import { RouteProtected } from "./components/routeProtected/RouteProtected";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ItemListContainer />} />
      <Route path="/products/:id" element={<ItemDetalle />} /> {/* API */}
      <Route path="/products/importados/:id" element={<ItemDetalle />} />{" "}
      <Route path="/about" element={<Layout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/carrito" element={<Cart />} />
      <Route path="/contact" element={<Contacto />} />
      <Route path="/importados" element={<Importados />} />
      <Route
        path="/menu"
        element={
          <RouteProtected rolesPermitidos={["admin"]}>
            <Menu />
          </RouteProtected>
        }
      />
      <Route path="/alta" element={<FormularioContainer />} />
      <Route path="/consulta" element={<FormularioConsulta />} />
      <Route
        path="/gestionCupones"
        element={
          <RouteProtected rolesPermitidos={["admin"]}>
            <GestionCupones />
          </RouteProtected>
        }
      />
      <Route path="/registro" element={<Registro />} />
    </Routes>
  );
}

export default App;
