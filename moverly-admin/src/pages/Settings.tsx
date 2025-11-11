import { useState } from "react";
import Sidebar from "../../src/components/Sidebar";
import {
  Cog6ToothIcon,
  UserCircleIcon,
  BellIcon,
  GlobeAltIcon,
  MoonIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  TrashIcon,
  CloudArrowUpIcon,
  CloudArrowDownIcon,
} from "@heroicons/react/24/outline";

export default function Settings() {
  const [themeDark, setThemeDark] = useState(true);
  const [lang, setLang] = useState("es");
  const [notifications, setNotifications] = useState(true);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [backups, setBackups] = useState([
    { id: 1, fecha: "2025-11-02", tamano: "24 MB" },
    { id: 2, fecha: "2025-10-15", tamano: "22 MB" },
  ]);

  const [profile, setProfile] = useState({
    nombre: "Joel Martínez",
    correo: "admin@moverly.com",
    telefono: "0998745621",
  });

  // ✅ Crear respaldo (simulado con progreso)
  const startBackup = () => {
    setShowBackupModal(true);
    setBackupProgress(0);
    const interval = setInterval(() => {
      setBackupProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          const newBackup = {
            id: backups.length + 1,
            fecha: new Date().toISOString().split("T")[0],
            tamano: `${20 + Math.floor(Math.random() * 10)} MB`,
          };
          setBackups([newBackup, ...backups]);
          return 100;
        }
        return p + 10;
      });
    }, 300);
  };

  // ✅ Restaurar sistema (simulado)
  const startRestore = () => {
    setShowRestoreModal(true);
    setTimeout(() => setShowRestoreModal(false), 2500);
  };

  // ✅ Limpiar logs
  const clearLogs = () => {
    alert("✅ Registros del sistema eliminados correctamente.");
  };

  return (
    <div className="flex min-h-screen bg-[#0E1B32] text-white">
      <Sidebar />

      <main className="flex-1 ml-64 bg-[#13284D] p-8 border-l border-[#FF6B35]/25">
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Cog6ToothIcon className="w-8 h-8 text-[#FF6B35]" />
            Configuración del sistema
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Perfil del administrador */}
          <section className="bg-[#0A2342] p-6 rounded-xl border border-[#1f3b63] shadow-md">
            <h2 className="text-xl font-semibold text-[#FF6B35] mb-4 flex items-center gap-2">
              <UserCircleIcon className="w-6 h-6 text-[#FF6B35]" />
              Perfil del administrador
            </h2>

            <div className="space-y-4 text-sm text-gray-200">
              <p>
                <span className="text-gray-400">Nombre:</span>{" "}
                {profile.nombre}
              </p>
              <p>
                <span className="text-gray-400">Correo:</span> {profile.correo}
              </p>
              <p>
                <span className="text-gray-400">Teléfono:</span>{" "}
                {profile.telefono}
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowProfileModal(true)}
                className="bg-[#FF6B35] hover:bg-[#ff814f] px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
              >
                <PencilSquareIcon className="w-4 h-4" />
                Editar perfil
              </button>
              <button
                onClick={() => alert("🔐 Función de cambio de contraseña próximamente")}
                className="bg-[#112a52] hover:bg-[#183766] px-4 py-2 rounded-lg text-sm font-medium transition border border-[#1f3b63]"
              >
                Cambiar contraseña
              </button>
            </div>
          </section>

          {/* Preferencias */}
          <section className="bg-[#0A2342] p-6 rounded-xl border border-[#1f3b63] shadow-md">
            <h2 className="text-xl font-semibold text-[#FF6B35] mb-4 flex items-center gap-2">
              <Cog6ToothIcon className="w-6 h-6 text-[#FF6B35]" />
              Preferencias generales
            </h2>

            <div className="space-y-6 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MoonIcon className="w-5 h-5 text-[#FF6B35]" />
                  <span>Tema oscuro</span>
                </div>
                <input
                  type="checkbox"
                  checked={themeDark}
                  onChange={() => setThemeDark(!themeDark)}
                  className="accent-[#FF6B35] w-5 h-5"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GlobeAltIcon className="w-5 h-5 text-[#FF6B35]" />
                  <span>Idioma</span>
                </div>
                <select
                  className="bg-[#13284D] border border-[#1f3b63] rounded-lg px-3 py-1 text-sm text-white"
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                >
                  <option value="es">Español</option>
                  <option value="en">Inglés</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BellIcon className="w-5 h-5 text-[#FF6B35]" />
                  <span>Notificaciones por correo</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  className="accent-[#FF6B35] w-5 h-5"
                />
              </div>
            </div>
          </section>

          {/* Gestión del sistema */}
          <section className="bg-[#0A2342] p-6 rounded-xl border border-[#1f3b63] shadow-md lg:col-span-2">
            <h2 className="text-xl font-semibold text-[#FF6B35] mb-4 flex items-center gap-2">
              <ShieldCheckIcon className="w-6 h-6 text-[#FF6B35]" />
              Gestión del sistema
            </h2>

            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={startBackup}
                className="flex items-center gap-2 bg-[#112a52] hover:bg-[#183766] px-4 py-2 rounded-lg text-sm border border-[#1f3b63] transition"
              >
                <CloudArrowUpIcon className="w-5 h-5 text-[#FF6B35]" />
                Crear respaldo
              </button>

              <button
                onClick={startRestore}
                className="flex items-center gap-2 bg-[#112a52] hover:bg-[#183766] px-4 py-2 rounded-lg text-sm border border-[#1f3b63] transition"
              >
                <CloudArrowDownIcon className="w-5 h-5 text-[#FF6B35]" />
                Restaurar sistema
              </button>

              <button
                onClick={clearLogs}
                className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 px-4 py-2 rounded-lg text-sm transition border border-red-500/30"
              >
                <TrashIcon className="w-5 h-5" />
                Limpiar registros
              </button>
            </div>

            {/* Historial de respaldos */}
            <div className="bg-[#112a52] rounded-lg p-4 border border-[#1f3b63]">
              <h3 className="text-[#FF6B35] font-semibold mb-3 flex items-center gap-2">
                <ArrowPathIcon className="w-5 h-5 text-[#FF6B35]" />
                Historial de respaldos
              </h3>
              <ul className="divide-y divide-[#1f3b63] text-sm text-gray-200">
                {backups.map((b) => (
                  <li
                    key={b.id}
                    className="py-2 flex justify-between items-center"
                  >
                    <span>
                      📦 <strong>{b.fecha}</strong> — {b.tamano}
                    </span>
                    <span className="text-xs text-gray-400">#ID{b.id}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>

      {/* Modal: Progreso de respaldo */}
      {showBackupModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0A2342] p-8 rounded-xl shadow-2xl w-[400px] text-center border border-[#1f3b63]">
            <h3 className="text-xl font-semibold text-[#FF6B35] mb-4">
              Creando respaldo del sistema...
            </h3>
            <div className="w-full bg-[#13284D] h-4 rounded-full mb-4 overflow-hidden">
              <div
                className="bg-[#FF6B35] h-4 transition-all duration-300"
                style={{ width: `${backupProgress}%` }}
              />
            </div>
            <p className="text-gray-300 mb-4">
              Progreso: {backupProgress}%
            </p>
            {backupProgress === 100 && (
              <p className="text-green-400 font-semibold flex items-center justify-center gap-2">
                <CheckCircleIcon className="w-5 h-5" />
                Respaldo completado correctamente
              </p>
            )}
            <button
              onClick={() => setShowBackupModal(false)}
              className="mt-6 bg-[#FF6B35] hover:bg-[#ff814f] px-5 py-2 rounded-lg text-sm font-semibold text-white transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal: Restauración */}
      {showRestoreModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0A2342] p-8 rounded-xl shadow-2xl w-[400px] text-center border border-[#1f3b63]">
            <h3 className="text-xl font-semibold text-[#FF6B35] mb-4">
              Restaurando sistema...
            </h3>
            <p className="text-gray-300 mb-4">
              Este proceso puede tardar unos segundos.
            </p>
            <ArrowPathIcon className="w-8 h-8 mx-auto animate-spin text-[#FF6B35]" />
          </div>
        </div>
      )}

      {/* Modal: Editar perfil */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0A2342] p-8 rounded-xl shadow-2xl w-[450px] border border-[#1f3b63]">
            <h3 className="text-xl font-semibold text-[#FF6B35] mb-6 flex items-center gap-2">
              <PencilSquareIcon className="w-6 h-6 text-[#FF6B35]" />
              Editar perfil del administrador
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Nombre</label>
                <input
                  value={profile.nombre}
                  onChange={(e) =>
                    setProfile({ ...profile, nombre: e.target.value })
                  }
                  className="w-full bg-[#13284D] border border-[#1f3b63] rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-[#FF6B35]/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Correo</label>
                <input
                  value={profile.correo}
                  onChange={(e) =>
                    setProfile({ ...profile, correo: e.target.value })
                  }
                  className="w-full bg-[#13284D] border border-[#1f3b63] rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-[#FF6B35]/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Teléfono</label>
                <input
                  value={profile.telefono}
                  onChange={(e) =>
                    setProfile({ ...profile, telefono: e.target.value })
                  }
                  className="w-full bg-[#13284D] border border-[#1f3b63] rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-[#FF6B35]/50"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowProfileModal(false)}
                className="bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded-lg text-sm text-gray-900 font-semibold transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowProfileModal(false)}
                className="bg-[#FF6B35] hover:bg-[#ff814f] px-4 py-2 rounded-lg text-sm text-white font-semibold transition"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
