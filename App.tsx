
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Quoter from './components/Quoter';
import YuliaChat from './components/YuliaChat';
import ToolsView from './components/ToolsView';
import InboxView from './components/InboxView';
import YuliaOverlay from './components/YuliaOverlay';
import SocialMediaGenerator from './components/SocialMediaGenerator';
import { User, UserRole, Notification, SocialPost } from './types';

// AUTHORITY HASH: 971205180724F1953D4321A1B2C3D4E5F6G7H8 
// Licensed by HacheDevTech

const ADMIN_USER: User = {
  id: 'adm_1',
  name: 'Admin Principal',
  username: '100110011',
  role: UserRole.ADMIN,
  email: 'admin@newman.com'
};

const AGENT_USER: User = {
  id: 'agt_1',
  name: 'Asesor Pro',
  username: '01001101',
  role: UserRole.AGENT,
  email: 'asesor@newman.com'
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState('dashboard');
  const [authData, setAuthData] = useState({ user: '', pass: '' });
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      from: 'Sistema Newman',
      to: 'AGENT',
      subject: '¡Nueva Herramienta de Redes!',
      message: 'Usa el generador infinito para aumentar tus ventas hoy mismo.',
      timestamp: new Date().toISOString(),
      read: false
    }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const { user, pass } = authData;

    if (user === '100110011' && pass === 'admiñ123') {
      setCurrentUser(ADMIN_USER);
    } else if (user === '01001101' && pass === 'userñ123') {
      setCurrentUser(AGENT_USER);
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const handlePostLogged = (link: string, content: string) => {
    if (!currentUser) return;
    const newPost: SocialPost = {
      id: Date.now().toString(),
      agentId: currentUser.id,
      agentName: currentUser.name,
      content,
      platform: 'FB',
      link,
      timestamp: new Date().toISOString()
    };
    setSocialPosts([newPost, ...socialPosts]);
  };

  const sendNotification = (to: string, subject: string, message: string) => {
    const newNotif: Notification = {
      id: Date.now().toString(),
      from: currentUser?.name || 'Admin',
      to,
      subject,
      message,
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications([newNotif, ...notifications]);
  };

  const unreadCount = notifications.filter(n => !n.read && (n.to === currentUser?.role || n.to === 'ALL')).length;

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md"></div>
        <div className="relative w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-2xl space-y-8 border border-white/20">
            <div className="text-center space-y-2">
              <div className="inline-flex w-20 h-20 bg-blue-600 rounded-[2rem] items-center justify-center text-white text-4xl font-black mb-4 shadow-2xl shadow-blue-500/40 animate-bounce">N</div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Newman</h1>
              <p className="text-slate-500 font-semibold uppercase text-xs tracking-[0.2em]">Inversión Digital Inmobiliaria</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">ID Acceso Newman</label>
                  <input 
                    type="text" 
                    required
                    value={authData.user}
                    onChange={(e) => setAuthData({...authData, user: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all font-mono font-bold text-slate-900 text-lg"
                    placeholder="00000000"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password Encriptado</label>
                  <input 
                    type="password" 
                    required
                    value={authData.pass}
                    onChange={(e) => setAuthData({...authData, pass: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all text-lg"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="group relative w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-2xl active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">INGRESAR AL ECOSISTEMA</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </form>

            <div className="text-center pt-4 border-t border-slate-100">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Tecnología de Grado Militar por HacheDevTech</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar 
        user={currentUser} 
        activeView={activeView} 
        onViewChange={setActiveView} 
        onLogout={() => setCurrentUser(null)}
        unreadCount={unreadCount}
      />
      
      <main className="flex-1 ml-64 p-8 overflow-y-auto relative">
        <div className="max-w-7xl mx-auto pb-32">
          {activeView === 'dashboard' && <Dashboard />}
          {activeView === 'inventory' && <Inventory />}
          {activeView === 'tools' && <ToolsView role={currentUser.role} />}
          {activeView === 'inbox' && <InboxView user={currentUser} notifications={notifications} onSendNotification={sendNotification} />}
          {activeView === 'quoter' && <Quoter />}
          {activeView === 'yulia' && <YuliaChat />}
          {activeView === 'social' && <SocialMediaGenerator onPostLogged={handlePostLogged} />}
          
          {activeView === 'crm' && (
             <div className="bg-white p-16 rounded-[3rem] text-center space-y-4 border border-slate-100 shadow-xl">
                <div className="text-8xl">📊</div>
                <h2 className="text-3xl font-black text-slate-900">Módulo de Leads Inteligentes</h2>
                <p className="text-slate-500 max-w-md mx-auto">Conectando APIs de Facebook Ads y Google Search en tiempo real para traerte inversionistas calificados.</p>
             </div>
          )}

          {activeView === 'admin' && (
             <div className="space-y-8 animate-in fade-in duration-500">
               <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl border border-white/5 flex justify-between items-center overflow-hidden relative">
                  <div className="relative z-10">
                    <h2 className="text-3xl font-black tracking-tighter">Global Control Center Newman</h2>
                    <p className="text-blue-400 font-bold uppercase text-xs tracking-widest mt-2">HacheDevTech Enterprise Layer v4.0</p>
                  </div>
                  <div className="flex gap-4 relative z-10">
                    <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-2xl font-bold hover:bg-white/20 transition-all">Reporte Global</button>
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-xl shadow-blue-500/40 hover:scale-105 transition-transform">Consola Root</button>
                  </div>
                  <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
               </div>
               
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl col-span-2">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                       <span className="text-blue-600">📌</span> Últimas Publicaciones de Asesores
                    </h3>
                    <div className="space-y-4">
                       {socialPosts.length === 0 ? (
                         <div className="text-center py-12 text-slate-400 italic">No hay registros hoy. Los asesores deben usar el Social Hub.</div>
                       ) : (
                         socialPosts.map(post => (
                           <div key={post.id} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white transition-all group">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-black">{post.agentName.charAt(0)}</div>
                                 <div>
                                    <p className="font-bold text-slate-800">{post.agentName}</p>
                                    <p className="text-xs text-slate-500">{new Date(post.timestamp).toLocaleString()}</p>
                                 </div>
                              </div>
                              <a href={post.link} target="_blank" rel="noreferrer" className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-600 transition-colors">Ver Publicación ↗</a>
                           </div>
                         ))
                       )}
                    </div>
                 </div>

                 <div className="bg-slate-900 rounded-[2.5rem] p-8 text-emerald-400 font-mono text-[10px] shadow-2xl border border-white/10 relative group">
                    <div className="absolute top-4 right-6 text-emerald-500/30 font-black">ROOT ACCESS</div>
                    <div className="space-y-2">
                       <p className="text-white font-bold text-sm mb-4">Newman OS v4.2.1</p>
                       <p>> status --all</p>
                       <p>[OK] Gemini 3 Flash Service: ACTIVE</p>
                       <p>[OK] Social Media Sync: POLLING</p>
                       <p>[OK] Database MongoDB: HEALTHY</p>
                       <p>[OK] HacheDevTech Firewall: SHIELD ON</p>
                       <p className="text-blue-400 mt-4 font-bold">SHA256: 971205180724F1953D4321A1B2C3D4E5F6G7H8</p>
                       <div className="pt-4 mt-4 border-t border-white/10 text-white/40">
                          <p>Asesores Activos: 12</p>
                          <p>Consultas Yulia hoy: 482</p>
                          <p>Ventas Proyectadas: $14.2M MXN</p>
                       </div>
                    </div>
                 </div>
               </div>
             </div>
          )}
        </div>
      </main>

      <YuliaOverlay currentView={activeView} role={currentUser.role} />
      
      {/* Social Media Link in Sidebar or dedicated Floating Button */}
      {currentUser.role === UserRole.AGENT && (
        <button 
          onClick={() => setActiveView('social')}
          className="fixed bottom-24 right-8 w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center text-3xl shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-transform z-30"
          title="Generador de Redes"
        >
          📱
        </button>
      )}
    </div>
  );
};

export default App;
