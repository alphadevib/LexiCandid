"""
Pre-packaged sample legal documents and rich pre-analyzed clause breakdowns for instant demo & offline fallback.
"""

SAMPLE_DOCUMENTS = {
    "bengaluru_rental": {
        "id": "bengaluru_rental",
        "title": "Bengaluru Residential Rental Agreement",
        "doc_type": "Rental Agreement",
        "filename": "Bengaluru_Residential_Lease_Agreement.txt",
        "summary": "Standard residential lease agreement for a 3BHK flat in Indiranagar, Bengaluru. Contains aggressive security deposit deductions and unilateral termination terms.",
        "text": """RESIDENTIAL LEASE AGREEMENT

This Rental Agreement is made and executed on this 1st day of April 2026, by and between:
LANDLORD: Sri Rajesh Kumar, residing at HSR Layout, Bengaluru (hereinafter referred to as the 'LESSOR').
TENANT: Ananya Sharma, residing at Indiranagar, Bengaluru (hereinafter referred to as the 'LESSEE').

WHEREAS the Lessor is the absolute owner of Flat No. 402, Sunshine Heights, Indiranagar, Bengaluru - 560038.

TERMS AND CONDITIONS:

1. RENT AND TENURE:
The Lessee agrees to pay a monthly rent of Rs. 45,000 (Forty-Five Thousand Rupees) payable on or before the 5th day of every calendar month. The lease period shall be for 11 months commencing from 1st April 2026.

2. SECURITY DEPOSIT AND DEDUCTIONS:
The Lessee has paid a Security Deposit of Rs. 4,500,000 (10 Months Rent) to the Lessor. The Lessor reserves the right to deduct a mandatory non-refundable painting and deep-cleaning charge equivalent to 1.5 months' rent (Rs. 67,500) upon termination, regardless of tenancy duration or actual condition of the property.

3. UNILATERAL RENT ESCALATION:
The Lessor reserves the absolute right to increase the monthly rent by up to 20% at any time during the tenancy period upon providing a 7-day verbal notice to the Lessee. Failure to accept the revised rent within 7 days shall result in immediate forfeiture of security deposit and lock-out.

4. MAINTENANCE & UTILITIES:
The Lessee shall bear all apartment society maintenance fees, electricity bills, and water charges. Major structural repairs including plumbing leaks and wall dampness shall be entirely funded by the Lessee.

5. TERMINATION AND NOTICE PERIOD:
The Lessee must provide a mandatory 3-month written notice prior to vacating. If the Lessee vacates prior to 11 months, the entire security deposit shall be forfeited as liquidated damages. Conversely, the Lessor may terminate this agreement at any time with 24 hours notice without cause.

6. RESTRICTIONS & ENTRY:
No pets, unmarried guests of opposite sex, or late-night social gatherings past 10 PM are permitted. The Lessor or Lessor's representatives reserve the right to inspect the premises at any hour without prior appointment.

7. DISPUTE RESOLUTION & JURISDICTION:
In the event of any legal dispute, courts in Bengaluru shall have jurisdiction, and the Lessee shall reimburse all legal and lawyer expenses incurred by the Lessor.
""",
        "clauses": [
            {
                "id": "c1",
                "original_text": "The Lessee has paid a Security Deposit of Rs. 4,500,000 (10 Months Rent) to the Lessor. The Lessor reserves the right to deduct a mandatory non-refundable painting and deep-cleaning charge equivalent to 1.5 months' rent (Rs. 67,500) upon termination, regardless of tenancy duration or actual condition of the property.",
                "clause_type": "Security Deposit & Deductions",
                "risk_level": "HIGH",
                "plain_english_explanation": "You are paying a massive 10-month deposit, and the landlord is automatically keeping 1.5 months of rent (Rs. 67,500) for painting when you leave, even if the flat is spotless.",
                "risk_reasoning": "Under the Draft Model Tenancy Act 2021 (Sec 13), security deposits for residential flats are capped at 2 months' rent. Automatic deductions without proof of damage violate tenant rights.",
                "suggested_negotiation_text": "The Security Deposit shall be equivalent to 2 months' rent (Rs. 90,000), fully refundable upon vacating. Deductions for painting shall only apply if physical damage exceeds fair wear and tear, backed by repair receipts."
            },
            {
                "id": "c2",
                "original_text": "The Lessor reserves the absolute right to increase the monthly rent by up to 20% at any time during the tenancy period upon providing a 7-day verbal notice to the Lessee. Failure to accept the revised rent within 7 days shall result in immediate forfeiture of security deposit and lock-out.",
                "clause_type": "Rent Revision",
                "risk_level": "HIGH",
                "plain_english_explanation": "Landlord can randomly raise your rent by 20% with only 7 days verbal notice, and kick you out / steal your deposit if you refuse.",
                "risk_reasoning": "Rent cannot be revised arbitrarily during an 11-month contract. Model Tenancy Act requires 3 months advance written notice for rent revision.",
                "suggested_negotiation_text": "Rent shall remain fixed at Rs. 45,000/month for the 11-month duration. Any escalation upon renewal shall not exceed 5% to 8%, agreed in writing 60 days prior to expiry."
            },
            {
                "id": "c3",
                "original_text": "The Lessee must provide a mandatory 3-month written notice prior to vacating. If the Lessee vacates prior to 11 months, the entire security deposit shall be forfeited as liquidated damages. Conversely, the Lessor may terminate this agreement at any time with 24 hours notice without cause.",
                "clause_type": "Termination & Notice Period",
                "risk_level": "HIGH",
                "plain_english_explanation": "Grossly unfair double standard: You have to give 3 months notice and risk losing your entire deposit, while the landlord can kick you out in 24 hours.",
                "risk_reasoning": "Unilateral one-sided termination rights create extreme insecurity and violate basic contract principles.",
                "suggested_negotiation_text": "Either party may terminate this agreement by providing 1 month (30 days) written notice or rent in lieu thereof. Neither party shall forfeit deposits without cause."
            },
            {
                "id": "c4",
                "original_text": "Major structural repairs including plumbing leaks and wall dampness shall be entirely funded by the Lessee.",
                "clause_type": "Maintenance & Repairs",
                "risk_level": "MEDIUM",
                "plain_english_explanation": "You are being forced to pay for structural building damage, plumbing overhauls, and wall dampness which are building maintenance costs.",
                "risk_reasoning": "Landlord is responsible for structural integrity, roof leaks, and main line plumbing unless damaged intentionally by the tenant.",
                "suggested_negotiation_text": "Lessor shall be responsible for all structural repairs, main plumbing, electrical wiring, and seepage repairs. Lessee shall handle minor routine maintenance (e.g. bulb replacements, tap washer fixes)."
            },
            {
                "id": "c5",
                "original_text": "The Lessor or Lessor's representatives reserve the right to inspect the premises at any hour without prior appointment.",
                "clause_type": "Privacy & Landlord Entry",
                "risk_level": "MEDIUM",
                "plain_english_explanation": "Landlord claims the right to enter your home at any time of day or night without giving you advance notice.",
                "risk_reasoning": "Violates tenant's right to quiet enjoyment of property. Model Tenancy Act mandates minimum 24-hour advance notice for inspections.",
                "suggested_negotiation_text": "The Lessor may inspect the premises with at least 24 hours advance written notice, during reasonable daytime hours (10 AM to 6 PM)."
            },
            {
                "id": "c6",
                "original_text": "The Lessee agrees to pay a monthly rent of Rs. 45,000 (Forty-Five Thousand Rupees) payable on or before the 5th day of every calendar month. The lease period shall be for 11 months commencing from 1st April 2026.",
                "clause_type": "Rent Term & Payment",
                "risk_level": "LOW",
                "plain_english_explanation": "Standard rent clause setting payment date on the 5th of each month for an 11-month tenure.",
                "risk_reasoning": "Standard commercial and residential leasing term in India.",
                "suggested_negotiation_text": "Standard clause; no change required."
            }
        ]
    },

    "hdfc_loan": {
        "id": "hdfc_loan",
        "title": "Personal & Home Loan Contract Sample",
        "doc_type": "Loan Agreement",
        "filename": "Personal_Loan_Agreement_Sample.txt",
        "summary": "Personal loan agreement with high default penal interest rates, ambiguous foreclosure penalties, and unilateral rate adjustment rights.",
        "text": """PERSONAL LOAN AGREEMENT

LENDER: Commercial Banking Corporation India Ltd.
BORROWER: Vikram Aditya

LOAN DETAILS:
Principal Loan Amount: Rs. 1,000,000 (Ten Lakh Rupees)
Interest Rate: 12.5% per annum (Floating)
Tenure: 60 Months

TERMS AND CONDITIONS:

1. REPAYMENT & EMI:
The Borrower shall repay the loan in 60 Equated Monthly Installments (EMIs) of Rs. 22,498. Payment default past due date shall incur a penal interest of 36% per annum compounded monthly.

2. FORECLOSURE & PREPAYMENT:
In the event the Borrower desires to prepay or foreclose the loan prior to maturity, a mandatory foreclosure charge of 5% on the outstanding principal balance plus GST shall be levied.

3. UNILATERAL INTEREST RATE RESET:
The Lender reserves the right to reset or increase interest rates at its sole discretion without prior notification to the Borrower, effective immediately upon internal review.

4. RECOVERY & SEIZURE:
Upon a single default in EMI payment, the Lender may declare the entire loan balance immediately due and deploy third-party recovery agents to inspect or repossess assets without judicial order.
""",
        "clauses": [
            {
                "id": "l1",
                "original_text": "Payment default past due date shall incur a penal interest of 36% per annum compounded monthly.",
                "clause_type": "Penal Interest Rate",
                "risk_level": "HIGH",
                "plain_english_explanation": "If you miss an EMI payment, you are hit with an exorbitant 36% annual penal interest rate compounded monthly.",
                "risk_reasoning": "Excessive compounding penal interest violates RBI Fair Practices guidelines. Penal charges must be reasonable and non-capitalized.",
                "suggested_negotiation_text": "Penal interest for late payment shall be capped at 2% per month on the overdue EMI amount only, with a 5-day grace period."
            },
            {
                "id": "l2",
                "original_text": "In the event the Borrower desires to prepay or foreclose the loan prior to maturity, a mandatory foreclosure charge of 5% on the outstanding principal balance plus GST shall be levied.",
                "clause_type": "Prepayment / Foreclosure Penalty",
                "risk_level": "HIGH",
                "plain_english_explanation": "You are penalized 5% + GST if you pay off your loan early using your own money.",
                "risk_reasoning": "RBI rules prohibit foreclosure charges / prepayment penalties on floating rate loans for individual borrowers.",
                "suggested_negotiation_text": "Zero foreclosure or prepayment penalty shall apply for prepayment made from individual borrower's own funds as per RBI directives."
            },
            {
                "id": "l3",
                "original_text": "The Lender reserves the right to reset or increase interest rates at its sole discretion without prior notification to the Borrower, effective immediately upon internal review.",
                "clause_type": "Interest Rate Revision",
                "risk_level": "HIGH",
                "plain_english_explanation": "Bank can raise your interest rate whenever they want without telling you in advance.",
                "risk_reasoning": "Lenders are mandated by RBI to link floating rates to external benchmarks (e.g. Repo rate) and communicate changes in advance.",
                "suggested_negotiation_text": "Interest rate adjustments shall be strictly linked to the RBI Repo Rate / EBLR benchmark and communicated to Borrower at least 30 days in advance."
            }
        ]
    },

    "saas_tos": {
        "id": "saas_tos",
        "title": "SaaS Platform Terms of Service",
        "doc_type": "Terms of Service",
        "filename": "SaaS_Platform_ToS.txt",
        "summary": "Standard Software-as-a-Service terms with broad IP assignment, total liability cap of $10, and mandatory foreign arbitration.",
        "text": """TERMS OF SERVICE & END USER LICENSE AGREEMENT

1. INTELLECTUAL PROPERTY & CONTENT LICENSING:
By uploading or processing data through the Platform, User grants the Company a perpetual, worldwide, irrevocable, royalty-free license to use, sub-license, train AI models, and commercialize all uploaded content without attribution or compensation.

2. LIMITATION OF LIABILITY:
To the maximum extent permitted by law, the Company's aggregate cumulative liability for any claim arising out of or related to the Service shall be capped at $10 (Ten US Dollars), regardless of loss of data or business destruction.

3. AUTOMATIC RENEWAL & CANCELLATION:
Subscriptions automatically renew annually at the prevailing non-discounted rate. Cancellations must be submitted in writing exactly 60 days prior to renewal. No partial refunds shall be granted.
""",
        "clauses": [
            {
                "id": "s1",
                "original_text": "By uploading or processing data through the Platform, User grants the Company a perpetual, worldwide, irrevocable, royalty-free license to use, sub-license, train AI models, and commercialize all uploaded content without attribution or compensation.",
                "clause_type": "IP & Content Ownership",
                "risk_level": "HIGH",
                "plain_english_explanation": "By using the app, you give away full rights to your uploaded data forever, including allowing them to sell it or train AI on it without paying you.",
                "risk_reasoning": "Loss of data sovereignty and potential exposure of proprietary enterprise data.",
                "suggested_negotiation_text": "User retains full ownership of all uploaded data. Company is granted a limited, non-exclusive license solely to process data to provide the Service during the active subscription period."
            },
            {
                "id": "s2",
                "original_text": "To the maximum extent permitted by law, the Company's aggregate cumulative liability for any claim arising out of or related to the Service shall be capped at $10 (Ten US Dollars), regardless of loss of data or business destruction.",
                "clause_type": "Limitation of Liability",
                "risk_level": "HIGH",
                "plain_english_explanation": "Even if the app causes total loss of your business or leaks confidential data, they will pay you maximum $10.",
                "risk_reasoning": "Extremely low liability cap shifts all operational risk onto the customer.",
                "suggested_negotiation_text": "Company's liability shall be limited to the total fees paid by Customer in the 12 months preceding the claim, excluding gross negligence or confidentiality breaches."
            }
        ]
    }
}
