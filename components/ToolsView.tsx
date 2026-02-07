
import React, { useState } from 'react';
import { UserRole, Tool } from '../types';

interface ToolsViewProps {
  role: UserRole;
}

const ToolsView: React.FC<ToolsViewProps> = ({ role }) => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const handleToolClick = (name: string) => {
    setActiveTool(name);
    setTimeout(() => setActiveTool(null), 3000);
  };

  const adminTools: Tool[] = Array.from({ length: 50 }, (_, i) => ({
    id: `admin_tool_${i}`,
    name: [
      "Auditoría SSH", "Control VPS", "Métricas Globales", "Gestión de Usuarios", "API Gateway", 
      "Logs de Sistema", "Backup de DB", "Monitor de Tráfico", "Embudo de Ventas", "ROI Real-time",
      "Control de Pagos", "Asignación de Leads", "Configuración IA", "Gestión de Dominios", "Seguridad SSL",
      "Métricas de Conversión", "Exportar Data Pro", "Webhook Manager", "Email Marketing", "SMS Gateway",
      "Heatmaps de Web", "A/B Testing", "Carga de Inventario", "Tasas de Interés", "Editor de Contratos",
      "Soporte Técnico", "Panel de Facturación", "Cloud Storage", "CDN Config", "Firewall Pro",
      "Analítica de Asesores", "Previsión de Ventas", "Gestión de Comisiones", "Alertas de Fraude", "CRM Settings",
      "Marketplace Sync", "Push Notifications", "Inventory API", "User Session Manager", "Database Migrator",
      "Theme Customizer", "Security Audit", "Lead Scraper", "Auto-responder", "Server Health",
      "Network Monitor", "Cache Manager", "Social Media Connect", "PDF Generator Config", "System Updates"
    ][i % 50] || `Herramienta Admin ${i + 1}`,
    icon: ["🛠️", "🖥️", "📊", "👥", "🔑", "📜", "💾", "📡", "🌪️", "💹"][i % 10],
    category: i < 25 ? "Core Management" : "Advanced Metrics"
  }));

  const agentTools: Tool[] = Array.from({ length: 50 }, (_, i) => ({
    id: `agent_tool_${i}`,
    name: [
      "Agenda Diaria", "Seguimiento Leads", "Plantillas WhatsApp", "Calculadora ROI", "Mapa Yucatán",
      "Checklist Venta", "Recordatorios", "Escáner Documentos", "Mis Comisiones", "Ficha Técnica Gen",
      "Calendario Visitas", "Notas Rápidas", "Shortlist Lotes", "Conversor Divisas", "Traductor Inmobiliario",
      "Guía de Objeciones", "Directorio Notarías", "Estado de Cuenta", "Solicitud Apartado", "Historial Cliente",
      "Recordatorio Llamadas", "Email Templates", "Task Manager", "File Vault", "Meeting Link Gen",
      "Property Share", "Client Feedback", "Leads Pendientes", "Closing Checklist", "Investment Summary",
      "Market News", "Training Portal", "Sales Scripts", "Photo Gallery", "Client Profile Pro",
      "Status Tracker", "Appointment Sync", "Expense Logger", "Time Tracker", "Goal Setter",
      "Contact Manager", "Quick Quote", "Legal Guide", "Promotion Hub", "Internal Messenger",
      "Customer Journey", "Referral Program", "Loyalty Tracker", "Lead Qualifier", "Work Focus"
    ][i % 50] || `Herramienta Asesor ${i + 1}`,
    icon: ["📅", "👤", "💬", "🧮", "📍", "✅", "⏰", "📑", "💰", "📄"][i % 10],
    category: i < 25 ? "Daily Ops" : "Sales Boost"
  }));

  const tools = role === UserRole.ADMIN ? adminTools : agentTools;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Suite de Herramientas Enterprise</h2>
          <p className="text-slate-500">Optimizando procesos para {role === UserRole.ADMIN ? 'Administración Global' : 'Asesor Pro'}.</p>
        </div>
        <div className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase">
          Powered by HacheDevTech
        </div>
      </div>

      {activeTool && (
        <div className="bg-slate-900 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-2xl animate-in zoom-in-95">
          <p>[SYSTEM] Ejecutando: {activeTool}...</p>
          <p>[SYSTEM] Conectando con núcleo Newman...</p>
          <p>[SYSTEM] Acción procesada exitosamente.</p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {tools.map((tool) => (
          <div 
            key={tool.id} 
            onClick={() => handleToolClick(tool.name)}
            className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:scale-105 hover:border-blue-400 transition-all group cursor-pointer"
          >
            <div className="text-4xl mb-3 group-hover:rotate-12 transition-transform">{tool.icon}</div>
            <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{tool.name}</h4>
            <p className="text-[10px] text-slate-400 font-black uppercase mt-1 tracking-widest">{tool.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsView;
