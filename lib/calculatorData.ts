import {
    Coins,
    Home,
    TrendingUp,
    Calculator,
    Percent,
    Landmark,
    PiggyBank,
    BadgeIndianRupee,
    Receipt,
    Wallet,
    BarChart3,
    ArrowUpDown,
    Building2,
    ShieldCheck,
    Banknote,
    HandCoins,
    type LucideIcon,
} from 'lucide-react';

export type CalculatorCategory = 'gold-finance' | 'loans' | 'tax-savings' | 'investments';

export interface CalculatorInfo {
    slug: string;
    title: string;
    shortTitle: string;
    description: string;
    icon: LucideIcon;
    color: string;
    bgColor: string;
    category: CalculatorCategory;
    features: string[];
    keywords: string[];
    faqs: { question: string; answer: string }[];
}

export const CALCULATOR_CATEGORIES: Record<CalculatorCategory, { title: string; description: string }> = {
    'gold-finance': {
        title: 'Gold & Finance',
        description: 'Gold purchase, loan, and precious metal calculators',
    },
    loans: {
        title: 'Loan Calculators',
        description: 'EMI, home loan, and interest calculators',
    },
    'tax-savings': {
        title: 'Tax & Savings',
        description: 'Tax exemption, provident fund, and gratuity calculators',
    },
    investments: {
        title: 'Investment Calculators',
        description: 'SIP, mutual fund, NPS, and wealth planning calculators',
    },
};

export const CATEGORY_LABELS: Record<CalculatorCategory, string> = {
    'gold-finance': 'Gold & Finance',
    loans: 'Loan Calculators',
    'tax-savings': 'Tax & Savings',
    investments: 'Investment Calculators',
};

export const CALCULATORS: CalculatorInfo[] = [
    // ── Gold & Finance ──
    {
        slug: 'gold',
        title: 'Gold Calculator',
        shortTitle: 'Gold',
        description:
            'Calculate the total cost of your gold purchase including weight, rate, making charges, and GST. Get a detailed price breakdown instantly.',
        icon: Coins,
        color: 'from-amber-500 to-yellow-500',
        bgColor: 'from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30',
        category: 'gold-finance',
        features: ['Weight calculation', 'Making charges', 'GST calculation', 'Price breakdown'],
        keywords: [
            'gold calculator',
            'gold price calculator',
            'gold calculator with making charges',
            'gold purchase calculator',
            'gold calculator india',
            'gold rate calculator',
            'gold jewellery calculator',
            'gold cost calculator with gst',
        ],
        faqs: [
            {
                question: 'How is gold price calculated?',
                answer: 'Gold price is calculated by multiplying the weight (in grams) by the per-gram gold rate. Making charges (percentage or fixed) and GST (3%) are then added to get the final cost.',
            },
            {
                question: 'What are making charges on gold?',
                answer: 'Making charges are the fees jewellers charge for crafting jewellery. They typically range from 6% to 25% of the gold value depending on design complexity.',
            },
            {
                question: 'What is the GST rate on gold in India?',
                answer: 'GST on gold in India is 3% on the value of gold plus making charges. An additional 5% GST is charged on making charges if billed separately.',
            },
        ],
    },
    {
        slug: 'gold-loan',
        title: 'Gold Loan Calculator',
        shortTitle: 'Gold Loan',
        description:
            'Calculate gold loan amount, interest, and repayment based on your gold weight, purity, and LTV ratio. Compare lender rates.',
        icon: TrendingUp,
        color: 'from-green-500 to-emerald-500',
        bgColor: 'from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30',
        category: 'gold-finance',
        features: ['Loan amount', 'Interest calculation', 'Repayment schedule', 'LTV ratio'],
        keywords: [
            'gold loan calculator',
            'gold loan emi calculator',
            'gold loan interest calculator',
            'gold loan amount calculator',
            'gold loan calculator india',
            'muthoot gold loan calculator',
            'manappuram gold loan calculator',
        ],
        faqs: [
            {
                question: 'How is gold loan amount calculated?',
                answer: 'Gold loan amount is calculated based on the gold value (weight × rate) multiplied by the Loan-to-Value (LTV) ratio. RBI allows a maximum LTV of 75% for gold loans.',
            },
            {
                question: 'What is LTV ratio in gold loan?',
                answer: 'LTV (Loan-to-Value) ratio is the percentage of gold value that a lender will provide as a loan. Most lenders offer 65-75% LTV for gold loans.',
            },
        ],
    },

    // ── Loans ──
    {
        slug: 'emi',
        title: 'EMI Calculator',
        shortTitle: 'EMI',
        description:
            'Calculate monthly EMI for home loan, car loan, personal loan, and education loan. Get instant EMI calculation with amortization schedule.',
        icon: Calculator,
        color: 'from-violet-500 to-purple-500',
        bgColor: 'from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30',
        category: 'loans',
        features: ['EMI calculation', 'Interest breakdown', 'Amortization schedule', 'Multiple loan types'],
        keywords: [
            'emi calculator',
            'loan emi calculator',
            'home loan emi calculator',
            'car loan emi calculator',
            'personal loan emi calculator',
            'education loan emi',
            'emi calculation',
            'loan calculator',
        ],
        faqs: [
            {
                question: 'What is EMI?',
                answer: 'EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month.',
            },
            {
                question: 'How is EMI calculated?',
                answer: 'EMI is calculated using the formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P is the loan amount, R is the monthly interest rate, and N is the loan tenure in months.',
            },
            {
                question: 'What factors affect EMI?',
                answer: 'Three main factors affect EMI: 1) Loan Amount (Principal), 2) Interest Rate, and 3) Loan Tenure. Higher loan amount or interest rate increases EMI, while longer tenure reduces monthly EMI but increases total interest.',
            },
        ],
    },
    {
        slug: 'home-loan',
        title: 'Home Loan Calculator',
        shortTitle: 'Home Loan',
        description:
            'Calculate your home loan EMI, total interest payable, and loan repayment schedule. Get instant results with our easy-to-use home loan EMI calculator.',
        icon: Home,
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30',
        category: 'loans',
        features: ['EMI calculation', 'Interest breakdown', 'Amortization schedule', 'Prepayment analysis'],
        keywords: [
            'home loan calculator',
            'home loan emi calculator',
            'housing loan calculator',
            'mortgage calculator india',
            'home loan interest calculator',
            'loan calculator online',
        ],
        faqs: [
            {
                question: 'What is a home loan EMI?',
                answer: 'Home loan EMI is the fixed monthly payment you make towards repaying your housing loan. It includes both principal repayment and interest components.',
            },
            {
                question: 'What is the current home loan interest rate?',
                answer: 'Home loan interest rates in India typically range from 8.25% to 9.5% per annum depending on the bank and borrower profile. SBI, HDFC, and ICICI offer competitive rates.',
            },
        ],
    },
    {
        slug: 'simple-interest',
        title: 'Simple Interest Calculator',
        shortTitle: 'Simple Interest',
        description:
            'Calculate simple interest on loans and deposits. Find interest amount and total payable using the SI formula. Easy and accurate.',
        icon: Percent,
        color: 'from-teal-500 to-cyan-500',
        bgColor: 'from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30',
        category: 'loans',
        features: ['SI calculation', 'Total interest', 'Maturity amount', 'Year-wise breakdown'],
        keywords: [
            'simple interest calculator',
            'si calculator',
            'simple interest formula calculator',
            'loan interest calculator',
            'simple interest calculator india',
        ],
        faqs: [
            {
                question: 'What is the simple interest formula?',
                answer: 'Simple Interest = (P × R × T) / 100, where P is the principal amount, R is the annual interest rate, and T is the time period in years.',
            },
            {
                question: 'What is the difference between simple and compound interest?',
                answer: 'Simple interest is calculated only on the principal amount, while compound interest is calculated on the principal plus accumulated interest. Compound interest grows faster over time.',
            },
        ],
    },

    // ── Tax & Savings ──
    {
        slug: 'gst',
        title: 'GST Calculator',
        shortTitle: 'GST',
        description:
            'Calculate Goods and Services Tax instantly. Add or remove GST from any amount with CGST, SGST, and IGST breakdown for all rates.',
        icon: Receipt,
        color: 'from-orange-500 to-red-500',
        bgColor: 'from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30',
        category: 'tax-savings',
        features: ['Add/Remove GST', 'CGST & SGST split', 'IGST calculation', 'All GST rates'],
        keywords: [
            'gst calculator',
            'gst calculator india',
            'goods and services tax calculator',
            'cgst sgst calculator',
            'igst calculator',
            'add gst calculator',
            'remove gst calculator',
        ],
        faqs: [
            {
                question: 'What are the GST rates in India?',
                answer: 'GST rates in India are 0%, 5%, 12%, 18%, and 28%. Essential items are taxed at 0%, household necessities at 5%, processed foods at 12%, most goods and services at 18%, and luxury items at 28%.',
            },
            {
                question: 'What is the difference between CGST, SGST, and IGST?',
                answer: 'CGST (Central GST) and SGST (State GST) are levied on intra-state transactions and split equally. IGST (Integrated GST) is levied on inter-state transactions at the full GST rate.',
            },
        ],
    },
    {
        slug: 'hra',
        title: 'HRA Calculator',
        shortTitle: 'HRA',
        description:
            'Calculate your House Rent Allowance tax exemption for metro and non-metro cities. Find out how much HRA is exempt from income tax.',
        icon: Building2,
        color: 'from-indigo-500 to-blue-500',
        bgColor: 'from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30',
        category: 'tax-savings',
        features: ['HRA exemption', 'Metro/Non-Metro', 'Tax savings', 'Detailed breakdown'],
        keywords: [
            'hra calculator',
            'house rent allowance calculator',
            'hra exemption calculator',
            'hra tax benefit calculator',
            'hra calculation',
            'metro hra calculator',
        ],
        faqs: [
            {
                question: 'How is HRA exemption calculated?',
                answer: 'HRA exemption is the minimum of: (1) Actual HRA received, (2) Rent paid minus 10% of basic salary, (3) 50% of basic salary for metro cities or 40% for non-metro cities.',
            },
            {
                question: 'Which cities are considered metro for HRA?',
                answer: 'Delhi, Mumbai, Kolkata, and Chennai are considered metro cities for HRA calculation. For these cities, 50% of basic salary is used; for all other cities, 40% is used.',
            },
        ],
    },
    {
        slug: 'gratuity',
        title: 'Gratuity Calculator',
        shortTitle: 'Gratuity',
        description:
            'Calculate your gratuity amount as per Payment of Gratuity Act, 1972. Find out your gratuity on retirement or resignation.',
        icon: HandCoins,
        color: 'from-rose-500 to-pink-500',
        bgColor: 'from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30',
        category: 'tax-savings',
        features: ['Gratuity calculation', 'As per Indian law', 'Tax-free up to ₹20L', 'Service years'],
        keywords: [
            'gratuity calculator',
            'gratuity calculation',
            'gratuity calculator india',
            'payment of gratuity act calculator',
            'retirement gratuity calculator',
        ],
        faqs: [
            {
                question: 'How is gratuity calculated?',
                answer: 'Gratuity = (Last drawn salary × 15 × Years of service) / 26. Last drawn salary includes basic salary and dearness allowance.',
            },
            {
                question: 'Who is eligible for gratuity?',
                answer: 'An employee who has completed at least 5 years of continuous service in an organization is eligible for gratuity. The 5-year rule may be relaxed in cases of death or disability.',
            },
        ],
    },
    {
        slug: 'epf',
        title: 'EPF Calculator',
        shortTitle: 'EPF',
        description:
            'Calculate Employees Provident Fund maturity amount, pension, and returns. Plan your retirement with our online EPF calculator.',
        icon: ShieldCheck,
        color: 'from-emerald-500 to-green-500',
        bgColor: 'from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30',
        category: 'tax-savings',
        features: ['EPF maturity', 'EPS pension', 'Interest calculation', 'Year-wise growth'],
        keywords: [
            'epf calculator',
            'employees provident fund calculator',
            'epf calculator online',
            'epf maturity calculator',
            'pf calculator',
            'epf pension calculator',
        ],
        faqs: [
            {
                question: 'What is the current EPF interest rate?',
                answer: 'The current EPF interest rate is 8.25% per annum (FY 2024-25). This rate is decided by the EPFO and the Ministry of Finance annually.',
            },
            {
                question: 'How is EPF calculated?',
                answer: 'Both employee and employer contribute 12% of basic salary + DA to EPF. The employer\'s 12% is split: 8.33% to EPS (pension) and 3.67% to EPF. Interest is calculated monthly on the running balance.',
            },
        ],
    },
    {
        slug: 'ppf',
        title: 'PPF Calculator',
        shortTitle: 'PPF',
        description:
            'Calculate Public Provident Fund returns, maturity amount, and interest. Plan your PPF investment with year-wise projections.',
        icon: PiggyBank,
        color: 'from-sky-500 to-blue-500',
        bgColor: 'from-sky-100 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/30',
        category: 'tax-savings',
        features: ['Maturity amount', '15-year projection', 'Interest earned', 'Tax benefits'],
        keywords: [
            'ppf calculator',
            'public provident fund calculator',
            'ppf calculator online',
            'ppf maturity calculator',
            'ppf interest calculator',
        ],
        faqs: [
            {
                question: 'What is the current PPF interest rate?',
                answer: 'The current PPF interest rate is 7.1% per annum (as of 2024), compounded annually. The interest rate is set by the Government of India and is reviewed quarterly.',
            },
            {
                question: 'Is PPF tax-free?',
                answer: 'Yes, PPF offers EEE (Exempt-Exempt-Exempt) tax benefits. The investment qualifies for deduction under Section 80C (up to ₹1.5 lakh), the interest earned is tax-free, and the maturity amount is tax-free.',
            },
        ],
    },

    // ── Investments ──
    {
        slug: 'sip',
        title: 'SIP Calculator',
        shortTitle: 'SIP',
        description:
            'Calculate mutual fund SIP returns and plan your systematic investments. Visualize wealth growth with step-up SIP and goal-based planning.',
        icon: BarChart3,
        color: 'from-fuchsia-500 to-purple-500',
        bgColor: 'from-fuchsia-100 to-purple-100 dark:from-fuchsia-900/30 dark:to-purple-900/30',
        category: 'investments',
        features: ['SIP returns', 'Step-up SIP', 'Goal planning', 'Visual charts'],
        keywords: [
            'sip calculator',
            'sip return calculator',
            'mutual fund sip calculator',
            'step up sip calculator',
            'sip calculator online',
            'systematic investment plan calculator',
        ],
        faqs: [
            {
                question: 'What is a SIP Calculator?',
                answer: 'A SIP Calculator helps you calculate the returns on your Systematic Investment Plan (SIP) investments in mutual funds. It shows how much wealth you can accumulate by investing a fixed amount regularly.',
            },
            {
                question: 'What is the expected return rate for SIP?',
                answer: 'Expected return rates vary by fund type: Equity funds typically offer 12-15%, balanced funds 10-12%, and debt funds 7-9% over the long term. Past performance does not guarantee future returns.',
            },
        ],
    },
    {
        slug: 'swp',
        title: 'SWP Calculator',
        shortTitle: 'SWP',
        description:
            'Calculate Systematic Withdrawal Plan returns, final corpus, and monthly withdrawals. Plan your retirement income effectively.',
        icon: ArrowUpDown,
        color: 'from-cyan-500 to-teal-500',
        bgColor: 'from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30',
        category: 'investments',
        features: ['Monthly income', 'Final corpus', 'Withdrawal plan', 'Year-wise breakdown'],
        keywords: [
            'swp calculator',
            'systematic withdrawal plan calculator',
            'swp calculator online',
            'swp mutual fund calculator',
            'retirement withdrawal calculator',
        ],
        faqs: [
            {
                question: 'What is SWP?',
                answer: 'SWP (Systematic Withdrawal Plan) allows you to withdraw a fixed amount regularly from your mutual fund investment while the remaining amount continues to earn returns.',
            },
            {
                question: 'Is SWP better than FD for retirement?',
                answer: 'SWP can offer potentially higher returns (10-12% vs 6-7%), tax efficiency, and flexibility. However, SWP involves market risk unlike FDs.',
            },
        ],
    },
    {
        slug: 'mutual-fund',
        title: 'Mutual Fund Calculator',
        shortTitle: 'Mutual Fund',
        description:
            'Calculate mutual fund returns for SIP and lumpsum investments. Estimate returns for equity, debt, and hybrid funds.',
        icon: Wallet,
        color: 'from-lime-500 to-green-500',
        bgColor: 'from-lime-100 to-green-100 dark:from-lime-900/30 dark:to-green-900/30',
        category: 'investments',
        features: ['SIP & Lumpsum', 'Returns estimation', 'Fund comparison', 'Visual charts'],
        keywords: [
            'mutual fund calculator',
            'mf calculator',
            'mutual fund returns calculator',
            'sip mutual fund calculator',
            'lumpsum calculator',
            'equity fund calculator',
        ],
        faqs: [
            {
                question: 'How are mutual fund returns calculated?',
                answer: 'Mutual fund returns are calculated using CAGR for lumpsum and XIRR for SIP investments. The returns include capital appreciation and dividend reinvestments.',
            },
            {
                question: 'What is the difference between SIP and Lumpsum?',
                answer: 'SIP involves investing a fixed amount regularly (monthly/weekly), which benefits from rupee cost averaging. Lumpsum is a one-time investment of a large amount.',
            },
        ],
    },
    {
        slug: 'cagr',
        title: 'CAGR Calculator',
        shortTitle: 'CAGR',
        description:
            'Calculate Compound Annual Growth Rate for investments. Measure mean annual growth rate of stocks, mutual funds, and portfolios.',
        icon: TrendingUp,
        color: 'from-amber-500 to-orange-500',
        bgColor: 'from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30',
        category: 'investments',
        features: ['CAGR calculation', 'Growth analysis', 'Investment comparison', 'Period flexibility'],
        keywords: [
            'cagr calculator',
            'compound annual growth rate calculator',
            'cagr calculator india',
            'investment growth calculator',
            'stock cagr calculator',
        ],
        faqs: [
            {
                question: 'What is CAGR?',
                answer: 'CAGR (Compound Annual Growth Rate) represents the mean annual growth rate of an investment over a specific period assuming profits are reinvested. Formula: CAGR = (Ending Value / Beginning Value)^(1/n) - 1.',
            },
            {
                question: 'Why is CAGR important?',
                answer: 'CAGR smooths out volatility and provides a consistent measure to compare different investments over different time periods. It is the standard metric used to evaluate investment performance.',
            },
        ],
    },
    {
        slug: 'nps',
        title: 'NPS Calculator',
        shortTitle: 'NPS',
        description:
            'Calculate National Pension System returns and retirement corpus. Plan your retirement with NPS investment and tax benefit calculations.',
        icon: Landmark,
        color: 'from-pink-500 to-rose-500',
        bgColor: 'from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30',
        category: 'investments',
        features: ['Retirement corpus', 'Pension estimation', 'Tax benefits', 'Growth projection'],
        keywords: [
            'nps calculator',
            'national pension system calculator',
            'nps return calculator',
            'nps maturity calculator',
            'pension calculator india',
        ],
        faqs: [
            {
                question: 'What is NPS?',
                answer: 'NPS (National Pension System) is a government-sponsored retirement savings scheme that allows you to invest in pension funds managed by registered fund managers.',
            },
            {
                question: 'What are the tax benefits of NPS?',
                answer: 'NPS offers tax benefits under Section 80CCD(1) up to ₹1.5 lakh and additional ₹50,000 under 80CCD(1B). On maturity, 60% of the corpus is tax-free.',
            },
        ],
    },
    {
        slug: 'fd',
        title: 'FD Calculator',
        shortTitle: 'FD',
        description:
            'Calculate Fixed Deposit maturity amount and interest. Compare FD rates from SBI, HDFC, ICICI with different compounding frequencies.',
        icon: Banknote,
        color: 'from-yellow-500 to-amber-500',
        bgColor: 'from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30',
        category: 'investments',
        features: ['Maturity amount', 'Interest earned', 'Compounding options', 'Bank comparison'],
        keywords: [
            'fd calculator',
            'fixed deposit calculator',
            'fd maturity calculator',
            'fd interest calculator',
            'sbi fd calculator',
            'hdfc fd calculator',
        ],
        faqs: [
            {
                question: 'How is FD interest calculated?',
                answer: 'FD interest is calculated using compound interest formula: A = P(1 + r/n)^(n*t), where P is principal, r is annual rate, n is compounding frequency, and t is tenure in years.',
            },
            {
                question: 'What are the compounding options for FD?',
                answer: 'FDs can be compounded monthly, quarterly, half-yearly, or yearly. Quarterly compounding is most common. More frequent compounding yields slightly higher returns.',
            },
        ],
    },
];

export function getCalculatorBySlug(slug: string): CalculatorInfo | undefined {
    return CALCULATORS.find((c) => c.slug === slug);
}

export function getCalculatorsByCategory(category: CalculatorCategory): CalculatorInfo[] {
    return CALCULATORS.filter((c) => c.category === category);
}

export function getAllCalculatorSlugs(): string[] {
    return CALCULATORS.map((c) => c.slug);
}
