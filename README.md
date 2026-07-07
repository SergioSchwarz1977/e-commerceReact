# E-commerce React + Firebase

Este proyecto es una tienda online desarrollada con React y Vite, utilizando Firebase Authentication y Firestore como backend para gestionar la autenticación de usuarios, los productos importados y el panel de administración.

## Descripción general

La aplicación permite:

- Explorar productos desde una API pública llamada DummyJSON en la sección de productos del navbar.
- Mostrar productos importados desde Firebase Firestore en la sección de productos importados.
- Realizar operaciones CRUD de productos para el administrador.
- Registrar e iniciar sesión con Firebase Authentication.
- Proteger rutas de acceso mediante route protection.
- Diferenciar entre usuarios comunes y un administrador.

## Funcionalidades principales

### 1. Catálogo de productos
- Los productos del navbar se obtienen desde DummyJSON.
- Los productos importados se gestionan desde Firestore.

### 2. Gestión de productos (admin)
El usuario administrador puede:
- Crear productos nuevos.
- Editar productos existentes.
- Eliminar productos.
- Consultar y visualizar productos en el panel de gestión.

### 3. Autenticación
- Registro e inicio de sesión con Firebase Auth.
- Rutas protegidas para usuarios autenticados.
- Acceso administrativo exclusivo para el rol de administrador.

### 4. Panel de administración
El usuario administrador puede acceder al menú de gestión para manejar los productos del ecommerce.

## Credenciales de acceso

Usuario administrador:
- Email: admin@gmail.com
- Contraseña: admin1234

## Tecnologías utilizadas

- React
- Vite
- React Router DOM
- Firebase Authentication
- Firestore
- CSS Modules

## Requisitos previos

- Node.js 18 o superior
- npm o pnpm
- Una cuenta de Firebase configurada

## Instalación

1. Clona este repositorio:
   ```bash
   git clone <url-del-repositorio>
   ```

2. Ingresa al proyecto:
   ```bash
   cd e-commerce
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Ejecuta la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```

## Estructura del proyecto

```bash
src/
  components/
    cart/
    contacto/
    destacados/
    footer/
    gestion/
    header/
    home/
    importados/
    login/
    productos/
    registro/
    routeProtected/
  context/
  firebase/
```

## Configuración de Firebase

Para que la aplicación funcione correctamente, debes configurar tu propio proyecto en Firebase y reemplazar los valores de conexión en:

- src/firebase/config.js

## Notas

Este proyecto combina una API externa (DummyJSON) con una base de datos en Firebase para mostrar diferentes fuentes de productos y gestionar el flujo de autenticación y administración del ecommerce.
