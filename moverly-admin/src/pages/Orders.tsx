import { useState } from "react";
import Sidebar from "../../src/components/Sidebar";
import {
    TruckIcon,
    UserIcon,
    MapPinIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    MagnifyingGlassIcon,
    EyeIcon,
    ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

interface Order {
    id: string;
    cliente: string;
    conductor: string;
    tipo: string;
    origen: string;
    destino: string;
    estado: string;
    fecha: string;
    precio: string;
    detalles: string;
}

export default function Orders() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("todos");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // ✅ Datos estáticos simulados
    const orders: Order[] = [
        {
            id: "ORD-001",
            cliente: "Ana Torres",
            conductor: "Juan Pérez",
            tipo: "Mudanza",
            origen: "Quito",
            destino: "Guayaquil",
            estado: "En curso",
            fecha: "2025-11-08",
            precio: "$120.00",
            detalles: "Mudanza de 2 habitaciones con empaque incluido.",
        },
        {
            id: "ORD-002",
            cliente: "Carlos López",
            conductor: "María Ruiz",
            tipo: "Flete",
            origen: "Ambato",
            destino: "Riobamba",
            estado: "Completado",
            fecha: "2025-11-07",
            precio: "$80.00",
            detalles: "Transporte de electrodomésticos y muebles pequeños.",
        },
        {
            id: "ORD-003",
            cliente: "Luisa Fernández",
            conductor: "Pedro Morales",
            tipo: "Mudanza",
            origen: "Cuenca",
            destino: "Loja",
            estado: "Cancelado",
            fecha: "2025-11-06",
            precio: "$95.00",
            detalles: "Mudanza parcial de departamento.",
        },
    ];

    const filteredOrders = orders.filter((order) => {
        const matchSearch =
            order.id.toLowerCase().includes(search.toLowerCase()) ||
            order.cliente.toLowerCase().includes(search.toLowerCase()) ||
            order.conductor.toLowerCase().includes(search.toLowerCase());
        const matchStatus =
            filter === "todos" ? true : order.estado.toLowerCase() === filter;
        return matchSearch && matchStatus;
    });

    const getStatusColor = (estado: string) => {
        switch (estado.toLowerCase()) {
            case "en curso":
                return "text-yellow-400 bg-yellow-400/10";
            case "completado":
                return "text-green-400 bg-green-400/10";
            case "cancelado":
                return "text-red-400 bg-red-400/10";
            default:
                return "text-blue-400 bg-blue-400/10";
        }
    };

    return (
        <div className="flex min-h-screen bg-[#0E1B32] text-white">
            <Sidebar />

            <main className="flex-1 ml-64 bg-[#13284D] p-8 border-l border-[#FF6B35]/25">
                {/* Encabezado */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <TruckIcon className="w-8 h-8 text-[#FF6B35]" />
                        Órdenes de Mudanza y Flete
                    </h1>
                </div>

                {/* Filtros */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                            <input
                                type="text"
                                placeholder="Buscar orden, cliente o conductor..."
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
                            <option value="en curso">En curso</option>
                            <option value="completado">Completado</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                    </div>
                </div>

                {/* Tabla */}
                <div className="overflow-x-auto bg-[#0A2342] rounded-xl border border-[#1f3b63] shadow-md">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="text-left bg-[#112a52] text-gray-300">
                                <th className="py-3 px-4 font-semibold">Código</th>
                                <th className="py-3 px-4 font-semibold">Cliente</th>
                                <th className="py-3 px-4 font-semibold">Conductor</th>
                                <th className="py-3 px-4 font-semibold">Tipo</th>
                                <th className="py-3 px-4 font-semibold">Origen</th>
                                <th className="py-3 px-4 font-semibold">Destino</th>
                                <th className="py-3 px-4 font-semibold">Estado</th>
                                <th className="py-3 px-4 font-semibold">Fecha</th>
                                <th className="py-3 px-4 font-semibold text-center">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-t border-[#1f3b63] hover:bg-[#183766] transition"
                                >
                                    <td className="py-3 px-4 text-gray-200">{order.id}</td>
                                    <td className="py-3 px-4">{order.cliente}</td>
                                    <td className="py-3 px-4">{order.conductor}</td>
                                    <td className="py-3 px-4">{order.tipo}</td>
                                    <td className="py-3 px-4 text-blue-400">{order.origen}</td>
                                    <td className="py-3 px-4 text-green-400">{order.destino}</td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-2 py-1 rounded-md text-xs font-semibold ${getStatusColor(
                                                order.estado
                                            )}`}
                                        >
                                            {order.estado}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-400">{order.fecha}</td>
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            className="bg-[#FF6B35]/20 hover:bg-[#FF6B35]/40 text-[#FF6B35] px-3 py-1 rounded-md flex items-center gap-1 text-xs mx-auto transition"
                                            onClick={() => setSelectedOrder(order)}
                                        >
                                            <EyeIcon className="w-4 h-4" />
                                            Ver detalles
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredOrders.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={9}
                                        className="text-center text-gray-400 py-6 italic"
                                    >
                                        No se encontraron órdenes.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Modal de detalles mejorado y estilizado */}
                {selectedOrder && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-[#0A2342] rounded-2xl p-8 w-[620px] shadow-2xl border border-[#1f3b63] text-white relative animate-fadeIn">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6 border-b border-[#1f3b63] pb-3">
                                <h2 className="text-2xl font-bold text-[#FF6B35] flex items-center gap-2">
                                    <TruckIcon className="w-7 h-7 text-[#FF6B35]" />
                                    Detalles de la Orden
                                </h2>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="text-gray-400 hover:text-[#FF6B35] text-xl transition"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Información principal */}
                            <div className="space-y-4 text-sm text-gray-200">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                                        <p className="text-gray-400 text-xs">Código</p>
                                        <p className="font-semibold text-white">{selectedOrder.id}</p>
                                    </div>

                                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                                        <p className="text-gray-400 text-xs">Tipo de servicio</p>
                                        <p className="font-semibold text-white">{selectedOrder.tipo}</p>
                                    </div>

                                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                                        <p className="text-gray-400 text-xs">Cliente</p>
                                        <p className="font-semibold">{selectedOrder.cliente}</p>
                                    </div>

                                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                                        <p className="text-gray-400 text-xs">Conductor asignado</p>
                                        <p className="font-semibold">{selectedOrder.conductor}</p>
                                    </div>
                                </div>

                                {/* Origen y destino */}
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="bg-blue-900/40 p-4 rounded-xl border border-blue-700/50">
                                        <h4 className="text-blue-300 font-semibold flex items-center gap-1 text-sm">
                                            <MapPinIcon className="w-4 h-4" /> Origen
                                        </h4>
                                        <p className="text-gray-100 text-sm mt-1">{selectedOrder.origen}</p>
                                    </div>
                                    <div className="bg-green-900/40 p-4 rounded-xl border border-green-700/50">
                                        <h4 className="text-green-300 font-semibold flex items-center gap-1 text-sm">
                                            <MapPinIcon className="w-4 h-4" /> Destino
                                        </h4>
                                        <p className="text-gray-100 text-sm mt-1">{selectedOrder.destino}</p>
                                    </div>
                                </div>

                                {/* Estado y precio */}
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                                        <p className="text-gray-400 text-xs">Estado</p>
                                        <span
                                            className={`mt-1 inline-block px-3 py-1 rounded-md text-xs font-semibold ${getStatusColor(
                                                selectedOrder.estado
                                            )}`}
                                        >
                                            {selectedOrder.estado}
                                        </span>
                                    </div>

                                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                                        <p className="text-gray-400 text-xs">Precio</p>
                                        <p className="text-lg font-semibold text-[#FF6B35]">
                                            {selectedOrder.precio}
                                        </p>
                                    </div>
                                </div>

                                {/* Descripción */}
                                <div className="mt-4 bg-[#112a52] border border-[#1f3b63] rounded-xl p-4">
                                    <h4 className="font-semibold text-[#FF6B35] mb-2 flex items-center gap-2">
                                        <ClipboardDocumentListIcon className="w-5 h-5 text-[#FF6B35]" />
                                        Descripción del pedido
                                    </h4>
                                    <p className="text-gray-200 text-sm leading-relaxed">
                                        {selectedOrder.detalles}
                                    </p>
                                </div>

                                {/* Fecha */}
                                <p className="text-gray-400 text-xs mt-4 text-right">
                                    📅 {selectedOrder.fecha}
                                </p>
                            </div>

                            {/* Botones */}
                            <div className="flex justify-end gap-3 mt-8 border-t border-[#1f3b63] pt-4">
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="bg-gray-400/20 hover:bg-gray-500/40 px-4 py-2 rounded-lg text-sm font-medium text-gray-300 transition"
                                >
                                    Cerrar
                                </button>

                                {selectedOrder.estado === "En curso" && (
                                    <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm font-medium text-white flex items-center gap-1 transition">
                                        <CheckCircleIcon className="w-4 h-4" />
                                        Completar
                                    </button>
                                )}

                                {selectedOrder.estado !== "Cancelado" && (
                                    <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium text-white flex items-center gap-1 transition">
                                        <XCircleIcon className="w-4 h-4" />
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}


            </main>
        </div>
    );
}
