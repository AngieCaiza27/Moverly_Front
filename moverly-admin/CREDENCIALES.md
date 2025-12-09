# 🔐 Credenciales de Acceso - Panel Administrativo Moverly

## 📋 Acceso al Sistema

### Credenciales de Administrador (Modo Desarrollo)

```
Correo:     admin@moverly.com
Contraseña: admin123
```

## 🚀 Cómo Iniciar el Panel Admin

1. **Abrir terminal en la carpeta del admin:**
   ```bash
   cd moverly-admin
   ```

2. **Instalar dependencias (primera vez):**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abrir en navegador:**
   ```
   http://localhost:5173
   ```

5. **Iniciar sesión con las credenciales de arriba**

## 📊 Datos de Prueba Disponibles

### Usuarios (10 registros)
- Ana Torres, Carlos Méndez, Miguel Ruiz, Luis Paredes, María Sánchez
- Pedro Morales, Sandra Vega, Roberto Castro, Patricia Gómez, Fernando López

### Conductores (6 registros)
- Carlos Méndez (Camioneta 1.5T) - Verificado
- Miguel Ruiz (Camión 4T) - Verificado
- Luis Paredes (Motocarga) - Pendiente
- Pedro Morales (Tráiler 10T) - Activo
- Sandra Vega (Furgoneta 2T) - Verificado
- Roberto Castro (Camión 6T) - Pendiente

### Pedidos (7 registros)
- Estados: Pendiente, Asignado, En curso, Completado
- Tipos: Mudanza, Flete, Transporte
- Ciudades: Ambato, Baños, Pelileo, Quito, Latacunga

## 🔧 Funcionalidades Disponibles

### Dashboard
- ✅ Estadísticas en tiempo real
- ✅ Gráfica de tendencias semanales
- ✅ Resumen de pedidos activos

### Gestión de Usuarios
- ✅ Crear, editar, eliminar usuarios
- ✅ Filtrar por rol (Cliente, Conductor, Administrador)
- ✅ Buscar por nombre, email
- ✅ Cambiar estado (Activo, Inactivo, Suspendido)

### Gestión de Conductores
- ✅ Aprobar/Rechazar conductores pendientes
- ✅ Ver documentos PDF (Licencia, Cédula, Matrícula)
- ✅ Calificaciones y viajes completados
- ✅ Filtrar por estado de verificación

### Gestión de Pedidos
- ✅ Ver todos los pedidos
- ✅ Filtrar por estado
- ✅ Cancelar pedidos
- ✅ Ver detalles completos de ruta
- ✅ Estadísticas de ingresos

## 🌐 Modo de Funcionamiento

### Modo Desarrollo (Actual)
- Login sin backend
- Datos en localStorage
- Credenciales: admin@moverly.com / admin123

### Modo Producción (Futuro)
- Conexión con API backend
- Credenciales reales desde base de datos
- JWT token authentication

## 📝 Notas Importantes

- Los datos se guardan en localStorage del navegador
- Al limpiar el navegador, los datos se reinician
- Los PDFs de documentos son URLs de prueba
- El sistema soporta tanto modo desarrollo como producción

## 🆘 Soporte

Si tienes problemas al iniciar sesión, verifica:
1. Que el servidor esté corriendo (npm run dev)
2. Que las credenciales sean exactamente: admin@moverly.com / admin123
3. Que el navegador permita localStorage

---

**Última actualización:** Diciembre 9, 2025
