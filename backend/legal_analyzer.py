"""
Legal Clause Analyzer Module
Uses Gemini Structured JSON outputs (or fallback rule-based analyzer) to extract clauses, assign risk levels, and generate counter-proposals.
"""

import os
import json
import re
from typing import List, Dict, Any
from pydantic import BaseModel, Field

# Pydantic schemas for Gemini Structured Output
class ClauseAnalysis(BaseModel):
    id: str = Field(description="Unique identifier for the clause, e.g. c1, c2")
    original_text: str = Field(description="The exact text snippet of the clause from the contract")
    clause_type: str = Field(description="Category of clause, e.g., Security Deposit, Rent Revision, Termination, Liability")
    risk_level: str = Field(description="Risk assessment: HIGH, MEDIUM, or LOW")
    plain_english_explanation: str = Field(description="Clear, jargon-free summary of what this clause means for the user")
    risk_reasoning: str = Field(description="Why this clause is risky under standard contract norms or Indian laws")
    suggested_negotiation_text: str = Field(description="A fair, balanced counter-clause the user can send to negotiate")

class DocumentAnalysisResponse(BaseModel):
    document_summary: str = Field(description="High-level 2-3 sentence overview of the document")
    detected_doc_type: str = Field(description="Type of contract: Rental Agreement, Loan Contract, Terms of Service, Employment Contract, etc.")
    clauses: List[ClauseAnalysis]

def analyze_legal_document(document_text: str, filename: str = "contract.txt") -> Dict[str, Any]:
    """Analyzes a legal document using Gemini API structured output or local fallback."""
    api_key = os.environ.get("GEMINI_API_KEY")
    
    if api_key:
        try:
            return _analyze_with_gemini(document_text, api_key)
        except Exception as e:
            print(f"Gemini API call failed ({e}). Using rule-based fallback analyzer.")

    return _analyze_with_rule_engine(document_text, filename)

def _analyze_with_gemini(document_text: str, api_key: str) -> Dict[str, Any]:
    """Invokes Gemini API with Structured Output JSON schema."""
    import google.generativeai as genai
    genai.configure(api_key=api_key)
    
    prompt = f"""
You are an expert legal analyst specializing in contract review, Indian contract law, tenancy rights, banking guidelines, and consumer protection.

Analyze the following legal document. Extract key clauses, categorize their risk level (HIGH, MEDIUM, LOW), provide a plain-English explanation, detail the legal risk under relevant standards (including Indian Model Tenancy Act, RBI guidelines, or Consumer Protection Act where applicable), and draft a fair counter-clause for negotiation.

DOCUMENT TEXT:
{document_text[:12000]}
"""
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content(
        prompt,
        generation_config={"response_mime_type": "application/json", "response_schema": DocumentAnalysisResponse}
    )
    
    raw_text = response.text.strip()
    if raw_text.startswith("```"):
        raw_text = re.sub(r"^```[a-zA-Z]*\n?", "", raw_text)
        raw_text = re.sub(r"\n?```$", "", raw_text)
    
    data = json.loads(raw_text.strip())
    return data

def _analyze_with_rule_engine(document_text: str, filename: str) -> Dict[str, Any]:
    """Intelligent fallback rule-based analyzer when API key is not present."""
    # Check if this matches one of our sample documents
    text_lower = document_text.lower()
    
    if "bengaluru" in text_lower or "lessor" in text_lower or "tenancy" in text_lower or "rent" in text_lower:
        doc_type = "Rental Agreement"
        summary = "Residential rental lease agreement containing tenancy clauses, deposit rules, escalation terms, and maintenance obligations."
    elif "loan" in text_lower or "borrower" in text_lower or "lender" in text_lower or "emi" in text_lower:
        doc_type = "Loan Agreement"
        summary = "Financial loan agreement specifying principal repayment, interest calculations, default penalties, and foreclosure terms."
    else:
        doc_type = "Legal Contract / Terms of Service"
        summary = "General legal agreement specifying rights, obligations, liability limits, and dispute resolution."

    clauses = []
    
    # Split document into paragraphs and analyze with legal rules
    paragraphs = [p.strip() for p in re.split(r'\n\s*\n', document_text) if len(p.strip()) > 30]
    clause_counter = 1

    for para in paragraphs:
        p_lower = para.lower()
        
        # Rule 1: Security Deposit / Deductions
        if any(kw in p_lower for kw in ["deposit", "deduct", "painting", "deep-cleaning"]):
            risk = "HIGH" if any(kw in p_lower for kw in ["non-refundable", "10 month", "forfeited", "mandatory deduction", "1.5 month"]) else "MEDIUM"
            clauses.append({
                "id": f"c{clause_counter}",
                "original_text": para,
                "clause_type": "Security Deposit & Deductions",
                "risk_level": risk,
                "plain_english_explanation": "Clause specifies security deposit amount and mandatory deduction rules upon vacating.",
                "risk_reasoning": "High deposits (above 2 months) or automatic non-refundable deductions violate Section 13 of the Model Tenancy Act 2021.",
                "suggested_negotiation_text": "Security Deposit shall be equivalent to 2 months' rent, fully refundable within 7 days of vacating. Painting deductions shall only apply for actual physical damage beyond normal wear and tear."
            })
            clause_counter += 1

        # Rule 2: Rent Revision / Hike
        elif any(kw in p_lower for kw in ["escalation", "increase", "rent hike", "revise", "20%"]):
            risk = "HIGH" if any(kw in p_lower for kw in ["unilateral", "7-day", "verbal", "any time", "forfeiture"]) else "MEDIUM"
            clauses.append({
                "id": f"c{clause_counter}",
                "original_text": para,
                "clause_type": "Rent Revision",
                "risk_level": risk,
                "plain_english_explanation": "Specifies how and when the landlord can increase your monthly rent payment.",
                "risk_reasoning": "Unilateral or short-notice rent increases during a fixed lease period create severe financial unpredictability.",
                "suggested_negotiation_text": "Rent shall remain fixed for the 11-month lease term. Any annual renewal escalation shall not exceed 5% to 8%, communicated in writing 60 days prior."
            })
            clause_counter += 1

        # Rule 3: Termination / Notice Period
        elif any(kw in p_lower for kw in ["terminate", "termination", "notice period", "vacat"]):
            risk = "HIGH" if ("24 hour" in p_lower or "forfeit" in p_lower or "unilateral" in p_lower) else "MEDIUM"
            clauses.append({
                "id": f"c{clause_counter}",
                "original_text": para,
                "clause_type": "Termination & Notice",
                "risk_level": risk,
                "plain_english_explanation": "Details notice requirements for vacating the premises or ending the agreement.",
                "risk_reasoning": "Unequal notice periods (e.g. 24 hours for landlord vs 3 months for tenant) leave the tenant vulnerable to sudden displacement.",
                "suggested_negotiation_text": "Either party may terminate the tenancy by serving a 30-day written notice or paying one month's rent in lieu of notice."
            })
            clause_counter += 1

        # Rule 4: Maintenance / Structural Repairs
        elif any(kw in p_lower for kw in ["repair", "maintenance", "plumbing", "dampness", "leak"]):
            clauses.append({
                "id": f"c{clause_counter}",
                "original_text": para,
                "clause_type": "Maintenance & Repairs",
                "risk_level": "MEDIUM",
                "plain_english_explanation": "Defines who pays for property repairs, plumbing issues, and structural maintenance.",
                "risk_reasoning": "Tenants should not be burdened with fundamental structural or pre-existing building defects.",
                "suggested_negotiation_text": "Landlord/Lessor shall be responsible for all structural repairs, electrical mains, and plumbing overhauls. Tenant shall handle minor day-to-day upkeep."
            })
            clause_counter += 1

        # Rule 5: Interest rates & Penalties (Loans)
        elif any(kw in p_lower for kw in ["penal", "penal interest", "compound", "foreclosure", "prepayment"]):
            risk = "HIGH" if any(kw in p_lower for kw in ["36%", "foreclosure charge", "5%", "compounded monthly"]) else "MEDIUM"
            clauses.append({
                "id": f"c{clause_counter}",
                "original_text": para,
                "clause_type": "Interest Rates & Penalties",
                "risk_level": risk,
                "plain_english_explanation": "Specifies penal interest rates for late payments and foreclosure fees for early loan payoff.",
                "risk_reasoning": "Extremely high penal interest rates or foreclosure charges on individual loans violate RBI Fair Practices directives.",
                "suggested_negotiation_text": "Penal interest for delayed payment shall not exceed 2% per month on the overdue installment. Zero foreclosure charges shall apply per RBI guidelines."
            })
            clause_counter += 1

        # Rule 6: IP & Liability (ToS)
        elif any(kw in p_lower for kw in ["license", "intellectual property", "liability", "perpetual", "$10", "cap"]):
            clauses.append({
                "id": f"c{clause_counter}",
                "original_text": para,
                "clause_type": "Liability & Data Ownership",
                "risk_level": "HIGH",
                "plain_english_explanation": "Controls who owns your uploaded data and sets the maximum damages the company will pay if things go wrong.",
                "risk_reasoning": "Irrevocable data licenses and nominal liability caps ($10) leave users unprotected in case of data breaches.",
                "suggested_negotiation_text": "User retains all ownership of uploaded data. Company liability shall be capped at total fees paid in the past 12 months."
            })
            clause_counter += 1

    # If no specific clauses flagged by keywords, add standard safe clause
    if not clauses:
        clauses.append({
            "id": "c1",
            "original_text": document_text[:300] + "...",
            "clause_type": "General Contract Terms",
            "risk_level": "LOW",
            "plain_english_explanation": "Standard contractual boilerplate defining party obligations.",
            "risk_reasoning": "Standard commercial terms without obvious high-risk conditions.",
            "suggested_negotiation_text": "Acceptable as written."
        })

    return {
        "document_summary": summary,
        "detected_doc_type": doc_type,
        "clauses": clauses
    }
