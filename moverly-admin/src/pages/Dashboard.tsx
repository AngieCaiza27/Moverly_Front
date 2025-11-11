import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ClipboardDocumentListIcon,
  TruckIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "../../src/components/Sidebar";

interface Stats {
  pedidos_activos: number;
  conductores: number;
  usuarios: number;
  ingresos: number;
  tendencia_semanal: { dia: string; valor: number }[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/admin/stats", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setStats({
        pedidos_activos: data.pedidos_activos,
        conductores: data.conductores,
        usuarios: data.usuarios,
        ingresos: data.ingresos,
        tendencia_semanal: data.tendencia_semanal,
      });
    } catch (err) {
      console.error("Error al cargar estadísticas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const sampleTrend = stats?.tendencia_semanal || [
    { dia: "Lun", valor: 10 },
    { dia: "Mar", valor: 14 },
    { dia: "Mié", valor: 9 },
    { dia: "Jue", valor: 20 },
    { dia: "Vie", valor: 18 },
    { dia: "Sáb", valor: 12 },
    { dia: "Dom", valor: 16 },
  ];

  return (
    <div className="flex min-h-screen bg-[#0E1B32] text-white">
      <Sidebar />
      <main className="flex-1 ml-64 bg-[#13284D] p-8 border-l border-[#FF6B35]/25 shadow-inner">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <ClipboardDocumentListIcon className="w-8 h-8 text-[#FF6B35]" />
            Panel Administrativo
          </h1>
          <button
            onClick={fetchStats}
            className="flex items-center gap-2 bg-[#FF6B35] text-white px-5 py-2 rounded-lg hover:bg-[#ff844e] transition"
            disabled={loading}
          >
            <ArrowPathIcon className="w-5 h-5" />
            {loading ? "Actualizando…" : "Actualizar datos"}
          </button>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="flex items-center gap-4 bg-[#0A2342] p-6 rounded-xl shadow-md border border-[#1f3b63] hover:scale-[1.02] transition-transform">
            <div className="bg-[#FF6B35]/20 p-3 rounded-lg">
              <ClipboardDocumentListIcon className="w-7 h-7 text-[#FF6B35]" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-300">Pedidos activos</h2>
              <p className="text-3xl font-bold text-white">{stats?.pedidos_activos ?? "--"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#0A2342] p-6 rounded-xl shadow-md border border-[#1f3b63] hover:scale-[1.02] transition-transform">
            <div className="bg-green-400/20 p-3 rounded-lg">
              <TruckIcon className="w-7 h-7 text-green-400" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-300">Conductores</h2>
              <p className="text-3xl font-bold text-white">{stats?.conductores ?? "--"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#0A2342] p-6 rounded-xl shadow-md border border-[#1f3b63] hover:scale-[1.02] transition-transform">
            <div className="bg-blue-400/20 p-3 rounded-lg">
              <UserGroupIcon className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-300">Usuarios</h2>
              <p className="text-3xl font-bold text-white">{stats?.usuarios ?? "--"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#0A2342] p-6 rounded-xl shadow-md border border-[#1f3b63] hover:scale-[1.02] transition-transform">
            <div className="bg-yellow-400/20 p-3 rounded-lg">
              <CurrencyDollarIcon className="w-7 h-7 text-yellow-400" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-300">Ingresos</h2>
              <p className="text-3xl font-bold text-white">${stats?.ingresos.toLocaleString() ?? "--"}</p>
            </div>
          </div>
        </section>

        <section className="bg-[#0A2342] text-white p-6 rounded-xl shadow-md border border-[#1f3b63] mb-10">
          <h2 className="text-lg font-bold mb-4 text-[#FF6B35]">Tendencia semanal de pedidos</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={sampleTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid stroke="#1f3b63" strokeDasharray="3 3" />
              <XAxis dataKey="dia" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line type="monotone" dataKey="valor" stroke="#FF6B35" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </section>

        <section className="bg-[#0A2342] text-white p-6 rounded-xl shadow-md border border-[#1f3b63]">
          <h2 className="text-lg font-bold mb-4 text-[#FF6B35]">Actividad reciente</h2>
          <ul className="divide-y divide-[#243b6d]">
            {/* Aquí podrías mapear data.recientes desde stats */}
            <li className="py-3 flex justify-between">
              <span>Nuevo pedido #2384</span>
              <span className="text-[#FF6B35] font-semibold">En curso</span>
            </li>
            <li className="py-3 flex justify-between">
              <span>Conductor Juan Pérez completó un envío</span>
              <span className="text-green-400 font-semibold">Completado</span>
            </li>
            <li className="py-3 flex justify-between">
              <span>Usuario Ana Torres registró una nueva cuenta</span>
              <span className="text-blue-400 font-semibold">Nuevo</span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
