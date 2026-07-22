"""
FastAPI Backend Application - LexiCandid
Plain-Language Legal Document Explainer API
"""

import os
import shutil
from typing import Dict, Any, Optional
from fastapi import FastAPI, File, UploadFile, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from parser import parse_document_file
from legal_analyzer import analyze_legal_document
from rag_engine import RAGSearchEngine
from sample_documents import SAMPLE_DOCUMENTS
from legal_reference_data import INDIAN_LEGAL_REFERENCES

app = FastAPI(
    title="LexiCandid API",
    description="Backend API for Plain-Language Legal Document Explainer & LexiBot RAG Chat",
    version="1.0.0"
)

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global RAG engine instance
rag_engine = RAGSearchEngine()

# Active document state cache
active_document = {
    "title": "No document loaded",
    "filename": "",
    "raw_text": "",
    "paragraphs": [],
    "analysis": {
        "document_summary": "Upload a legal document or select a sample contract to get started.",
        "detected_doc_type": "None",
        "clauses": []
    }
}

class ChatQueryRequest(BaseModel):
    query: str
    document_text: Optional[str] = None

@app.get("/")
def root():
    return {
        "status": "online",
        "app": "LexiCandid - Plain-Language Legal Document Explainer",
        "gemini_api_configured": bool(os.environ.get("GEMINI_API_KEY"))
    }

@app.get("/api/samples")
def get_samples():
    """Returns list of pre-configured sample legal contracts."""
    result = []
    for key, doc in SAMPLE_DOCUMENTS.items():
        result.append({
            "id": doc["id"],
            "title": doc["title"],
            "doc_type": doc["doc_type"],
            "summary": doc["summary"]
        })
    return {"samples": result}

@app.get("/api/samples/{sample_id}")
def load_sample_document(sample_id: str):
    """Loads a sample document, sets it as active, and indexes it into RAG."""
    global active_document, rag_engine
    
    if sample_id not in SAMPLE_DOCUMENTS:
        raise HTTPException(status_code=404, detail="Sample document not found")
        
    sample = SAMPLE_DOCUMENTS[sample_id]
    
    # Initialize RAG engine
    rag_engine.initialize_document(sample["text"], title=sample["title"])
    
    # Segment text into paragraphs
    paragraphs = []
    blocks = [b.strip() for b in sample["text"].split("\n\n") if b.strip()]
    for idx, b in enumerate(blocks):
        paragraphs.append({"index": idx, "id": f"p-{idx}", "text": b})
        
    analysis_data = {
        "document_summary": sample["summary"],
        "detected_doc_type": sample["doc_type"],
        "clauses": sample["clauses"]
    }
    
    active_document = {
        "title": sample["title"],
        "filename": sample["filename"],
        "raw_text": sample["text"],
        "paragraphs": paragraphs,
        "analysis": analysis_data
    }
    
    return active_document

@app.post("/api/upload")
async def upload_document(file: UploadFile = File(...)):
    """Uploads a PDF, DOCX, or TXT file, parses text, runs risk analysis, and indexes into RAG."""
    global active_document, rag_engine
    
    temp_dir = os.path.join(os.getcwd(), "temp_uploads")
    os.makedirs(temp_dir, exist_ok=True)
    temp_path = os.path.join(temp_dir, file.filename)
    
    try:
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        parsed = parse_document_file(temp_path, file.filename)
        
        if not parsed["raw_text"].strip():
            raise HTTPException(status_code=400, detail="Could not extract text from document. File may be image-only or password protected.")
            
        analysis = analyze_legal_document(parsed["raw_text"], file.filename)
        
        rag_engine.initialize_document(parsed["raw_text"], title=file.filename)
        
        active_document = {
            "title": file.filename,
            "filename": file.filename,
            "raw_text": parsed["raw_text"],
            "paragraphs": parsed["paragraphs"],
            "analysis": analysis
        }
        
        return active_document
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process document: {str(e)}")
    finally:
        if os.path.exists(temp_path):
            try:
                os.remove(temp_path)
            except Exception:
                pass

@app.get("/api/document")
def get_active_document():
    """Returns current active loaded document and analysis."""
    return active_document

@app.post("/api/chat")
def chat_with_bot(request: ChatQueryRequest):
    """LexiBot RAG Endpoint: Answers user questions using contract context and Indian legal references."""
    doc_text = request.document_text or active_document.get("raw_text", "")
    response = rag_engine.answer_query(request.query, doc_text)
    return response

@app.get("/api/legal-guides")
def get_legal_guides():
    """Returns the Indian legal reference library cards."""
    return {"guides": INDIAN_LEGAL_REFERENCES}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
