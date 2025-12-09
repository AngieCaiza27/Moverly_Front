import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";
import type { ToastType } from "../components/Toast";
import {
  TruckIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import type { Driver } from "../data/mockData";
import {
  getDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
  approveDriver,
  rejectDriver,
  initializeStorage,
} from "../services/storageService";

export default function Drivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("todos");
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "create" | "edit" | "verify">("view");
  const [toast, setToast] = useState<{ type: ToastType; message: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Driver>>({
    nombre: "",
    email: "",
    telefono: "",
    ciudad: "",
    licencia: "",
    tipoLicencia: "",
    vehiculo: "",
    placa: "",
    estado: "Pendiente",
  });

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = () => {
    initializeStorage();
    const data = getDrivers();
    setDrivers(data);
  };

  const handleOpenModal = (mode: "view" | "create" | "edit" | "verify", driver?: Driver) => {
    setModalMode(mode);
    if (driver) {
      setSelectedDriver(driver);
      setFormData(driver);
    } else {
      setSelectedDriver(null);
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        ciudad: "",
        licencia: "",
        tipoLicencia: "",
        vehiculo: "",
        placa: "",
        estado: "Pendiente",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDriver(null);
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      ciudad: "",
      licencia: "",
      tipoLicencia: "",
      vehiculo: "",
      placa: "",
      estado: "Pendiente",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!formData.nombre || !formData.email || !formData.telefono || !formData.licencia || !formData.vehiculo) {
      setToast({ type: "error", message: "❌ Por favor complete todos los campos obligatorios" });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setToast({ type: "error", message: "❌ El correo electrónico no es válido" });
      return;
    }

    if (modalMode === "create") {
      try {
        const newDriver = createDriver(formData as Omit<Driver, "id" | "fechaRegistro" | "viajesCompletados" | "calificacion">);
        setDrivers([...drivers, newDriver]);
        setToast({ type: "success", message: "✅ Conductor registrado exitosamente" });
        handleCloseModal();
      } catch (error) {
        setToast({ type: "error", message: "❌ Error al crear conductor" });
      }
    } else if (modalMode === "edit" && selectedDriver) {
      try {
        const updated = updateDriver(selectedDriver.id, formData);
        if (updated) {
          setDrivers(drivers.map((d) => (d.id === updated.id ? updated : d)));
          setToast({ type: "success", message: "✅ Conductor actualizado exitosamente" });
          handleCloseModal();
        }
      } catch (error) {
        setToast({ type: "error", message: "❌ Error al actualizar conductor" });
      }
    }
  };

  const handleApprove = (id: string, nombre: string) => {
    if (window.confirm(`¿Aprobar al conductor "${nombre}"?`)) {
      try {
        const updated = approveDriver(id);
        if (updated) {
          setDrivers(drivers.map((d) => (d.id === updated.id ? updated : d)));
          setToast({ type: "success", message: "✅ Conductor aprobado exitosamente" });
          handleCloseModal();
        }
      } catch (error) {
        setToast({ type: "error", message: "❌ Error al aprobar conductor" });
      }
    }
  };

  const handleReject = (id: string, nombre: string) => {
    if (window.confirm(`¿Rechazar al conductor "${nombre}"?`)) {
      try {
        const updated = rejectDriver(id);
        if (updated) {
          setDrivers(drivers.map((d) => (d.id === updated.id ? updated : d)));
          setToast({ type: "warning", message: "⚠️ Conductor rechazado" });
          handleCloseModal();
        }
      } catch (error) {
        setToast({ type: "error", message: "❌ Error al rechazar conductor" });
      }
    }
  };

  const handleDelete = (id: string, nombre: string) => {
    if (window.confirm(`¿Estás seguro de eliminar al conductor "${nombre}"?`)) {
      try {
        const success = deleteDriver(id);
        if (success) {
          setDrivers(drivers.filter((d) => d.id !== id));
          setToast({ type: "success", message: "✅ Conductor eliminado exitosamente" });
        }
      } catch (error) {
        setToast({ type: "error", message: "❌ Error al eliminar conductor" });
      }
    }
  };

  const filteredDrivers = drivers.filter((driver) => {
    const matchSearch =
      driver.nombre.toLowerCase().includes(search.toLowerCase()) ||
      driver.email.toLowerCase().includes(search.toLowerCase()) ||
      driver.licencia.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "todos" ? true : driver.estado.toLowerCase() === filter.toLowerCase();
    return matchSearch && matchFilter;
  });

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Verificado":
      case "Activo":
        return "bg-green-500/20 text-green-400";
      case "Pendiente":
        return "bg-yellow-500/20 text-yellow-400";
      case "Rechazado":
        return "bg-red-500/20 text-red-400";
      case "Inactivo":
        return "bg-gray-500/20 text-gray-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const pendientesCount = drivers.filter((d) => d.estado === "Pendiente").length;

  return (
    <div className="flex min-h-screen bg-[#0E1B32] text-white">
      <Sidebar />

      <main className="flex-1 ml-64 bg-[#13284D] p-8 border-l border-[#FF6B35]/25 relative">
        {/* Toast */}
        {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <TruckIcon className="w-8 h-8 text-[#FF6B35]" />
              Gestión de Conductores
            </h1>
            {pendientesCount > 0 && (
              <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
                {pendientesCount} pendientes
              </span>
            )}
          </div>
          <button
            onClick={() => handleOpenModal("create")}
            className="flex items-center gap-2 bg-[#FF6B35] hover:bg-[#ff844e] text-white px-5 py-2 rounded-lg transition font-semibold"
          >
            <PlusIcon className="w-5 h-5" />
            Nuevo Conductor
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar conductor, email o licencia..."
                className="pl-10 pr-4 py-2 rounded-lg bg-[#0A2342] text-sm text-white border border-[#1f3b63] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 w-96"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="bg-[#0A2342] text-sm text-white border border-[#1f3b63] px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#FF6B35]/50"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="todos">Todos los estados</option>
              <option value="pendiente">Pendientes</option>
              <option value="verificado">Verificados</option>
              <option value="activo">Activos</option>
              <option value="rechazado">Rechazados</option>
            </select>
          </div>

          <div className="text-sm text-gray-400">
            Total: <span className="text-[#FF6B35] font-semibold">{filteredDrivers.length}</span> conductores
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-[#0A2342] rounded-xl border border-[#1f3b63] shadow-md">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left bg-[#112a52] text-gray-300">
                <th className="py-3 px-4 font-semibold">Código</th>
                <th className="py-3 px-4 font-semibold">Nombre</th>
                <th className="py-3 px-4 font-semibold">Licencia</th>
                <th className="py-3 px-4 font-semibold">Vehículo</th>
                <th className="py-3 px-4 font-semibold">Ciudad</th>
                <th className="py-3 px-4 font-semibold">Calificación</th>
                <th className="py-3 px-4 font-semibold">Viajes</th>
                <th className="py-3 px-4 font-semibold">Estado</th>
                <th className="py-3 px-4 font-semibold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map((driver) => (
                <tr key={driver.id} className="border-t border-[#1f3b63] hover:bg-[#183766] transition">
                  <td className="py-3 px-4 text-gray-200 font-mono text-xs">{driver.id}</td>
                  <td className="py-3 px-4 font-medium">{driver.nombre}</td>
                  <td className="py-3 px-4 text-blue-400">{driver.licencia}</td>
                  <td className="py-3 px-4">{driver.vehiculo}</td>
                  <td className="py-3 px-4">{driver.ciudad}</td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1">
                      ⭐ {driver.calificacion.toFixed(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">{driver.viajesCompletados}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${getEstadoColor(driver.estado)}`}>
                      {driver.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      {driver.estado === "Pendiente" && (
                        <>
                          <button
                            className="bg-green-500/20 hover:bg-green-500/40 text-green-400 p-2 rounded-md transition"
                            onClick={() => handleApprove(driver.id, driver.nombre)}
                            title="Aprobar"
                          >
                            <CheckCircleIcon className="w-4 h-4" />
                          </button>
                          <button
                            className="bg-red-500/20 hover:bg-red-500/40 text-red-400 p-2 rounded-md transition"
                            onClick={() => handleReject(driver.id, driver.nombre)}
                            title="Rechazar"
                          >
                            <XCircleIcon className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button
                        className="bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 p-2 rounded-md transition"
                        onClick={() => handleOpenModal("view", driver)}
                        title="Ver detalles"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-400 p-2 rounded-md transition"
                        onClick={() => handleOpenModal("edit", driver)}
                        title="Editar"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="bg-red-500/20 hover:bg-red-500/40 text-red-400 p-2 rounded-md transition"
                        onClick={() => handleDelete(driver.id, driver.nombre)}
                        title="Eliminar"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredDrivers.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center text-gray-400 py-8 italic">
                    No se encontraron conductores
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#0A2342] rounded-2xl p-8 w-[700px] max-h-[90vh] overflow-y-auto shadow-2xl border border-[#1f3b63]">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1f3b63]">
                <h2 className="text-2xl font-bold text-[#FF6B35]">
                  {modalMode === "view"
                    ? "Detalles del Conductor"
                    : modalMode === "create"
                    ? "Nuevo Conductor"
                    : modalMode === "verify"
                    ? "Verificar Conductor"
                    : "Editar Conductor"}
                </h2>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-[#FF6B35] transition">
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* View Mode */}
              {modalMode === "view" && selectedDriver && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Código</p>
                      <p className="font-semibold">{selectedDriver.id}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Estado</p>
                      <span className={`px-3 py-1 rounded-md text-xs font-semibold ${getEstadoColor(selectedDriver.estado)}`}>
                        {selectedDriver.estado}
                      </span>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63] col-span-2">
                      <p className="text-gray-400 text-xs mb-1">Nombre completo</p>
                      <p className="font-semibold">{selectedDriver.nombre}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Email</p>
                      <p className="font-semibold text-blue-400">{selectedDriver.email}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Teléfono</p>
                      <p className="font-semibold">{selectedDriver.telefono}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Licencia</p>
                      <p className="font-semibold">{selectedDriver.licencia}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Tipo de Licencia</p>
                      <p className="font-semibold">{selectedDriver.tipoLicencia}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Vehículo</p>
                      <p className="font-semibold">{selectedDriver.vehiculo}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Placa</p>
                      <p className="font-semibold">{selectedDriver.placa}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Ciudad</p>
                      <p className="font-semibold">{selectedDriver.ciudad}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Calificación</p>
                      <p className="font-semibold text-yellow-400">⭐ {selectedDriver.calificacion.toFixed(1)}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Viajes Completados</p>
                      <p className="font-semibold">{selectedDriver.viajesCompletados}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Fecha de Registro</p>
                      <p className="font-semibold">{selectedDriver.fechaRegistro}</p>
                    </div>
                  </div>

                  {/* Documentos PDF */}
                  {selectedDriver.documentos && (
                    <div className="mt-6 pt-6 border-t border-[#1f3b63]">
                      <h3 className="text-lg font-bold text-[#FF6B35] mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Documentos Adjuntos
                      </h3>
                      <div className="grid grid-cols-1 gap-3">
                        {selectedDriver.documentos.licenciaUrl && (
                          <a
                            href={selectedDriver.documentos.licenciaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between bg-[#112a52] p-4 rounded-lg border border-[#1f3b63] hover:border-[#FF6B35] hover:bg-[#1a3a62] transition group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center group-hover:bg-red-500/30 transition">
                                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <div>
                                <p className="font-semibold text-white">Licencia de Conducir</p>
                                <p className="text-xs text-gray-400">Documento PDF</p>
                              </div>
                            </div>
                            <svg className="w-5 h-5 text-[#FF6B35] opacity-0 group-hover:opacity-100 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                        {selectedDriver.documentos.cedulaUrl && (
                          <a
                            href={selectedDriver.documentos.cedulaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between bg-[#112a52] p-4 rounded-lg border border-[#1f3b63] hover:border-[#FF6B35] hover:bg-[#1a3a62] transition group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition">
                                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                </svg>
                              </div>
                              <div>
                                <p className="font-semibold text-white">Cédula de Identidad</p>
                                <p className="text-xs text-gray-400">Documento PDF</p>
                              </div>
                            </div>
                            <svg className="w-5 h-5 text-[#FF6B35] opacity-0 group-hover:opacity-100 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                        {selectedDriver.documentos.matriculaUrl && (
                          <a
                            href={selectedDriver.documentos.matriculaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between bg-[#112a52] p-4 rounded-lg border border-[#1f3b63] hover:border-[#FF6B35] hover:bg-[#1a3a62] transition group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                              <div>
                                <p className="font-semibold text-white">Matrícula del Vehículo</p>
                                <p className="text-xs text-gray-400">Documento PDF</p>
                              </div>
                            </div>
                            <svg className="w-5 h-5 text-[#FF6B35] opacity-0 group-hover:opacity-100 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                        {!selectedDriver.documentos.licenciaUrl && 
                         !selectedDriver.documentos.cedulaUrl && 
                         !selectedDriver.documentos.matriculaUrl && (
                          <div className="text-center text-gray-400 py-4 italic">
                            No hay documentos adjuntos
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedDriver.estado === "Pendiente" && (
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => handleApprove(selectedDriver.id, selectedDriver.nombre)}
                        className="flex-1 px-5 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition flex items-center justify-center gap-2"
                      >
                        <CheckCircleIcon className="w-5 h-5" />
                        Aprobar Conductor
                      </button>
                      <button
                        onClick={() => handleReject(selectedDriver.id, selectedDriver.nombre)}
                        className="flex-1 px-5 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition flex items-center justify-center gap-2"
                      >
                        <XCircleIcon className="w-5 h-5" />
                        Rechazar
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Create/Edit Mode */}
              {(modalMode === "create" || modalMode === "edit") && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Nombre completo *</label>
                      <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Teléfono *</label>
                      <input
                        type="text"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Licencia *</label>
                      <input
                        type="text"
                        value={formData.licencia}
                        onChange={(e) => setFormData({ ...formData, licencia: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Tipo de Licencia *</label>
                      <select
                        value={formData.tipoLicencia}
                        onChange={(e) => setFormData({ ...formData, tipoLicencia: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        required
                      >
                        <option value="">Seleccionar...</option>
                        <option value="Tipo C">Tipo C</option>
                        <option value="Tipo E">Tipo E</option>
                        <option value="Tipo D">Tipo D</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Vehículo *</label>
                      <input
                        type="text"
                        value={formData.vehiculo}
                        onChange={(e) => setFormData({ ...formData, vehiculo: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        placeholder="ej: Camioneta 1.5T"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Placa *</label>
                      <input
                        type="text"
                        value={formData.placa}
                        onChange={(e) => setFormData({ ...formData, placa: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        placeholder="ej: PBA-1234"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Ciudad *</label>
                      <input
                        type="text"
                        value={formData.ciudad}
                        onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        required
                      />
                    </div>

                    {modalMode === "edit" && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Estado</label>
                        <select
                          value={formData.estado}
                          onChange={(e) => setFormData({ ...formData, estado: e.target.value as Driver["estado"] })}
                          className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="Verificado">Verificado</option>
                          <option value="Activo">Activo</option>
                          <option value="Inactivo">Inactivo</option>
                          <option value="Rechazado">Rechazado</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-5 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-[#FF6B35] hover:bg-[#ff844e] text-white font-semibold transition"
                    >
                      {modalMode === "create" ? "Crear Conductor" : "Guardar Cambios"}
                    </button>
                  </div>
                </form>
              )}

              {/* Close button for view mode */}
              {modalMode === "view" && (
                <div className="flex justify-end pt-6">
                  <button
                    onClick={handleCloseModal}
                    className="px-5 py-2 rounded-lg bg-[#FF6B35] hover:bg-[#ff844e] text-white font-semibold transition"
                  >
                    Cerrar
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
