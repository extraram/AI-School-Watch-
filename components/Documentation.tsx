
import React from 'react';

export const Documentation: React.FC = () => {
  return (
    <div className="prose prose-slate max-w-none">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Project Documentation</h1>
        <p className="text-lg text-slate-600 mb-8">Comprehensive guide to the AI-Based School Surveillance System.</p>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4">1. Introduction</h2>
          <p className="text-slate-700 leading-relaxed">
            The SchoolGuard AI system is a high-level surveillance solution designed for modern educational environments. 
            Traditional CCTV cameras require manual monitoring, which is prone to human error. This system uses 
            <strong> Computer Vision</strong> and <strong>Gemini AI</strong> to automate the process of detecting humans 
            and recognizing authorized personnel.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4">2. System Architecture</h2>
          <div className="bg-slate-50 p-6 rounded-xl font-mono text-sm border border-slate-200 my-4 overflow-x-auto whitespace-pre">
{`[ Camera Hardware ] 
      │
      ▼
[ Frame Capture ] ------> [ Image Pre-processing (Scaling/Grayscale) ]
      │                            │
      │                            ▼
      │              [ Human Detection (AI Analysis) ]
      │                            │
      ▼                            ▼
[ Result Processing ] <--- [ Face Recognition (Database Comparison) ]
      │
      ▼
[ Alert Generation ] ------> [ Log Storage (CSV/Database) ]`}
          </div>
          <p className="mt-4 text-slate-700">
            The data flows from a video source into a processing pipeline. In this demo, <strong>Gemini 3 Flash</strong> 
            acts as the intelligent core, performing both object detection and classification in one pass.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4">3. Ethics & Privacy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
              <h4 className="font-bold text-green-800 mb-2">✅ Best Practices</h4>
              <ul className="text-sm text-green-700 list-disc list-inside space-y-1">
                <li>Cameras in public corridors only.</li>
                <li>Clear signage indicating surveillance.</li>
                <li>Encrypted storage of data logs.</li>
                <li>Regular data purging policies.</li>
              </ul>
            </div>
            <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
              <h4 className="font-bold text-red-800 mb-2">❌ Ethical Violations</h4>
              <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
                <li>Cameras in private spaces (washrooms).</li>
                <li>Secret/Hidden recording.</li>
                <li>Using AI for student profiling/bias.</li>
                <li>Unauthorized data sharing.</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4">4. Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {['React 18', 'TypeScript', 'Tailwind CSS', 'Gemini API', 'Canvas API', 'WebRTC'].map(tech => (
              <span key={tech} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full uppercase">
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
