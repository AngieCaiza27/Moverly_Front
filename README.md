# 🚚 Moverly - Frontend (Mobile App & Admin Panel)

Plataforma integral para gestión y contratación de servicios de mudanzas y transporte de carga. Este repositorio alberga tanto la **aplicación móvil** (para clientes y choferes) desarrollada con React Native / Expo, como el **panel de administración web** desarrollado con Vite y React.

---

## 📑 Tabla de Contenidos

- [Características Principales](#-características-principales)
  - [Módulo de Clientes](#1-módulo-de-clientes-app-móvil)
  - [Módulo de Choferes](#2-módulo-de-choferes-app-móvil)
  - [Panel Administrativo](#3-panel-administrativo-web)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
  - [1. Aplicación Móvil (Moverly App)](#1-aplicación-móvil-moverly-app)
  - [2. Panel Administrativo (Moverly Admin)](#2-panel-administrativo-moverly-admin)
- [Autenticación y Usuarios de Prueba](#-autenticación-y-usuarios-de-prueba)
- [Documentación Adicional](#-documentación-adicional)

---

## 🌟 Características Principales

### 1. Módulo de Clientes (App Móvil)
- **Autenticación y Registro:** Registro diferenciado para clientes y login con redirección automática basada en roles.
- **Cotización y Solicitud:** Creación y seguimiento de solicitudes de mudanza y transporte.
- **Historial de Viajes:** Visualización de mudanzas realizadas y en curso con buscador de pedidos y filtros por fecha.
- **Detalle del Viaje y Chat:** Comunicación en tiempo real con el chofer asignado y visualización de la ruta estimada.
- **Perfil de Usuario:** Gestión de datos personales, direcciones frecuentes (casa/trabajo) y métodos de pago.

### 2. Módulo de Choferes (App Móvil)
- **Registro con Documentación:** Carga de documentos requeridos (licencia de conducir, matrícula del vehículo, seguro, etc.).
- **Panel de Control:** Interruptor de estado en línea / desconectado, estadísticas diarias (viajes, ganancias, calificación promedio).
- **Gestión de Viajes:** Pestañas para aceptar/rechazar viajes disponibles y ver historial de viajes completados.
- **Detalles Operativos:** Navegación hacia punto de recogida/entrega y canal directo de contacto con el cliente.
- **Perfil y Vehículo:** Información del vehículo, estado de verificación de documentos y configuración de cuenta.

### 3. Panel Administrativo (Web)
- **Ubicación:** Carpeta `moverly-admin/`
- **Dashboard:** Métricas generales del sistema (pedidos activos, usuarios registrados, choferes verificados).
- **Gestión de Órdenes:** Supervisión de pedidos en tiempo real, asignaciones y estados de entrega.
- **Control de Usuarios y Choferes:** Verificación de documentos y aprobación de cuentas de transportistas.

---

## 🛠 Tecnologías Utilizadas

### Aplicación Móvil (Raíz del proyecto)
- **Framework:** [React Native](https://reactnative.dev/) (v0.81.4) con [Expo](https://expo.dev/) (v54 / SDK 54)
- **Enrutamiento:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing v6)
- **Navegación:** React Navigation v7
- **Formularios & Validación:** React Hook Form + Yup
- **Almacenamiento Local:** `@react-native-async-storage/async-storage`
- **UI & Animaciones:** React Native Reanimated, Expo Vector Icons, Lucide Icons

### Panel Administrativo (`moverly-admin/`)
- **Framework:** [React](https://react.dev/) (v19) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler:** [Vite](https://vite.dev/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) + Headless UI + Heroicons
- **Cliente HTTP:** Axios
- **Enrutador:** React Router DOM (v7)

---

## 📂 Estructura del Proyecto

```text
Moverly_Front/
├── app/                        # Rutas y pantallas de la App Móvil (Expo Router)
│   ├── (tabs)/                 # Navegación por pestañas para clientes (Home, Cotizaciones, Mudanzas, Perfil)
│   ├── driver/                 # Navegación y pantallas del Chofer (Dashboard, Viajes, Perfil, Documentos)
│   ├── history/                # Pantallas de historial y detalles de pedidos
│   ├── login.tsx               # Pantalla de inicio de sesión
│   ├── register.tsx            # Registro general
│   ├── register-type.tsx       # Selección de rol (Cliente / Chofer)
│   ├── register-documents.tsx  # Carga de documentos para conductores
│   └── _layout.tsx             # Layout global de la app
├── assets/                     # Imágenes, banners e íconos de la app
├── components/                 # Componentes reutilizables (Botones, Inputs, Textos tematizados)
├── constants/                  # Constantes (Colores, Temas, mockUsers.ts)
├── hooks/                      # Custom hooks para colores y estados
├── moverly-admin/              # Panel Administrativo Web (React + Vite + Tailwind)
│   ├── src/
│   │   ├── api/                # Consumo de APIs administrativas
│   │   ├── context/            # Contextos globales (AuthContext)
│   │   ├── pages/              # Páginas del panel (Dashboard, Orders, Login)
│   │   └── router/             # Configuración de rutas web
│   ├── package.json
│   └── vite.config.ts
├── DRIVER_SCREENS.md           # Detalle técnico de las pantallas del chofer
├── USUARIOS_PRUEBA.md          # Credenciales y datos de prueba
├── package.json                # Dependencias de la app móvil
└── README.md                   # Documentación principal del repositorio
```

---

## 📋 Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- Gestor de paquetes: `npm` o `yarn`
- [Expo Go](https://expo.dev/go) en tu dispositivo móvil (Android / iOS) o un Emulador/Simulador configurado (Android Studio / Xcode).

---

## 🚀 Instalación y Configuración

### 1. Aplicación Móvil (Moverly App)

1. En la raíz del proyecto, instala las dependencias:
   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo de Expo:
   ```bash
   npx expo start
   ```

3. Elige el entorno de ejecución en la terminal interactiva:
   - Presiona `a` para abrir en **Emulador Android**.
   - Presiona `i` para abrir en **Simulador iOS**.
   - Presiona `w` para probar en **Web**.
   - Escanea el código QR con la app **Expo Go** en tu dispositivo físico.

### 2. Panel Administrativo (Moverly Admin)

1. Dirígete a la carpeta `moverly-admin`:
   ```bash
   cd moverly-admin
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor web en modo desarrollo:
   ```bash
   npm run dev
   ```

4. Abre tu navegador en la URL indicada por Vite (normalmente `http://localhost:5173`).

---

## 👥 Autenticación y Usuarios de Prueba

La app móvil cuenta con un sistema de autenticación simulado con datos centralizados en `constants/mockUsers.ts`. Puedes iniciar sesión con las siguientes credenciales:

| Tipo | Correo Electrónico | Contraseña | Rol / Vehículo |
| :--- | :--- | :--- | :--- |
| **Cliente** | `angie@moverly.com` | `123456` | Cliente habitual |
| **Cliente** | `cliente@moverly.com` | `123456` | Cliente corporativo |
| **Chofer** | `carlos.mendez@moverly.com` | `123456` | Conductor - Camioneta Toyota |
| **Chofer** | `miguel.ruiz@moverly.com` | `123456` | Conductor - Camión Chevrolet |
| **Chofer** | `luis.paredes@moverly.com` | `123456` | Conductor - Tráiler Freightliner |

> Para más detalles sobre usuarios simulados, consulta el archivo [USUARIOS_PRUEBA.md](file:///c:/Users/crist/Desktop/PROYECTOS/Moverly_Front/USUARIOS_PRUEBA.md).

---

## 📖 Documentación Adicional

- [DRIVER_SCREENS.md](file:///c:/Users/crist/Desktop/PROYECTOS/Moverly_Front/DRIVER_SCREENS.md): Guía y especificaciones de las pantallas del módulo de chofer.
- [USUARIOS_PRUEBA.md](file:///c:/Users/crist/Desktop/PROYECTOS/Moverly_Front/USUARIOS_PRUEBA.md): Lista completa de datos simulados y flujo de autenticación.
