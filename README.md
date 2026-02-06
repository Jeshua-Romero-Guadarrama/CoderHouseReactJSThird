# ProyectoFinal+Romero

## Datos del proyecto
- Estudiante: **Jeshua Romero Guadarrama**
- Curso / Comision: **React JS 81700**
- Proyecto: **Business Analytics MX - E-commerce de servicios**

## Descripcion
Web app SPA de e-commerce desarrollada con React, React Router y Firebase/Firestore.
Permite navegar un catalogo de servicios por categoria, ver detalle, agregar al carrito y
generar una orden de compra registrada en Firestore.

## Funcionalidades clave
- Navegacion SPA con rutas dinamicas para categorias y detalle.
- Listado y detalle de productos consumidos desde Firestore.
- Carrito global con Context (CartContext).
- Contador de unidades con validaciones y ocultamiento luego de agregar.
- Checkout con validacion de datos y generacion de orden en Firestore.
- Mensajes condicionales (loader, sin stock, carrito vacio, id de orden).

## Estructura de componentes
- `App`
- `NavBar` / `CartWidget`
- `ItemListContainer` / `ItemList` / `Item`
- `ItemDetailContainer` / `ItemDetail` / `ItemCount`
- `Cart` / `CartItem`
- `CheckoutForm`

## Configuracion de Firebase
Crear un archivo `.env` en la raiz con las credenciales del proyecto:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

### Colecciones esperadas
- `productos`
- `ordenes`

Ejemplo de documento en `productos`:

```json
{
  "titulo": "Investigacion del comportamiento",
  "descripcion": "Analizamos decisiones de usuarios...",
  "nivel": "Servicio especializado",
  "duracion": "Proyecto a medida",
  "formato": "Consultoria + research",
  "precio": 68000,
  "categoria": "behavioral",
  "stock": 10
}
```

## Como correr
1. Instalar dependencias: `npm install`
2. Dev: `npm run dev`
3. Abrir `http://localhost:5173`

## Notas
- Tailwind se carga por CDN desde `index.html`.
- La coleccion `productos` usa el `id` del documento como id del item.
