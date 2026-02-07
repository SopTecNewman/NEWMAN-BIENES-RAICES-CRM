
import React, { useState } from 'react';
import { User, UserRole, Notification } from '../types';

interface InboxViewProps {
  user: User;
  notifications: Notification[];
  onSendNotification: (to: string, subject: string, message: string) => void;
}

const InboxView: React.FC<InboxViewProps> = ({ user, notifications, onSendNotification }) => {
  const [showCompose, setShowCompose] = useState(false);
  const [formData, setFormData] = useState({ to: 'AGENT', subject: '', message: '' });

  const myMessages = notifications.filter(n => 
    n.to === user.role || n.from === user.name
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendNotification(formData.to, formData.subject, formData.message);
    setShowCompose(false);
    setFormData({ to: 'AGENT', subject: '', message: '' });
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-[calc(100vh-12rem)] flex animate-in fade-in duration-500">
      <div className="w-80 border-r border-slate-100 flex flex-col">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-xl">Buzón Continuo</h2>
          <button 
            onClick={() => setShowCompose(true)}
            className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            ➕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {myMessages.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">No hay mensajes</div>
          ) : (
            myMessages.sort((a,b) => b.timestamp.localeCompare(a.timestamp)).map((msg) => (
              <div key={msg.id} className={`p-4 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors ${!msg.read && msg.to === user.role ? 'bg-blue-50/50' : ''}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-blue-600">{msg.from}</span>
                  <span className="text-[10px] text-slate-400">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-800 truncate">{msg.subject}</h4>
                <p className="text-xs text-slate-500 truncate">{msg.message}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-slate-50">
        {showCompose ? (
          <div className="p-12 max-w-2xl mx-auto w-full bg-white m-8 rounded-3xl shadow-xl border border-slate-100">
            <h3 className="text-2xl font-bold mb-6">Redactar Mensaje</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Destinatario</label>
                <select 
                  value={formData.to} 
                  onChange={e => setFormData({...formData, to: e.target.value})}
                  className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                >
                  <option value="AGENT">Todos los Asesores</option>
                  <option value="ADMIN">Administradores</option>
                  <option value="SUPERVISOR">Supervisores</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Asunto</label>
                <input 
                  type="text" 
                  required
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none" 
                  placeholder="Importante..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Mensaje</label>
                <textarea 
                  required
                  rows={6}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none resize-none" 
                  placeholder="Escribe aquí..."
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20">Enviar Ahora</button>
                <button type="button" onClick={() => setShowCompose(false)} className="px-8 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl">Cancelar</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-300 flex-col gap-4">
            <div className="text-6xl">📨</div>
            <p className="font-medium">Selecciona un mensaje para leerlo</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxView;
