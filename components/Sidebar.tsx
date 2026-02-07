
import React from 'react';
import { User, UserRole } from '../types';

interface SidebarProps {
  user: User;
  activeView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
  unreadCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ user, activeView, onViewChange, onLogout, unreadCount }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard Global', icon: '📊', roles: [UserRole.ADMIN, UserRole.SUPERVISOR, UserRole.AGENT] },
    { id: 'inventory', name: 'Inventario Vivo', icon: '🏢', roles: [UserRole.ADMIN, UserRole.SUPERVISOR, UserRole.AGENT] },
    { id: 'social', name: 'Social Media Hub', icon: '📱', roles: [UserRole.AGENT], badge: 'NUEVO' },
    { id: 'tools', name: 'Suite 50 Tools', icon: '🛠️', roles: [UserRole.ADMIN, UserRole.AGENT] },
    { id: 'inbox', name: 'Buzón Newman', icon: '📨', roles: [UserRole.ADMIN, UserRole.AGENT], badge: unreadCount },
    { id: 'quoter', name: 'Cotizador Pro', icon: '🧮', roles: [UserRole.ADMIN, UserRole.SUPERVISOR, UserRole.AGENT] },
    { id: 'yulia', name: 'Chat con Yulia', icon: '🤖', roles: [UserRole.ADMIN, UserRole.SUPERVISOR, UserRole.AGENT], badge: unreadCount > 0 ? unreadCount : undefined },
    { id: 'admin', name: 'Admin Console', icon: '⚙️', roles: [UserRole.ADMIN] },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 text-slate-300 flex flex-col fixed left-0 top-0 shadow-2xl z-20 border-r border-white/5">
      <div className="p-8 border-b border-white/5 flex flex-col items-center gap-2">
        <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center font-black text-white text-3xl shadow-2xl shadow-blue-500/30 mb-2">N</div>
        <span className="font-black text-white tracking-tighter text-2xl">Newman</span>
        <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Bienes Raíces</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-8">
        <nav className="px-4 space-y-2">
          {menuItems.filter(item => item.roles.includes(user.role)).map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                activeView === item.id 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
                : 'hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className="font-bold text-sm">{item.name}</span>
              </div>
              {item.badge && (
                <span className={`${item.badge === 'NUEVO' ? 'bg-emerald-500' : 'bg-rose-500'} text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg animate-pulse`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6 border-t border-white/5 bg-slate-950/50">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center text-sm font-black text-white">
            {user.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-black text-white truncate uppercase tracking-tighter">{user.name}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase">{user.role}</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-slate-400 font-bold text-xs hover:text-rose-400 hover:bg-rose-400/5 transition-all border border-transparent hover:border-rose-400/20"
        >
          🚪 Cerrar Sesión
        </button>
        <div className="mt-6 text-[9px] text-slate-600 font-black text-center uppercase tracking-widest opacity-40">
          Powered by HacheDevTech
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
