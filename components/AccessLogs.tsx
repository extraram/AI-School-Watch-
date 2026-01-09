
import React from 'react';
import { SurveillanceLog } from '../types';

interface AccessLogsProps {
  logs: SurveillanceLog[];
  onClear: () => void;
}

export const AccessLogs: React.FC<AccessLogsProps> = ({ logs, onClear }) => {
  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-brand font-bold text-brand-dark tracking-tight">Access <span className="text-brand-magenta">Intelligence</span></h2>
          <p className="text-slate-500 mt-2 font-medium">Archived chronological security telemetry</p>
        </div>
        <button 
          onClick={onClear}
          className="px-6 py-2 text-slate-400 hover:text-brand-magenta font-bold text-sm flex items-center gap-2 transition-all hover:bg-brand-magenta/5 rounded-xl"
        >
          🗑️ WIPE RECORDS
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead className="bg-slate-50/80 backdrop-blur-md sticky top-0 border-b border-slate-100 z-10">
              <tr>
                <th className="px-8 py-5 text-[10px] font-brand font-bold text-slate-400 uppercase tracking-widest">Temporal Stamp</th>
                <th className="px-8 py-5 text-[10px] font-brand font-bold text-slate-400 uppercase tracking-widest">Event Identification</th>
                <th className="px-8 py-5 text-[10px] font-brand font-bold text-slate-400 uppercase tracking-widest">Security Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-8 py-6 text-sm font-mono font-bold text-brand-blue">{log.timestamp}</td>
                  <td className="px-8 py-6">
                    <div className="font-bold text-brand-dark text-lg group-hover:text-brand-blue transition-colors">{log.event}</div>
                    <div className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-wider">Subject ID: {log.detectedName}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border ${
                      log.status === 'Authorized' 
                        ? 'bg-green-50 text-green-600 border-green-100' 
                        : 'bg-brand-magenta/5 text-brand-magenta border-brand-magenta/10'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        log.status === 'Authorized' ? 'bg-green-500' : 'bg-brand-magenta'
                      } ${log.status !== 'Authorized' ? 'animate-pulse' : ''}`}></span>
                      {log.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-8 py-24 text-center">
                    <div className="text-6xl mb-6 opacity-20 filter grayscale">📂</div>
                    <p className="text-slate-400 font-brand font-bold text-lg uppercase tracking-widest">No Logs Detected</p>
                    <p className="text-slate-300 text-sm mt-1 font-medium">Standing by for initial detection...</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
      `}</style>
    </div>
  );
};
