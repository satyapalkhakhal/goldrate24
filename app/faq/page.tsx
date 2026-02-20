import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronDown, HelpCircle, TrendingUp, Calculator, Building, Shield } from 'lucide-react';

export const metadata: Metadata = {
    title: 'FAQ - Frequently Asked Questions About Gold Rates & Investment | GoldRate24',
    description: 'Get answers to the most common questions about gold rates in India, gold investment, 22K vs 24K gold, making charges, gold loans, and our free calculators.',
    keywords: [
        'gold rate FAQ',
        'gold investment questions india',
        'how is gold rate calculated',
        'gold rate FAQ india',
        '22k 24k gold FAQ',
        'gold loan FAQ',
        'gold calculator help',
    ],
    openGraph: {
        title: 'Gold Rate FAQ - Frequently Asked Questions | GoldRate24',
        description: 'Answers to common questions about gold rates, investment options, and financial calculators in India.',
        type: 'website',
        url: '/faq',
        siteName: 'GoldRate24',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Gold Rate FAQ - GoldRate24',
        description: 'Get expert answers to your gold rate and investment questions.',
    },
    alternates: { canonical: '/faq' },
    robots: { index: true, follow: true },
};

const faqCategories = [
    {
        icon: TrendingUp,
        title: 'Gold Rates & Prices',
        color: 'amber',
        faqs: [
            {
                question: 'How is the gold rate determined in India each day?',
                answer: 'Gold rates in India are determined by several factors: the international gold spot price (in USD/troy ounce), the USD to INR exchange rate, import duty (currently 6%), GST (3%), and local demand-supply conditions. The Multi Commodity Exchange (MCX) in India sets the benchmark domestic gold prices. GoldRate24 aggregates data from MCX and verified jewelers to display accurate rates.',
            },
            {
                question: 'Why do gold rates differ from city to city in India?',
                answer: 'Gold rates vary across Indian cities due to local taxes (octroi, municipal levies), transportation costs, local jewelers\' association rates, and regional demand-supply variations. Cities like Chennai and Kerala typically have slightly higher rates due to strong gold demand, while prices in North India may differ slightly from South India. The difference is usually ₹100-500 per 10 grams between cities.',
            },
            {
                question: 'Why is the gold price on GoldRate24 slightly different from my local jeweler?',
                answer: 'The rates displayed on GoldRate24 are market/standard rates. Your local jeweler may charge slightly more due to their own margin, local taxes, or association rates. Additionally, jewelers add making charges (8-25%) and GST on top of the base gold rate. Use our Gold Calculator to estimate the final cost including all charges.',
            },
            {
                question: 'How often are gold rates updated on GoldRate24?',
                answer: 'We update gold rates every hour during market hours (9:00 AM to 11:30 PM IST, Monday to Friday). On weekends and holidays, we display the last traded price. Our live ticker updates automatically — no need to refresh the page.',
            },
            {
                question: 'What is the difference between 24K, 22K, and 18K gold rates?',
                answer: '24K gold is 99.9% pure and trades at the highest price. 22K gold (91.6% pure) is approximately 8% cheaper per gram and is used for jewelry. 18K gold (75% pure) is about 25% cheaper than 24K and is used for studded jewelry with gemstones. GoldRate24 shows all three rates alongside each other for easy comparison.',
            },
            {
                question: 'What is 916 gold? Is it the same as 22K gold?',
                answer: 'Yes, 916 gold is exactly the same as 22K gold. The "916" refers to the purity stamp — 22K gold contains 916 parts of pure gold per 1000 parts (91.6% purity). You\'ll see "916" stamped on BIS-hallmarked 22K gold jewelry. GoldRate24 displays 22K/916 gold rates for all major Indian cities.',
            },
            {
                question: 'Does the gold rate on GoldRate24 include GST and making charges?',
                answer: 'No. The gold rate shown on GoldRate24 is the base metal price without GST or making charges. This is the standard market rate used to price gold. To calculate the final jewelry purchase cost (including GST at 3%, making charges 8-25%, and wastage), use our free Gold Calculator.',
            },
            {
                question: 'What is the historical trend of gold prices in India?',
                answer: 'Gold has delivered approximately 11-12% CAGR returns over the last 20 years in India. Key milestones: In 2010, 10g of 24K gold was around ₹18,000; in 2020 (COVID peak), it crossed ₹56,000; and in 2026, it trades around ₹80,000-85,000 per 10 grams. You can view historical price charts on our Gold Rates page.',
            },
        ],
    },
    {
        icon: TrendingUp,
        title: 'Gold Investment',
        color: 'green',
        faqs: [
            {
                question: 'Is gold a good investment in India in 2026?',
                answer: 'Gold remains a sound investment for portfolio diversification in India in 2026. Financial advisors recommend allocating 10-15% of your total investment portfolio to gold. Gold provides inflation protection, acts as a safe haven during uncertainties, and benefits from rupee depreciation. However, for pure wealth creation, equity mutual funds typically outperform gold over 10-15 year horizons.',
            },
            {
                question: 'What is the best way to invest in gold in India?',
                answer: 'For most investors: (1) Sovereign Gold Bonds (SGBs) are the best option — they give 2.5% annual interest plus gold price appreciation, with tax-free returns at maturity. (2) Gold ETFs are best for regular investors wanting liquidity without storage concerns. (3) Physical gold (coins/bars) if you prefer tangible assets. (4) Avoid jewelry for investment due to 8-25% making charges that cannot be recovered on resale.',
            },
            {
                question: 'What are Sovereign Gold Bonds? How do I invest in them?',
                answer: 'Sovereign Gold Bonds are government securities issued by the Reserve Bank of India, denominated in grams of gold. They offer 2.5% annual interest (taxable), are available via banks, stock brokers, and the RBI website during subscription windows. Key benefits: no storage risk, no GST, tax-free capital gains at maturity (8 years). Minimum investment is 1 gram, maximum 4 kg per year for individuals.',
            },
            {
                question: 'Can I buy gold online in India? Is it safe?',
                answer: 'Yes, you can buy gold online through: (1) Gold ETFs via a demat account through any broker, (2) Sovereign Gold Bonds via your bank or broker, (3) Digital gold platforms: PhonePe (SafeGold), Google Pay (MMTC-PAMP), Paytm (Augmont) — starting from ₹1. Digital gold is generally safe but is NOT regulated by SEBI or RBI. For amounts over ₹50,000, prefer regulated options like SGBs or Gold ETFs.',
            },
            {
                question: 'How much gold should I own as part of my investment portfolio?',
                answer: 'Most financial advisors recommend 5-15% of your total investment portfolio in gold. The exact amount depends on your risk tolerance, investment horizon, and other assets. A conservative investor might allocate 15-20%, while an aggressive equity investor might keep only 5-10%. Use gold as a portfolio stabilizer, not your primary growth investment.',
            },
            {
                question: 'Is digital gold (PhonePe, Google Pay) safe to invest in?',
                answer: 'Digital gold is relatively safe for small amounts (under ₹50,000) as it is backed by physical gold stored in insured vaults. However, it is NOT regulated by SEBI or RBI, which means less investor protection. For larger investments, choose Sovereign Gold Bonds (RBI-backed, safest) or Gold ETFs (SEBI-regulated). Digital gold is best for convenience and small investments.',
            },
        ],
    },
    {
        icon: Calculator,
        title: 'Our Calculators',
        color: 'blue',
        faqs: [
            {
                question: 'How does the Gold Calculator on GoldRate24 work?',
                answer: 'Our Gold Calculator helps you estimate the total cost of buying gold jewelry. Enter: (1) weight in grams, (2) gold purity (24K/22K/18K), (3) making charges percentage, and (4) wastage percentage. The calculator automatically fetches the live gold rate and computes: gold value + making charges + wastage + GST (3% on gold, 5% on making) = Total Price. It also shows how much you\'d get if you sold the gold back.',
            },
            {
                question: 'What is the Gold Loan Calculator?',
                answer: 'Our Gold Loan Calculator helps you estimate the loan amount you can get against your gold. Enter the weight and purity of your gold, and it calculates the maximum eligible loan based on the current LTV ratio (Loan-to-Value) of up to 75% as per RBI guidelines. It also shows estimated EMI options at different interest rates from major banks.',
            },
            {
                question: 'Are the EMI calculations on GoldRate24 accurate?',
                answer: 'Our EMI calculator uses the standard reducing balance formula: EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ - 1), where P = principal, r = monthly interest rate, n = number of months. This matches the EMI charged by all SEBI-registered banks and NBFCs. However, actual EMI may vary slightly based on processing fees and specific bank terms.',
            },
            {
                question: 'I used the SIP Calculator — are the returns accurate?',
                answer: 'Our SIP Calculator shows projected returns based on your entered expected annual return rate. It uses compound interest (CAGR) calculation. Note: Mutual fund past returns do not guarantee future returns. The calculator is a planning tool — actual returns depend on market conditions. For historical SIP return data, consult AMFI or your mutual fund\'s fact sheet.',
            },
            {
                question: 'Can I use GoldRate24 calculators for tax planning?',
                answer: 'Our calculators (income tax, HRA, EPF, PPF, NPS) provide estimates for planning purposes. They are based on current Indian tax laws as of FY 2025-26. For official tax computation and filing, please consult a chartered accountant. Tax laws change annually and individual circumstances can significantly impact calculations.',
            },
        ],
    },
    {
        icon: Building,
        title: 'Gold Buying Tips',
        color: 'purple',
        faqs: [
            {
                question: 'How do I verify the purity of gold jewelry I buy?',
                answer: 'Verify gold purity through: (1) BIS Hallmark — look for the BIS logo, purity mark (999/916/750), and a 6-digit alphanumeric HUID number. (2) HUID Verification — scan the QR code or enter the HUID at huidgis.bis.gov.in to verify authenticity online. (3) XRF Testing — ask the jeweler for an X-ray fluorescence test, which gives exact purity. Always insist on a hallmarked bill listing weight and purity.',
            },
            {
                question: 'What is HUID (Hallmark Unique Identification number)?',
                answer: 'HUID is a unique 6-character alphanumeric code assigned to each gold jewelry piece during BIS hallmarking (mandatory since September 2021). It allows consumers and authorities to track the origin and purity of each piece. You can verify a HUID at huidgis.bis.gov.in or via the BIS Care app. Always buy gold with HUID-stamped BIS hallmark.',
            },
            {
                question: 'What making charges should I expect when buying gold jewelry?',
                answer: 'Typical making charges: Plain bangles/chains: 5-10%, Rings/simple jewelry: 10-15%, Necklaces/sets: 12-18%, Temple/antique jewelry: 15-25%, Custom designs: 15-30%. Retail chains like Tanishq may charge market-rate making charges but offer assured hallmarking and buy-back guarantees. Local jewelers may negotiate lower making charges. Use our Gold Calculator to find the effective cost.',
            },
            {
                question: 'When is the best time to buy gold — any auspicious days?',
                answer: 'Culturally, Dhanteras, Akshaya Tritiya, and Gudi Padwa are considered auspicious for gold buying. However, these days typically have HIGHER prices due to demand. For investment purposes: June-August historically has lower prices (post-wedding season lull). The best financial strategy is to invest via monthly SIP rather than timing the market. Check our live rates before any purchase.',
            },
            {
                question: 'What is the GST on gold jewelry in India?',
                answer: 'GST on gold jewelry has two components: (1) 3% GST on gold value (gold rate × weight). (2) 5% GST on making charges. Example for 10g 22K necklace at ₹7,000/g with 15% making charges: Gold GST = 3% of ₹70,000 = ₹2,100; Making GST = 5% of ₹10,500 = ₹525. Total GST = ₹2,625. Use our Gold Calculator to auto-calculate GST.',
            },
        ],
    },
    {
        icon: Shield,
        title: 'About GoldRate24',
        color: 'red',
        faqs: [
            {
                question: 'Who runs GoldRate24? Is it a reliable source?',
                answer: 'GoldRate24 is an India-focused financial information platform specializing in precious metal prices and financial calculators. Our gold rate data is sourced from MCX (Multi Commodity Exchange), verified jewelers across major Indian cities, and international spot price feeds. We are committed to accuracy and transparency, and our rates are updated hourly.',
            },
            {
                question: 'Is GoldRate24 free to use?',
                answer: 'Yes, GoldRate24 is completely free for all users. All features — live gold rates, 15+ financial calculators, city-wise rates, blog articles — are freely accessible without any registration or payment. We are supported by advertising.',
            },
            {
                question: 'Can I trust the gold rate data on GoldRate24?',
                answer: 'Yes. Our rates are sourced from reliable market data including MCX rates, verified jeweler networks, and international price feeds. We cross-check data from multiple sources before displaying. While we aim for 99%+ accuracy, gold prices fluctuate rapidly, and we recommend verifying with your local jeweler before making large purchases. Our rates serve as a reliable benchmark.',
            },
            {
                question: 'Does GoldRate24 provide financial advice?',
                answer: 'GoldRate24 provides financial information and educational content, NOT personalized financial advice. Our calculators, articles, and gold rate data are for informational purposes. For investment decisions, tax planning, or gold trading, please consult a SEBI-registered investment advisor (RIA) or a qualified financial planner. Always do your own research before investing.',
            },
            {
                question: 'How do I contact GoldRate24 if I find an error in the data?',
                answer: 'We welcome user feedback! If you notice an inaccurate gold rate, a calculator error, or content issue, please contact us via our Contact page or email at contact@goldrate24.in. We review and correct data issues within 24 hours. Accurate information is our priority.',
            },
        ],
    },
];

const colorMap: Record<string, string> = {
    amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800',
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
    red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800',
};

export default function FAQPage() {
    let totalQuestions = 0;
    faqCategories.forEach(cat => totalQuestions += cat.faqs.length);

    // Build JSON-LD FAQ structured data
    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqCategories.flatMap(cat =>
            cat.faqs.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                },
            }))
        ),
    };

    return (
        <div className="min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            {/* Hero */}
            <section className="section bg-gradient-to-b from-amber-50 via-yellow-50/50 to-white dark:from-slate-900 dark:via-amber-950/10 dark:to-slate-950">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-700 dark:text-amber-300 text-sm font-medium mb-6">
                            <HelpCircle className="w-4 h-4" />
                            {totalQuestions}+ Questions Answered
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Frequently Asked <span className="text-gradient-gold">Questions</span>
                        </h1>
                        <p className="text-lg md:text-xl text-text-secondary">
                            Everything you need to know about gold rates, investment, and our financial calculators.
                            Can&apos;t find your answer? <Link href="/contact" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">Contact us</Link>.
                        </p>
                    </div>
                </div>
            </section>

            {/* Quick Links */}
            <section className="py-8 bg-surface border-b border-border">
                <div className="container-custom">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {faqCategories.map(cat => (
                            <a
                                key={cat.title}
                                href={`#${cat.title.toLowerCase().replace(/\s+/g, '-')}`}
                                className="px-4 py-2 bg-white dark:bg-slate-800 border border-border rounded-full text-sm font-medium hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                            >
                                {cat.title}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Sections */}
            {faqCategories.map((category) => {
                const Icon = category.icon;
                const colorClass = colorMap[category.color];
                const sectionId = category.title.toLowerCase().replace(/\s+/g, '-');

                return (
                    <section key={category.title} id={sectionId} className="section scroll-mt-20">
                        <div className="container-custom">
                            <div className="max-w-4xl mx-auto">
                                {/* Category Header */}
                                <div className="flex items-center gap-3 mb-8">
                                    <div className={`p-3 rounded-xl border ${colorClass}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold">{category.title}</h2>
                                        <p className="text-sm text-text-secondary">{category.faqs.length} questions</p>
                                    </div>
                                </div>

                                {/* FAQ Items */}
                                <div className="space-y-4">
                                    {category.faqs.map((faq, idx) => (
                                        <details
                                            key={idx}
                                            className="group card overflow-hidden"
                                        >
                                            <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-colors">
                                                <h3 className="text-base md:text-lg font-semibold pr-4 leading-snug">
                                                    {faq.question}
                                                </h3>
                                                <ChevronDown className="w-5 h-5 text-text-secondary flex-shrink-0 group-open:rotate-180 transition-transform duration-200" />
                                            </summary>
                                            <div className="px-6 pb-6 text-text-secondary leading-relaxed border-t border-border pt-4">
                                                {faq.answer}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                );
            })}

            {/* Still Have Questions CTA */}
            <section className="section bg-gradient-to-r from-amber-500 to-yellow-500">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <HelpCircle className="w-12 h-12 mx-auto mb-4 text-amber-100" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Still Have Questions?
                        </h2>
                        <p className="text-lg mb-8 text-amber-100">
                            Our team is ready to help you with any gold-related questions. Reach out via our contact page.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="px-8 py-3 bg-white text-amber-600 rounded-xl font-semibold hover:bg-amber-50 transition-colors"
                            >
                                Contact Us
                            </Link>
                            <Link
                                href="/blog"
                                className="px-8 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors border border-amber-400"
                            >
                                Read Our Blog
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
