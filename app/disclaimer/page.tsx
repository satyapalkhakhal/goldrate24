import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, Info, Shield, FileText } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Disclaimer - GoldRate24 | Investment & Financial Information Disclaimer',
    description: 'Read the GoldRate24 disclaimer regarding gold rate accuracy, investment information, financial calculator results, and third-party content. Information provided is for educational purposes only.',
    keywords: ['goldrate24 disclaimer', 'gold rate disclaimer', 'investment disclaimer india', 'financial information disclaimer'],
    openGraph: {
        title: 'Disclaimer - GoldRate24',
        description: 'GoldRate24 disclaimer regarding gold rates, investment information, and financial calculators.',
        type: 'website',
        url: '/disclaimer',
        siteName: 'GoldRate24',
    },
    twitter: {
        card: 'summary',
        title: 'Disclaimer - GoldRate24',
        description: 'Important disclaimer regarding gold rates and financial information on GoldRate24.',
    },
    alternates: { canonical: '/disclaimer' },
    robots: { index: true, follow: true },
};

const sections = [
    {
        icon: Info,
        title: 'General Information Only',
        content: [
            'The information contained on GoldRate24 (goldrate24.in) is for general educational and informational purposes only. Nothing on this site constitutes professional financial, investment, legal, or tax advice.',
            'The gold rates, silver rates, financial calculations, and investment-related content provided on this website are meant to give users a general understanding of the subject matter. They should not be relied upon as the sole basis for any financial or investment decisions.',
            'We strongly recommend that you consult with a qualified SEBI-registered Investment Adviser (RIA), Chartered Accountant, or other licensed financial professional before making any investment or financial decisions.',
        ],
    },
    {
        icon: AlertTriangle,
        title: 'Gold Rate Accuracy Disclaimer',
        content: [
            'While GoldRate24 strives to provide the most accurate and up-to-date gold and silver rates, we make no guarantees or warranties — express or implied — about the completeness, accuracy, reliability, suitability, or availability of the price data.',
            'Gold and silver prices fluctuate continuously based on market conditions. The rates displayed on our website may lag real-time market prices by up to 60 minutes. Prices shown on GoldRate24 are indicative benchmarks and may differ from the actual prices charged by jewelers, banks, or commodity exchanges.',
            'City-specific gold rates reflect general market rates and may differ from rates offered by specific retailers or jewelers due to local factors, individual retailer margins, and current stock levels.',
            'For official gold prices for commercial or legal purposes, please refer to the Multi Commodity Exchange (MCX) or the India Bullion and Jewellers Association (IBJA).',
        ],
    },
    {
        icon: Shield,
        title: 'Investment Information Disclaimer',
        content: [
            'GoldRate24 publishes articles, guides, and analysis about gold investment, mutual funds, and various financial instruments for educational purposes. This content is NOT a solicitation to buy, sell, or hold any financial product.',
            'Past performance of gold prices, mutual funds, or any other investment product mentioned on this site does not guarantee future results. All investments carry risk, and the value of investments can go down as well as up.',
            'The investment return figures, CAGR calculations, and projections mentioned in our blog articles and calculators are illustrative only, based on historical data, and should not be taken as a prediction of future returns.',
            'GoldRate24 does not hold a SEBI registration as an Investment Adviser. We are a financial information and price tracking platform only.',
        ],
    },
    {
        icon: FileText,
        title: 'Calculator Accuracy Disclaimer',
        content: [
            'The financial calculators available on GoldRate24 (including Gold Calculator, EMI Calculator, SIP Calculator, Gold Loan Calculator, and others) are designed to provide approximate estimates for planning purposes.',
            'Calculator results are based on the inputs you provide and standard financial formulas. Actual loan EMIs, investment returns, tax liabilities, and gold purchase costs may differ based on bank-specific terms, individual tax situations, jeweler-specific pricing, and applicable regulations at the time of transaction.',
            'For official EMI figures, please contact your bank directly. For tax calculations, please consult a Chartered Accountant.',
        ],
    },
    {
        icon: Info,
        title: 'Third-Party Links & Content',
        content: [
            'GoldRate24 may contain links to external websites including banks, financial institutions, government portals, and other third-party websites. These links are provided for user convenience only.',
            'We have no control over the content, accuracy, or policies of linked external websites and do not endorse or take responsibility for the content, products, or services offered by third-party sites.',
            'Our blog articles may reference specific financial products, platforms, or service providers for illustrative purposes. This does not constitute an endorsement or recommendation of those products or services.',
        ],
    },
    {
        icon: AlertTriangle,
        title: 'Advertising Disclosure',
        content: [
            'GoldRate24 displays advertisements through Google AdSense and potentially other advertising networks. These ads are selected and served based on your browsing behavior and preferences by Google and other advertising partners.',
            'The presence of an advertisement on GoldRate24 does not constitute our endorsement of the advertised product or service. We do not have control over which specific advertisements are shown on our pages.',
            'We receive compensation from advertisers when users interact with advertisements displayed on our site. This does not influence our editorial content or the accuracy of the information we provide.',
        ],
    },
];

export default function DisclaimerPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-700 dark:text-amber-300 text-sm font-medium mb-6">
                            <AlertTriangle className="w-4 h-4" />
                            Important Information
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-gradient-gold">Disclaimer</span>
                        </h1>
                        <p className="text-text-secondary text-lg mb-2">
                            Last updated: February 20, 2026
                        </p>
                        <p className="text-text-secondary">
                            Please read this disclaimer carefully before using GoldRate24 (goldrate24.in). By using our website, you agree to the terms of this disclaimer.
                        </p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        {/* Important Notice Banner */}
                        <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl mb-12">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h2 className="font-bold text-amber-800 dark:text-amber-200 mb-2">Important Notice</h2>
                                    <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
                                        GoldRate24 is a <strong>financial information website</strong> — not a financial advisor, broker, or investment platform. All gold rates, investment information, and calculator results are for <strong>educational purposes only</strong>. Always consult a licensed financial professional before making investment decisions.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sections */}
                        <div className="space-y-8">
                            {sections.map((section, index) => {
                                const Icon = section.icon;
                                return (
                                    <div key={index} className="card p-8">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                                <Icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                            </div>
                                            <h2 className="text-xl font-bold">{index + 1}. {section.title}</h2>
                                        </div>
                                        <div className="space-y-4">
                                            {section.content.map((paragraph, pIdx) => (
                                                <p key={pIdx} className="text-text-secondary leading-relaxed">
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Contact Section */}
                        <div className="mt-12 p-8 card text-center">
                            <h2 className="text-xl font-bold mb-3">Questions About This Disclaimer?</h2>
                            <p className="text-text-secondary mb-6">
                                If you have questions about this disclaimer or notice any inaccurate information on our site, please contact us.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link
                                    href="/contact"
                                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-yellow-600 transition-colors"
                                >
                                    Contact Us
                                </Link>
                                <Link
                                    href="/privacy"
                                    className="px-6 py-3 border-2 border-amber-300 dark:border-amber-700 rounded-xl font-semibold hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
