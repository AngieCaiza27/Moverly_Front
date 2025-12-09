import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";
import type { ToastType } from "../components/Toast";
import {
  UserGroupIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { User } from "../data/mockData";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  initializeStorage,
} from "../services/storageService";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("todos");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "create" | "edit">("view");
  const [toast, setToast] = useState<{ type: ToastType; message: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<User>>({
    nombre: "",
    email: "",
    telefono: "",
    ciudad: "",
    direccion: "",
    rol: "Cliente",
    estado: "Activo",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    initializeStorage();
    const data = getUsers();
    setUsers(data);
  };

  const handleOpenModal = (mode: "view" | "create" | "edit", user?: User) => {
    setModalMode(mode);
    if (user) {
      setSelectedUser(user);
      setFormData(user);
    } else {
      setSelectedUser(null);
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        ciudad: "",
        direccion: "",
        rol: "Cliente",
        estado: "Activo",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      ciudad: "",
      direccion: "",
      rol: "Cliente",
      estado: "Activo",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!formData.nombre || !formData.email || !formData.telefono || !formData.ciudad) {
      setToast({ type: "error", message: "❌ Por favor complete todos los campos obligatorios" });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setToast({ type: "error", message: "❌ El correo electrónico no es válido" });
      return;
    }

    if (modalMode === "create") {
      try {
        const newUser = createUser(formData as Omit<User, "id" | "fechaRegistro">);
        setUsers([...users, newUser]);
        setToast({ type: "success", message: "✅ Usuario creado exitosamente" });
        handleCloseModal();
      } catch (error) {
        setToast({ type: "error", message: "❌ Error al crear usuario" });
      }
    } else if (modalMode === "edit" && selectedUser) {
      try {
        const updated = updateUser(selectedUser.id, formData);
        if (updated) {
          setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
          setToast({ type: "success", message: "✅ Usuario actualizado exitosamente" });
          handleCloseModal();
        }
      } catch (error) {
        setToast({ type: "error", message: "❌ Error al actualizar usuario" });
      }
    }
  };

  const handleDelete = (id: string, nombre: string) => {
    if (window.confirm(`¿Estás seguro de eliminar al usuario "${nombre}"?`)) {
      try {
        const success = deleteUser(id);
        if (success) {
          setUsers(users.filter((u) => u.id !== id));
          setToast({ type: "success", message: "✅ Usuario eliminado exitosamente" });
        }
      } catch (error) {
        setToast({ type: "error", message: "❌ Error al eliminar usuario" });
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.nombre.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "todos" ? true : user.rol.toLowerCase() === filter.toLowerCase();
    return matchSearch && matchFilter;
  });

  const getRolColor = (rol: string) => {
    switch (rol) {
      case "Administrador":
        return "bg-purple-500/20 text-purple-400";
      case "Conductor":
        return "bg-blue-500/20 text-blue-400";
      case "Cliente":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Activo":
        return "bg-green-500/20 text-green-400";
      case "Inactivo":
        return "bg-gray-500/20 text-gray-400";
      case "Suspendido":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0E1B32] text-white">
      <Sidebar />

      <main className="flex-1 ml-64 bg-[#13284D] p-8 border-l border-[#FF6B35]/25 relative">
        {/* Toast */}
        {toast && (
          <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <UserGroupIcon className="w-8 h-8 text-[#FF6B35]" />
            Gestión de Usuarios
          </h1>
          <button
            onClick={() => handleOpenModal("create")}
            className="flex items-center gap-2 bg-[#FF6B35] hover:bg-[#ff844e] text-white px-5 py-2 rounded-lg transition font-semibold"
          >
            <PlusIcon className="w-5 h-5" />
            Nuevo Usuario
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar usuario o correo..."
                className="pl-10 pr-4 py-2 rounded-lg bg-[#0A2342] text-sm text-white border border-[#1f3b63] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 w-80"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="bg-[#0A2342] text-sm text-white border border-[#1f3b63] px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#FF6B35]/50"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="todos">Todos los roles</option>
              <option value="cliente">Clientes</option>
              <option value="conductor">Conductores</option>
              <option value="administrador">Administradores</option>
            </select>
          </div>

          <div className="text-sm text-gray-400">
            Total: <span className="text-[#FF6B35] font-semibold">{filteredUsers.length}</span> usuarios
          </div>
        </div>

        {/* Table */}
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
                <th className="py-3 px-4 font-semibold">Estado</th>
                <th className="py-3 px-4 font-semibold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-[#1f3b63] hover:bg-[#183766] transition"
                >
                  <td className="py-3 px-4 text-gray-200 font-mono text-xs">{user.id}</td>
                  <td className="py-3 px-4 font-medium">{user.nombre}</td>
                  <td className="py-3 px-4 text-blue-400">{user.email}</td>
                  <td className="py-3 px-4">{user.telefono}</td>
                  <td className="py-3 px-4">{user.ciudad}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${getRolColor(user.rol)}`}>
                      {user.rol}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${getEstadoColor(user.estado)}`}>
                      {user.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 p-2 rounded-md transition"
                        onClick={() => handleOpenModal("view", user)}
                        title="Ver detalles"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-400 p-2 rounded-md transition"
                        onClick={() => handleOpenModal("edit", user)}
                        title="Editar"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="bg-red-500/20 hover:bg-red-500/40 text-red-400 p-2 rounded-md transition"
                        onClick={() => handleDelete(user.id, user.nombre)}
                        title="Eliminar"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center text-gray-400 py-8 italic">
                    No se encontraron usuarios
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#0A2342] rounded-2xl p-8 w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl border border-[#1f3b63]">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1f3b63]">
                <h2 className="text-2xl font-bold text-[#FF6B35]">
                  {modalMode === "view" ? "Detalles del Usuario" : modalMode === "create" ? "Nuevo Usuario" : "Editar Usuario"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-[#FF6B35] transition"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* View Mode */}
              {modalMode === "view" && selectedUser && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Código</p>
                      <p className="font-semibold">{selectedUser.id}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Estado</p>
                      <span className={`px-3 py-1 rounded-md text-xs font-semibold ${getEstadoColor(selectedUser.estado)}`}>
                        {selectedUser.estado}
                      </span>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63] col-span-2">
                      <p className="text-gray-400 text-xs mb-1">Nombre completo</p>
                      <p className="font-semibold">{selectedUser.nombre}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Email</p>
                      <p className="font-semibold text-blue-400">{selectedUser.email}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Teléfono</p>
                      <p className="font-semibold">{selectedUser.telefono}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Ciudad</p>
                      <p className="font-semibold">{selectedUser.ciudad}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63]">
                      <p className="text-gray-400 text-xs mb-1">Rol</p>
                      <span className={`px-3 py-1 rounded-md text-xs font-semibold ${getRolColor(selectedUser.rol)}`}>
                        {selectedUser.rol}
                      </span>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63] col-span-2">
                      <p className="text-gray-400 text-xs mb-1">Dirección</p>
                      <p className="font-semibold">{selectedUser.direccion}</p>
                    </div>
                    <div className="bg-[#112a52] p-4 rounded-xl border border-[#1f3b63] col-span-2">
                      <p className="text-gray-400 text-xs mb-1">Fecha de registro</p>
                      <p className="font-semibold">{selectedUser.fechaRegistro}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Create/Edit Mode */}
              {(modalMode === "create" || modalMode === "edit") && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Nombre completo *</label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Rol *</label>
                      <select
                        value={formData.rol}
                        onChange={(e) => setFormData({ ...formData, rol: e.target.value as User["rol"] })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                        required
                      >
                        <option value="Cliente">Cliente</option>
                        <option value="Conductor">Conductor</option>
                        <option value="Administrador">Administrador</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Dirección</label>
                    <input
                      type="text"
                      value={formData.direccion}
                      onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                    />
                  </div>

                  {modalMode === "edit" && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Estado</label>
                      <select
                        value={formData.estado}
                        onChange={(e) => setFormData({ ...formData, estado: e.target.value as User["estado"] })}
                        className="w-full px-4 py-2 rounded-lg bg-[#112a52] border border-[#1f3b63] text-white focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
                      >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                        <option value="Suspendido">Suspendido</option>
                      </select>
                    </div>
                  )}

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
                      {modalMode === "create" ? "Crear Usuario" : "Guardar Cambios"}
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
