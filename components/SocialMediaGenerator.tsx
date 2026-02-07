
import React, { useState } from 'react';

interface SocialMediaGeneratorProps {
  onPostLogged: (link: string, content: string) => void;
}

const SocialMediaGenerator: React.FC<SocialMediaGeneratorProps> = ({ onPostLogged }) => {
  const [currentPost, setCurrentPost] = useState(0);
  const [link, setLink] = useState('');

  const postTemplates = [
    {
      platform: 'FB',
      content: "🚀 ¡Invierte en el futuro de Yucatán! Lotes en preventa con 35% de plusvalía anual. Cerca de la playa y de los centros logísticos más importantes. 🌴\n\n#InversionYucatan #NewmanBienesRaices #LotesPreventa",
      image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80"
    },
    {
      platform: 'IG',
      content: "Imagina despertar en la paz de Yucatán. 🧘‍♂️ Tu pedacito de tierra te espera en Alba Residencial. Precios de oportunidad solo este mes. DM para cotización inmediata. ✨\n\n#RealEstateMexico #LifestyleYucatan #Investment",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80"
    },
    {
      platform: 'TK',
      content: "POV: Compraste un lote en Yucatán por el precio de un iPhone y ahora vale el doble. 📈🔥 ¡Newman lo hace posible! #InversionInteligente #TrendYucatan #Riqueza",
      image: "https://images.unsplash.com/photo-1621293954908-d81149c0dd07?auto=format&fit=crop&q=80"
    }
  ];

  const nextPost = () => setCurrentPost((prev) => (prev + 1) % postTemplates.length);

  const handleLog = () => {
    if (!link) return alert('Por favor, pega el link de tu publicación activa.');
    onPostLogged(link, postTemplates[currentPost].content);
    setLink('');
    alert('¡Publicación registrada exitosamente! El administrador ya puede ver tu rendimiento.');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(postTemplates[currentPost].content);
    alert('¡Copiado! Ahora pega esto en tu red social.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4">
           <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">Generador Infinito v4.2</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden h-64 border border-slate-100">
               <img src={postTemplates[currentPost].image} className="w-full h-full object-cover" alt="Preview" />
            </div>
            <div className="flex gap-2">
               <button onClick={nextPost} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold hover:bg-slate-200 transition-colors">🔄 Siguiente Idea</button>
               <button onClick={copyToClipboard} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20">📋 Copiar Texto</button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xl">
                 {postTemplates[currentPost].platform === 'FB' ? '🔵' : postTemplates[currentPost].platform === 'IG' ? '📸' : '🎵'}
               </div>
               <h3 className="text-xl font-bold text-slate-900">Sugerencia para {postTemplates[currentPost].platform}</h3>
            </div>
            
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 font-medium text-slate-700 leading-relaxed min-h-[150px]">
              {postTemplates[currentPost].content}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-1">Pega el link de la publicación realizada</label>
              <div className="flex gap-2">
                <input 
                  type="url" 
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://facebook.com/post/123..."
                  className="flex-1 p-4 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button onClick={handleLog} className="px-6 bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20">Registrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-center gap-6">
         <div className="text-4xl">💡</div>
         <div>
            <h4 className="font-bold text-blue-900">¿Sabías que...?</h4>
            <p className="text-blue-700 text-sm">Publicar entre las 6:00 PM y 8:00 PM aumenta el engagement en un 40% para el mercado de inversionistas de Ciudad de México.</p>
         </div>
      </div>
    </div>
  );
};

export default SocialMediaGenerator;
