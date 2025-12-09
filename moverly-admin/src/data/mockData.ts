// 📦 Datos de prueba para el panel administrativo
// Integrados con los mismos usuarios y choferes de la app móvil

export interface User {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  ciudad: string;
  direccion: string;
  rol: "Cliente" | "Conductor" | "Administrador";
  fechaRegistro: string;
  estado: "Activo" | "Inactivo" | "Suspendido";
  avatar?: string;
}

export interface Driver {
  id: string;
  nombre: string;
  email: string;
  licencia: string;
  tipoLicencia: string;
  vehiculo: string;
  placa: string;
  estado: "Pendiente" | "Verificado" | "Rechazado" | "Activo" | "Inactivo";
  telefono: string;
  ciudad: string;
  calificacion: number;
  viajesCompletados: number;
  fechaRegistro: string;
  documentos?: {
    licenciaUrl?: string;
    cedulaUrl?: string;
    matriculaUrl?: string;
  };
}

export interface Order {
  id: string;
  numeroOrden: string;
  cliente: string;
  clienteId: string;
  conductor: string;
  conductorId: string;
  tipo: "Mudanza" | "Flete" | "Transporte";
  vehiculoTipo: string;
  origen: string;
  origenDireccion: string;
  destino: string;
  destinoDireccion: string;
  estado: "Pendiente" | "Asignado" | "En curso" | "Completado" | "Cancelado";
  fecha: string;
  hora: string;
  precio: number;
  distancia: string;
  duracion: string;
  detalles: string;
  fechaCreacion: string;
}

export interface AdminStats {
  pedidosActivos: number;
  conductores: number;
  usuarios: number;
  ingresos: number;
  tendenciaSemanal: { dia: string; valor: number }[];
  pedidosPorEstado: {
    pendientes: number;
    enCurso: number;
    completados: number;
    cancelados: number;
  };
}

// 👥 USUARIOS MOCK - Sincronizados con mockUsers.ts de la app
export const MOCK_USERS: User[] = [
  {
    id: "USR-001",
    nombre: "Ana Torres",
    email: "ana.torres@moverly.com",
    telefono: "+593 99 847 5632",
    ciudad: "Ambato",
    direccion: "Av. Cevallos y Montalvo, Ambato",
    rol: "Cliente",
    fechaRegistro: "2024-08-12",
    estado: "Activo",
  },
  {
    id: "USR-002",
    nombre: "Carlos Méndez",
    email: "carlos.mendez@moverly.com",
    telefono: "+593 98 765 4321",
    ciudad: "Ambato",
    direccion: "Av. Los Guaytambos, Ambato",
    rol: "Conductor",
    fechaRegistro: "2024-09-03",
    estado: "Activo",
  },
  {
    id: "USR-003",
    nombre: "Miguel Ruiz",
    email: "miguel.ruiz@moverly.com",
    telefono: "+593 97 123 4567",
    ciudad: "Ambato",
    direccion: "Av. Atahualpa, Ambato",
    rol: "Conductor",
    fechaRegistro: "2024-10-20",
    estado: "Activo",
  },
  {
    id: "USR-004",
    nombre: "Luis Paredes",
    email: "luis.paredes@moverly.com",
    telefono: "+593 96 234 9871",
    ciudad: "Pelileo",
    direccion: "Calle García Moreno, Pelileo",
    rol: "Conductor",
    fechaRegistro: "2024-07-10",
    estado: "Activo",
  },
  {
    id: "USR-005",
    nombre: "María Sánchez",
    email: "maria.sanchez@moverly.com",
    telefono: "+593 99 111 2233",
    ciudad: "Baños",
    direccion: "Calle Rocafuerte, Baños de Agua Santa",
    rol: "Cliente",
    fechaRegistro: "2024-11-15",
    estado: "Activo",
  },
  {
    id: "USR-006",
    nombre: "Pedro Morales",
    email: "pedro.morales@moverly.com",
    telefono: "+593 99 876 5432",
    ciudad: "Ambato",
    direccion: "Av. Rodrigo Pachano, Ambato",
    rol: "Conductor",
    fechaRegistro: "2024-06-15",
    estado: "Activo",
  },
  {
    id: "USR-007",
    nombre: "Sandra Vega",
    email: "sandra.vega@moverly.com",
    telefono: "+593 98 234 5678",
    ciudad: "Baños",
    direccion: "Av. Montalvo, Baños",
    rol: "Conductor",
    fechaRegistro: "2024-05-22",
    estado: "Activo",
  },
  {
    id: "USR-008",
    nombre: "Roberto Castro",
    email: "roberto.castro@moverly.com",
    telefono: "+593 97 345 6789",
    ciudad: "Pelileo",
    direccion: "Calle Bolívar, Pelileo",
    rol: "Conductor",
    fechaRegistro: "2024-11-28",
    estado: "Activo",
  },
  {
    id: "USR-009",
    nombre: "Patricia Gómez",
    email: "patricia.gomez@moverly.com",
    telefono: "+593 96 456 7890",
    ciudad: "Ambato",
    direccion: "Calle Sucre, Ambato",
    rol: "Cliente",
    fechaRegistro: "2024-10-05",
    estado: "Activo",
  },
  {
    id: "USR-010",
    nombre: "Fernando López",
    email: "fernando.lopez@moverly.com",
    telefono: "+593 95 567 8901",
    ciudad: "Baños",
    direccion: "Av. Amazonas, Baños",
    rol: "Cliente",
    fechaRegistro: "2024-09-18",
    estado: "Activo",
  },
];

// 🚗 CONDUCTORES MOCK
export const MOCK_DRIVERS: Driver[] = [
  {
    id: "DRV-001",
    nombre: "Carlos Méndez",
    email: "carlos.mendez@moverly.com",
    licencia: "A1234567",
    tipoLicencia: "Tipo C",
    vehiculo: "Camioneta 1.5T",
    placa: "PBA-1234",
    estado: "Verificado",
    telefono: "+593 98 765 4321",
    ciudad: "Ambato",
    calificacion: 4.8,
    viajesCompletados: 145,
    fechaRegistro: "2024-09-03",
    documentos: {
      licenciaUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      cedulaUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      matriculaUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  },
  {
    id: "DRV-002",
    nombre: "Miguel Ruiz",
    email: "miguel.ruiz@moverly.com",
    licencia: "B9988776",
    tipoLicencia: "Tipo E",
    vehiculo: "Camión 4T",
    placa: "PTA-5678",
    estado: "Verificado",
    telefono: "+593 97 123 4567",
    ciudad: "Ambato",
    calificacion: 4.9,
    viajesCompletados: 203,
    fechaRegistro: "2024-10-20",
    documentos: {
      licenciaUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      cedulaUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      matriculaUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  },
  {
    id: "DRV-003",
    nombre: "Luis Paredes",
    email: "luis.paredes@moverly.com",
    licencia: "C5544332",
    tipoLicencia: "Tipo C",
    vehiculo: "Motocarga",
    placa: "PTB-9012",
    estado: "Pendiente",
    telefono: "+593 96 234 9871",
    ciudad: "Pelileo",
    calificacion: 4.6,
    viajesCompletados: 87,
    fechaRegistro: "2024-07-10",
    documentos: {
      licenciaUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      cedulaUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  },
  {
    id: "DRV-004",
    nombre: "Pedro Morales",
    email: "pedro.morales@moverly.com",
    licencia: "D7766554",
    tipoLicencia: "Tipo E",
    vehiculo: "Tráiler 10T",
    placa: "PTC-3456",
    estado: "Activo",
    telefono: "+593 99 876 5432",
    ciudad: "Ambato",
    calificacion: 4.7,
    viajesCompletados: 156,
    fechaRegistro: "2024-06-15",
    documentos: {
      licenciaUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      cedulaUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      matriculaUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  },
  {
    id: "DRV-005",
    nombre: "Sandra Vega",
    email: "sandra.vega@moverly.com",
    licencia: "E3322110",
    tipoLicencia: "Tipo C",
    vehiculo: "Furgoneta 2T",
    placa: "PTD-7890",
    estado: "Verificado",
    telefono: "+593 98 234 5678",
    ciudad: "Baños",
    calificacion: 4.9,
    viajesCompletados: 178,
    fechaRegistro: "2024-05-22",
    documentos: {
      licenciaUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      cedulaUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      matriculaUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  },
  {
    id: "DRV-006",
    nombre: "Roberto Castro",
    email: "roberto.castro@moverly.com",
    licencia: "F8899007",
    tipoLicencia: "Tipo D",
    vehiculo: "Camión 6T",
    placa: "PTE-2468",
    estado: "Pendiente",
    telefono: "+593 97 345 6789",
    ciudad: "Pelileo",
    calificacion: 4.5,
    viajesCompletados: 65,
    fechaRegistro: "2024-11-28",
    documentos: {
      licenciaUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  },
];

// 📦 PEDIDOS MOCK
export const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-001",
    numeroOrden: "#MUD-2024-001",
    cliente: "Ana Torres",
    clienteId: "USR-001",
    conductor: "Carlos Méndez",
    conductorId: "DRV-001",
    tipo: "Mudanza",
    vehiculoTipo: "Camioneta 1.5T",
    origen: "Ambato",
    origenDireccion: "Av. Cevallos y Montalvo, Ambato",
    destino: "Baños de Agua Santa",
    destinoDireccion: "Calle Rocafuerte, Baños",
    estado: "Completado",
    fecha: "2024-12-05",
    hora: "14:30",
    precio: 2850.00,
    distancia: "42 km",
    duracion: "1h 15min",
    detalles: "Mudanza de 2 habitaciones con empaque incluido.",
    fechaCreacion: "2024-12-04",
  },
  {
    id: "ORD-002",
    numeroOrden: "#FLE-2024-058",
    cliente: "María Sánchez",
    clienteId: "USR-005",
    conductor: "Miguel Ruiz",
    conductorId: "DRV-002",
    tipo: "Flete",
    vehiculoTipo: "Camión 4T",
    origen: "Ambato",
    origenDireccion: "Av. Los Guaytambos, Ambato",
    destino: "Pelileo",
    destinoDireccion: "Calle García Moreno, Pelileo",
    estado: "En curso",
    fecha: "2024-12-09",
    hora: "09:15",
    precio: 4200.50,
    distancia: "18 km",
    duracion: "35min",
    detalles: "Transporte de electrodomésticos y muebles pequeños.",
    fechaCreacion: "2024-12-08",
  },
  {
    id: "ORD-003",
    numeroOrden: "#MUD-2024-089",
    cliente: "Ana Torres",
    clienteId: "USR-001",
    conductor: "Luis Paredes",
    conductorId: "DRV-003",
    tipo: "Transporte",
    vehiculoTipo: "Motocarga",
    origen: "Ambato",
    origenDireccion: "Av. Atahualpa, Ambato",
    destino: "Ambato",
    destinoDireccion: "Av. Indoamérica, Ambato",
    estado: "Pendiente",
    fecha: "2024-12-10",
    hora: "16:00",
    precio: 850.00,
    distancia: "8 km",
    duracion: "20min",
    detalles: "Transporte de carga ligera.",
    fechaCreacion: "2024-12-09",
  },
  {
    id: "ORD-004",
    numeroOrden: "#MUD-2024-102",
    cliente: "Patricia Gómez",
    clienteId: "USR-009",
    conductor: "Pedro Morales",
    conductorId: "DRV-004",
    tipo: "Mudanza",
    vehiculoTipo: "Tráiler 10T",
    origen: "Ambato",
    origenDireccion: "Calle Sucre, Ambato",
    destino: "Quito",
    destinoDireccion: "Av. 6 de Diciembre, Quito",
    estado: "Asignado",
    fecha: "2024-12-11",
    hora: "08:00",
    precio: 5500.00,
    distancia: "135 km",
    duracion: "2h 45min",
    detalles: "Mudanza completa de casa con 4 habitaciones.",
    fechaCreacion: "2024-12-09",
  },
  {
    id: "ORD-005",
    numeroOrden: "#FLE-2024-075",
    cliente: "Fernando López",
    clienteId: "USR-010",
    conductor: "Sandra Vega",
    conductorId: "DRV-005",
    tipo: "Flete",
    vehiculoTipo: "Furgoneta 2T",
    origen: "Baños",
    origenDireccion: "Av. Amazonas, Baños",
    destino: "Ambato",
    destinoDireccion: "Av. Cevallos, Ambato",
    estado: "Completado",
    fecha: "2024-12-07",
    hora: "10:30",
    precio: 1850.00,
    distancia: "42 km",
    duracion: "1h 10min",
    detalles: "Transporte de mercancía comercial.",
    fechaCreacion: "2024-12-06",
  },
  {
    id: "ORD-006",
    numeroOrden: "#TRA-2024-113",
    cliente: "María Sánchez",
    clienteId: "USR-005",
    conductor: "",
    conductorId: "",
    tipo: "Transporte",
    vehiculoTipo: "Camioneta 1.5T",
    origen: "Baños",
    origenDireccion: "Calle Rocafuerte, Baños",
    destino: "Pelileo",
    destinoDireccion: "Calle García Moreno, Pelileo",
    estado: "Pendiente",
    fecha: "2024-12-12",
    hora: "14:00",
    precio: 1200.00,
    distancia: "28 km",
    duracion: "45min",
    detalles: "Transporte de equipos de oficina.",
    fechaCreacion: "2024-12-09",
  },
  {
    id: "ORD-007",
    numeroOrden: "#MUD-2024-124",
    cliente: "Ana Torres",
    clienteId: "USR-001",
    conductor: "Carlos Méndez",
    conductorId: "DRV-001",
    tipo: "Mudanza",
    vehiculoTipo: "Camioneta 1.5T",
    origen: "Ambato",
    origenDireccion: "Av. Cevallos y Montalvo, Ambato",
    destino: "Latacunga",
    destinoDireccion: "Calle Quito, Latacunga",
    estado: "En curso",
    fecha: "2024-12-09",
    hora: "07:30",
    precio: 3200.00,
    distancia: "52 km",
    duracion: "1h 25min",
    detalles: "Mudanza de apartamento con muebles.",
    fechaCreacion: "2024-12-08",
  },
];

// 📊 ESTADÍSTICAS MOCK
export const MOCK_STATS: AdminStats = {
  pedidosActivos: 15,
  conductores: 23,
  usuarios: 187,
  ingresos: 45230.50,
  tendenciaSemanal: [
    { dia: "Lun", valor: 12 },
    { dia: "Mar", valor: 18 },
    { dia: "Mié", valor: 15 },
    { dia: "Jue", valor: 22 },
    { dia: "Vie", valor: 25 },
    { dia: "Sáb", valor: 19 },
    { dia: "Dom", valor: 14 },
  ],
  pedidosPorEstado: {
    pendientes: 5,
    enCurso: 10,
    completados: 142,
    cancelados: 8,
  },
};
