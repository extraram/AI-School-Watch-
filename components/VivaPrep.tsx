
import React from 'react';

export const VivaPrep: React.FC = () => {
  const qna = [
    {
      q: "What is Computer Vision?",
      a: "It is a field of AI that enables computers and systems to derive meaningful information from digital images, videos and other visual inputs — and take actions or make recommendations based on that information."
    },
    {
      q: "How does the AI recognize faces?",
      a: "It converts an image of a face into a numerical representation (vector/embedding). It then compares this vector against a database of known vectors. If they are close enough, it identifies the person."
    },
    {
      q: "Why is Real-Time processing important in surveillance?",
      a: "Because security threats need immediate action. If detection takes 10 minutes, the unauthorized person might have already entered a restricted area."
    },
    {
      q: "What are 'False Positives' and 'False Negatives'?",
      a: "A False Positive is when the system flags an innocent person as a threat. A False Negative is when it misses a real threat. In school security, we aim for low false negatives."
    },
    {
      q: "What role does Ethics play in this project?",
      a: "Ethics ensures that surveillance does not violate basic human rights. We must balance security needs with individual privacy by informing users and securing data."
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <header>
        <h2 className="text-4xl font-brand font-bold text-brand-dark tracking-tight">Viva <span className="text-brand-magenta">Prep</span></h2>
        <p className="text-slate-500 mt-2 font-medium">Master the concepts for your project defense</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {qna.map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 hover:border-brand-blue/30 transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-slate-100 group-hover:bg-brand-blue transition-colors"></div>
            <h4 className="font-bold text-brand-dark text-lg mb-4 flex items-start gap-3">
              <span className="text-brand-blue font-brand font-black opacity-30">Q{i+1}</span> 
              {item.q}
            </h4>
            <div className="text-slate-600 leading-relaxed font-medium">
              {item.a}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-10 brand-gradient rounded-[3rem] text-white shadow-2xl shadow-brand-magenta/30 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]"></div>
        <div className="relative flex-1 text-center md:text-left">
          <h3 className="text-4xl font-brand font-bold mb-4">Class 11-12 <span className="text-brand-yellow">Ready?</span></h3>
          <p className="text-xl opacity-90 font-medium">Remember to explain your tech stack clearly and show the Live Demo confidently. You've built a world-class AI system!</p>
          <div className="flex gap-4 mt-8 justify-center md:justify-start">
             <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-bold border border-white/20">#Python</span>
             <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-bold border border-white/20">#OpenCV</span>
             <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-bold border border-white/20">#Ethics</span>
          </div>
        </div>
        <div className="relative text-8xl animate-bounce drop-shadow-2xl">🎓</div>
      </div>
    </div>
  );
};
