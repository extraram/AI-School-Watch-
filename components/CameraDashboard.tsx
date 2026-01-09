
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { analyzeSecurityFrame } from '../services/geminiService';
import { AuthorizedPerson, SurveillanceLog, AnalysisResult } from '../types';

interface CameraDashboardProps {
  authorizedPeople: AuthorizedPerson[];
  onNewLog: (log: SurveillanceLog) => void;
}

export const CameraDashboard: React.FC<CameraDashboardProps> = ({ authorizedPeople, onNewLog }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastResult, setLastResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setError(null);
      }
    } catch (err) {
      setError("Camera access denied. Please enable camera permissions.");
      console.error(err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const captureAndAnalyze = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || isAnalyzing || !isCameraActive) return;

    setIsAnalyzing(true);
    const context = canvasRef.current.getContext('2d');
    if (context) {
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      
      const base64Image = canvasRef.current.toDataURL('image/jpeg', 0.8);
      
      const result = await analyzeSecurityFrame(base64Image, authorizedPeople);
      setLastResult(result);
      
      if (result.detected) {
        onNewLog({
          id: Date.now().toString(),
          timestamp: new Date().toLocaleTimeString(),
          event: `Detection: ${result.name}`,
          status: result.status === 'Authorized' ? 'Authorized' : 'Unauthorized',
          detectedName: result.name
        });
      }
    }
    setIsAnalyzing(false);
  }, [isAnalyzing, isCameraActive, authorizedPeople, onNewLog]);

  useEffect(() => {
    let interval: number;
    if (isCameraActive) {
      interval = window.setInterval(() => {
        captureAndAnalyze();
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [isCameraActive, captureAndAnalyze]);

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-brand font-bold text-brand-dark tracking-tight">Watchman <span className="text-brand-magenta">Dashboard</span></h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow"></span>
            <p className="text-slate-500 font-medium">Empowering schools with "AI for All"</p>
          </div>
        </div>
        <div className="flex gap-3">
          {!isCameraActive ? (
            <button 
              onClick={startCamera}
              className="px-6 py-3 bg-brand-blue text-white rounded-2xl hover:bg-brand-blue/90 transition-all font-bold shadow-xl shadow-brand-blue/20 flex items-center gap-2 group"
            >
              <span className="group-hover:animate-pulse">⏺</span> LIVE SURVEILLANCE
            </button>
          ) : (
            <button 
              onClick={stopCamera}
              className="px-6 py-3 bg-brand-magenta text-white rounded-2xl hover:bg-brand-magenta/90 transition-all font-bold shadow-xl shadow-brand-magenta/20 flex items-center gap-2"
            >
              <span>⏹</span> STOP ENGINE
            </button>
          )}
        </div>
      </header>

      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-brand-magenta text-red-700 rounded-r-xl flex items-center gap-3 animate-bounce">
          <span className="text-xl">⚠️</span> {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-3 space-y-6">
          <div className="relative aspect-video bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-2xl ring-8 ring-white border border-slate-200">
            {!isCameraActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-6">
                <div className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center text-5xl shadow-inner animate-pulse">📹</div>
                <div className="text-center">
                   <p className="font-brand font-bold text-slate-400 text-lg uppercase tracking-wider">Feed Offline</p>
                   <p className="text-sm opacity-60">System Ready for Connection</p>
                </div>
                <button onClick={startCamera} className="px-6 py-2 border-2 border-brand-blue/50 text-brand-blue rounded-full font-bold hover:bg-brand-blue hover:text-white transition-all">Initialize Stream</button>
              </div>
            )}
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className={`w-full h-full object-cover transition-opacity duration-1000 ${isCameraActive ? 'opacity-100' : 'opacity-0'}`}
            />
            <canvas ref={canvasRef} className="hidden" />

            {/* Corner Markers */}
            {isCameraActive && (
              <>
                <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-brand-yellow/60 rounded-tl-lg"></div>
                <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-brand-yellow/60 rounded-tr-lg"></div>
                <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-brand-yellow/60 rounded-bl-lg"></div>
                <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-brand-yellow/60 rounded-br-lg"></div>
              </>
            )}

            {/* Scanning Line Animation */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-blue/10 to-transparent h-20 animate-[scan_2s_ease-in-out_infinite] pointer-events-none"></div>
            )}

            {/* AI HUD Overlay */}
            {isCameraActive && lastResult && (
              <div className="absolute top-6 left-6 right-6 pointer-events-none animate-in fade-in slide-in-from-top-4">
                <div className={`p-6 rounded-3xl border-2 backdrop-blur-xl shadow-2xl transition-all duration-500 ${
                  lastResult.status === 'Authorized' ? 'bg-green-500/10 border-green-400/50 text-green-50' :
                  lastResult.status === 'Unauthorized' ? 'bg-brand-magenta/10 border-brand-magenta/50 text-brand-magenta' :
                  'bg-slate-900/60 border-slate-700/50 text-slate-100'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-2 h-2 rounded-full ${lastResult.status === 'Authorized' ? 'bg-green-400' : 'bg-brand-magenta'} animate-ping`}></div>
                        <h4 className="text-[10px] font-brand font-bold uppercase tracking-[0.2em] opacity-80">AI Core Inference</h4>
                      </div>
                      <p className="text-3xl font-brand font-bold flex items-center gap-3">
                        {lastResult.status === 'Authorized' ? '👤' : lastResult.status === 'Unauthorized' ? '🚨' : '🔍'}
                        {lastResult.detected ? lastResult.name : 'Monitoring...'}
                      </p>
                      <p className="text-sm mt-2 opacity-90 font-medium max-w-md">{lastResult.reason}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-[10px] font-mono bg-black/40 px-3 py-1.5 rounded-full border border-white/10 uppercase tracking-widest font-bold">
                        CONF: {(Math.random() * 5 + 92).toFixed(2)}%
                      </span>
                      <span className="text-[10px] font-mono bg-white/10 px-3 py-1.5 rounded-full border border-white/10 uppercase font-bold text-brand-yellow">
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isAnalyzing && (
              <div className="absolute bottom-8 right-8 flex items-center gap-3 bg-brand-blue text-white px-5 py-2 rounded-2xl text-xs font-brand font-bold shadow-2xl shadow-brand-blue/40 border border-white/20">
                <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></div>
                NEURAL ANALYSIS...
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button 
              disabled={!isCameraActive || isAnalyzing}
              onClick={captureAndAnalyze}
              className="flex-1 py-5 bg-white border border-slate-200 rounded-[2rem] hover:bg-slate-50 hover:border-brand-blue/30 disabled:opacity-50 transition-all font-bold text-brand-dark flex items-center justify-center gap-3 shadow-xl shadow-slate-200/50 group"
            >
              <span className="text-2xl group-hover:rotate-12 transition-transform">📸</span> 
              MANUAL SNAPSHOT SCAN
            </button>
          </div>
        </div>

        {/* Status Panel */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-yellow/5 rounded-full -mr-12 -mt-12"></div>
            <h3 className="font-brand font-bold text-slate-800 mb-6 flex items-center gap-3">
              <span className="p-2 bg-brand-blue/10 rounded-xl text-brand-blue">📊</span> METRICS
            </h3>
            <div className="space-y-6">
              <div className="group">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Safe Entries</span>
                  <span className="text-2xl font-brand font-bold text-brand-dark">142</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-blue w-4/5"></div>
                </div>
              </div>
              <div className="group">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Alerts Issued</span>
                  <span className="text-2xl font-brand font-bold text-brand-magenta">03</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-magenta w-1/4"></div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Latency</p>
                    <p className="text-lg font-brand font-bold text-brand-blue">24ms</p>
                  </div>
                  <div className="w-px h-8 bg-slate-200"></div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Uptime</p>
                    <p className="text-lg font-brand font-bold text-brand-yellow">99.9%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-indigo p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl group-hover:rotate-12 transition-transform">🛡️</div>
            <h3 className="font-brand font-bold mb-6 flex items-center gap-3">
              <span className="text-brand-magenta text-xl animate-pulse">🚨</span> CRITICAL LOG
            </h3>
            {lastResult && lastResult.status === 'Unauthorized' ? (
              <div className="p-5 bg-white/5 border border-brand-magenta/30 rounded-3xl animate-in zoom-in">
                <p className="font-bold text-brand-magenta text-lg mb-1">UNAUTHORIZED!</p>
                <p className="text-sm opacity-80 mb-3">Unknown subject in Perimeter A</p>
                <div className="text-[10px] font-mono flex items-center gap-2 opacity-60">
                  <span className="px-2 py-1 bg-black/40 rounded">SEC_01</span>
                  <span>{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center py-4 opacity-40 italic text-center">
                <span className="text-4xl mb-3">🛡️</span>
                <p className="text-xs">Sector status currently normal</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(500%); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
