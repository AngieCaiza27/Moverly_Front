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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
    } catch {
      setError("Credenciales incorrectas o error en el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a2159] px-4">
      <div className="bg-transparent w-full max-w-md text-center">
        {/* 🔹 Imagen superior */}
        <div className="flex justify-center mb-6">
          <img
            src="/../../images/logo.png"
            alt="Moverly logo"
            className="w-56"
          />
        </div>

        {/* 🔹 Título */}
        <h1 className="text-4xl font-bold text-[#FF6B00]">Moverly</h1>
        <p className="text-gray-300 text-sm mb-8">Mudarte nunca fue tan fácil</p>

        {/* 🔹 Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 shadow-lg space-y-4 text-left"
        >
          {/* Email */}
          <div>
            <label className="text-gray-700 text-sm font-medium">Correo</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-[#FF6B00]">
              <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="ejemplo@moverly.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 outline-none text-gray-700"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 text-sm font-medium">Contraseña</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 mt-1 focus-within:ring-2 focus-within:ring-[#FF6B00]">
              <LockClosedIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
      </div>
    </div>
  );
}
