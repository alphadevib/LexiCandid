import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, AlertTriangle, ShieldCheck, ArrowRight, Sparkles, Scale, FileCheck, CheckCircle2 } from 'lucide-react';

export default function FileUpload({ onFileUpload, onSelectSample, isLoading }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
          <ShieldCheck className="h-4 w-4" />
          <span>Indian Legal Framework & AI Clause Verification</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold font-heading tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
          Know what you sign. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Demystify legal fine print in seconds.
          </span>
        </h1>
        <p className="text-slate-400 text-base leading-relaxed max-w-2xl mx-auto">
          Upload any rental lease, loan contract, or terms of service. LexiCandid flags unfair clauses under Indian laws, translates jargon into plain English, and writes fair counter-clauses for your negotiation.
        </p>
      </div>

      {/* Upload Zone */}
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative overflow-hidden cursor-pointer rounded-2xl glass-card border-2 border-dashed p-10 text-center transition-all duration-300 ${
          isDragging 
            ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]' 
            : 'border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/60'
        }`}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.docx,.doc,.txt"
          className="hidden"
        />

        <div className="flex flex-col items-center space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-xl shadow-indigo-500/10">
            <UploadCloud className="h-8 w-8 animate-bounce-subtle" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-slate-100 font-heading">
              Drop your contract here, or <span className="text-indigo-400 underline underline-offset-4">browse files</span>
            </h3>
            <p className="text-xs text-slate-400">
              Supports PDF, DOCX, or TXT documents (Max 25MB)
            </p>
          </div>

          <div className="flex items-center space-x-6 text-xs text-slate-400 pt-2">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Instant Risk Breakdown</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Indian Tenancy & Loan Acts</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>LexiBot RAG Chat</span>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 z-20">
            <div className="h-10 w-10 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-indigo-300">Parsing contract & calculating risk levels...</p>
          </div>
        )}
      </div>

      {/* Sample Templates Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Try with a Sample Agreement
            </h2>
          </div>
          <span className="text-xs text-slate-400">One-click instant analysis</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1 */}
          <div 
            onClick={() => onSelectSample('bengaluru_rental')}
            className="group glass-card glass-card-hover p-5 rounded-xl border border-slate-800 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  Rental Lease
                </span>
                <span className="text-[10px] text-slate-400">Bengaluru, KA</span>
              </div>
              <h3 className="font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">
                Bengaluru Residential Rental Agreement
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Contains 10-month security deposit, mandatory non-refundable painting deduction, 20% verbal rent hike, and 24h landlord entry.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs text-indigo-400 font-medium border-t border-slate-800/80 mt-3">
              <span>Test Clause Extraction</span>
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => onSelectSample('hdfc_loan')}
            className="group glass-card glass-card-hover p-5 rounded-xl border border-slate-800 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Banking & Loan
                </span>
                <span className="text-[10px] text-slate-400">RBI Guidelines</span>
              </div>
              <h3 className="font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">
                Personal Loan Agreement
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Features 36% penal interest rate compounding monthly, 5% prepayment fee, and immediate asset recovery clauses.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs text-indigo-400 font-medium border-t border-slate-800/80 mt-3">
              <span>Test RBI Verification</span>
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => onSelectSample('saas_tos')}
            className="group glass-card glass-card-hover p-5 rounded-xl border border-slate-800 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Digital ToS
                </span>
                <span className="text-[10px] text-slate-400">Consumer Act</span>
              </div>
              <h3 className="font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">
                SaaS Platform Terms of Service
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Includes perpetual IP licensing for AI training, mandatory auto-renewals, and a strict $10 maximum liability cap.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs text-indigo-400 font-medium border-t border-slate-800/80 mt-3">
              <span>Test ToS Audit</span>
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
