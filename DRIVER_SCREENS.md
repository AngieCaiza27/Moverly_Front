# Pantallas del Chofer/Conductor

Se han creado las siguientes pantallas para el módulo de chofer en la aplicación Moverly:

## 📱 Pantallas Creadas

### 1. **Pantalla de Inicio del Chofer** (`driver/index.tsx`)
Página principal del chofer con la siguiente información:

- **Estado en Línea**: Muestra si el chofer está online/offline con opción de cambiar estado
- **Estadísticas Rápidas**:
  - Viajes realizados hoy
  - Ganancias del día
  - Calificación promedio
- **Viaje Actual**: Información del viaje en progreso
  - Ubicación de recogida y destino
  - Distancia y tiempo estimado
  - Información del pasajero
  - Botón para ver detalles
- **Próximos Viajes**: Lista de viajes próximos
- **Acciones Rápidas**: Botones para:
  - Llamar al pasajero
  - Enviar mensaje
  - Ver ruta
  - Contactar soporte

### 2. **Pantalla de Viajes** (`driver/trips.tsx`)
Gestión de viajes disponibles y completados:

- **Dos Pestañas**:
  - **Disponibles**: Viajes que pueden ser aceptados o rechazados
  - **Completados**: Historial de viajes completados
- **Información de cada viaje**:
  - Nombre del pasajero y calificación
  - Ubicación de recogida y destino
  - Distancia y tiempo estimado
  - Tarifa del viaje
  - Hora de recogida
- **Acciones**:
  - Aceptar o rechazar viajes disponibles
  - Ver detalles de viajes completados

### 3. **Pantalla de Perfil** (`driver/profile.tsx`)
Información personal y gestión de cuenta del chofer:

- **Encabezado del Perfil**:
  - Avatar/foto del chofer
  - Nombre y estado de verificación
  - Calificación y número de viajes
- **Estadísticas**:
  - Ganancias de la semana
  - Viajes completados
  - Porcentaje de aceptación
  - Tiempo promedio de viaje
- **Información del Vehículo**:
  - Modelo del vehículo
  - Placa
  - Estado de verificación
- **Estado de Documentos**:
  - Cédula de ciudadanía
  - Licencia de conducción
  - Certificado de seguro
  - Revisión técnico-mecánica
  - Indicadores de estado (verificado, pendiente, vencido)
- **Configuración de Cuenta**:
  - Editar perfil
  - Cambiar contraseña
  - Métodos de pago
  - Notificaciones
  - Ayuda y soporte
- **Cerrar Sesión**: Botón para logout

## 📁 Estructura de Carpetas

```
app/(tabs)/
├── driver/
│   ├── _layout.tsx      (Layout de navegación interna del módulo driver)
│   ├── index.tsx        (Pantalla de inicio)
│   ├── trips.tsx        (Pantalla de viajes)
│   └── profile.tsx      (Pantalla de perfil)
├── index.tsx
├── explore.tsx
└── _layout.tsx          (Layout actualizado con ruta driver)
```

## 🎨 Características de Diseño

- **Tema Adaptable**: Soporte para modo claro y oscuro
- **Componentes Reutilizables**: Uso de ThemedText, ThemedView, e IconSymbol
- **Responsive**: Layouts adaptados a diferentes tamaños de pantalla
- **Interactivo**: Botones y controles totalmente funcionales
- **Iconos**: Uso de SF Symbols para una experiencia nativa

## 🔄 Navegación

El módulo driver está integrado como una pestaña adicional en el tab navigator principal. Los usuarios pueden navegar entre:
- Home (Pasajero)
- Explore (Información)
- **Chofer** (Nueva pestaña con inicio, viajes y perfil)

## 💡 Datos de Ejemplo

Las pantallas incluyen datos de muestra para:
- Información de viajes
- Pasajeros
- Calificaciones
- Documentos
- Estadísticas

Estos datos deben ser reemplazados con datos reales provenientes del backend.

## 🚀 Próximos Pasos

Para completar el módulo del chofer, considere:
1. Integración con API de backend
2. Autenticación y autorización
3. Mapas integrados para mostrar rutas
4. Notificaciones en tiempo real
5. Integración de pagos
6. Analytics y reportes
7. Chat en vivo con pasajeros
