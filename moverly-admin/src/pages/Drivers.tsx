import { useState, useEffect } from "react";
import Sidebar from "../../src/components/Sidebar";
import {
    UserCircleIcon,
    IdentificationIcon,
    TruckIcon,
    CheckCircleIcon,
    XCircleIcon,
    EyeIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import api from "../api/adminApi"; 

// Tipado de conductor
interface Driver {
    id: string;
    nombre: string;
    licencia: string;
    tipoLicencia: string;
    vehiculo: string;
    estado: string;
    telefono: string;
    email: string;
    ciudad: string;
}

export default function Drivers() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("todos");
    const [drivers, setDrivers] = useState<Driver[]>([]); 
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    const [viewerFile, setViewerFile] = useState<string | null>(null);
    const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(
        null
    );

    // 🚀 Cargar conductores reales desde la API
    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const res = await api.get("/admin/drivers/all");
                console.log("Conductores desde API:", res.data);

                const mapped = res.data.map((d: any) => ({
                    id: d.usuario_id,
                    nombre: d.nombre_completo,
                    licencia: d.licencia_numero,
                    tipoLicencia: d.licencia_categoria,
                    vehiculo: d.licencia_vigente ? "Vehículo registrado" : "No especificado",
                    estado: d.verificado ? "Verificado" : "Pendiente",
                    telefono: d.telefono || "No registrado",
                    email: d.correo,
                    ciudad: d.ciudad || "No especificada",
                }));

                setDrivers(mapped);
            } catch (err) {
                console.error("❌ Error al obtener conductores:", err);
                setToast({ type: "error", message: "Error al cargar conductores." });
                setTimeout(() => setToast(null), 3000);
            }
        };

        fetchDrivers();
    }, []);

    // ✅ Aprobación del conductor
    const handleApprove = async () => {
        if (!selectedDriver) return;

        try {
            await api.post("/admin/drivers/verify", {
                conductor_id: selectedDriver.id,
                verificado: true,
                comentarios: "Conductor aprobado correctamente.",
            });

            setToast({ type: "success", message: "✅ Conductor aprobado exitosamente." });

            // actualizar visualmente el estado
            setDrivers((prev) =>
                prev.map((d) =>
                    d.id === selectedDriver.id ? { ...d, estado: "Verificado" } : d
                )
            );

            setSelectedDriver(null);
        } catch (err) {
            console.error("❌ Error al aprobar conductor:", err);
            setToast({ type: "error", message: "Error al aprobar conductor." });
        } finally {
            setTimeout(() => setToast(null), 3000);
        }
    };

    // ❌ Rechazar conductor
    const handleReject = async () => {
        if (!selectedDriver) return;

        try {
            await api.post("/admin/drivers/verify", {
                conductor_id: selectedDriver.id,
                verificado: false,
                comentarios: "Conductor rechazado tras revisión.",
            });

            setToast({ type: "error", message: "❌ Conductor rechazado." });

            // actualizar visualmente el estado
            setDrivers((prev) =>
                prev.map((d) =>
                    d.id === selectedDriver.id ? { ...d, estado: "Rechazado" } : d
                )
            );

            setSelectedDriver(null);
        } catch (err) {
            console.error("⚠️ Error al rechazar conductor:", err);
            setToast({ type: "error", message: "Error al rechazar conductor." });
        } finally {
            setTimeout(() => setToast(null), 3000);
        }
    };

    // 🎨 Filtrado (idéntico)
    const filteredDrivers = drivers.filter((driver) => {
        const matchSearch =
            driver.nombre.toLowerCase().includes(search.toLowerCase()) ||
            driver.id.toLowerCase().includes(search.toLowerCase()) ||
            driver.email.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === "todos" ? true : driver.estado.toLowerCase() === filter;
        return matchSearch && matchFilter;
    });

    const getStatusColor = (estado: string) => {
        switch (estado.toLowerCase()) {
            case "verificado":
                return "text-green-400 bg-green-400/10";
            case "pendiente":
                return "text-yellow-400 bg-yellow-400/10";
            case "rechazado":
                return "text-red-400 bg-red-400/10";
            default:
                return "text-gray-400 bg-gray-400/10";
        }
    };


    return (
        <div className="flex min-h-screen bg-[#0E1B32] text-white">
            <Sidebar />

            <main className="flex-1 ml-64 bg-[#13284D] p-8 border-l border-[#FF6B35]/25 relative">
                {/* Título */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <TruckIcon className="w-8 h-8 text-[#FF6B35]" />
                        Conductores registrados
                    </h1>
                </div>

                {/* Filtros */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                            <input
                                type="text"
                                placeholder="Buscar conductor o correo..."
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
                            <option value="verificado">Verificados</option>
                            <option value="pendiente">Pendientes</option>
                            <option value="rechazado">Rechazados</option>
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
                                <th className="py-3 px-4 font-semibold">Licencia</th>
                                <th className="py-3 px-4 font-semibold">Vehículo</th>
                                <th className="py-3 px-4 font-semibold">Ciudad</th>
                                <th className="py-3 px-4 font-semibold">Estado</th>
                                <th className="py-3 px-4 font-semibold text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDrivers.map((driver) => (
                                <tr
                                    key={driver.id}
                                    className="border-t border-[#1f3b63] hover:bg-[#183766] transition"
                                >
                                    <td className="py-3 px-4 text-gray-200">{driver.id}</td>
                                    <td className="py-3 px-4">{driver.nombre}</td>
                                    <td className="py-3 px-4">{driver.licencia}</td>
                                    <td className="py-3 px-4">{driver.vehiculo}</td>
                                    <td className="py-3 px-4 text-blue-400">{driver.ciudad}</td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-2 py-1 rounded-md text-xs font-semibold ${getStatusColor(
                                                driver.estado
                                            )}`}
                                        >
                                            {driver.estado}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            className="bg-[#FF6B35]/20 hover:bg-[#FF6B35]/40 text-[#FF6B35] px-3 py-1 rounded-md flex items-center gap-1 text-xs mx-auto transition"
                                            onClick={() => setSelectedDriver(driver)}
                                        >
                                            <EyeIcon className="w-4 h-4" />
                                            Ver detalles
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredDrivers.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="text-center text-gray-400 py-6 italic">
                                        No se encontraron conductores.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Modal de detalles */}
                {selectedDriver && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-[#0A2342] rounded-2xl p-8 w-[700px] shadow-2xl border border-[#1f3b63] relative">
                            {/* Cabecera */}
                            <div className="flex items-center justify-between border-b border-[#1f3b63] pb-4 mb-6">
                                <div className="flex items-center gap-4">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/1995/1995503.png"
                                        alt="Foto del conductor"
                                        className="w-20 h-20 rounded-full border-2 border-[#FF6B35] object-cover"
                                    />
                                    <div>
                                        <h2 className="text-2xl font-bold text-[#FF6B35] flex items-center gap-2">
                                            <UserCircleIcon className="w-7 h-7 text-[#FF6B35]" />
                                            {selectedDriver.nombre}
                                        </h2>
                                        <p className="text-gray-400 text-sm">{selectedDriver.email}</p>
                                        <p
                                            className={`mt-1 inline-block px-3 py-1 rounded-md text-xs font-semibold ${getStatusColor(
                                                selectedDriver.estado
                                            )}`}
                                        >
                                            {selectedDriver.estado}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedDriver(null)}
                                    className="text-gray-400 hover:text-[#FF6B35] transition text-lg"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Info */}
                            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-gray-200 text-sm mb-6">
                                <p>
                                    <span className="font-semibold text-gray-400">Código:</span> {selectedDriver.id}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-400">Licencia:</span>{" "}
                                    {selectedDriver.licencia}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-400">Tipo Licencia:</span>{" "}
                                    {selectedDriver.tipoLicencia}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-400">Ciudad:</span>{" "}
                                    <span className="text-blue-400">{selectedDriver.ciudad}</span>
                                </p>
                                <p className="col-span-2">
                                    <span className="font-semibold text-gray-400">Vehículo:</span>{" "}
                                    {selectedDriver.vehiculo}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-400">Teléfono:</span>{" "}
                                    {selectedDriver.telefono}
                                </p>
                            </div>

                            {/* Documentos */}
                            <div className="bg-[#112a52] rounded-xl p-4 border border-[#1f3b63] mb-6">
                                <h3 className="text-[#FF6B35] font-semibold mb-3 text-lg flex items-center gap-2">
                                    <IdentificationIcon className="w-5 h-5 text-[#FF6B35]" />
                                    Documentos del Conductor
                                </h3>
                                <div className="grid grid-cols-2 gap-3 text-sm text-gray-300">
                                    {[
                                        { name: "Licencia de conducir", file: "/docs/licencia.pdf" },
                                        { name: "Cédula de identidad", file: "/docs/cedula.pdf" },
                                        { name: "Certificado de Cooperativa", file: "/docs/cooperativa.pdf" },
                                        { name: "Antecedentes Penales", file: "/docs/antecedentes.pdf" },
                                    ].map((doc) => (
                                        <div
                                            key={doc.name}
                                            className="flex items-center justify-between bg-[#0A2342] border border-[#1f3b63] rounded-lg px-3 py-2"
                                        >
                                            <span>{doc.name}</span>
                                            <button
                                                className="text-blue-400 hover:text-blue-300 text-xs"
                                                onClick={() => setViewerFile(doc.file)}
                                            >
                                                Ver archivo
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Comentarios */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-300 mb-1">
                                    Comentarios de revisión
                                </label>
                                <textarea
                                    placeholder="Escribe observaciones sobre los documentos o el perfil..."
                                    className="w-full bg-[#0A2342] border border-[#1f3b63] rounded-lg p-3 text-sm text-gray-200 placeholder-gray-500 resize-none focus:ring-2 focus:ring-[#FF6B35]/50"
                                    rows={3}
                                ></textarea>
                            </div>

                            {/* Botones */}
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setSelectedDriver(null)}
                                    className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg text-sm text-gray-800 font-medium transition"
                                >
                                    Cerrar
                                </button>

                                {selectedDriver.estado === "Pendiente" && (
                                    <>
                                        <button
                                            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm text-white flex items-center gap-1 transition"
                                            onClick={handleApprove}
                                        >
                                            <CheckCircleIcon className="w-4 h-4" />
                                            Aprobar
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm text-white flex items-center gap-1 transition"
                                            onClick={handleReject}
                                        >
                                            <XCircleIcon className="w-4 h-4" />
                                            Rechazar
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Sub-modal visor */}
                {viewerFile && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60]">
                        <div className="bg-[#0A2342] p-6 rounded-xl shadow-2xl w-[800px] h-[600px] flex flex-col border border-[#1f3b63]">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-[#FF6B35] font-semibold text-lg">
                                    Visualización de documento
                                </h3>
                                <button
                                    className="text-gray-300 hover:text-[#FF6B35]"
                                    onClick={() => setViewerFile(null)}
                                >
                                    ✕
                                </button>
                            </div>

                            {viewerFile.endsWith(".pdf") ? (
                                <iframe
                                    src={viewerFile}
                                    className="flex-1 rounded-lg border border-[#1f3b63]"
                                    title="Documento PDF"
                                ></iframe>
                            ) : (
                                <img
                                    src={viewerFile}
                                    alt="Documento"
                                    className="flex-1 object-contain rounded-lg border border-[#1f3b63]"
                                />
                            )}
                        </div>
                    </div>
                )}

                {/* Toast visual */}
                {toast && (
                    <div
                        className={`fixed bottom-6 right-6 px-5 py-3 rounded-lg shadow-lg text-sm font-semibold text-white ${toast.type === "success" ? "bg-green-600" : "bg-red-600"
                            } transition-all duration-500`}
                    >
                        {toast.message}
                    </div>
                )}
            </main>
        </div>
    );
}
