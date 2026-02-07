
import React, { useState } from 'react';
import { Property } from '../types';

const MOCK_PROPERTIES: Property[] = [
  { id: '1', name: 'Alba Residencial', location: 'Hunucmá, Yucatán', pricePerM2: 850, totalArea: 300, status: 'AVAILABLE', growthRate: 0.35, imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80' },
  { id: '2', name: 'Natura Park', location: 'Conkal, Yucatán', pricePerM2: 1200, totalArea: 250, status: 'RESERVED', growthRate: 0.28, imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80' },
  { id: '3', name: 'Costa Esmeralda', location: 'Telchac Puerto', pricePerM2: 2500, totalArea: 180, status: 'AVAILABLE', growthRate: 0.32, imageUrl: 'https://images.unsplash.com/photo-1621293954908-d81149c0dd07?auto=format&fit=crop&q=80' },
  { id: '4', name: 'Industrial Hub', location: 'Uman, Yucatán', pricePerM2: 600, totalArea: 1000, status: 'SOLD', growthRate: 0.22, imageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80' },
  { id: '5', name: 'Terranova I', location: 'Motul, Yucatán', pricePerM2: 450, totalArea: 400, status: 'AVAILABLE', growthRate: 0.35, imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80' },
  { id: '6', name: 'Terranova II', location: 'Motul, Yucatán', pricePerM2: 480, totalArea: 400, status: 'AVAILABLE', growthRate: 0.35, imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80' },
];

const Inventory: React.FC = () => {
  const [filter, setFilter] = useState('ALL');
  const [selectedProp, setSelectedProp] = useState<Property | null>(null);

  const filtered = filter === 'ALL' ? MOCK_PROPERTIES : MOCK_PROPERTIES.filter(p => p.status === filter);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Inventario en Tiempo Real</h2>
          <p className="text-slate-500">Disponibilidad actualizada al momento.</p>
        </div>
        <div className="flex gap-2 p-1 bg-slate-200 rounded-xl">
          {['ALL', 'AVAILABLE', 'RESERVED', 'SOLD'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === s ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {s === 'ALL' ? 'Todos' : s === 'AVAILABLE' ? 'Disponibles' : s === 'RESERVED' ? 'Apartados' : 'Vendidos'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((prop) => (
          <div key={prop.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={prop.imageUrl} 
                alt={prop.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg ${
                  prop.status === 'AVAILABLE' ? 'bg-emerald-500 text-white' : 
                  prop.status === 'RESERVED' ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'
                }`}>
                  {prop.status === 'AVAILABLE' ? 'Disponible' : prop.status === 'RESERVED' ? 'Apartado' : 'Vendido'}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-2 py-1 rounded font-bold text-xs">
                +{prop.growthRate * 100}% ROI anual
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-slate-900">{prop.name}</h3>
              <p className="text-slate-500 text-sm flex items-center gap-1 mt-1">
                📍 {prop.location}
              </p>
              
              <div className="mt-4 grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Precio m2</p>
                  <p className="font-bold text-slate-900">${prop.pricePerM2} MXN</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Superficie</p>
                  <p className="font-bold text-slate-900">{prop.totalArea} m²</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Desde</p>
                  <p className="text-xl font-black text-blue-600">${(prop.pricePerM2 * prop.totalArea).toLocaleString()} MXN</p>
                </div>
                <button 
                  onClick={() => setSelectedProp(prop)}
                  className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors"
                >
                  Ver Lotes
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedProp(null)}></div>
          <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in slide-in-from-bottom-8">
            <div className="md:w-1/2 h-64 md:h-auto relative">
              <img src={selectedProp.imageUrl} className="w-full h-full object-cover" alt="Property Detail" />
              <button 
                onClick={() => setSelectedProp(null)}
                className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/40"
              >✕</button>
            </div>
            <div className="md:w-1/2 p-10 space-y-6 overflow-y-auto max-h-[80vh]">
              <div>
                <h2 className="text-3xl font-black text-slate-900">{selectedProp.name}</h2>
                <p className="text-blue-600 font-bold tracking-widest uppercase text-xs mt-1">{selectedProp.location}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">ROI Proyectado</p>
                    <p className="text-xl font-black text-emerald-600">+{selectedProp.growthRate * 100}% Anual</p>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Plusvalía Acum.</p>
                    <p className="text-xl font-black text-blue-600">142% Total</p>
                 </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-900">Historial de Precio</h4>
                <div className="space-y-2">
                  {[
                    { date: 'Dic 2023', price: selectedProp.pricePerM2 * 0.8 },
                    { date: 'Jun 2024', price: selectedProp.pricePerM2 * 0.9 },
                    { date: 'Hoy', price: selectedProp.pricePerM2 },
                  ].map((h, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                      <span className="text-sm font-medium text-slate-500">{h.date}</span>
                      <span className="font-bold text-slate-800">${Math.round(h.price)}/m²</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-transform">
                  Apartar Lote Ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
