import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator } from 'lucide-react';
import { CALCULATORS, CATEGORY_LABELS } from '@/lib/calculatorData';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldrate24.in';

export const metadata: Metadata = {
    title: 'Free Financial Calculators Online - SIP, EMI, Gold, PPF, NPS, FD & More | GoldRate24',
    description: 'Free online financial calculators for SIP, EMI, Gold, Home Loan, Gold Loan, PPF, NPS, EPF, FD, CAGR, GST, HRA, Gratuity, Mutual Fund, SWP, and more. Accurate financial tools for smart investment decisions in India.',
    keywords: [
        'financial calculator', 'sip calculator', 'emi calculator', 'gold calculator',
        'home loan calculator', 'gold loan calculator', 'ppf calculator', 'nps calculator',
        'epf calculator', 'fd calculator', 'cagr calculator', 'gst calculator',
        'hra calculator', 'gratuity calculator', 'mutual fund calculator', 'swp calculator',
        'simple interest calculator', 'car loan calculator', 'personal loan calculator',
        'online calculator india', 'free financial tools',
    ].join(', '),
    alternates: { canonical: `${baseUrl}/calculators` },
    openGraph: {
        title: 'Free Financial Calculators | SIP, EMI, Gold, PPF & More',
        description: 'Calculate SIP returns, EMI, gold prices, PPF maturity, NPS pension, and more with our free online calculators.',
        url: `${baseUrl}/calculators`,
        type: 'website',
        siteName: 'GoldRate24',
    },
};

const categories = ['gold-finance', 'loans', 'investments', 'tax-savings'] as const;

export default function CalculatorsPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CollectionPage',
                name: 'Free Financial Calculators',
                description: 'Comprehensive suite of free financial calculators for Indian investors.',
                url: `${baseUrl}/calculators`,
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
                    { '@type': 'ListItem', position: 2, name: 'Calculators', item: `${baseUrl}/calculators` },
                ],
            },
        ],
    };

    return (
        <div className="min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero */}
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 border border-amber-300 dark:border-amber-700 mb-6">
                            <Calculator className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">Free Financial Tools</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Financial <span className="text-gradient-gold">Calculators</span>
                        </h1>
                        <p className="text-lg md:text-xl text-text-secondary">
                            Make informed financial decisions with our comprehensive suite of {CALCULATORS.length} free calculators.
                        </p>
                    </div>
                </div>
            </section>

            {/* Calculators by Category */}
            {categories.map((category) => {
                const calcs = CALCULATORS.filter((c) => c.category === category);
                if (calcs.length === 0) return null;
                return (
                    <section key={category} className="section">
                        <div className="container-custom">
                            <h2 className="text-2xl md:text-3xl font-bold mb-8">{CATEGORY_LABELS[category]}</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {calcs.map((calc, index) => {
                                    const Icon = calc.icon;
                                    return (
                                        <Link key={calc.slug} href={`/calculators/${calc.slug}`} className="card-hover p-6 group" style={{ animationDelay: `${index * 0.05}s` }}>
                                            <div className="relative mb-4">
                                                <div className={`absolute inset-0 bg-gradient-to-r ${calc.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                                                <div className={`relative p-3 rounded-2xl bg-gradient-to-r ${calc.color} w-fit`}>
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{calc.title}</h3>
                                            <p className="text-sm text-text-secondary mb-4 line-clamp-2">{calc.description}</p>
                                            <ul className="space-y-1 mb-4">
                                                {calc.features.slice(0, 3).map((feature, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-xs text-text-tertiary">
                                                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${calc.color}`} />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="pt-4 border-t border-border">
                                                <span className="text-primary text-sm font-semibold group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                                                    Calculate Now <span className="group-hover:translate-x-1 transition-transform">→</span>
                                                </span>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
