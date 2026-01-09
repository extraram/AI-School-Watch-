
import React from 'react';
import { AppTab } from '../types';

interface LayoutProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ activeTab, setActiveTab, children }) => {
  const navItems = [
    { id: AppTab.DASHBOARD, label: 'Live CCTV', icon: '📹' },
    { id: AppTab.LOGS, label: 'Access Logs', icon: '📝' },
    { id: AppTab.DATABASE, label: 'Authorized DB', icon: '👥' },
    { id: AppTab.DOCS, label: 'Project Docs', icon: '📄' },
    { id: AppTab.VIVA, label: 'Viva Prep', icon: '🎓' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8FAFC]">
      {/* Sidebar */}
      <nav className="w-full md:w-72 bg-brand-indigo text-white flex flex-col shadow-2xl z-20 overflow-hidden relative">
        {/* Subtle Brand Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-magenta/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-blue/10 blur-3xl rounded-full -ml-16 -mb-16"></div>

        <div className="p-8 relative">
          <div className="flex flex-col items-center mb-2">
            <div className="w-12 h-12 mb-3 relative">
               {/* CSS Logo Representation */}
               <div className="absolute inset-0 flex flex-col gap-0.5 opacity-90">
                 <div className="h-1/5 bg-brand-dark rounded-t"></div>
                 <div className="h-1/5 bg-brand-yellow"></div>
                 <div className="h-1/5 bg-brand-magenta"></div>
                 <div className="h-1/5 bg-brand-blue"></div>
                 <div className="h-1/5 bg-brand-dark rounded-b"></div>
               </div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-white font-brand font-bold text-xs">AIP</span>
               </div>
            </div>
            <h1 className="text-2xl font-brand font-bold tracking-tighter text-white">
              SUPER <span className="text-brand-magenta">AIP</span>
            </h1>
            <div className="flex items-center gap-1 mt-1">
               <div className="h-[2px] w-4 bg-brand-magenta"></div>
               <p className="text-[10px] text-brand-yellow uppercase tracking-[0.2em] font-bold">AI for All</p>
               <div className="h-[2px] w-4 bg-brand-blue"></div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col gap-1.5 px-6 py-4 relative">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group flex items-center gap-4 px-5 py-4 rounded-xl transition-all text-sm font-semibold relative overflow-hidden ${
                  isActive 
                    ? 'text-white shadow-lg' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 brand-gradient opacity-90 -z-10"></div>
                )}
                <span className={`text-xl transition-transform group-hover:scale-110 ${isActive ? 'drop-shadow-sm' : 'grayscale opacity-60'}`}>
                  {item.icon}
                </span>
                {item.label}
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-white shadow-sm animate-pulse"></div>}
              </button>
            );
          })}
        </div>

        <div className="p-6 relative">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-400 uppercase font-bold mb-2 tracking-widest">System Engine</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-blue animate-pulse shadow-[0_0_8px_#00AEEF]"></div>
                <span className="text-xs text-brand-blue font-bold">GEMINI 3 PRO</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">v2.5.4</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Subtle Decorative Header for Mobile/Desktop */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-right brand-gradient"></div>
        <div className="max-w-7xl mx-auto p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
};
