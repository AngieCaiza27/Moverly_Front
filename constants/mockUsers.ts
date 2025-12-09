// constants/mockUsers.ts
// Base de datos simulada de usuarios (clientes y choferes)

export interface User {
  id: number;
  email: string;
  password: string;
  type: 'client' | 'driver';
  name: string;
  phone: string;
  avatar?: string;
  // Campos específicos de choferes
  rating?: number;
  trips?: number;
  vehicle?: string;
  plate?: string;
  experience?: string;
  memberSince?: string;
}

export const MOCK_USERS: User[] = [
  // ============= CLIENTES =============
  {
    id: 100,
    email: "angie@moverly.com",
    password: "123456",
    type: "client",
    name: "Angie Caiza",
    phone: "+52 55 1234 5678",
    avatar: undefined,
    memberSince: "Enero 2024",
  },
  {
    id: 101,
    email: "cliente@moverly.com",
    password: "123456",
    type: "client",
    name: "Juan Pérez",
    phone: "+52 55 9876 5432",
    avatar: undefined,
    memberSince: "Marzo 2024",
  },

  // ============= CHOFERES =============
  // Chofer 1: Carlos Méndez
  {
    id: 1,
    email: "carlos.mendez@moverly.com",
    password: "123456",
    type: "driver",
    name: "Carlos Méndez",
    phone: "+593 99 123 4567",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.9,
    trips: 342,
    vehicle: "Camioneta Toyota",
    plate: "ABC-1234",
    experience: "8 años",
    memberSince: "Enero 2023",
  },
  // Chofer 2: Miguel Ruiz
  {
    id: 2,
    email: "miguel.ruiz@moverly.com",
    password: "123456",
    type: "driver",
    name: "Miguel Ruiz",
    phone: "+593 98 765 4321",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4.7,
    trips: 278,
    vehicle: "Camión Chevrolet",
    plate: "XYZ-5678",
    experience: "6 años",
    memberSince: "Junio 2023",
  },
  // Chofer 3: Luis Paredes
  {
    id: 3,
    email: "luis.paredes@moverly.com",
    password: "123456",
    type: "driver",
    name: "Luis Paredes",
    phone: "+593 97 456 7890",
    avatar: "https://randomuser.me/api/portraits/men/68.jpg",
    rating: 4.8,
    trips: 195,
    vehicle: "Tráiler Freightliner",
    plate: "LMN-9012",
    experience: "10 años",
    memberSince: "Agosto 2022",
  },
];

// Función para validar login
export function validateLogin(email: string, password: string): User | null {
  const user = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  return user || null;
}

// Función para obtener usuario por email
export function getUserByEmail(email: string): User | null {
  return MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

// Función para obtener chofer por ID
export function getDriverById(id: number): User | null {
  const user = MOCK_USERS.find((u) => u.id === id && u.type === 'driver');
  return user || null;
}

// Obtener todos los choferes
export function getAllDrivers(): User[] {
  return MOCK_USERS.filter((u) => u.type === 'driver');
}
