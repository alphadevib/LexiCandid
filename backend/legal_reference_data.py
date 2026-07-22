"""
Indian Legal Reference Knowledge Base
Contains legal provisions, precedent guidelines, and statutory rights across Indian Tenancy, Consumer Protection, and Banking Laws.
"""

INDIAN_LEGAL_REFERENCES = [
    {
        "id": "mta_2021_deposit",
        "category": "Tenancy & Rent",
        "act_name": "Draft Model Tenancy Act 2021 (Section 13)",
        "title": "Security Deposit Cap",
        "summary": "Security deposit for residential premises shall not exceed 2 months' rent. For commercial premises, it shall not exceed 6 months' rent.",
        "key_takeaways": [
            "Residential security deposit capped at max 2 months' rent.",
            "Deposit must be refunded by the landlord at the time of taking over possession after deducting valid dues.",
            "Excessive deposits (e.g. 6-10 months standard in Bangalore) violate Model Tenancy Act recommendations."
        ]
    },
    {
        "id": "mta_2021_eviction",
        "category": "Tenancy & Rent",
        "act_name": "Draft Model Tenancy Act 2021 & Karnataka Rent Control Act",
        "title": "Eviction Notice Period & Rights",
        "summary": "Landlord cannot evict a tenant without giving at least 20 to 30 days written notice or as per mutually agreed notice period (minimum 1 month standard). Unilateral immediate eviction or lockouts are illegal.",
        "key_takeaways": [
            "Minimum 30 days notice required for termination without cause.",
            "Forcible lockouts or cutting essential supplies (water/electricity) without rent authority order is illegal under Section 20.",
            "Landlord must maintain the structure; tenant maintains ordinary cleanliness."
        ]
    },
    {
        "id": "mta_2021_rent_hike",
        "category": "Tenancy & Rent",
        "act_name": "Draft Model Tenancy Act 2021 (Section 9 & 10)",
        "title": "Rent Revision & Annual Escalation",
        "summary": "Rent revision must be agreed upon in the tenancy agreement. Landlord must give 3 months prior written notice before revised rent comes into effect.",
        "key_takeaways": [
            "Unilateral arbitrary rent hikes during agreement term are void.",
            "3 months advance written notice required before revision.",
            "Standard annual escalation in Indian residential leases is 5% to 10% max."
        ]
    },
    {
        "id": "rbi_fair_practices_loans",
        "category": "Banking & Loans",
        "act_name": "RBI Fair Practices Code for Lenders (2023)",
        "title": "Prepayment Penalties & Foreclosure Charges",
        "summary": "Banks and NBFCs are prohibited from levying foreclosure charges/prepayment penalties on floating rate term loans sanctioned to individual borrowers.",
        "key_takeaways": [
            "Zero prepayment penalty on floating rate loans for individuals.",
            "Clear transparency required for penal interest charges; interest rate changes must be communicated in advance.",
            "Borrower has right to receive original property documents within 30 days of loan payoff."
        ]
    },
    {
        "id": "consumer_protection_unfair_terms",
        "category": "Consumer Rights & ToS",
        "act_name": "Consumer Protection Act 2019 (Section 2(46))",
        "title": "Unfair Contract Terms",
        "summary": "Contracts containing terms that cause significant imbalance in rights (e.g. excessive interest, unilateral termination, waiver of legal remedies) are declared 'Unfair Contracts' and voidable by Consumer Commissions.",
        "key_takeaways": [
            "Unilateral waiver of liability for gross negligence is unenforceable.",
            "Clauses forcing exclusive foreign jurisdiction on Indian consumers can be challenged.",
            "Automatic renewals without notice or refund options can be contested."
        ]
    }
]

def get_legal_context_str() -> str:
    """Formats legal references into a prompt-injectable context block."""
    context_lines = ["--- INDIAN LEGAL REFERENCE DATASET ---"]
    for ref in INDIAN_LEGAL_REFERENCES:
        context_lines.append(f"[{ref['act_name']}] {ref['title']}: {ref['summary']}")
        for kw in ref["key_takeaways"]:
            context_lines.append(f"  - {kw}")
    return "\n".join(context_lines)
