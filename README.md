# ⚖️ LexiCandid

**Plain-language AI legal document explainer for everyday Indians.**

LexiCandid lets you upload any legal contract (rental agreement, loan document, employment contract) and instantly get a plain-English breakdown of its clauses, risk flags, and your rights under Indian law — powered by a RAG chatbot (LexiBot) backed by Google Gemini.

---

## ✨ Features

- 📄 **Upload & Parse** — Supports PDF, DOCX, and TXT legal documents
- 🔍 **AI Risk Analysis** — Automatically detects document type and flags high-risk clauses
- 🤖 **LexiBot Chat** — Ask any question about your contract; answers grounded in document context + Indian legal references
- 📚 **Indian Legal Reference Library** — Built-in database covering Model Tenancy Act 2021, RBI Fair Practices Code, and more
- 🧪 **Sample Contracts** — Try the app instantly with pre-loaded example agreements
- 🔌 **Gemini API + Offline Fallback** — Works with or without an API key

---

## 🏗️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React + Vite |
| Backend | Python + FastAPI |
| AI / LLM | Google Gemini (`google-generativeai`) |
| PDF Parsing | `pdfplumber`, `pypdf` |
| DOCX Parsing | `python-docx` |
| Vector Search | Keyword-based RAG (FAISS-ready) |

---

## 🚀 Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+

### 1. Clone the repo

```bash
git clone https://github.com/your-username/LexiCandid.git
cd LexiCandid
```

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

Set your Gemini API key (optional — app works without it):

```bash
# Windows PowerShell
$env:GEMINI_API_KEY = "your-api-key-here"

# macOS / Linux
export GEMINI_API_KEY="your-api-key-here"
```

Start the API server:

```bash
python main.py
```

Backend runs at: `http://127.0.0.1:8000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 📁 Project Structure

```
LexiCandid/
├── backend/
│   ├── main.py                 # FastAPI app & API routes
│   ├── parser.py               # PDF / DOCX / TXT text extraction
│   ├── legal_analyzer.py       # Clause detection & risk flagging
│   ├── rag_engine.py           # LexiBot RAG engine + Gemini integration
│   ├── legal_reference_data.py # Indian legal reference database
│   ├── sample_documents.py     # Pre-loaded sample contracts
│   └── requirements.txt
└── frontend/
    ├── src/                    # React components & pages
    ├── index.html
    └── vite.config.js
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `GET` | `/api/samples` | List sample contracts |
| `GET` | `/api/samples/{id}` | Load a sample contract |
| `POST` | `/api/upload` | Upload a PDF/DOCX/TXT file |
| `GET` | `/api/document` | Get currently loaded document |
| `POST` | `/api/chat` | Chat with LexiBot |
| `GET` | `/api/legal-guides` | Get Indian legal reference cards |

Interactive API docs available at: `http://127.0.0.1:8000/docs`

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Optional | Google Gemini API key for AI-powered answers |

> Without a Gemini API key, LexiBot falls back to a built-in rule-based legal answer engine.

---

## 📜 Legal References Included

- Model Tenancy Act 2021
- RBI Fair Practices Code (Loan Prepayment Rights)
- Indian Contract Act 1872
- Consumer Protection Act 2019
- Transfer of Property Act 1882

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

[MIT](LICENSE)
