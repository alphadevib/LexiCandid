import os
import re
from typing import List, Dict, Any

def parse_document_file(file_path: str, filename: str) -> Dict[str, Any]:
    """Parses an uploaded file into raw text and paragraph segments."""
    ext = os.path.splitext(filename)[1].lower()
    raw_text = ""

    if ext == ".pdf":
        raw_text = _extract_pdf_text(file_path)
    elif ext in [".docx", ".doc"]:
        raw_text = _extract_docx_text(file_path)
    else:
        # Fallback to plain text
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            raw_text = f.read()

    paragraphs = _segment_text_into_paragraphs(raw_text)
    
    return {
        "filename": filename,
        "raw_text": raw_text,
        "paragraphs": paragraphs,
        "char_count": len(raw_text),
        "paragraph_count": len(paragraphs)
    }

def _extract_pdf_text(file_path: str) -> str:
    """Extracts text from PDF using pdfplumber or pypdf fallback."""
    text_content = []
    try:
        import pdfplumber
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text_content.append(page_text)
    except Exception as e:
        print(f"pdfplumber extraction failed: {e}. Falling back to PyPDF.")
        try:
            from pypdf import PdfReader
            reader = PdfReader(file_path)
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text_content.append(page_text)
        except Exception as ex:
            print(f"pypdf extraction failed: {ex}")

    return "\n\n".join(text_content)

def _extract_docx_text(file_path: str) -> str:
    """Extracts text from DOCX files."""
    try:
        import docx
        doc = docx.Document(file_path)
        return "\n\n".join([p.text for p in doc.paragraphs if p.text.strip()])
    except Exception:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()

def _segment_text_into_paragraphs(text: str) -> List[Dict[str, Any]]:
    """Segments raw document text into indexed paragraphs for UI highlighting."""
    raw_blocks = [b.strip() for b in re.split(r'\n\s*\n', text) if b.strip()]
    paragraphs = []
    
    for idx, block in enumerate(raw_blocks):
        paragraphs.append({
            "index": idx,
            "id": f"p-{idx}",
            "text": block,
            "length": len(block)
        })
        
    return paragraphs
