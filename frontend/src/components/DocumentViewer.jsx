import React, { useState, useEffect, useRef } from 'react';
import { FileText, AlertOctagon, AlertTriangle, CheckCircle, Search, Highlighter } from 'lucide-react';

export default function DocumentViewer({ activeDoc, selectedClauseId, onSelectClause }) {
  const [searchQuery, setSearchQuery] = useState('');
  const paragraphRefs = useRef({});

  // Auto-scroll to selected clause paragraph when selectedClauseId changes
  useEffect(() => {
    if (selectedClauseId && activeDoc?.analysis?.clauses) {
      const clause = activeDoc.analysis.clauses.find(c => c.id === selectedClauseId);
      if (clause) {
        // Find matching paragraph
        const matchingIndex = activeDoc.paragraphs.findIndex(p => 
          p.text.includes(clause.original_text.substring(0, 40)) || clause.original_text.includes(p.text.substring(0, 40))
        );
        if (matchingIndex !== -1 && paragraphRefs.current[matchingIndex]) {
          paragraphRefs.current[matchingIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [selectedClauseId, activeDoc]);

  if (!activeDoc || !activeDoc.paragraphs) {
    return (
      <div className="h-full flex items-center justify-center p-6 text-slate-400">
        No document text available.
      </div>
    );
  }

  // Map clauses to paragraph indices for highlighting
  const clauseMap = {};
  if (activeDoc.analysis?.clauses) {
    activeDoc.analysis.clauses.forEach((clause) => {
      const cleanSnippet = clause.original_text.replace(/^["'\s]+|["'\s]+$/g, '').substring(0, 30);
      const matchIndex = activeDoc.paragraphs.findIndex(p => 
        p.text.includes(cleanSnippet) || 
        clause.original_text.includes(p.text.substring(0, 30))
      );
      if (matchIndex !== -1) {
        clauseMap[matchIndex] = clause;
      }
    });
  }

  return (
    <div className="h-full flex flex-col glass-card border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      
      {/* Header bar */}
      <div className="p-3.5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <FileText className="h-4 w-4 text-indigo-400" />
          <h2 className="text-xs font-semibold text-slate-200 font-heading truncate max-w-[220px]">
            {activeDoc.filename || activeDoc.title}
          </h2>
        </div>

        {/* Legend & Count */}
        <div className="flex items-center space-x-3 text-[11px]">
          <div className="flex items-center space-x-1 text-rose-400 font-medium">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span>High Risk</span>
          </div>
          <div className="flex items-center space-x-1 text-amber-400 font-medium">
            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
            <span>Caution</span>
          </div>
          <div className="flex items-center space-x-1 text-emerald-400 font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span>Standard</span>
          </div>
        </div>
      </div>

      {/* Filter / Search input */}
      <div className="p-2 border-b border-slate-800/80 bg-slate-950/50">
        <div className="relative">
          <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input 
            type="text"
            placeholder="Search document text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Interactive Paragraph Viewer */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs text-slate-300 leading-relaxed font-sans select-text">
        {activeDoc.paragraphs.map((p, idx) => {
          const matchingClause = clauseMap[idx];
          const isSelected = matchingClause && selectedClauseId === matchingClause.id;
          
          let highlightClass = "";
          if (matchingClause) {
            if (matchingClause.risk_level === "HIGH") highlightClass = "highlight-high";
            else if (matchingClause.risk_level === "MEDIUM") highlightClass = "highlight-medium";
            else highlightClass = "highlight-low";
          }

          // Search filter match
          if (searchQuery && !p.text.toLowerCase().includes(searchQuery.toLowerCase())) {
            return null;
          }

          return (
            <div
              key={p.id || idx}
              ref={el => paragraphRefs.current[idx] = el}
              onClick={() => matchingClause && onSelectClause(matchingClause.id)}
              className={`p-3.5 rounded-lg border transition-all relative ${
                matchingClause ? 'cursor-pointer' : 'border-transparent'
              } ${highlightClass} ${isSelected ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-950 shadow-lg' : ''}`}
            >
              {/* Line indicator & Badge */}
              <div className="flex items-center justify-between mb-1 text-[10px] font-mono text-slate-400 selection:bg-none">
                <span>¶ {idx + 1}</span>
                {matchingClause && (
                  <span className={`px-2 py-0.5 rounded font-sans font-semibold uppercase tracking-wider ${
                    matchingClause.risk_level === 'HIGH' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                    matchingClause.risk_level === 'MEDIUM' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {matchingClause.clause_type} ({matchingClause.risk_level})
                  </span>
                )}
              </div>

              {/* Paragraph Content */}
              <p className="whitespace-pre-wrap">{p.text}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
