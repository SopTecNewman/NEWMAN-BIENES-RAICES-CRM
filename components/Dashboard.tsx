
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Ene', ventas: 4000, leads: 2400 },
  { name: 'Feb', ventas: 3000, leads: 1398 },
  { name: 'Mar', ventas: 2000, leads: 9800 },
  { name: 'Abr', ventas: 2780, leads: 3908 },
  { name: 'May', ventas: 1890, leads: 4800 },
  { name: 'Jun', ventas: 2390, leads: 3800 },
  { name: 'Jul', ventas: 3490, leads: 4300 },
];

const StatCard = ({ title, value, change, icon, color }: any) => {
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    setIsChanging(true);
    const timer = setTimeout(() => setIsChanging(false), 800);
    return () => clearTimeout(timer);
  }, [value, change]);

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-2xl`}>{icon}</div>
        <span className={`text-xs font-black ${change.startsWith('+') ? 'text-emerald-500 bg-emerald-50' : 'text-rose-500 bg-rose-50'} px-3 py-1 rounded-full transition-all transform duration-700 ${isChanging ? 'scale-110' : 'scale-100'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-slate-500 text-xs font-black uppercase tracking-widest">{title}</h3>
      <p className="text-3xl font-black text-slate-900 mt-1 transition-all">
        {value}
      </p>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Bienvenido, Daniel</h1>
          <p className="text-slate-500 mt-1 font-medium">Control total de Newman Bienes Raíces.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm text-xs font-bold text-slate-400">
          Última Sync: Hoy, 10:42 AM
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Leads Totales" value="1,284" change="+12.5%" icon="👥" color="bg-blue-500" />
        <StatCard title="Ventas del Mes" value="$4.2M" change="+18.2%" icon="💰" color="bg-emerald-500" />
        <StatCard title="Lotes Disponibles" value="342" change="-5%" icon="🏗️" color="bg-amber-500" />
        <StatCard title="ROI Promedio" value="35%" change="+2.1%" icon="📈" color="bg-indigo-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <div className="text-9xl">📊</div>
          </div>
          <h3 className="text-xl font-bold mb-8 flex items-center gap-3 relative z-10">
            <span className="text-blue-600">📈</span> Rendimiento de Leads vs Ventas
          </h3>
          <div className="h-[300px] relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 'bold'}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', fontSize: '12px', fontWeight: 'bold'}} 
                />
                <Area type="monotone" dataKey="ventas" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVentas)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
            <span className="text-orange-500">🔥</span> Hot Leads Recientes
          </h3>
          <div className="space-y-5">
            {[
              { name: 'Sofia Mendez', interest: 'Lotes Hunucmá', status: 'Cerca del cierre', time: 'hace 5 min' },
              { name: 'Ricardo Alarcón', interest: 'Preventa Motul', status: 'Agendó llamada', time: 'hace 12 min' },
              { name: 'Elena García', interest: 'Macro lotes', status: 'Leyó contrato', time: 'hace 45 min' },
              { name: 'Marcos Ruiz', interest: 'Lotes Urbanizados', status: 'Nuevo prospecto', time: 'hace 1 hora' },
            ].map((lead, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 hover:scale-[1.02] transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-black text-lg">
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{lead.name}</p>
                    <p className="text-xs text-slate-500 font-medium">{lead.interest}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-blue-600 uppercase tracking-tighter">{lead.status}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{lead.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
