// Utilidad para generar reportes en diferentes formatos

export interface ReportData {
  fecha: string;
  periodo: string;
  conductor: string;
  stats: any;
  driverStats: any[];
  chartData: any[];
}

// Generar reporte en formato TXT
export const generateTextReport = (data: ReportData): void => {
  const reportText = `
╔═══════════════════════════════════════════════════════════════════════╗
║                  REPORTE DE ESTADÍSTICAS - MOVERLY                    ║
╚═══════════════════════════════════════════════════════════════════════╝

📅 Fecha de generación: ${data.fecha}
📊 Período analizado: ${data.periodo.toUpperCase()}
👤 Conductor: ${data.conductor === "todos" ? "TODOS LOS CONDUCTORES" : data.conductor}

═══════════════════════════════════════════════════════════════════════════

📈 RESUMEN GENERAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Pedidos Activos:          ${data.stats?.pedidosActivos || 0}
✓ Total Conductores:         ${data.stats?.conductores || 0}
✓ Total Usuarios:            ${data.stats?.usuarios || 0}
✓ Ingresos Totales:          $${data.stats?.ingresos.toFixed(2) || 0}

═══════════════════════════════════════════════════════════════════════════

📦 PEDIDOS POR ESTADO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Completados:              ${data.stats?.pedidosPorEstado.completados || 0}
🔄 En Curso:                 ${data.stats?.pedidosPorEstado.enCurso || 0}
⏳ Pendientes:               ${data.stats?.pedidosPorEstado.pendientes || 0}
❌ Cancelados:               ${data.stats?.pedidosPorEstado.cancelados || 0}

═══════════════════════════════════════════════════════════════════════════

🏆 TOP 10 CONDUCTORES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${data.driverStats.slice(0, 10).map((d, i) => `
${i + 1}. ${d.nombre}
   ├─ Pedidos Completados:  ${d.pedidos}
   ├─ Ingresos Generados:   $${d.ingresos.toFixed(2)}
   └─ Calificación:         ⭐ ${d.calificacion.toFixed(1)}/5.0
`).join('')}

═══════════════════════════════════════════════════════════════════════════

📊 DATOS DE TENDENCIA (${data.periodo.toUpperCase()})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${data.chartData.map(item => `
${item.periodo.padEnd(10)} │ Pedidos: ${String(item.pedidos).padStart(4)} │ Ingresos: $${item.ingresos.toFixed(2).padStart(10)}
`).join('')}

═══════════════════════════════════════════════════════════════════════════

📌 INDICADORES CLAVE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Promedio de pedidos por período:  ${(data.chartData.reduce((sum, d) => sum + d.pedidos, 0) / data.chartData.length).toFixed(1)}
• Promedio de ingresos por período: $${(data.chartData.reduce((sum, d) => sum + d.ingresos, 0) / data.chartData.length).toFixed(2)}
• Total de pedidos analizados:      ${data.chartData.reduce((sum, d) => sum + d.pedidos, 0)}
• Total de ingresos analizados:     $${data.chartData.reduce((sum, d) => sum + d.ingresos, 0).toFixed(2)}

═══════════════════════════════════════════════════════════════════════════

📝 NOTAS:
Este reporte fue generado automáticamente por el Panel Administrativo de
Moverly. Los datos reflejados corresponden al período seleccionado y están
sujetos a actualizaciones en tiempo real.

═══════════════════════════════════════════════════════════════════════════

Generado por: Panel Administrativo Moverly
Sistema de Gestión de Mudanzas y Transportes
www.moverly.com | soporte@moverly.com
  `;

  const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `reporte-moverly-${data.periodo}-${new Date().getTime()}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Generar reporte en formato CSV
export const generateCSVReport = (data: ReportData): void => {
  // CSV de conductores
  const driverCSV = [
    ['Ranking', 'Conductor', 'Pedidos', 'Ingresos', 'Calificación'],
    ...data.driverStats.map((d, i) => [
      i + 1,
      d.nombre,
      d.pedidos,
      d.ingresos.toFixed(2),
      d.calificacion.toFixed(1)
    ])
  ].map(row => row.join(',')).join('\n');

  // CSV de tendencias
  const trendCSV = [
    ['Período', 'Pedidos', 'Ingresos'],
    ...data.chartData.map(item => [
      item.periodo,
      item.pedidos,
      item.ingresos.toFixed(2)
    ])
  ].map(row => row.join(',')).join('\n');

  const fullCSV = `REPORTE MOVERLY - ${data.fecha}\nPeríodo: ${data.periodo}\n\n` +
    `CONDUCTORES\n${driverCSV}\n\n` +
    `TENDENCIAS\n${trendCSV}`;

  const blob = new Blob([fullCSV], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `reporte-moverly-${data.periodo}-${new Date().getTime()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Generar reporte en formato JSON
export const generateJSONReport = (data: ReportData): void => {
  const jsonReport = {
    metadata: {
      fechaGeneracion: data.fecha,
      periodo: data.periodo,
      conductor: data.conductor,
      sistema: "Moverly - Panel Administrativo"
    },
    resumen: {
      pedidosActivos: data.stats?.pedidosActivos || 0,
      totalConductores: data.stats?.conductores || 0,
      totalUsuarios: data.stats?.usuarios || 0,
      ingresosTotales: data.stats?.ingresos || 0
    },
    pedidosPorEstado: data.stats?.pedidosPorEstado || {},
    conductores: data.driverStats,
    tendencias: data.chartData,
    indicadores: {
      promedioPedidos: data.chartData.reduce((sum, d) => sum + d.pedidos, 0) / data.chartData.length,
      promedioIngresos: data.chartData.reduce((sum, d) => sum + d.ingresos, 0) / data.chartData.length,
      totalPedidos: data.chartData.reduce((sum, d) => sum + d.pedidos, 0),
      totalIngresos: data.chartData.reduce((sum, d) => sum + d.ingresos, 0)
    }
  };

  const blob = new Blob([JSON.stringify(jsonReport, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `reporte-moverly-${data.periodo}-${new Date().getTime()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
