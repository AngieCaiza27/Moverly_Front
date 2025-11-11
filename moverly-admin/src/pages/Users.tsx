import { useState } from "react";
import Sidebar from "../../src/components/Sidebar";
import {
    UserGroupIcon,
    EyeIcon,
    MagnifyingGlassIcon,
    UserCircleIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    CalendarIcon,
    TruckIcon,
} from "@heroicons/react/24/outline";

interface User {
    id: string;
    nombre: string;
    email: string;
    telefono: string;
    ciudad: string;
    rol: string;
    fechaRegistro: string;
}

export default function Users() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("todos");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // 👤 Datos simulados
    const users: User[] = [
        {
            id: "USR-001",
            nombre: "Carlos Sánchez",
            email: "carlos.sanchez@moverly.com",
            telefono: "0998475632",
            ciudad: "Quito",
            rol: "Cliente",
            fechaRegistro: "2024-08-12",
        },
        {
            id: "USR-002",
            nombre: "Luisa Martínez",
            email: "luisa.martinez@moverly.com",
            telefono: "0987654321",
            ciudad: "Guayaquil",
            rol: "Conductor",
            fechaRegistro: "2024-09-03",
        },
        {
            id: "USR-003",
            nombre: "Pedro Andrade",
            email: "pedro.andrade@moverly.com",
            telefono: "0971234567",
            ciudad: "Ambato",
            rol: "Cliente",
            fechaRegistro: "2024-10-20",
        },
        {
            id: "USR-004",
            nombre: "Daniel Torres",
            email: "daniel.torres@moverly.com",
            telefono: "0962349871",
            ciudad: "Cuenca",
            rol: "Administrador",
            fechaRegistro: "2024-07-10",
        },
    ];

    const filteredUsers = users.filter((user) => {
        const matchSearch =
            user.nombre.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === "todos" ? true : user.rol.toLowerCase() === filter;
        return matchSearch && matchFilter;
    });

    return (
        <div className="flex min-h-screen bg-[#0E1B32] text-white">
            <Sidebar />

            <main className="flex-1 ml-64 bg-[#13284D] p-8 border-l border-[#FF6B35]/25 relative">
                {/* Encabezado */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <UserGroupIcon className="w-8 h-8 text-[#FF6B35]" />
                        Usuarios registrados
                    </h1>
                </div>

                {/* Filtros */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                            <input
                                type="text"
                                placeholder="Buscar usuario o correo..."
                                className="pl-10 pr-4 py-2 rounded-lg bg-[#0A2342] text-sm text-white border border-[#1f3b63] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <select
                            className="bg-[#0A2342] text-sm text-white border border-[#1f3b63] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#FF6B35]/50"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="todos">Todos</option>
                            <option value="cliente">Clientes</option>
                            <option value="conductor">Conductores</option>
                            <option value="administrador">Administradores</option>
                        </select>
                    </div>
                </div>

                {/* Tabla */}
                <div className="overflow-x-auto bg-[#0A2342] rounded-xl border border-[#1f3b63] shadow-md">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="text-left bg-[#112a52] text-gray-300">
                                <th className="py-3 px-4 font-semibold">Código</th>
                                <th className="py-3 px-4 font-semibold">Nombre</th>
                                <th className="py-3 px-4 font-semibold">Correo</th>
                                <th className="py-3 px-4 font-semibold">Teléfono</th>
                                <th className="py-3 px-4 font-semibold">Ciudad</th>
                                <th className="py-3 px-4 font-semibold">Rol</th>
                                <th className="py-3 px-4 font-semibold text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-t border-[#1f3b63] hover:bg-[#183766] transition"
                                >
                                    <td className="py-3 px-4 text-gray-200">{user.id}</td>
                                    <td className="py-3 px-4">{user.nombre}</td>
                                    <td className="py-3 px-4 text-blue-400">{user.email}</td>
                                    <td className="py-3 px-4">{user.telefono}</td>
                                    <td className="py-3 px-4">{user.ciudad}</td>
                                    <td className="py-3 px-4">{user.rol}</td>
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            className="bg-[#FF6B35]/20 hover:bg-[#FF6B35]/40 text-[#FF6B35] px-3 py-1 rounded-md flex items-center gap-1 text-xs mx-auto transition"
                                            onClick={() => setSelectedUser(user)}
                                        >
                                            <EyeIcon className="w-4 h-4" />
                                            Ver detalles
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="text-center text-gray-400 py-6 italic">
                                        No se encontraron usuarios.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Modal de detalles mejorado con scroll interno */}
                {selectedUser && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                        <div
                            className="bg-[#0A2342] rounded-2xl p-8 w-[650px] max-h-[90vh] overflow-y-auto 
      shadow-2xl border border-[#1f3b63] relative 
      scrollbar-thin scrollbar-thumb-[#FF6B35]/40 scrollbar-track-transparent"
                        >
                            {/* Header fijo */}
                            <div className="flex items-center justify-between border-b border-[#1f3b63] pb-4 mb-6 sticky top-0 bg-[#0A2342] z-10">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.nombre)}&background=FF6B35&color=fff`}
                                        alt="Foto de usuario"
                                        className="w-20 h-20 rounded-full border-2 border-[#FF6B35] object-cover"
                                    />
                                    <div>
                                        <h2 className="text-2xl font-bold text-[#FF6B35] flex items-center gap-2">
                                            <UserCircleIcon className="w-6 h-6 text-[#FF6B35]" />
                                            {selectedUser.nombre}
                                        </h2>
                                        <p className="text-gray-300 text-sm flex items-center gap-2">
                                            <EnvelopeIcon className="w-4 h-4 text-[#FF6B35]" />
                                            {selectedUser.email}
                                        </p>
                                        <span
                                            className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-md ${selectedUser.rol === "Administrador"
                                                ? "bg-purple-500/20 text-purple-400"
                                                : selectedUser.rol === "Conductor"
                                                    ? "bg-blue-500/20 text-blue-400"
                                                    : "bg-green-500/20 text-green-400"
                                                }`}
                                        >
                                            {selectedUser.rol}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedUser(null)}
                                    className="text-gray-400 hover:text-[#FF6B35] transition text-lg"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Información del usuario */}
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-gray-200 text-sm mb-6">
                                <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                                    <p className="text-gray-400 text-xs">Código</p>
                                    <p className="font-semibold">{selectedUser.id}</p>
                                </div>

                                <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                                    <p className="text-gray-400 text-xs">Teléfono</p>
                                    <p className="font-semibold flex items-center gap-2">
                                        <PhoneIcon className="w-4 h-4 text-[#FF6B35]" />
                                        {selectedUser.telefono}
                                    </p>
                                </div>

                                <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63] col-span-2">
                                    <p className="text-gray-400 text-xs">Ciudad</p>
                                    <p className="font-semibold flex items-center gap-2">
                                        <MapPinIcon className="w-4 h-4 text-[#FF6B35]" />
                                        {selectedUser.ciudad}
                                    </p>
                                </div>

                                <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63] col-span-2">
                                    <p className="text-gray-400 text-xs">Fecha de registro</p>
                                    <p className="font-semibold flex items-center gap-2">
                                        <CalendarIcon className="w-4 h-4 text-[#FF6B35]" />
                                        {selectedUser.fechaRegistro}
                                    </p>
                                </div>
                            </div>

                            {/* Actividad reciente */}
                            <div className="bg-[#112a52] rounded-xl p-4 border border-[#1f3b63] mb-6">
                                <h3 className="text-[#FF6B35] font-semibold mb-3 flex items-center gap-2">
                                    <UserGroupIcon className="w-5 h-5 text-[#FF6B35]" />
                                    Actividad reciente
                                </h3>
                                <ul className="text-sm text-gray-300 space-y-2">
                                    <li>• Solicitó una mudanza el 12/09/2024</li>
                                    <li>• Calificó un conductor con 5 estrellas</li>
                                    <li>• Actualizó su dirección de entrega</li>
                                </ul>
                            </div>

                            {/* Órdenes recientes */}
                            <div className="bg-[#112a52] rounded-xl p-4 border border-[#1f3b63] mb-6">
                                <h3 className="text-[#FF6B35] font-semibold mb-3 flex items-center gap-2">
                                    <TruckIcon className="w-5 h-5 text-[#FF6B35]" />
                                    Órdenes recientes
                                </h3>

                                <div className="space-y-3 text-sm text-gray-200">
                                    {[
                                        {
                                            id: "ORD-2024-087",
                                            tipo: "Mudanza completa",
                                            fecha: "2024-09-12",
                                            estado: "Completado",
                                        },
                                        {
                                            id: "ORD-2024-091",
                                            tipo: "Flete ligero",
                                            fecha: "2024-10-02",
                                            estado: "En curso",
                                        },
                                        {
                                            id: "ORD-2024-103",
                                            tipo: "Mudanza compartida",
                                            fecha: "2024-11-05",
                                            estado: "Pendiente",
                                        },
                                    ].map((orden) => (
                                        <div
                                            key={orden.id}
                                            className="flex justify-between items-center bg-[#0A2342] border border-[#1f3b63] rounded-lg px-4 py-3"
                                        >
                                            <div>
                                                <p className="font-semibold text-white">{orden.tipo}</p>
                                                <p className="text-xs text-gray-400">
                                                    {orden.id} • {orden.fecha}
                                                </p>
                                            </div>
                                            <span
                                                className={`px-3 py-1 text-xs font-semibold rounded-md ${orden.estado === "Completado"
                                                    ? "bg-green-500/20 text-green-400"
                                                    : orden.estado === "En curso"
                                                        ? "bg-yellow-400/20 text-yellow-400"
                                                        : "bg-gray-500/20 text-gray-300"
                                                    }`}
                                            >
                                                {orden.estado}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Botón de cierre */}
                            <div className="flex justify-end sticky bottom-0 bg-[#0A2342] pt-4 pb-2">
                                <button
                                    onClick={() => setSelectedUser(null)}
                                    className="bg-[#FF6B35] hover:bg-[#ff814f] px-5 py-2 rounded-lg text-sm font-semibold text-white transition"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
