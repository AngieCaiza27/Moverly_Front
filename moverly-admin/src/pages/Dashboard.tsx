import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ClipboardDocumentListIcon,
  TruckIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  ChartBarIcon,
  DocumentArrowDownIcon,
  CalendarIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "../../src/components/Sidebar";
import { getStats, initializeStorage, getOrders, getDrivers } from "../services/storageService";
import type { AdminStats } from "../data/mockData";
import { generateTextReport, generateCSVReport, generateJSONReport } from "../utils/reportGenerator";

export default function Dashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"dia" | "semana" | "mes" | "año">("semana");
  const [selectedDriver, setSelectedDriver] = useState<string>("todos");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("2024-12");

  const fetchStats = () => {
    setLoading(true);
    try {
      initializeStorage();
      const data = getStats();
      setStats(data);
    } catch (err) {
      console.error("Error al cargar estadísticas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Obtener datos de pedidos y conductores
  const orders = getOrders();
  const drivers = getDrivers();

  // Generar datos según el modo de vista
  const getChartData = () => {
    if (viewMode === "dia") {
      return [
        { periodo: "00:00", pedidos: 2, ingresos: 850 },
        { periodo: "04:00", pedidos: 1, ingresos: 450 },
        { periodo: "08:00", pedidos: 5, ingresos: 2850 },
        { periodo: "12:00", pedidos: 8, ingresos: 4200 },
        { periodo: "16:00", pedidos: 6, ingresos: 3100 },
        { periodo: "20:00", pedidos: 3, ingresos: 1600 },
      ];
    } else if (viewMode === "semana") {
      return stats?.tendenciaSemanal.map(d => ({ 
        periodo: d.dia, 
        pedidos: d.valor,
        ingresos: d.valor * 500 
      })) || [];
    } else if (viewMode === "mes") {
      return [
        { periodo: "Sem 1", pedidos: 45, ingresos: 12500 },
        { periodo: "Sem 2", pedidos: 52, ingresos: 14800 },
        { periodo: "Sem 3", pedidos: 48, ingresos: 13200 },
        { periodo: "Sem 4", pedidos: 60, ingresos: 18500 },
      ];
    } else {
      return [
        { periodo: "Ene", pedidos: 180, ingresos: 48000 },
        { periodo: "Feb", pedidos: 165, ingresos: 44500 },
        { periodo: "Mar", pedidos: 195, ingresos: 52000 },
        { periodo: "Abr", pedidos: 210, ingresos: 58000 },
        { periodo: "May", pedidos: 225, ingresos: 62500 },
        { periodo: "Jun", pedidos: 240, ingresos: 68000 },
        { periodo: "Jul", pedidos: 255, ingresos: 72000 },
        { periodo: "Ago", pedidos: 245, ingresos: 69500 },
        { periodo: "Sep", pedidos: 260, ingresos: 74000 },
        { periodo: "Oct", pedidos: 275, ingresos: 79000 },
        { periodo: "Nov", pedidos: 280, ingresos: 82000 },
        { periodo: "Dic", pedidos: 165, ingresos: 45230 },
      ];
    }
  };

  // Datos por conductor
  const driverStats = drivers.map(driver => {
    const driverOrders = orders.filter(o => o.conductorId === driver.id);
    const completedOrders = driverOrders.filter(o => o.estado === "Completado");
    const totalIngresos = completedOrders.reduce((sum, o) => sum + o.precio, 0);
    
    return {
      nombre: driver.nombre,
      pedidos: driver.viajesCompletados,
      ingresos: totalIngresos,
      calificacion: driver.calificacion,
    };
  }).sort((a, b) => b.pedidos - a.pedidos);

  // Datos para gráfico de pie (estados de pedidos)
  const pieData = [
    { name: "Completados", value: stats?.pedidosPorEstado.completados || 0, color: "#10b981" },
    { name: "En Curso", value: stats?.pedidosPorEstado.enCurso || 0, color: "#3b82f6" },
    { name: "Pendientes", value: stats?.pedidosPorEstado.pendientes || 0, color: "#f59e0b" },
    { name: "Cancelados", value: stats?.pedidosPorEstado.cancelados || 0, color: "#ef4444" },
  ];

  // Generar reportes en diferentes formatos
  const generateReport = (format: 'txt' | 'csv' | 'json') => {
    const reportData = {
      fecha: new Date().toLocaleDateString('es-EC'),
      periodo: viewMode,
      conductor: selectedDriver,
      stats: stats,
      driverStats: driverStats,
      chartData: getChartData(),
    };

    switch (format) {
      case 'txt':
        generateTextReport(reportData);
        break;
      case 'csv':
        generateCSVReport(reportData);
        break;
      case 'json':
        generateJSONReport(reportData);
        break;
    }
  };

  const [showReportMenu, setShowReportMenu] = useState(false);

  const chartData = getChartData();

  return (
    <div className="flex min-h-screen bg-[#0E1B32] text-white">
      <Sidebar />
      <main className="flex-1 ml-64 bg-[#13284D] p-8 border-l border-[#FF6B35]/25 shadow-inner">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <ChartBarIcon className="w-8 h-8 text-[#FF6B35]" />
            Dashboard Analítico
          </h1>
          <div className="flex items-center gap-3">
            {/* Menú de reportes */}
            <div className="relative">
              <button
                onClick={() => setShowReportMenu(!showReportMenu)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                <DocumentArrowDownIcon className="w-5 h-5" />
                Generar Reporte
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showReportMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-[#0A2342] border border-[#1f3b63] rounded-lg shadow-xl z-50">
                  <button
                    onClick={() => { generateReport('txt'); setShowReportMenu(false); }}
                    className="w-full text-left px-4 py-3 hover:bg-[#112a52] transition flex items-center gap-3 text-white"
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-sm">Reporte TXT</p>
                      <p className="text-xs text-gray-400">Formato texto</p>
                    </div>
                  </button>
                  <button
                    onClick={() => { generateReport('csv'); setShowReportMenu(false); }}
                    className="w-full text-left px-4 py-3 hover:bg-[#112a52] transition flex items-center gap-3 text-white border-t border-[#1f3b63]"
                  >
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-sm">Reporte CSV</p>
                      <p className="text-xs text-gray-400">Para Excel</p>
                    </div>
                  </button>
                  <button
                    onClick={() => { generateReport('json'); setShowReportMenu(false); }}
                    className="w-full text-left px-4 py-3 hover:bg-[#112a52] transition flex items-center gap-3 text-white border-t border-[#1f3b63] rounded-b-lg"
                  >
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <div>
                      <p className="font-semibold text-sm">Reporte JSON</p>
                      <p className="text-xs text-gray-400">Formato datos</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={fetchStats}
              className="flex items-center gap-2 bg-[#FF6B35] text-white px-4 py-2 rounded-lg hover:bg-[#ff844e] transition font-semibold"
              disabled={loading}
            >
              <ArrowPathIcon className="w-5 h-5" />
              {loading ? "Actualizando…" : "Actualizar"}
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-[#0A2342] p-4 rounded-xl border border-[#1f3b63] mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FunnelIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-semibold text-gray-300">Filtros:</span>
            </div>
            
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-gray-400" />
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value as any)}
                className="bg-[#112a52] text-white border border-[#1f3b63] px-3 py-1.5 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
              >
                <option value="dia">Por Día</option>
                <option value="semana">Por Semana</option>
                <option value="mes">Por Mes</option>
                <option value="año">Por Año</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <TruckIcon className="w-4 h-4 text-gray-400" />
              <select
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
                className="bg-[#112a52] text-white border border-[#1f3b63] px-3 py-1.5 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
              >
                <option value="todos">Todos los Conductores</option>
                {drivers.map(driver => (
                  <option key={driver.id} value={driver.id}>{driver.nombre}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-gray-400" />
              <input
                type="month"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-[#112a52] text-white border border-[#1f3b63] px-3 py-1.5 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6B35]/50 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="flex items-center gap-4 bg-[#0A2342] p-6 rounded-xl shadow-md border border-[#1f3b63] hover:scale-[1.02] transition-transform">
            <div className="bg-[#FF6B35]/20 p-3 rounded-lg">
              <ClipboardDocumentListIcon className="w-7 h-7 text-[#FF6B35]" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-300">Pedidos activos</h2>
              <p className="text-3xl font-bold text-white">{stats?.pedidosActivos ?? "--"}</p>
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
              <p className="text-3xl font-bold text-white">${stats?.ingresos.toLocaleString('en-US', { minimumFractionDigits: 2 }) ?? "--"}</p>
            </div>
          </div>
        </section>

        {/* Gráficos principales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Gráfico de línea - Tendencia */}
          <div className="lg:col-span-2 bg-[#0A2342] text-white p-6 rounded-xl shadow-md border border-[#1f3b63]">
            <h2 className="text-lg font-bold mb-4 text-[#FF6B35] flex items-center gap-2">
              <ChartBarIcon className="w-5 h-5" />
              Tendencia de Pedidos e Ingresos - {viewMode === "dia" ? "Día" : viewMode === "semana" ? "Semana" : viewMode === "mes" ? "Mes" : "Año"}
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid stroke="#1f3b63" strokeDasharray="3 3" />
                <XAxis dataKey="periodo" stroke="#888" />
                <YAxis yAxisId="left" stroke="#888" />
                <YAxis yAxisId="right" orientation="right" stroke="#888" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A2342', border: '1px solid #1f3b63' }}
                  formatter={(value: any) => typeof value === 'number' ? value.toFixed(0) : value}
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="pedidos" stroke="#FF6B35" strokeWidth={3} name="Pedidos" />
                <Line yAxisId="right" type="monotone" dataKey="ingresos" stroke="#10b981" strokeWidth={3} name="Ingresos ($)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de pie - Estados */}
          <div className="bg-[#0A2342] text-white p-6 rounded-xl shadow-md border border-[#1f3b63]">
            <h2 className="text-lg font-bold mb-4 text-[#FF6B35]">Estados de Pedidos</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabla de conductores */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-[#0A2342] text-white p-6 rounded-xl shadow-md border border-[#1f3b63]">
            <h2 className="text-lg font-bold mb-4 text-[#FF6B35] flex items-center gap-2">
              <TruckIcon className="w-5 h-5" />
              Rendimiento por Conductor
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left bg-[#112a52] border-b border-[#1f3b63]">
                    <th className="py-3 px-4 font-semibold">#</th>
                    <th className="py-3 px-4 font-semibold">Conductor</th>
                    <th className="py-3 px-4 font-semibold text-center">Pedidos</th>
                    <th className="py-3 px-4 font-semibold text-right">Ingresos</th>
                    <th className="py-3 px-4 font-semibold text-center">Calificación</th>
                  </tr>
                </thead>
                <tbody>
                  {driverStats.map((driver, index) => (
                    <tr key={index} className="border-b border-[#1f3b63] hover:bg-[#112a52] transition">
                      <td className="py-3 px-4 text-gray-400">{index + 1}</td>
                      <td className="py-3 px-4 font-medium">{driver.nombre}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold">
                          {driver.pedidos}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-green-400">
                        ${driver.ingresos.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-yellow-400">⭐ {driver.calificacion.toFixed(1)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Gráfico de barras - Top conductores */}
          <div className="bg-[#0A2342] text-white p-6 rounded-xl shadow-md border border-[#1f3b63]">
            <h2 className="text-lg font-bold mb-4 text-[#FF6B35]">Top 5 Conductores</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={driverStats.slice(0, 5)} layout="vertical">
                <CartesianGrid stroke="#1f3b63" strokeDasharray="3 3" />
                <XAxis type="number" stroke="#888" />
                <YAxis dataKey="nombre" type="category" stroke="#888" width={80} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A2342', border: '1px solid #1f3b63' }}
                />
                <Bar dataKey="pedidos" fill="#FF6B35" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resumen de estadísticas adicionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#0A2342] p-6 rounded-xl shadow-md border border-[#1f3b63]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-gray-400 font-semibold">Promedio Diario</h3>
              <ClipboardDocumentListIcon className="w-5 h-5 text-[#FF6B35]" />
            </div>
            <p className="text-2xl font-bold text-white">
              {chartData.length > 0 ? Math.round(chartData.reduce((sum, d) => sum + d.pedidos, 0) / chartData.length) : 0}
            </p>
            <p className="text-xs text-gray-400 mt-1">pedidos por período</p>
          </div>

          <div className="bg-[#0A2342] p-6 rounded-xl shadow-md border border-[#1f3b63]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-gray-400 font-semibold">Ingreso Promedio</h3>
              <CurrencyDollarIcon className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              ${chartData.length > 0 ? (chartData.reduce((sum, d) => sum + d.ingresos, 0) / chartData.length).toFixed(2) : 0}
            </p>
            <p className="text-xs text-gray-400 mt-1">por período</p>
          </div>

          <div className="bg-[#0A2342] p-6 rounded-xl shadow-md border border-[#1f3b63]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-gray-400 font-semibold">Mejor Conductor</h3>
              <TruckIcon className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-xl font-bold text-white">
              {driverStats[0]?.nombre.split(' ')[0] || "N/A"}
            </p>
            <p className="text-xs text-gray-400 mt-1">{driverStats[0]?.pedidos || 0} pedidos</p>
          </div>

          <div className="bg-[#0A2342] p-6 rounded-xl shadow-md border border-[#1f3b63]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-gray-400 font-semibold">Tasa de Completados</h3>
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-white">
              {stats ? Math.round((stats.pedidosPorEstado.completados / (stats.pedidosPorEstado.completados + stats.pedidosPorEstado.cancelados + stats.pedidosPorEstado.enCurso + stats.pedidosPorEstado.pendientes)) * 100) : 0}%
            </p>
            <p className="text-xs text-gray-400 mt-1">del total de pedidos</p>
          </div>
        </div>
      </main>
    </div>
  );
}
