
import React, { useState, useEffect } from 'react';
import { UserRole } from '../types';

interface YuliaOverlayProps {
  currentView: string;
  role: UserRole;
}

const YuliaOverlay: React.FC<YuliaOverlayProps> = ({ currentView, role }) => {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const getContextualAdvice = () => {
      switch(currentView) {
        case 'dashboard': return "¡Vaya! Tus métricas de este mes superan el promedio del equipo. ¡Sigue así!";
        case 'inventory': return "El lote Alba-14 es la joya hoy. Tiene 35% de plusvalía asegurada.";
        case 'quoter': return "Trata de proponer el enganche del 30%, eso acelera el cierre con inversionistas.";
        case 'tools': return "He optimizado 50 herramientas para ti. Úsalas para ahorrar 2 horas al día.";
        case 'social': return "Tengo un nuevo copy para TikTok que está siendo tendencia en Yucatán.";
        default: return "¿En qué puedo ayudarte hoy?";
      }
    };

    setSuggestion(null);
    const timer = setTimeout(() => setSuggestion(getContextualAdvice()), 1500);
    return () => clearTimeout(timer);
  }, [currentView]);

  if (!isVisible) return (
    <button 
      onClick={() => setIsVisible(true)}
      className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-2xl shadow-2xl z-50 hover:scale-110 transition-all border-2 border-white/20"
    >
      🤖
    </button>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
      {suggestion && (
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-3xl rounded-br-none shadow-2xl border border-blue-100 max-w-xs animate-in slide-in-from-bottom-4 fade-in duration-500 pointer-events-auto relative group">
          <p className="text-slate-800 text-sm font-medium leading-relaxed italic">
            "{suggestion}"
          </p>
          <div className="absolute -bottom-2 right-0 w-4 h-4 bg-white/90 rotate-45 border-r border-b border-blue-100"></div>
          <button 
            onClick={() => setSuggestion(null)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
        </div>
      )}
      
      <div className="bg-slate-900 p-1 rounded-full shadow-2xl border border-white/10 pointer-events-auto flex items-center gap-3 pr-4 group hover:bg-blue-600 transition-colors cursor-pointer">
        <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-3xl animate-pulse">
          🤖
        </div>
        <div className="text-white">
          <p className="text-[10px] font-black uppercase tracking-tighter opacity-70">Yulia AI Online</p>
          <p className="text-xs font-bold">¿Necesitas ayuda?</p>
        </div>
        <button onClick={() => setIsVisible(false)} className="ml-2 text-white/30 hover:text-white">✕</button>
      </div>
    </div>
  );
};

export default YuliaOverlay;
