# JANDROGEN Frontend 🟢

Frontend de la plataforma de comercio electrónico B2B para equipos de hidrógeno verde.

## ✨ Características

- **Tienda Online**: Catálogo de productos con búsqueda, filtros y detalles
- **Carrito de Compras**: Gestión de productos con cantidad y totales
- **Checkout Seguro**: Formularios de cliente, envío y método de pago
- **Panel de Administración**: Dashboard, gestión de productos, pedidos y métricas
- **Chat en Tiempo Real**: Sistema de mensajería entre clientes y administradores
- **Notificaciones en Tiempo Real**: Socket.io para órdenes, pagos y mensajes
- **Diseño Responsivo**: Mobile-first con Tailwind CSS
- **Animaciones**: Framer Motion para transiciones fluidas

## 🛠️ Tecnologías

- **React 19** - Framework UI
- **React Router** - Navegación
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Estilos
- **Framer Motion** - Animaciones
- **Socket.io Client** - Tiempo real
- **Lucide React** - Iconos

## 📋 Requisitos

- Node.js 18+
- npm o yarn

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar en desarrollo
npm start
```

## ⚙️ Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
REACT_APP_API_URL=http://localhost:4000
```

Para producción, configura la variable de entorno en tu plataforma de hosting (Vercel, Netlify, etc.).

## 📁 Estructura

```
src/
├── components/             # Componentes reutilizables
│   ├── admin/             # Componentes del admin
│   ├── shop/             # Componentes de la tienda
│   ├── SocketProvider.jsx
│   └── Toast.jsx
├── contexts/              # React Contexts
│   ├── AuthContext.jsx   # Autenticación
│   └── CartContext.jsx   # Carrito
├── hooks/                 # Custom hooks
├── layouts/              # Layouts (Admin, Shop)
├── pages/               # Páginas
│   ├── admin/           # Panel de administración
│   ├── shop/           # Tienda
│   └── NotFound.jsx    # Página 404
├── config/              # Configuración
│   └── axios.js        # Instancia de Axios
├── App.js              # Componente principal
└── router.jsx          # Configuración de rutas
```

## 🔐 Rutas

### Tienda (Público)
- `/` - Home con productos
- `/product/:id` - Detalle de producto
- `/cart` - Carrito de compras
- `/checkout/:id` - Checkout
- `/order-success` - Orden exitosa
- `/tracking` - Rastrear orden

### Administración (Requiere Auth)
- `/admin/login` - Login
- `/admin/dashboard` - Panel de métricas
- `/admin/products` - Gestión de productos
- `/admin/orders` - Gestión de pedidos
- `/admin/inquiries` - Mensajes/Chat
- `/admin/settings` - Configuración

## 🔌 API Integration

El frontend se conecta al backend en la URL configurada en `REACT_APP_API_URL/api`.

### Endpoints utilizados:
- `GET /products` - Lista productos
- `GET /products/:id` - Producto específico
- `POST /orders` - Crear orden
- `GET /orders` - Lista pedidos (admin)
- `POST /chat` - Crear conversación
- `GET /chat/all` - Todas las conversaciones (admin)
- `POST /chat/message` - Enviar mensaje

## 🔔 Tiempo Real

Socket.io conecta automáticamente cuando el admin inicia sesión:
- `new-order` - Nueva orden creada
- `payment-confirmed` - Pago confirmado
- `new-message` - Nuevo mensaje de cliente

## 🧪 Scripts

```bash
npm start          # Desarrollo (puerto 3000)
npm run build     # Producción
npm test          # Tests
npm run eject     # Eject de React
```

## 📱 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `REACT_APP_API_URL` | URL del backend | `http://localhost:4000` |

## 🔧 Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor desarrollo
npm start

# Build producción
npm run build
```

## 📄 Licencia

Privado - © 2026 JANDROGEN SYSTEMS
