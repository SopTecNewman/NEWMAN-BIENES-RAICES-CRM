
import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const YuliaChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '¡Hola! Soy Yulia, tu asistente experta en Newman Bienes Raíces. Estoy aquí para ayudarte a cerrar más ventas y asesorarte sobre las mejores inversiones en Yucatán. ¿En qué desarrollo estás trabajando hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const responseText = await getChatResponse([...messages, userMessage]);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: responseText || "Error al procesar" }]);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden animate-in zoom-in-95 duration-500">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl">🤖</div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
          </div>
          <div>
            <h3 className="font-bold">Yulia AI</h3>
            <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">Asistente Experta</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-white/10 rounded-lg">🎤</button>
          <button className="p-2 hover:bg-white/10 rounded-lg">🔄</button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
              ? 'bg-blue-600 text-white rounded-tr-none' 
              : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none flex gap-1">
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-100 bg-white">
        <div className="flex gap-2 p-2 bg-slate-100 rounded-2xl focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          <input 
            type="text" 
            placeholder="Escribe tu consulta sobre inversión..." 
            className="flex-1 bg-transparent px-4 outline-none text-slate-800 font-medium"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform"
          >
            ✈️
          </button>
        </div>
      </div>
    </div>
  );
};

export default YuliaChat;
