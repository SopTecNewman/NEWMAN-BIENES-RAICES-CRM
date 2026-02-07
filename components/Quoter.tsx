
import React, { useState } from 'react';

const Quoter: React.FC = () => {
  const [area, setArea] = useState(300);
  const [priceM2, setPriceM2] = useState(850);
  const [months, setMonths] = useState(36);
  const [downPaymentPct, setDownPaymentPct] = useState(10);
  const [yearlyGrowth, setYearlyGrowth] = useState(35);

  // Clamped calculations
  const safeArea = Math.max(150, Math.min(2000, area));
  const safePrice = Math.max(1, priceM2);
  const safeMonths = Math.max(1, months);
  const safeDownPayment = Math.max(1, downPaymentPct);

  const totalPrice = safeArea * safePrice;
  const downPayment = totalPrice * (safeDownPayment / 100);
  const balance = totalPrice - downPayment;
  const monthlyPayment = balance / safeMonths;

  // Projection
  const futureValue = totalPrice * Math.pow(1 + (yearlyGrowth / 100), 5); // 5 years projection

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Cotizador Pro v2.5</h2>
            <p className="text-slate-500">Simula la inversión ideal para tu cliente en segundos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700">Área del Lote (m²)</label>
              <input 
                type="range" min="150" max="2000" step="10" 
                value={area} onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-2xl font-black text-slate-900">{safeArea}</span>
                <span className="text-slate-400 font-bold">m²</span>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700">Precio por m² (MXN)</label>
              <input 
                type="number" 
                min="1"
                value={priceM2} onChange={(e) => setPriceM2(Number(e.target.value))}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 text-2xl font-black text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {priceM2 < 1 && <p className="text-[10px] text-rose-500 font-bold">El precio debe ser positivo.</p>}
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700">Plazo de Financiamiento</label>
              <div className="grid grid-cols-3 gap-2">
                {[12, 24, 36, 48, 60].map(m => (
                  <button
                    key={m}
                    onClick={() => setMonths(m)}
                    className={`py-3 rounded-xl font-bold border transition-all ${months === m ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20 scale-105' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-500'}`}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700">Enganche (%)</label>
              <select 
                value={downPaymentPct} onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 text-lg font-bold text-slate-900 outline-none"
              >
                <option value={10}>10%</option>
                <option value={15}>15%</option>
                <option value={20}>20%</option>
                <option value={30}>30% (Preferente)</option>
                <option value={50}>50% (Socio)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <div className="text-8xl">📊</div>
          </div>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="text-blue-400">📈</span> Proyección Newman 35%
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <p className="text-slate-400 text-sm font-medium">Inversión Hoy (Total)</p>
                <p className="text-3xl font-black text-white">${totalPrice.toLocaleString()} MXN</p>
              </div>
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl animate-in zoom-in-95">
                <p className="text-blue-400 text-sm font-medium">Valor Proyectado a 5 años</p>
                <p className="text-4xl font-black text-white">${Math.round(futureValue).toLocaleString()} MXN</p>
                <p className="text-emerald-400 text-xs mt-2 font-bold">▲ Ganancia neta: ${(Math.round(futureValue) - totalPrice).toLocaleString()} MXN</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-xs text-slate-400 uppercase font-bold mb-1">Enganche Inicial</p>
                <p className="text-xl font-bold">${downPayment.toLocaleString()} MXN</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-xs text-slate-400 uppercase font-bold mb-1">Mensualidades</p>
                <p className="text-xl font-bold text-emerald-400">${Math.round(monthlyPayment).toLocaleString()} MXN</p>
                <p className="text-[10px] text-slate-500 mt-1">Sin intereses directos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4">Resumen de Cotización</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Desarrollo:</span>
              <span className="font-bold text-slate-900">Alba Residencial</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Lote:</span>
              <span className="font-bold text-slate-900">A-142</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Superficie:</span>
              <span className="font-bold text-slate-900">{safeArea} m²</span>
            </div>
            <hr className="border-slate-50" />
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Total:</span>
              <span className="font-bold text-slate-900">${totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Enganche:</span>
              <span className="font-bold text-slate-900">${downPayment.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="mt-8 space-y-3">
            <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-transform">
              Enviar por WhatsApp
            </button>
            <button className="w-full bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-colors">
              Descargar PDF
            </button>
          </div>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-3xl">
          <p className="text-emerald-700 text-xs font-bold uppercase mb-2">Tip de Yulia</p>
          <p className="text-emerald-900 text-sm leading-relaxed italic">
            "Menciona al cliente que el precio por m² en esta zona ha subido un 12% en los últimos 6 meses. ¡Es el momento perfecto para entrar!"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quoter;
