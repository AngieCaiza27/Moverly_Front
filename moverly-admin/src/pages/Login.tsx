import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/adminApi";
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

export default function Login() {
  const { login } = useAuth();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    // 🔹 MODO DE DESARROLLO: Credenciales de prueba
    if (correo === "admin@moverly.com" && contrasena === "admin123") {
      // Login exitoso en modo desarrollo
      login("dev-token-123"); // ✅ esto guarda y redirige
      setLoading(false);
      return;
    }

    // 🔹 MODO PRODUCCIÓN: Conexión con backend
    const res = await api.post("/auth/login", { correo, contrasena });
    login(res.data.access_token); // ✅ esto guarda y redirige
  } catch (err) {
    setError("Credenciales incorrectas. Intenta con: admin@moverly.com / admin123");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a2159] px-4">
      <div className="bg-transparent w-full max-w-md text-center">
        {/* 🔹 Imagen superior */}
        <div className="flex justify-center mb-6">
          <img src="/../../images/logo.png" alt="Moverly logo" className="w-56" />
        </div>

        {/* 🔹 Título */}
        <h1 className="text-4xl font-bold text-[#FF6B00]">Moverly</h1>
        <p className="text-gray-300 text-sm mb-8">Mudarte nunca fue tan fácil</p>

        {/* 🔹 Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 shadow-lg space-y-4 text-left"
        >
          {/* Correo */}
          <div>
            <label className="text-gray-700 text-sm font-medium">Correo</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-[#FF6B00]">
              <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="ejemplo@moverly.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full p-2 outline-none text-gray-700"
                required
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label className="text-gray-700 text-sm font-medium">Contraseña</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-[#FF6B00]">
              <LockClosedIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="w-full p-2 outline-none text-gray-700"
                required
              />
              {showPassword ? (
                <EyeSlashIcon
                  onClick={() => setShowPassword(false)}
                  className="w-5 h-5 text-gray-400 cursor-pointer"
                />
              ) : (
                <EyeIcon
                  onClick={() => setShowPassword(true)}
                  className="w-5 h-5 text-gray-400 cursor-pointer"
                />
              )}
            </div>
          </div>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          {/* Botón principal */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-[#ff9355] cursor-not-allowed"
                : "bg-[#FF6B00] hover:bg-[#e55e00]"
            }`}
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>

          {/* Olvidar contraseña */}
          <p className="text-center text-sm text-gray-400 mt-4 hover:underline cursor-pointer">
            ¿Olvidaste tu contraseña?
          </p>
        </form>

        {/* 🔹 Credenciales de prueba */}
        <div className="mt-6 bg-blue-900/30 border border-blue-500/30 rounded-xl p-4 text-left">
          <div className="flex items-start gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-blue-300 font-semibold text-sm mb-2">Credenciales de Prueba</h3>
              <div className="space-y-1 text-xs text-gray-300">
                <p><span className="text-blue-400 font-mono">Correo:</span> admin@moverly.com</p>
                <p><span className="text-blue-400 font-mono">Contraseña:</span> admin123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
