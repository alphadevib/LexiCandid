import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FileUpload from './components/FileUpload';
import DocumentViewer from './components/DocumentViewer';
import AnalysisPanel from './components/AnalysisPanel';

export default function App() {
  const [activeDoc, setActiveDoc] = useState(null);
  const [selectedClauseId, setSelectedClauseId] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [legalGuides, setLegalGuides] = useState([]);

  // Fetch legal reference guides on mount
  useEffect(() => {
    fetch('/api/legal-guides')
      .then(res => res.json())
      .then(data => {
        if (data.guides) setLegalGuides(data.guides);
      })
      .catch(err => console.log('Could not fetch legal guides', err));
  }, []);

  // Handle File Upload
  const handleFileUpload = async (file) => {
    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      const data = await res.json();
      setActiveDoc(data);
      setSelectedClauseId(null);
      setChatHistory([
        {
          sender: 'bot',
          text: `Document "${file.name}" uploaded successfully! I have parsed the contract, highlighted ${data.analysis?.clauses?.length || 0} key clauses, and indexed the text. How can I help you understand this agreement?`
        }
      ]);
    } catch (err) {
      alert(`Error parsing file: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle Sample Selection
  const handleSelectSample = async (sampleId) => {
    setIsAnalyzing(true);
    try {
      const res = await fetch(`/api/samples/${sampleId}`);
      if (!res.ok) throw new Error('Sample fetch failed');
      const data = await res.json();
      setActiveDoc(data);
      setSelectedClauseId(null);
      setChatHistory([
        {
          sender: 'bot',
          text: `Loaded sample document: "${data.title}". I've highlighted risky clauses under Indian tenancy and financial laws. Ask me anything about this agreement!`
        }
      ]);
    } catch (err) {
      alert(`Failed to load sample document: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle Chat Message
  const handleSendMessage = async (userPrompt) => {
    const updatedHistory = [...chatHistory, { sender: 'user', text: userPrompt }];
    setChatHistory(updatedHistory);
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userPrompt,
          document_text: activeDoc?.raw_text || ''
        })
      });

      if (!res.ok) throw new Error('Chat query failed');
      const data = await res.json();

      setChatHistory([
        ...updatedHistory,
        { sender: 'bot', text: data.answer }
      ]);
    } catch (err) {
      setChatHistory([
        ...updatedHistory,
        { sender: 'bot', text: `Sorry, I encountered an error answering your query: ${err.message}` }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleReset = () => {
    setActiveDoc(null);
    setSelectedClauseId(null);
    setChatHistory([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      
      {/* Header Navbar */}
      <Navbar 
        activeDoc={activeDoc} 
        onSelectSample={handleSelectSample}
        onReset={handleReset}
        isAnalyzing={isAnalyzing}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-3 flex flex-col min-h-0 overflow-hidden">
        {!activeDoc ? (
          /* View 1: Upload & Sample Landing Zone */
          <FileUpload 
            onFileUpload={handleFileUpload} 
            onSelectSample={handleSelectSample}
            isLoading={isAnalyzing}
          />
        ) : (
          /* View 2: Interactive Split-Screen Dashboard */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 h-[calc(100vh-90px)]">
            
            {/* Left Pane: Interactive Document Viewer (7 cols) */}
            <div className="lg:col-span-7 h-full">
              <DocumentViewer 
                activeDoc={activeDoc}
                selectedClauseId={selectedClauseId}
                onSelectClause={(id) => setSelectedClauseId(id)}
              />
            </div>

            {/* Right Pane: Analysis, RAG Chat & Legal Guides (5 cols) */}
            <div className="lg:col-span-5 h-full">
              <AnalysisPanel 
                analysis={activeDoc.analysis}
                selectedClauseId={selectedClauseId}
                onSelectClause={(id) => setSelectedClauseId(id)}
                chatHistory={chatHistory}
                onSendMessage={handleSendMessage}
                isChatLoading={isChatLoading}
                legalGuides={legalGuides}
              />
            </div>

          </div>
        )}
      </main>

    </div>
  );
}
