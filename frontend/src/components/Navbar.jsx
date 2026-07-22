import React from 'react';
import { Scale, ShieldCheck, FileText, Sparkles, RefreshCw, BookOpen } from 'lucide-react';

export default function Navbar({ activeDoc, onSelectSample, onReset, isAnalyzing }) {
  return (
    <header className="sticky top-0 z-50 glass-card border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onReset}>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/25 flex items-center justify-center">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Scale className="h-5 w-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold font-heading bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                LexiCandid
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
                AI Legal Explainer
              </span>
            </div>
            <p className="text-xs text-slate-400">Plain-Language Contract Intelligence & Indian Legal Rights</p>
          </div>
        </div>

        {/* Center Active Doc Status */}
        {activeDoc && activeDoc.filename && (
          <div className="hidden md:flex items-center space-x-3 px-4 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
            <FileText className="h-4 w-4 text-indigo-400" />
            <span className="text-slate-300 font-medium truncate max-w-[200px]">
              {activeDoc.title || activeDoc.filename}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {activeDoc.analysis?.detected_doc_type || 'Parsed'}
            </span>
          </div>
        )}

        {/* Quick Sample Selector & Actions */}
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <button className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-300 transition-all">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Try Sample Doc</span>
            </button>
            
            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-64 rounded-xl glass-card border border-slate-800 shadow-2xl p-2 hidden group-hover:block z-50 animate-fadeIn">
              <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800/80">
                Pre-Loaded Legal Samples
              </div>
              <button 
                onClick={() => onSelectSample('bengaluru_rental')}
                className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-indigo-600/10 hover:text-indigo-300 transition-all flex flex-col space-y-0.5 mt-1"
              >
                <span className="font-semibold text-slate-200">Bengaluru Lease Agreement</span>
                <span className="text-[10px] text-slate-400">10-mo deposit, rent hikes, 24h notice</span>
              </button>
              <button 
                onClick={() => onSelectSample('hdfc_loan')}
                className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-indigo-600/10 hover:text-indigo-300 transition-all flex flex-col space-y-0.5"
              >
                <span className="font-semibold text-slate-200">Personal Loan Contract</span>
                <span className="text-[10px] text-slate-400">36% penal interest, foreclosure fee</span>
              </button>
              <button 
                onClick={() => onSelectSample('saas_tos')}
                className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-indigo-600/10 hover:text-indigo-300 transition-all flex flex-col space-y-0.5"
              >
                <span className="font-semibold text-slate-200">SaaS Terms of Service</span>
                <span className="text-[10px] text-slate-400">Broad IP license, $10 liability cap</span>
              </button>
            </div>
          </div>

          {activeDoc && activeDoc.filename && (
            <button 
              onClick={onReset}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-all"
              title="Upload New Document"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
