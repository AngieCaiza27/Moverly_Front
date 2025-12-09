// 💾 Servicio de persistencia simulada con localStorage
// Simula una base de datos para el panel admin

import type { User, Driver, Order, AdminStats } from '../data/mockData';
import { MOCK_USERS, MOCK_DRIVERS, MOCK_ORDERS, MOCK_STATS } from '../data/mockData';

const STORAGE_KEYS = {
  USERS: '@moverly_admin_users',
  DRIVERS: '@moverly_admin_drivers',
  ORDERS: '@moverly_admin_orders',
  STATS: '@moverly_admin_stats',
};

// Inicializar datos si no existen
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(MOCK_USERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.DRIVERS)) {
    localStorage.setItem(STORAGE_KEYS.DRIVERS, JSON.stringify(MOCK_DRIVERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(MOCK_ORDERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.STATS)) {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(MOCK_STATS));
  }
};

// ============ USUARIOS ============

export const getUsers = (): User[] => {
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : MOCK_USERS;
};

export const getUserById = (id: string): User | null => {
  const users = getUsers();
  return users.find(u => u.id === id) || null;
};

export const createUser = (user: Omit<User, 'id' | 'fechaRegistro'>): User => {
  const users = getUsers();
  const newUser: User = {
    ...user,
    id: `USR-${String(users.length + 1).padStart(3, '0')}`,
    fechaRegistro: new Date().toISOString().split('T')[0],
  };
  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  updateStats();
  return newUser;
};

export const updateUser = (id: string, updates: Partial<User>): User | null => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;
  
  users[index] = { ...users[index], ...updates };
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  return users[index];
};

export const deleteUser = (id: string): boolean => {
  const users = getUsers();
  const filtered = users.filter(u => u.id !== id);
  if (filtered.length === users.length) return false;
  
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filtered));
  updateStats();
  return true;
};

// ============ CONDUCTORES ============

export const getDrivers = (): Driver[] => {
  const data = localStorage.getItem(STORAGE_KEYS.DRIVERS);
  return data ? JSON.parse(data) : MOCK_DRIVERS;
};

export const getDriverById = (id: string): Driver | null => {
  const drivers = getDrivers();
  return drivers.find(d => d.id === id) || null;
};

export const createDriver = (driver: Omit<Driver, 'id' | 'fechaRegistro' | 'viajesCompletados' | 'calificacion'>): Driver => {
  const drivers = getDrivers();
  const newDriver: Driver = {
    ...driver,
    id: `DRV-${String(drivers.length + 1).padStart(3, '0')}`,
    fechaRegistro: new Date().toISOString().split('T')[0],
    viajesCompletados: 0,
    calificacion: 0,
  };
  drivers.push(newDriver);
  localStorage.setItem(STORAGE_KEYS.DRIVERS, JSON.stringify(drivers));
  updateStats();
  return newDriver;
};

export const updateDriver = (id: string, updates: Partial<Driver>): Driver | null => {
  const drivers = getDrivers();
  const index = drivers.findIndex(d => d.id === id);
  if (index === -1) return null;
  
  drivers[index] = { ...drivers[index], ...updates };
  localStorage.setItem(STORAGE_KEYS.DRIVERS, JSON.stringify(drivers));
  return drivers[index];
};

export const deleteDriver = (id: string): boolean => {
  const drivers = getDrivers();
  const filtered = drivers.filter(d => d.id !== id);
  if (filtered.length === drivers.length) return false;
  
  localStorage.setItem(STORAGE_KEYS.DRIVERS, JSON.stringify(filtered));
  updateStats();
  return true;
};

export const approveDriver = (id: string): Driver | null => {
  return updateDriver(id, { estado: 'Verificado' });
};

export const rejectDriver = (id: string): Driver | null => {
  return updateDriver(id, { estado: 'Rechazado' });
};

// ============ PEDIDOS ============

export const getOrders = (): Order[] => {
  const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
  return data ? JSON.parse(data) : MOCK_ORDERS;
};

export const getOrderById = (id: string): Order | null => {
  const orders = getOrders();
  return orders.find(o => o.id === id) || null;
};

export const createOrder = (order: Omit<Order, 'id' | 'numeroOrden' | 'fechaCreacion'>): Order => {
  const orders = getOrders();
  const orderNumber = orders.length + 1;
  const newOrder: Order = {
    ...order,
    id: `ORD-${String(orderNumber).padStart(3, '0')}`,
    numeroOrden: `#${order.tipo.substring(0, 3).toUpperCase()}-2024-${String(orderNumber).padStart(3, '0')}`,
    fechaCreacion: new Date().toISOString().split('T')[0],
  };
  orders.push(newOrder);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  updateStats();
  return newOrder;
};

export const updateOrder = (id: string, updates: Partial<Order>): Order | null => {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index === -1) return null;
  
  orders[index] = { ...orders[index], ...updates };
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  updateStats();
  return orders[index];
};

export const deleteOrder = (id: string): boolean => {
  const orders = getOrders();
  const filtered = orders.filter(o => o.id !== id);
  if (filtered.length === orders.length) return false;
  
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(filtered));
  updateStats();
  return true;
};

export const cancelOrder = (id: string): Order | null => {
  return updateOrder(id, { estado: 'Cancelado' });
};

export const assignDriverToOrder = (orderId: string, driverId: string, driverName: string): Order | null => {
  return updateOrder(orderId, { 
    conductorId: driverId, 
    conductor: driverName,
    estado: 'Asignado' 
  });
};

// ============ ESTADÍSTICAS ============

export const getStats = (): AdminStats => {
  const data = localStorage.getItem(STORAGE_KEYS.STATS);
  return data ? JSON.parse(data) : MOCK_STATS;
};

const updateStats = () => {
  const users = getUsers();
  const drivers = getDrivers();
  const orders = getOrders();
  
  const activeOrders = orders.filter(o => o.estado === 'Asignado' || o.estado === 'En curso').length;
  const totalIngresos = orders
    .filter(o => o.estado === 'Completado')
    .reduce((sum, o) => sum + o.precio, 0);

  const pedidosPorEstado = {
    pendientes: orders.filter(o => o.estado === 'Pendiente').length,
    enCurso: orders.filter(o => o.estado === 'En curso').length,
    completados: orders.filter(o => o.estado === 'Completado').length,
    cancelados: orders.filter(o => o.estado === 'Cancelado').length,
  };

  const currentStats = getStats();
  const updatedStats: AdminStats = {
    ...currentStats,
    pedidosActivos: activeOrders,
    conductores: drivers.length,
    usuarios: users.length,
    ingresos: totalIngresos,
    pedidosPorEstado,
  };

  localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(updatedStats));
};

// ============ RESET ============

export const resetAllData = () => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(MOCK_USERS));
  localStorage.setItem(STORAGE_KEYS.DRIVERS, JSON.stringify(MOCK_DRIVERS));
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(MOCK_ORDERS));
  localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(MOCK_STATS));
};
