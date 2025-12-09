import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";
import type { ToastType } from "../components/Toast";
import {
  ClipboardDocumentListIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  MapPinIcon,
  UserIcon,
  TruckIcon,
  CurrencyDollarIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import type { Order } from "../data/mockData";
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  cancelOrder,
  initializeStorage,
} from "../services/storageService";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("todos");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "create" | "edit">("view");
  const [toast, setToast] = useState<{ type: ToastType; message: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Order>>({
    cliente: "",
    clienteId: "",
    conductor: "",
    conductorId: "",
    tipo: "Mudanza",
    vehiculoTipo: "",
    origen: "",
    origenDireccion: "",
    destino: "",
    destinoDireccion: "",
    estado: "Pendiente",
    fecha: "",
    hora: "",
    precio: 0,
    distancia: "",
    duracion: "",
    detalles: "",
  });

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    initializeStorage();
    const data = getOrders();
    setOrders(data);
  };

  const handleOpenModal = (mode: "view" | "create" | "edit", order?: Order) => {
    setModalMode(mode);
    if (order) {
      setSelectedOrder(order);
      setFormData(order);
    } else {
      setSelectedOrder(null);
      setFormData({
        cliente: "",
        clienteId: "",
        conductor: "",
        conductorId: "",
        tipo: "Mudanza",
        vehiculoTipo: "",
        origen: "",
        origenDireccion: "",
        destino: "",
        destinoDireccion: "",
        estado: "Pendiente",
        fecha: "",
        hora: "",
        precio: 0,
        distancia: "",
        duracion: "",
        detalles: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!formData.cliente || !formData.origen || !formData.destino || !formData.fecha || !formData.precio) {
      setToast({ type: "error", message: "❌ Por favor complete todos los campos obligatorios" });
      return;
    }

    if (formData.precio <= 0) {
      setToast({ type: "error", message: "❌ El precio debe ser mayor a 0" });
      return;
    }

    if (modalMode === "create") {
      try {
        const newOrder = createOrder(formData as Omit<Order, "id" | "numeroOrden" | "fechaCreacion">);
        setOrders([...orders, newOrder]);
        setToast({ type: "success", message: "✅ Pedido creado exitosamente" });
        handleCloseModal();
      } catch (error) {
        setToast({ type: "error", message: "❌ Error al crear pedido" });
      }
    } else if (modalMode === "edit" && selectedOrder) {
      try {
        const updated = updateOrder(selectedOrder.id, formData);
        if (updated) {
          setOrders(orders.map((o) => (o.id === updated.id ? updated : o)));
          setToast({ type: "success", message: "✅ Pedido actualizado exitosamente" });
          handleCloseModal();
        }
      } catch (error) {
        setToast({ type: "error", message: "❌ Error al actualizar pedido" });
      }
    }
  };

  const handleCancel = (id: string, numero: string) => {
    if (window.confirm(`¿Cancelar el pedido "${numero}"?`)) {
      try {
        const updated = cancelOrder(id);
        if (updated) {
          setOrders(orders.map((o) => (o.id === updated.id ? updated : o)));
          setToast({ type: "warning", message: "⚠️ Pedido cancelado" });
        }
      } catch (error) {
        setToast({ type: "error", message: "❌ Error al cancelar pedido" });
      }
    }
  };

  const handleDelete = (id: string, numero: string) => {
    if (window.confirm(`¿Estás seguro de eliminar el pedido "${numero}"?`)) {
      try {
        const success = deleteOrder(id);
        if (success) {
          setOrders(orders.filter((o) => o.id !== id));
          setToast({ type: "success", message: "✅ Pedido eliminado exitosamente" });
        }
      } catch (error) {
        setToast({ type: "error", message: "❌ Error al eliminar pedido" });
      }
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchSearch =
      order.numeroOrden.toLowerCase().includes(search.toLowerCase()) ||
      order.cliente.toLowerCase().includes(search.toLowerCase()) ||
      order.conductor.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "todos" ? true : order.estado.toLowerCase() === filter.toLowerCase();
    return matchSearch && matchFilter;
  });

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Completado":
        return "bg-green-500/20 text-green-400";
      case "En curso":
        return "bg-blue-500/20 text-blue-400";
      case "Asignado":
        return "bg-purple-500/20 text-purple-400";
      case "Pendiente":
        return "bg-yellow-500/20 text-yellow-400";
      case "Cancelado":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "Mudanza":
        return "bg-blue-500/20 text-blue-400";
      case "Flete":
        return "bg-green-500/20 text-green-400";
      case "Transporte":
        return "bg-purple-500/20 text-purple-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  // Stats
  const stats = {
    pendientes: orders.filter((o) => o.estado === "Pendiente").length,
    enCurso: orders.filter((o) => o.estado === "En curso").length,
    completados: orders.filter((o) => o.estado === "Completado").length,
  };

  return (
    <div className="flex min-h-screen bg-[#0E1B32] text-white">
      <Sidebar />

      <main className="flex-1 ml-64 bg-[#13284D] p-8 border-l border-[#FF6B35]/25 relative">
        {/* Toast */}
        {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ClipboardDocumentListIcon className="w-8 h-8 text-[#FF6B35]" />
            Gestión de Pedidos
          </h1>
          <button
            onClick={() => handleOpenModal("create")}
            className="flex items-center gap-2 bg-[#FF6B35] hover:bg-[#ff844e] text-white px-5 py-2 rounded-lg transition font-semibold"
          >
            <PlusIcon className="w-5 h-5" />
            Nuevo Pedido
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 p-5 rounded-xl border border-yellow-500/30 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <ClockIcon className="w-6 h-6 text-yellow-400" />
              </div>
              <span className="text-xs font-semibold text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded-full">
                PENDIENTES
              </span>
            </div>
            <p className="text-3xl font-bold text-yellow-400 mb-1">{stats.pendientes}</p>
            <p className="text-xs text-gray-400">En espera de asignación</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-5 rounded-xl border border-blue-500/30 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <TruckIcon className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-xs font-semibold text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">
                EN CURSO
              </span>
            </div>
            <p className="text-3xl font-bold text-blue-400 mb-1">{stats.enCurso}</p>
            <p className="text-xs text-gray-400">Activos en ruta</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 p-5 rounded-xl border border-green-500/30 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-green-400 bg-green-500/20 px-2 py-1 rounded-full">
                COMPLETADOS
              </span>
            </div>
            <p className="text-3xl font-bold text-green-400 mb-1">{stats.completados}</p>
            <p className="text-xs text-gray-400">Entregados con éxito</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-5 rounded-xl border border-purple-500/30 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <CurrencyDollarIcon className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-xs font-semibold text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full">
                INGRESOS
              </span>
            </div>
            <p className="text-3xl font-bold text-purple-400 mb-1">
              ${orders.filter(o => o.estado === 'Completado').reduce((sum, o) => sum + o.precio, 0).toFixed(2)}
            </p>
            <p className="text-xs text-gray-400">Total generado</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar por número, cliente o conductor..."
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
              <option value="asignado">Asignados</option>
              <option value="en curso">En Curso</option>
              <option value="completado">Completados</option>
              <option value="cancelado">Cancelados</option>
            </select>
          </div>

          <div className="text-sm text-gray-400">
            Total: <span className="text-[#FF6B35] font-semibold">{filteredOrders.length}</span> pedidos
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-[#0A2342] rounded-xl border border-[#1f3b63] shadow-xl">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left bg-gradient-to-r from-[#0E2442] to-[#112a52] text-gray-300 border-b border-[#FF6B35]/20">
                <th className="py-4 px-4 font-bold text-xs uppercase tracking-wider">N° Orden</th>
                <th className="py-4 px-4 font-bold text-xs uppercase tracking-wider">Cliente</th>
                <th className="py-4 px-4 font-bold text-xs uppercase tracking-wider">Conductor</th>
                <th className="py-4 px-4 font-bold text-xs uppercase tracking-wider">Tipo</th>
                <th className="py-4 px-4 font-bold text-xs uppercase tracking-wider">Origen → Destino</th>
                <th className="py-4 px-4 font-bold text-xs uppercase tracking-wider">Fecha</th>
                <th className="py-4 px-4 font-bold text-xs uppercase tracking-wider">Precio</th>
                <th className="py-4 px-4 font-bold text-xs uppercase tracking-wider">Estado</th>
                <th className="py-4 px-4 font-bold text-xs uppercase tracking-wider text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr 
                  key={order.id} 
                  className={`border-t border-[#1f3b63] hover:bg-[#183766]/60 transition-all duration-200 ${
                    index % 2 === 0 ? 'bg-[#0A2342]' : 'bg-[#0d1f36]'
                  }`}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      <span className="text-blue-400 font-mono text-xs font-semibold">{order.numeroOrden}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#FF6B35]/20 flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-[#FF6B35]" />
                      </div>
                      <span className="font-medium text-white">{order.cliente}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {order.conductor ? (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                          <TruckIcon className="w-4 h-4 text-green-400" />
                        </div>
                        <span className="font-medium text-gray-200">{order.conductor}</span>
                      </div>
                    ) : (
                      <span className="text-gray-500 italic text-sm flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        Sin asignar
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${getTipoColor(order.tipo)} border border-current/30`}>
                      {order.tipo}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs">
                        <MapPinIcon className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-green-400 font-medium">{order.origen}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <MapPinIcon className="w-3.5 h-3.5 text-red-400" />
                        <span className="text-red-400 font-medium">{order.destino}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-xs">
                      <div className="font-semibold text-white">{order.fecha}</div>
                      <div className="text-gray-400 mt-0.5">{order.hora}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <CurrencyDollarIcon className="w-4 h-4 text-green-400" />
                      <span className="font-bold text-green-400 text-base">${order.precio.toFixed(2)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${getEstadoColor(order.estado)} border border-current/30 inline-block`}>
                      {order.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 p-2 rounded-md transition"
                        onClick={() => handleOpenModal("view", order)}
                        title="Ver detalles"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-400 p-2 rounded-md transition"
                        onClick={() => handleOpenModal("edit", order)}
                        title="Editar"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      {order.estado !== "Cancelado" && order.estado !== "Completado" && (
                        <button
                          className="bg-orange-500/20 hover:bg-orange-500/40 text-orange-400 p-2 rounded-md transition"
                          onClick={() => handleCancel(order.id, order.numeroOrden)}
                          title="Cancelar"
                        >
                          <XCircleIcon className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        className="bg-red-500/20 hover:bg-red-500/40 text-red-400 p-2 rounded-md transition"
                        onClick={() => handleDelete(order.id, order.numeroOrden)}
                        title="Eliminar"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center text-gray-400 py-8 italic">
                    No se encontraron pedidos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#0A2342] rounded-2xl p-8 w-[800px] max-h-[90vh] overflow-y-auto shadow-2xl border border-[#1f3b63]">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1f3b63]">
                <h2 className="text-2xl font-bold text-[#FF6B35]">
                  {modalMode === "view" ? "Detalles del Pedido" : modalMode === "create" ? "Nuevo Pedido" : "Editar Pedido"}
                </h2>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-[#FF6B35] transition">
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* View Mode */}
              {modalMode === "view" && selectedOrder && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Número de Orden</p>
                      <p className="font-semibold text-blue-400">{selectedOrder.numeroOrden}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Estado</p>
                      <span className={`px-3 py-1 rounded-md text-xs font-semibold ${getEstadoColor(selectedOrder.estado)}`}>
                        {selectedOrder.estado}
                      </span>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Cliente</p>
                      <p className="font-semibold">{selectedOrder.cliente}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Conductor</p>
                      <p className="font-semibold">{selectedOrder.conductor || <span className="text-gray-500 italic">Sin asignar</span>}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Tipo de Servicio</p>
                      <span className={`px-3 py-1 rounded-md text-xs font-semibold ${getTipoColor(selectedOrder.tipo)}`}>
                        {selectedOrder.tipo}
                      </span>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Vehículo</p>
                      <p className="font-semibold">{selectedOrder.vehiculoTipo}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63] col-span-2">
                      <p className="text-gray-400 text-xs mb-1">Origen</p>
                      <p className="font-semibold text-green-400">📍 {selectedOrder.origen}</p>
                      <p className="text-sm text-gray-400 mt-1">{selectedOrder.origenDireccion}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63] col-span-2">
                      <p className="text-gray-400 text-xs mb-1">Destino</p>
                      <p className="font-semibold text-red-400">📍 {selectedOrder.destino}</p>
                      <p className="text-sm text-gray-400 mt-1">{selectedOrder.destinoDireccion}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Fecha y Hora</p>
                      <p className="font-semibold">{selectedOrder.fecha} - {selectedOrder.hora}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Precio</p>
                      <p className="font-semibold text-green-400 text-xl">${selectedOrder.precio.toFixed(2)}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Distancia</p>
                      <p className="font-semibold">{selectedOrder.distancia}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Duración Estimada</p>
                      <p className="font-semibold">{selectedOrder.duracion}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63] col-span-2">
                      <p className="text-gray-400 text-xs mb-1">Detalles</p>
                      <p className="font-semibold text-sm">{selectedOrder.detalles}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Create/Edit Mode */}
              {(modalMode === "create" || modalMode === "edit") && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Cliente *</label>
                      <input
                        type="text"
                        value={formData.cliente}
                        onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Conductor</label>
                      <input
                        type="text"
                        value={formData.conductor}
                        onChange={(e) => setFormData({ ...formData, conductor: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        placeholder="Opcional"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Tipo de Servicio *</label>
                      <select
                        value={formData.tipo}
                        onChange={(e) => setFormData({ ...formData, tipo: e.target.value as Order["tipo"] })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        required
                      >
                        <option value="Mudanza">Mudanza</option>
                        <option value="Flete">Flete</option>
                        <option value="Transporte">Transporte</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Vehículo *</label>
                      <input
                        type="text"
                        value={formData.vehiculoTipo}
                        onChange={(e) => setFormData({ ...formData, vehiculoTipo: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        placeholder="ej: Camioneta 1.5T"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Origen *</label>
                      <input
                        type="text"
                        value={formData.origen}
                        onChange={(e) => setFormData({ ...formData, origen: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Destino *</label>
                      <input
                        type="text"
                        value={formData.destino}
                        onChange={(e) => setFormData({ ...formData, destino: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Dirección Origen *</label>
                      <input
                        type="text"
                        value={formData.origenDireccion}
                        onChange={(e) => setFormData({ ...formData, origenDireccion: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Dirección Destino *</label>
                      <input
                        type="text"
                        value={formData.destinoDireccion}
                        onChange={(e) => setFormData({ ...formData, destinoDireccion: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Fecha *</label>
                      <input
                        type="date"
                        value={formData.fecha}
                        onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Hora *</label>
                      <input
                        type="time"
                        value={formData.hora}
                        onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Precio (USD) *</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.precio}
                        onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Distancia</label>
                      <input
                        type="text"
                        value={formData.distancia}
                        onChange={(e) => setFormData({ ...formData, distancia: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        placeholder="ej: 42 km"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Duración</label>
                      <input
                        type="text"
                        value={formData.duracion}
                        onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        placeholder="ej: 1h 15min"
                      />
                    </div>

                    {modalMode === "edit" && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Estado</label>
                        <select
                          value={formData.estado}
                          onChange={(e) => setFormData({ ...formData, estado: e.target.value as Order["estado"] })}
                          className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="Asignado">Asignado</option>
                          <option value="En curso">En curso</option>
                          <option value="Completado">Completado</option>
                          <option value="Cancelado">Cancelado</option>
                        </select>
                      </div>
                    )}

                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Detalles</label>
                      <textarea
                        value={formData.detalles}
                        onChange={(e) => setFormData({ ...formData, detalles: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        rows={3}
                        placeholder="Descripción del servicio..."
                      />
                    </div>
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
                      {modalMode === "create" ? "Crear Pedido" : "Guardar Cambios"}
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
