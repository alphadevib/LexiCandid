import React, { useState } from 'react';
import { 
  ShieldAlert, AlertTriangle, CheckCircle, MessageSquare, BookOpen, 
  Copy, Check, Sparkles, Send, Scale, ArrowRight, ExternalLink, Filter, Lightbulb
} from 'lucide-react';

export default function AnalysisPanel({ 
  analysis, 
  selectedClauseId, 
  onSelectClause, 
  chatHistory, 
  onSendMessage, 
  isChatLoading, 
  legalGuides 
}) {
  const [activeTab, setActiveTab] = useState('clauses'); // 'clauses' | 'chat' | 'guides' | 'negotiate'
  const [riskFilter, setRiskFilter] = useState('ALL'); // 'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'
  const [chatInput, setChatInput] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;
    onSendMessage(chatInput);
    setChatInput('');
  };

  const handleChipClick = (prompt) => {
    onSendMessage(prompt);
  };

  const clauses = analysis?.clauses || [];
  const filteredClauses = clauses.filter(c => {
    if (riskFilter === 'ALL') return true;
    return c.risk_level === riskFilter;
  });

  const highCount = clauses.filter(c => c.risk_level === 'HIGH').length;
  const medCount = clauses.filter(c => c.risk_level === 'MEDIUM').length;
  const lowCount = clauses.filter(c => c.risk_level === 'LOW').length;

  return (
    <div className="h-full flex flex-col glass-card border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      
      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950/80 p-1.5 gap-1">
        <button 
          onClick={() => setActiveTab('clauses')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-xs font-semibold font-heading transition-all ${
            activeTab === 'clauses' 
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <ShieldAlert className="h-3.5 w-3.5" />
          <span>Risk Breakdown</span>
          {highCount > 0 && (
            <span className="h-4 w-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
              {highCount}
            </span>
          )}
        </button>

        <button 
          onClick={() => setActiveTab('chat')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-xs font-semibold font-heading transition-all ${
            activeTab === 'chat' 
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span>LexiBot Chat</span>
        </button>

        <button 
          onClick={() => setActiveTab('guides')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-xs font-semibold font-heading transition-all ${
            activeTab === 'guides' 
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span>Indian Legal Guide</span>
        </button>

        <button 
          onClick={() => setActiveTab('negotiate')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-xs font-semibold font-heading transition-all ${
            activeTab === 'negotiate' 
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Scale className="h-3.5 w-3.5" />
          <span>Fair Clauses</span>
        </button>
      </div>

      {/* TAB 1: CLAUSES & RISK ANALYSIS */}
      {activeTab === 'clauses' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Executive Summary Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">Executive Summary</span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {analysis?.detected_doc_type || 'Contract'}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {analysis?.document_summary}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button 
                onClick={() => setRiskFilter('ALL')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  riskFilter === 'ALL' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All ({clauses.length})
              </button>
              <button 
                onClick={() => setRiskFilter('HIGH')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  riskFilter === 'HIGH' ? 'bg-rose-600 text-white' : 'text-rose-400 hover:bg-rose-500/10'
                }`}
              >
                High ({highCount})
              </button>
              <button 
                onClick={() => setRiskFilter('MEDIUM')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  riskFilter === 'MEDIUM' ? 'bg-amber-600 text-white' : 'text-amber-400 hover:bg-amber-500/10'
                }`}
              >
                Caution ({medCount})
              </button>
              <button 
                onClick={() => setRiskFilter('LOW')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  riskFilter === 'LOW' ? 'bg-emerald-600 text-white' : 'text-emerald-400 hover:bg-emerald-500/10'
                }`}
              >
                Standard ({lowCount})
              </button>
            </div>
          </div>

          {/* Clause Cards List */}
          <div className="space-y-3">
            {filteredClauses.map((clause) => {
              const isSelected = selectedClauseId === clause.id;
              const isHigh = clause.risk_level === 'HIGH';
              const isMed = clause.risk_level === 'MEDIUM';

              return (
                <div 
                  key={clause.id}
                  onClick={() => onSelectClause(clause.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 ${
                    isSelected 
                      ? 'ring-2 ring-indigo-500 bg-slate-900 border-indigo-500/50 shadow-xl' 
                      : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {/* Badge & Title */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 font-heading">
                      {clause.clause_type}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      isHigh ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                      isMed ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                      'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {clause.risk_level} RISK
                    </span>
                  </div>

                  {/* Original Text Snippet */}
                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 italic">
                    "{clause.original_text}"
                  </div>

                  {/* Plain English Explanation */}
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1 text-[11px] font-semibold text-indigo-300">
                      <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
                      <span>Plain English Summary</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {clause.plain_english_explanation}
                    </p>
                  </div>

                  {/* Legal Risk Reasoning */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-semibold text-rose-300">
                      Legal Risk under Indian Standards:
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {clause.risk_reasoning}
                    </p>
                  </div>

                  {/* Counter Proposal */}
                  {clause.suggested_negotiation_text && (
                    <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-emerald-400">
                          Fair Counter-Clause Recommendation
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(clause.suggested_negotiation_text, clause.id);
                          }}
                          className="flex items-center space-x-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 transition-colors"
                        >
                          {copiedId === clause.id ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Copy Text</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-slate-300 bg-emerald-950/20 border border-emerald-500/20 p-2.5 rounded-lg font-mono text-[11px] leading-relaxed">
                        {clause.suggested_negotiation_text}
                      </p>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* TAB 2: LEXIBOT INTERACTIVE CHAT */}
      {activeTab === 'chat' && (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          
          {/* Chat Messages scroll area */}
          <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
            
            {/* Intro Welcome Box */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-indigo-500/20 text-xs text-slate-300 space-y-2">
              <div className="flex items-center space-x-2 font-semibold text-indigo-300 font-heading">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>Ask LexiBot about this Agreement</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                I can check notice periods, security deposit refund rules under Indian laws, loan foreclosure regulations, or draft custom negotiation emails for you.
              </p>
            </div>

            {/* Message items */}
            {chatHistory.map((msg, index) => (
              <div 
                key={index} 
                className={`flex flex-col space-y-1 ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className={`p-3.5 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-600/20'
                    : 'glass-card bg-slate-900/90 text-slate-200 rounded-bl-none border border-slate-800'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
                <span className="text-[10px] text-slate-400 px-1 font-mono">
                  {msg.sender === 'user' ? 'You' : 'LexiBot'}
                </span>
              </div>
            ))}

            {isChatLoading && (
              <div className="flex items-center space-x-2 text-xs text-indigo-400 p-2">
                <div className="h-2 w-2 rounded-full bg-indigo-500 animate-ping"></div>
                <span>LexiBot is indexing contract & querying Indian legal reference...</span>
              </div>
            )}

          </div>

          {/* Quick Prompt Chips */}
          <div className="shrink-0 p-2 border-t border-slate-800 bg-slate-950/60 overflow-x-auto flex space-x-2 no-scrollbar">
            <button 
              onClick={() => handleChipClick("What is the mandatory notice period to vacate?")}
              className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-indigo-600/20 border border-slate-800 hover:border-indigo-500/40 text-[10px] font-medium text-slate-300 whitespace-nowrap transition-colors"
            >
              Notice Period?
            </button>
            <button 
              onClick={() => handleChipClick("Is the security deposit fully refundable under Indian law?")}
              className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-indigo-600/20 border border-slate-800 hover:border-indigo-500/40 text-[10px] font-medium text-slate-300 whitespace-nowrap transition-colors"
            >
              Deposit Refund Rights?
            </button>
            <button 
              onClick={() => handleChipClick("Can the landlord increase rent by 20% arbitrarily?")}
              className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-indigo-600/20 border border-slate-800 hover:border-indigo-500/40 text-[10px] font-medium text-slate-300 whitespace-nowrap transition-colors"
            >
              Rent Escalation Cap?
            </button>
            <button 
              onClick={() => handleChipClick("Are loan foreclosure charges legal for floating rate loans?")}
              className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-indigo-600/20 border border-slate-800 hover:border-indigo-500/40 text-[10px] font-medium text-slate-300 whitespace-nowrap transition-colors"
            >
              RBI Loan Rules?
            </button>
          </div>

          {/* Input form */}
          <form onSubmit={handleChatSubmit} className="shrink-0 p-3 border-t border-slate-800 bg-slate-950 flex items-center space-x-2">
            <input 
              type="text"
              placeholder="Ask a question about this document..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-400"
            />
            <button 
              type="submit"
              disabled={isChatLoading || !chatInput.trim()}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white transition-all shadow-md shadow-indigo-600/30"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>
      )}

      {/* TAB 3: INDIAN LEGAL GUIDE */}
      {activeTab === 'guides' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="text-xs text-slate-400 leading-relaxed border-b border-slate-800 pb-3">
            Reference database of key statutory rights, caps, and legal precedents under Indian Law:
          </div>

          <div className="space-y-3">
            {legalGuides.map((guide) => (
              <div key={guide.id} className="p-4 rounded-xl glass-card border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    {guide.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{guide.act_name}</span>
                </div>
                <h3 className="text-xs font-bold text-slate-200 font-heading">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {guide.summary}
                </p>
                <div className="pt-2 border-t border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-semibold uppercase text-slate-400">Key Takeaways:</span>
                  <ul className="space-y-1">
                    {guide.key_takeaways.map((kw, i) => (
                      <li key={i} className="text-xs text-slate-400 flex items-start space-x-1.5">
                        <span className="text-indigo-400 font-bold">•</span>
                        <span>{kw}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: NEGOTIATION HELPER */}
      {activeTab === 'negotiate' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-slate-300 space-y-1">
            <div className="font-semibold text-indigo-300 font-heading flex items-center space-x-1.5">
              <Scale className="h-4 w-4 text-indigo-400" />
              <span>Fair Clause Negotiator</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Copy these balanced, standardized counter-clauses and email them to your landlord, bank officer, or service provider before signing.
            </p>
          </div>

          <div className="space-y-4">
            {clauses.filter(c => c.risk_level === 'HIGH' || c.risk_level === 'MEDIUM').map((c) => (
              <div key={c.id} className="p-4 rounded-xl glass-card border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 font-heading">{c.clause_type}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    c.risk_level === 'HIGH' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {c.risk_level} RISK
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">Original Risky Term:</span>
                  <p className="text-slate-400 italic bg-slate-950 p-2 rounded border border-slate-800 text-[11px]">
                    "{c.original_text}"
                  </p>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-emerald-400 uppercase">Proposed Fair Replacement:</span>
                    <button
                      onClick={() => handleCopy(c.suggested_negotiation_text, `neg-${c.id}`)}
                      className="px-2 py-0.5 rounded bg-indigo-600 hover:bg-indigo-500 text-[10px] text-white transition-colors"
                    >
                      {copiedId === `neg-${c.id}` ? 'Copied!' : 'Copy Counter-Clause'}
                    </button>
                  </div>
                  <p className="text-slate-200 font-mono text-[11px] bg-emerald-950/20 border border-emerald-500/30 p-2.5 rounded-lg leading-relaxed">
                    {c.suggested_negotiation_text}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
