# 👥 Usuarios de Prueba - Moverly App

## 🗂️ Base de Datos Simulada

La aplicación ahora cuenta con una base de datos estática de usuarios que simula un sistema de almacenamiento real. Los datos están centralizados en `constants/mockUsers.ts`.

---

## 👤 CLIENTES

### Usuario 1: Angie Caiza
- **Email:** `angie@moverly.com`
- **Contraseña:** `123456`
- **Teléfono:** +52 55 1234 5678
- **Miembro desde:** Enero 2024
- **Tipo:** Cliente

### Usuario 2: Juan Pérez
- **Email:** `cliente@moverly.com`
- **Contraseña:** `123456`
- **Teléfono:** +52 55 9876 5432
- **Miembro desde:** Marzo 2024
- **Tipo:** Cliente

---

## 🚚 CHOFERES

### Chofer 1: Carlos Méndez
- **Email:** `carlos.mendez@moverly.com`
- **Contraseña:** `123456`
- **Teléfono:** +593 99 123 4567
- **Calificación:** ⭐ 4.9/5.0
- **Viajes completados:** 342
- **Vehículo:** Camioneta Toyota
- **Placa:** ABC-1234
- **Experiencia:** 8 años
- **Miembro desde:** Enero 2023

### Chofer 2: Miguel Ruiz
- **Email:** `miguel.ruiz@moverly.com`
- **Contraseña:** `123456`
- **Teléfono:** +593 98 765 4321
- **Calificación:** ⭐ 4.7/5.0
- **Viajes completados:** 278
- **Vehículo:** Camión Chevrolet
- **Placa:** XYZ-5678
- **Experiencia:** 6 años
- **Miembro desde:** Junio 2023

### Chofer 3: Luis Paredes
- **Email:** `luis.paredes@moverly.com`
- **Contraseña:** `123456`
- **Teléfono:** +593 97 456 7890
- **Calificación:** ⭐ 4.8/5.0
- **Viajes completados:** 195
- **Vehículo:** Tráiler Freightliner
- **Placa:** LMN-9012
- **Experiencia:** 10 años
- **Miembro desde:** Agosto 2022

---

## 🔐 Sistema de Autenticación

### Funcionalidades Implementadas:

1. **Validación de Credenciales**
   - Sistema de login que valida email y contraseña contra la base de datos estática
   - Mensajes de error informativos con listado de usuarios disponibles

2. **Gestión de Sesiones**
   - Uso de AsyncStorage para guardar la sesión del usuario
   - Persistencia de datos entre sesiones
   - Cierre de sesión limpia que elimina todos los datos

3. **Enrutamiento Automático**
   - Clientes → Redirigen a `/(tabs)` (pantallas de cliente)
   - Choferes → Redirigen a `/driver` (pantallas de chofer)

4. **Perfiles Personalizados**
   - Los perfiles de cliente y chofer muestran datos reales del usuario logueado
   - Información dinámica que se actualiza según el usuario

---

## 📱 Cómo Usar

1. **Iniciar sesión:**
   - Abrir la app
   - Ingresar un email de la lista
   - Ingresar contraseña: `123456`
   - El sistema detecta automáticamente si es cliente o chofer

2. **Cambiar de usuario:**
   - Ir al perfil
   - Cerrar sesión
   - Iniciar sesión con otro usuario

3. **Ver información del usuario:**
   - Cliente: Ver perfil en pestaña "Perfil"
   - Chofer: Ver perfil en pestaña "Perfil" del panel de chofer

---

## 🔄 Sincronización de Datos

Los choferes que aparecen en la pantalla de cotizaciones de los clientes son **exactamente los mismos** usuarios que pueden iniciar sesión como choferes, creando una simulación realista de un sistema con base de datos compartida.

**Ejemplo de flujo:**
1. Cliente "Angie" solicita una mudanza
2. Sistema asigna al chofer "Carlos Méndez" (ID: 1)
3. Carlos puede iniciar sesión con `carlos.mendez@moverly.com`
4. Ve sus datos reales: 342 viajes, calificación 4.9, vehículo Camioneta Toyota

---

## 🛠️ Archivos Modificados

1. **`constants/mockUsers.ts`** - Base de datos estática de usuarios
2. **`app/login.tsx`** - Sistema de autenticación con validación
3. **`app/(tabs)/profile.tsx`** - Perfil de cliente con datos reales
4. **`app/driver/(tabs)/profile.tsx`** - Perfil de chofer con datos reales
5. **`app/(tabs)/quotes.tsx`** - Usa la misma lista de choferes

---

## ✨ Características

- ✅ Usuarios estáticos que simulan base de datos real
- ✅ Validación de credenciales
- ✅ Sesiones persistentes con AsyncStorage
- ✅ Datos consistentes entre cliente y chofer
- ✅ Perfiles dinámicos que muestran información real
- ✅ Sistema de logout funcional
- ✅ Correos específicos para cada usuario
- ✅ Información detallada de choferes (vehículo, placa, experiencia)
