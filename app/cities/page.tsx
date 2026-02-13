import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Globe, ArrowRight, HelpCircle, TrendingUp, Shield, Clock } from 'lucide-react';
import CitiesGrid from '@/components/cities/CitiesGrid';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldrate24.in';

const CITIES_LIST = [
    { name: 'Delhi', slug: 'delhi', state: 'Delhi' },
    { name: 'Mumbai', slug: 'mumbai', state: 'Maharashtra' },
    { name: 'Chennai', slug: 'chennai', state: 'Tamil Nadu' },
    { name: 'Bangalore', slug: 'bangalore', state: 'Karnataka' },
    { name: 'Kolkata', slug: 'kolkata', state: 'West Bengal' },
    { name: 'Hyderabad', slug: 'hyderabad', state: 'Telangana' },
    { name: 'Pune', slug: 'pune', state: 'Maharashtra' },
    { name: 'Ahmedabad', slug: 'ahmedabad', state: 'Gujarat' },
    { name: 'Coimbatore', slug: 'coimbatore', state: 'Tamil Nadu' },
    { name: 'Kerala', slug: 'kerala', state: 'Kerala' },
];

const FAQS = [
    {
        question: 'Why do gold rates differ from city to city in India?',
        answer: 'Gold rates vary by city due to differences in local taxes, transportation costs, demand-supply dynamics, and proximity to gold refineries. Cities like Chennai and Kerala often have higher rates due to greater demand, while Delhi and Mumbai may see slightly lower rates due to larger wholesale markets.',
    },
    {
        question: 'Which city has the cheapest gold rate in India?',
        answer: 'Gold rates are generally lowest in cities with large wholesale markets like Delhi, Mumbai, and Ahmedabad. However, the difference between cities is usually ₹50-200 per gram. Always check the latest rates before purchasing.',
    },
    {
        question: 'How often are city gold rates updated on GoldRate24?',
        answer: 'Gold rates on GoldRate24 are updated every 12 hours to ensure you get the most accurate and current gold prices. The rates are sourced from reliable market data and reflect the latest market trends.',
    },
    {
        question: 'What is the difference between 24K, 22K, and 18K gold?',
        answer: '24K gold is 99.9% pure gold and is the most expensive. 22K gold (91.6% pure) is the most popular for jewellery in India as it is durable. 18K gold (75% pure) is used for diamond-studded and designer jewellery as it is harder.',
    },
    {
        question: 'Is gold rate the same across all jewellers in a city?',
        answer: 'No, gold rates may vary slightly between jewellers in the same city. Factors like making charges, brand premium, and GST can create differences. The base gold rate is generally the same, but the final price differs based on additional charges.',
    },
];

export const metadata: Metadata = {
    title: 'Gold Rate Today in All Indian Cities - City Wise Gold Price | GoldRate24',
    description:
        "Check today's live gold rates in 10+ major Indian cities. Compare 24K, 22K, and 18K gold prices in Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad, Pune, Ahmedabad & more. Updated every 12 hours.",
    keywords: [
        'gold rate today',
        'gold rate in india',
        'city wise gold rate',
        'gold rate by city',
        'gold price today india',
        'gold rate mumbai today',
        'gold rate delhi today',
        'gold rate bangalore today',
        'gold rate chennai today',
        'gold rate kolkata today',
        'gold rate hyderabad today',
        'gold rate pune today',
        'gold rate ahmedabad today',
        'gold rate kerala today',
        'gold price per gram',
        '24k gold rate',
        '22k gold rate',
        '18k gold rate',
        'today gold rate in india per gram',
        'live gold price india',
    ],
    openGraph: {
        title: 'Gold Rate Today in All Indian Cities | GoldRate24',
        description:
            "Compare today's gold rates across 10+ major Indian cities. 24K, 22K, and 18K gold prices updated every 12 hours.",
        url: `${baseUrl}/cities`,
        type: 'website',
        siteName: 'GoldRate24',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Gold Rate Today - City Wise Gold Price India',
        description: 'Live gold rates in Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad & 4+ more cities.',
    },
    alternates: {
        canonical: `${baseUrl}/cities`,
    },
    robots: { index: true, follow: true },
};

export default function CitiesPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': `${baseUrl}/cities#webpage`,
                url: `${baseUrl}/cities`,
                name: 'Gold Rate Today in All Indian Cities',
                description: metadata.description,
                isPartOf: { '@id': `${baseUrl}/#website` },
                breadcrumb: { '@id': `${baseUrl}/cities#breadcrumb` },
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${baseUrl}/cities#breadcrumb`,
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: baseUrl,
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Cities',
                        item: `${baseUrl}/cities`,
                    },
                ],
            },
            {
                '@type': 'ItemList',
                '@id': `${baseUrl}/cities#citylist`,
                name: 'Gold Rates by City',
                numberOfItems: CITIES_LIST.length,
                itemListElement: CITIES_LIST.map((city, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    name: `Gold Rate in ${city.name}`,
                    url: `${baseUrl}/cities/${city.slug}`,
                })),
            },
            {
                '@type': 'FAQPage',
                '@id': `${baseUrl}/cities#faq`,
                mainEntity: FAQS.map((faq) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: faq.answer,
                    },
                })),
            },
        ],
    };

    return (
        <div className="min-h-screen">
            {/* JSON-LD */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero Section */}
            <section className="section bg-gradient-to-b from-background to-surface relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"></div>
                </div>

                <div className="container-custom relative">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Live badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 border border-amber-300 dark:border-amber-700 mb-6 animate-pulse">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                            <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                                Live Rates • {CITIES_LIST.length} Cities
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Gold Rate Today in{' '}
                            <span className="text-gradient-gold">Indian Cities</span>
                        </h1>

                        <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-8">
                            Compare live gold prices across {CITIES_LIST.length} major cities in India. Check 24K, 22K,
                            and 18K gold rates per gram — updated every 12 hours from trusted market sources.
                        </p>

                        {/* Quick stats */}
                        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                            <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-surface border border-border">
                                <Globe className="w-5 h-5 text-amber-500" />
                                <span className="text-lg font-bold">{CITIES_LIST.length}+</span>
                                <span className="text-xs text-text-tertiary">Cities</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-surface border border-border">
                                <Clock className="w-5 h-5 text-blue-500" />
                                <span className="text-lg font-bold">12h</span>
                                <span className="text-xs text-text-tertiary">Updates</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-surface border border-border">
                                <Shield className="w-5 h-5 text-green-500" />
                                <span className="text-lg font-bold">3</span>
                                <span className="text-xs text-text-tertiary">Purities</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cities Grid - Dynamic Live Data */}
            <CitiesGrid />

            {/* Why Gold Rates Differ - SEO Content Section */}
            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Why Gold Rates <span className="text-gradient-gold">Differ by City</span>
                            </h2>
                            <p className="text-text-secondary text-lg">
                                Understanding the factors that influence gold prices across Indian cities
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="card p-6">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 w-fit mb-4">
                                    <TrendingUp className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Local Demand & Supply</h3>
                                <p className="text-text-secondary text-sm">
                                    Cities like Chennai and Kerala have higher cultural demand for gold, especially
                                    during wedding seasons, which can push prices slightly higher compared to other
                                    cities.
                                </p>
                            </div>

                            <div className="card p-6">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 w-fit mb-4">
                                    <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Transportation Costs</h3>
                                <p className="text-text-secondary text-sm">
                                    The cost of transporting gold from refineries and ports adds to the final price.
                                    Cities closer to entry points like Mumbai may have slightly lower base rates.
                                </p>
                            </div>

                            <div className="card p-6">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 w-fit mb-4">
                                    <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">State Taxes & Duties</h3>
                                <p className="text-text-secondary text-sm">
                                    While GST on gold is uniform at 3% nationwide, additional state-level charges,
                                    octroi, and local body taxes can create price variations between cities.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* City Quick Links - SEO Internal Links */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                            Gold Rate in Popular Cities
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                            {CITIES_LIST.map((city) => (
                                <Link
                                    key={city.slug}
                                    href={`/cities/${city.slug}`}
                                    className="flex items-center gap-2 p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                                >
                                    <MapPin className="w-4 h-4 text-amber-500 group-hover:text-primary transition-colors flex-shrink-0" />
                                    <div>
                                        <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                                            {city.name}
                                        </span>
                                        <p className="text-xs text-text-tertiary">{city.state}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section - SEO Rich */}
            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-4">
                                <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">FAQs</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-text-secondary">
                                Common questions about city-wise gold rates in India
                            </p>
                        </div>

                        <div className="space-y-4">
                            {FAQS.map((faq, index) => (
                                <details
                                    key={index}
                                    className="card group"
                                    open={index === 0}
                                >
                                    <summary className="flex items-start gap-3 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                                            {index + 1}
                                        </span>
                                        <span className="font-semibold text-left flex-1 group-open:text-primary transition-colors">
                                            {faq.question}
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-text-tertiary group-open:rotate-90 transition-transform flex-shrink-0 mt-1" />
                                    </summary>
                                    <div className="px-5 pb-5 pl-14">
                                        <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-gradient-to-br from-amber-900 via-yellow-900 to-amber-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-10 right-10 w-52 h-52 bg-yellow-400/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl"></div>
                </div>
                <div className="container-custom relative">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Can&apos;t Find Your City?
                        </h2>
                        <p className="text-lg text-amber-200 mb-8">
                            We&apos;re constantly expanding our coverage. Contact us to request gold rates for your
                            city, or explore our financial calculators.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-amber-900 font-semibold hover:bg-amber-50 transition-colors"
                            >
                                <MapPin className="w-4 h-4" />
                                Request Your City
                            </Link>
                            <Link
                                href="/calculators"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-amber-300/50 text-amber-100 font-semibold hover:bg-amber-800/50 transition-colors"
                            >
                                Explore Calculators
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
