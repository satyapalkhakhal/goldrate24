import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Target, Users, Award, TrendingUp, Calculator, MapPin, CheckCircle, Star, Globe } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About GoldRate24 - India\'s Trusted Gold Rate & Financial Calculator Platform',
    description: 'GoldRate24 is India\'s comprehensive gold rate tracking and financial calculator platform. We provide real-time gold prices for 24K, 22K, and 18K gold across 100+ cities, 15+ financial calculators, and expert investment guides. Learn about our mission, data sources, and commitment to accuracy.',
    keywords: [
        'about goldrate24',
        'gold rate india website',
        'gold price tracker india',
        'reliable gold rate source india',
        'goldrate24 team',
        'gold rate website india',
        'india gold price platform',
    ],
    openGraph: {
        title: 'About GoldRate24 - India\'s Trusted Gold Rate Platform',
        description: 'GoldRate24 provides real-time gold rates and financial calculators for India. Learn about our mission, data sources, and values.',
        type: 'website',
        url: '/about',
        siteName: 'GoldRate24',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About GoldRate24',
        description: 'Your trusted source for real-time gold rates and financial calculators across India.',
    },
    alternates: { canonical: '/about' },
    robots: { index: true, follow: true },
};

const values = [
    {
        icon: Shield,
        title: 'Accuracy First',
        description: 'Our gold rates are sourced from MCX (Multi Commodity Exchange), IBJA, and a verified network of jewelers. We cross-validate data from multiple sources before displaying, ensuring the rates you see are trustworthy.',
        color: 'amber',
    },
    {
        icon: Target,
        title: 'Full Transparency',
        description: 'We clearly distinguish between base gold rates, making charges, wastage, and taxes. No hidden numbers, no misleading prices. Our calculators show every cost component so you can make informed decisions.',
        color: 'blue',
    },
    {
        icon: Users,
        title: 'User-First Design',
        description: 'Every feature on GoldRate24 is designed around what users actually need — whether it\'s checking live rates before visiting a jeweler, calculating EMI for a gold loan, or understanding the true cost of a jewelry purchase.',
        color: 'green',
    },
    {
        icon: Award,
        title: 'Editorial Excellence',
        description: 'Our blog articles are researched, fact-checked, and written by financial professionals with deep expertise in Indian gold markets, investment options, and tax implications. We cite verified sources and reference RBI, SEBI, and IBJA guidelines.',
        color: 'purple',
    },
];

const dataSources = [
    {
        name: 'MCX (Multi Commodity Exchange)',
        description: 'India\'s primary commodity exchange for gold futures prices',
        icon: TrendingUp,
    },
    {
        name: 'IBJA (India Bullion and Jewellers Association)',
        description: 'Official bullion rates published twice daily by the trade body',
        icon: Globe,
    },
    {
        name: 'International Spot Price (XAU/USD)',
        description: 'Global gold spot prices from COMEX/LBMA converted at live RBI exchange rates',
        icon: Star,
    },
    {
        name: 'Verified Jeweler Network',
        description: 'Rates cross-checked with verified jewelers across 10+ major Indian cities',
        icon: MapPin,
    },
];

const features = [
    'Real-time 24K, 22K, and 18K gold rates updated every hour',
    'Silver rates for all major cities',
    'City-specific rates for 10+ Indian cities including Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata, Pune, Ahmedabad, Coimbatore, and Kerala',
    '15+ financial calculators: Gold, EMI, SIP, PPF, EPF, NPS, Home Loan, Gold Loan, Gratuity, GST, HRA, FD, CAGR, Mutual Fund, SWP, Simple Interest',
    'Expert blog with 9+ in-depth gold investment guides',
    'Comprehensive FAQ covering all gold-related questions',
    'BIS hallmark information and gold purity guide',
    'Mobile-optimized for on-the-go rate checking',
    'Dark mode for comfortable viewing in all environments',
];

const stats = [
    { value: '10+', label: 'Indian Cities Covered', icon: MapPin },
    { value: '15+', label: 'Financial Calculators', icon: Calculator },
    { value: '9+', label: 'Expert Blog Articles', icon: Award },
    { value: '3', label: 'Gold Purities Tracked', icon: Shield },
    { value: '24/7', label: 'Rate Updates', icon: TrendingUp },
    { value: '100%', label: 'Free to Use', icon: CheckCircle },
];

export default function AboutPage() {
    const organizationJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'GoldRate24',
        url: 'https://goldrate24.in',
        logo: 'https://goldrate24.in/icon.png',
        description: 'India\'s comprehensive gold rate tracking and financial calculator platform providing real-time gold prices across 10+ cities and 15+ financial calculators.',
        sameAs: [],
        knowsAbout: [
            'Gold rates in India',
            'Gold investment',
            'Financial calculators',
            'Silver rates India',
            '22K 24K gold prices',
            'Gold loan calculator',
            'SIP calculator',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: 'contact@goldrate24.in',
            url: 'https://goldrate24.in/contact',
        },
    };

    return (
        <div className="min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
            />

            {/* Hero Section */}
            <section className="section bg-gradient-to-b from-amber-50 via-yellow-50/50 to-white dark:from-slate-900 dark:via-amber-950/10 dark:to-slate-950">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-700 dark:text-amber-300 text-sm font-medium mb-6">
                            <Shield className="w-4 h-4" />
                            Trusted Gold Rate Platform Since 2024
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            About <span className="text-gradient-gold">GoldRate24</span>
                        </h1>
                        <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
                            India&apos;s dedicated gold rate tracking and financial calculator platform — empowering millions of Indians to make informed gold buying and investment decisions with accurate, real-time data and expert guidance.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <div key={index} className="card p-4 text-center">
                                        <Icon className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                                        <div className="text-2xl md:text-3xl font-bold text-gradient-gold mb-1">{stat.value}</div>
                                        <div className="text-xs text-text-secondary leading-tight">{stat.label}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="card p-8 md:p-12">
                            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                            <div className="space-y-4 text-text-secondary leading-relaxed">
                                <p className="text-lg">
                                    GoldRate24 exists to solve a common problem faced by millions of Indians: finding accurate, reliable gold rate information and tools to make sense of complex financial decisions related to gold.
                                </p>
                                <p>
                                    When someone walks into a jewelry store to buy gold for a wedding or investment, they deserve to know the exact market price. When someone considers a gold loan from a bank, they should be able to calculate the EMI and total interest without needing a financial expert. When a first-time investor considers gold ETFs vs. physical gold vs. Sovereign Gold Bonds, they deserve clear, unbiased information.
                                </p>
                                <p>
                                    That&apos;s what GoldRate24 provides: <strong>accurate gold rates, powerful calculators, and expert educational content</strong> — all free, all in one place.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Offer */}
            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">What GoldRate24 Offers</h2>
                        <p className="text-text-secondary mb-8">
                            A comprehensive suite of tools and information designed around India&apos;s gold market.
                        </p>
                        <div className="grid gap-3">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-3 p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-border">
                                    <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-text-secondary">{feature}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Data Sources */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">Our Data Sources</h2>
                        <p className="text-text-secondary mb-8">
                            Accuracy is non-negotiable. We source our gold rates from multiple verified and authoritative sources, cross-checking data before display.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            {dataSources.map((source, index) => {
                                const Icon = source.icon;
                                return (
                                    <div key={index} className="card-hover p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex-shrink-0">
                                                <Icon className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold mb-1">{source.name}</h3>
                                                <p className="text-sm text-text-secondary">{source.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                            <p className="text-sm text-amber-800 dark:text-amber-200">
                                <strong>Note:</strong> Gold rates displayed on GoldRate24 are updated hourly and serve as indicative benchmarks. 
                                For official rates for commercial transactions, refer to MCX or IBJA official publications. 
                                See our <Link href="/disclaimer" className="underline hover:text-amber-600">full disclaimer</Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
                        <p className="text-text-secondary mb-8">The principles that guide every decision we make at GoldRate24.</p>
                        <div className="grid md:grid-cols-2 gap-6">
                            {values.map((value, index) => {
                                const Icon = value.icon;
                                return (
                                    <div key={index} className="card-hover p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex-shrink-0">
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                                <p className="text-text-secondary">{value.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        <div className="card p-8 md:p-12">
                            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                            <div className="space-y-4 text-text-secondary leading-relaxed">
                                <p>
                                    GoldRate24 was born from a personal frustration. Like millions of Indians preparing for a wedding or an investment, our founders found it surprisingly difficult to get reliable, up-to-date gold prices across different cities — let alone tools to calculate the true all-in cost of a gold purchase including making charges, wastage, and GST.
                                </p>
                                <p>
                                    The existing options were fragmented: some sites had outdated prices, others had calculators but no rates, and almost none clearly explained the components of gold pricing in a way a first-time buyer could understand. Financial jargon around SGBs, Gold ETFs, and digital gold left most retail investors confused.
                                </p>
                                <p>
                                    We built GoldRate24 to change that. Starting in 2024, we set out to create India&apos;s most complete, accurate, and user-friendly gold rate and financial calculator platform — combining live market data, powerful calculation tools, and honest educational content.
                                </p>
                                <p>
                                    Today, GoldRate24 covers 10+ major Indian cities, offers 15+ financial calculators, and publishes expert guides on gold investment, buying tips, and financial planning. We are committed to continuous improvement based on user feedback and market needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Editorial Standards */}
            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="card p-8 md:p-12">
                            <h2 className="text-3xl font-bold mb-6">Editorial Standards & Content Policy</h2>
                            <div className="space-y-4 text-text-secondary leading-relaxed">
                                <p>
                                    All educational content and blog articles published on GoldRate24 are:
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                        <span><strong>Researched thoroughly</strong> — based on official sources including RBI, SEBI, MCX, IBJA, and Finance Ministry publications</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                        <span><strong>Regularly updated</strong> — tax rates, investment rules, and market data are reviewed and updated when regulations change</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                        <span><strong>Balanced and objective</strong> — we present both advantages and disadvantages of different gold investment options without promoting any specific product</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                        <span><strong>Educational in nature</strong> — our content helps users understand gold markets, not make speculative bets. We always recommend consulting a financial advisor for personalized advice</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                        <span><strong>Transparently disclaimed</strong> — all articles carry appropriate disclaimers distinguishing editorial content from financial advice</span>
                                    </li>
                                </ul>
                                <p>
                                    If you notice any factual inaccuracy or outdated information, please <Link href="/contact" className="text-amber-600 dark:text-amber-400 hover:underline">contact us</Link>. We review and correct issues within 24 hours.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-gradient-to-r from-amber-500 to-yellow-500">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Start Using GoldRate24 Today
                        </h2>
                        <p className="text-lg mb-8 text-amber-100">
                            Check live gold rates, use our free calculators, and read expert guides to make smarter gold decisions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/gold-rates"
                                className="px-8 py-3 bg-white text-amber-600 rounded-xl font-semibold hover:bg-amber-50 transition-colors"
                            >
                                Live Gold Rates
                            </Link>
                            <Link
                                href="/calculators"
                                className="px-8 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors border border-amber-400"
                            >
                                Free Calculators
                            </Link>
                            <Link
                                href="/blog"
                                className="px-8 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-colors border border-white/40"
                            >
                                Read Blog
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
