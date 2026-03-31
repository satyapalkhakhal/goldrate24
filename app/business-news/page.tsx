import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Newspaper, Tag, TrendingUp, BookOpen, Star, Briefcase } from 'lucide-react';

export const revalidate = 3600;

const SUPABASE_URL = 'https://rfuumgvtjfvxmhocxhfk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmdXVtZ3Z0amZ2eG1ob2N4aGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMzU4OTIsImV4cCI6MjA4ODcxMTg5Mn0.9CCpMxp_Kyzsw8Y2wxk6CAL8ZPbhA7vpWqNlOJPXn20';

export const metadata: Metadata = {
    title: 'Business & Finance News India - Credit Cards, Startups, Investment | GoldRate24',
    description:
        'Read the latest business and finance news in India. Get expert reviews on credit cards, startup insights, salary negotiation tips, investment strategies, and financial planning guides. Updated daily by GoldRate24.',
    keywords: [
        'business news india',
        'finance news india',
        'credit card reviews india',
        'best credit cards 2025',
        'startup news',
        'investment news india',
        'market trends india',
        'financial planning tips',
        'salary negotiation',
        'venture capital india',
        'side hustle ideas',
        'productivity apps',
        'digital nomad tax',
        'remote work culture',
    ],
    openGraph: {
        title: 'Business & Finance News India - Credit Cards, Startups, Investment',
        description:
            'Expert business and finance news for Indian readers. Credit card reviews, startup insights, career tips, and investment guides — updated daily.',
        type: 'website',
        url: '/business-news',
        siteName: 'GoldRate24',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Business & Finance News India - GoldRate24',
        description: 'Expert business news, credit card reviews, and finance tips for India.',
    },
    alternates: {
        canonical: '/business-news',
    },
    robots: { index: true, follow: true },
};

interface Article {
    id: string;
    title: string;
    slug: string;
    category: string;
    subcategory: string;
    date: string;
    published_at: string;
    excerpt: string;
    content: string;
    image_url: string;
    author: string;
    author_avatar: string;
    read_time: string;
    tags: string[];
    is_featured: boolean;
    is_editors_pick: boolean;
    is_trending: boolean;
    masonry_height: string | null;
    created_at: string;
}

const subcategoryColors: Record<string, string> = {
    'Credit Card': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    'Credit Cards': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    'Startups': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    'Career': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    'Finance': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    'Productivity': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
    'Entrepreneurship': 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
};

async function getBusinessArticles(): Promise<Article[]> {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY;

    try {
        const response = await fetch(
            `${url}/rest/v1/articles?select=*&category=eq.BUSINESS&order=published_at.desc`,
            {
                headers: {
                    'apikey': key,
                    'Authorization': `Bearer ${key}`,
                    'Accept': 'application/json',
                },
                next: { revalidate: 3600 },
            }
        );

        if (!response.ok) throw new Error('Failed to fetch articles');

        return await response.json();
    } catch (error) {
        console.error('Error fetching business articles:', error);
        return [];
    }
}

export default async function BusinessNewsPage() {
    const articles = await getBusinessArticles();
    const featuredArticle = articles.find((a) => a.is_featured) || articles[0];
    const editorsPickArticles = articles.filter((a) => a.is_editors_pick && a.id !== featuredArticle?.id);
    const trendingArticles = articles.filter((a) => a.is_trending && a.id !== featuredArticle?.id);
    const otherArticles = articles.filter((a) => a.id !== featuredArticle?.id);

    // Collect unique subcategories for content
    const subcategories = [...new Set(articles.map((a) => a.subcategory).filter(Boolean))];

    return (
        <div className="min-h-screen">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            '@context': 'https://schema.org',
                            '@type': 'CollectionPage',
                            name: 'Business & Finance News India',
                            description: 'Latest business and finance news curated by GoldRate24 covering credit cards, startups, careers, productivity, and investment in India.',
                            url: 'https://goldrate24.in/business-news',
                            publisher: {
                                '@type': 'Organization',
                                name: 'GoldRate24',
                                url: 'https://goldrate24.in',
                                logo: { '@type': 'ImageObject', url: 'https://goldrate24.in/icon.png' },
                            },
                            mainEntity: {
                                '@type': 'ItemList',
                                numberOfItems: articles.length,
                                itemListElement: articles.map((article, index) => ({
                                    '@type': 'ListItem',
                                    position: index + 1,
                                    item: {
                                        '@type': 'NewsArticle',
                                        headline: article.title,
                                        description: article.excerpt,
                                        datePublished: article.published_at,
                                        dateCreated: article.created_at,
                                        author: { '@type': 'Person', name: article.author },
                                        url: `https://goldrate24.in/business-news/${article.slug}`,
                                        ...(article.image_url ? { image: article.image_url } : {}),
                                    },
                                })),
                            },
                        },
                        {
                            '@context': 'https://schema.org',
                            '@type': 'BreadcrumbList',
                            itemListElement: [
                                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://goldrate24.in' },
                                { '@type': 'ListItem', position: 2, name: 'Business News', item: 'https://goldrate24.in/business-news' },
                            ],
                        },
                        {
                            '@context': 'https://schema.org',
                            '@type': 'FAQPage',
                            mainEntity: [
                                {
                                    '@type': 'Question',
                                    name: 'What topics does GoldRate24 Business News cover?',
                                    acceptedAnswer: {
                                        '@type': 'Answer',
                                        text: 'GoldRate24 Business News covers credit card reviews, startup funding news, salary negotiation strategies, venture capital trends, productivity tools, entrepreneurship tips, remote work culture, and financial planning guides tailored for Indian readers.',
                                    },
                                },
                                {
                                    '@type': 'Question',
                                    name: 'How often is the business news section updated?',
                                    acceptedAnswer: {
                                        '@type': 'Answer',
                                        text: 'Our business news section is updated regularly with new articles covering the latest financial trends, credit card launches, and business insights relevant to Indian consumers and investors.',
                                    },
                                },
                                {
                                    '@type': 'Question',
                                    name: 'Can I find credit card comparisons and reviews here?',
                                    acceptedAnswer: {
                                        '@type': 'Answer',
                                        text: 'Yes, we publish detailed credit card reviews comparing benefits, fees, reward points, gym memberships, travel perks, and cashback offers from major Indian banks including SBI, HDFC, ICICI, and more.',
                                    },
                                },
                            ],
                        },
                    ]),
                }}
            />

            {/* Hero Section */}
            <section className="section bg-gradient-to-b from-amber-50 via-yellow-50/50 to-white dark:from-slate-900 dark:via-amber-950/10 dark:to-slate-950">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-700 dark:text-amber-300 text-sm font-medium mb-6">
                            <Newspaper className="w-4 h-4" />
                            Business & Finance Hub
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Business & Finance <span className="text-gradient-gold">News</span>
                        </h1>
                        <p className="text-lg md:text-xl text-text-secondary mb-4">
                            Your trusted source for business insights, credit card reviews, startup analysis,
                            career advice, and financial planning tips — curated for Indian readers.
                        </p>
                        <p className="text-base text-text-tertiary">
                            {articles.length} articles across {subcategories.length} categories including {subcategories.slice(0, 3).join(', ')}{subcategories.length > 3 ? ` and ${subcategories.length - 3} more` : ''}.
                        </p>
                    </div>
                </div>
            </section>

            {/* Category Quick Links */}
            {subcategories.length > 0 && (
                <section className="py-6 border-b border-border bg-surface">
                    <div className="container-custom">
                        <div className="flex items-center gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                            <span className="text-sm font-medium text-text-secondary whitespace-nowrap">Browse:</span>
                            {subcategories.map((cat) => (
                                <span
                                    key={cat}
                                    className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${subcategoryColors[cat] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Article */}
            {featuredArticle && (
                <section className="section">
                    <div className="container-custom">
                        <div className="max-w-6xl mx-auto">
                            <div className="flex items-center gap-2 mb-6">
                                <Star className="w-5 h-5 text-amber-500" />
                                <h2 className="text-xl font-bold">Featured Story</h2>
                            </div>
                            <Link href={`/business-news/${featuredArticle.slug}`} className="group block">
                                <div className="card p-0 hover:shadow-xl transition-all duration-300 border-2 border-amber-200 dark:border-amber-800 relative overflow-hidden">
                                    <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold rounded-full">
                                        FEATURED
                                    </div>
                                    <div className="flex flex-col md:flex-row">
                                        {featuredArticle.image_url && (
                                            <div className="md:w-1/2 relative aspect-video md:aspect-auto md:min-h-[320px]">
                                                <Image
                                                    src={featuredArticle.image_url}
                                                    alt={featuredArticle.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    priority
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                                            <div className="flex items-center gap-3 mb-4 flex-wrap">
                                                {featuredArticle.subcategory && (
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${subcategoryColors[featuredArticle.subcategory] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}>
                                                        {featuredArticle.subcategory}
                                                    </span>
                                                )}
                                                {featuredArticle.is_trending && (
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white uppercase tracking-wider">
                                                        Trending
                                                    </span>
                                                )}
                                                <span className="flex items-center gap-1 text-xs text-text-secondary">
                                                    <Clock className="w-3 h-3" />
                                                    {featuredArticle.read_time}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                                {featuredArticle.title}
                                            </h3>
                                            <p className="text-text-secondary mb-6 text-lg line-clamp-3">
                                                {featuredArticle.excerpt}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm text-text-secondary">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(featuredArticle.published_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </span>
                                                <span>By {featuredArticle.author}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Editor's Picks */}
            {editorsPickArticles.length > 0 && (
                <section className="section bg-gradient-to-b from-indigo-50/50 to-white dark:from-indigo-950/10 dark:to-slate-950">
                    <div className="container-custom">
                        <div className="max-w-6xl mx-auto">
                            <div className="flex items-center gap-2 mb-6">
                                <BookOpen className="w-5 h-5 text-indigo-500" />
                                <h2 className="text-xl font-bold">Editor&apos;s Picks</h2>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {editorsPickArticles.slice(0, 3).map((article) => (
                                    <Link key={article.id} href={`/business-news/${article.slug}`} className="group">
                                        <article className="card-hover h-full flex flex-col overflow-hidden border-indigo-200 dark:border-indigo-800">
                                            {article.image_url && (
                                                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                                                    <Image src={article.image_url} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                                                    <div className="absolute top-2 left-2 bg-indigo-500/90 backdrop-blur-sm px-2 py-0.5 rounded-full">
                                                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">Pick</span>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="p-5 flex flex-col flex-1">
                                                <h3 className="text-base font-bold mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight line-clamp-2">{article.title}</h3>
                                                <p className="text-sm text-text-secondary mb-3 flex-1 line-clamp-2">{article.excerpt}</p>
                                                <div className="flex items-center justify-between text-xs text-text-secondary pt-3 border-t border-border">
                                                    <span>{article.read_time}</span>
                                                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">Read <ArrowRight className="w-3 h-3" /></span>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* All Articles Grid */}
            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center gap-2 mb-8">
                            <Briefcase className="w-5 h-5 text-text-secondary" />
                            <h2 className="text-2xl md:text-3xl font-bold">All Business Articles</h2>
                        </div>
                        {otherArticles.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {otherArticles.map((article) => (
                                    <Link key={article.id} href={`/business-news/${article.slug}`} className="group">
                                        <article className="card-hover h-full flex flex-col overflow-hidden">
                                            {article.image_url && (
                                                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                                                    <Image src={article.image_url} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                                                    {article.is_trending && (
                                                        <div className="absolute top-2 left-2 bg-red-500/90 backdrop-blur-sm px-2 py-0.5 rounded-full">
                                                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Trending</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            <div className="p-6 flex flex-col flex-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    {article.subcategory && (
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${subcategoryColors[article.subcategory] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}>
                                                            {article.subcategory}
                                                        </span>
                                                    )}
                                                    <span className="flex items-center gap-1 text-xs text-text-secondary">
                                                        <Clock className="w-3 h-3" />
                                                        {article.read_time}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight">{article.title}</h3>
                                                <p className="text-sm text-text-secondary mb-4 flex-1 line-clamp-3">{article.excerpt}</p>
                                                <div className="flex items-center justify-between text-xs text-text-secondary pt-4 border-t border-border">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(article.published_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium group-hover:gap-2 transition-all">
                                                        Read More <ArrowRight className="w-3 h-3" />
                                                    </span>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-text-secondary">No articles available at the moment.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* About This Section — Substantial Content for AdSense */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">About GoldRate24 Business News</h2>

                        <div className="prose prose-lg max-w-none text-text-secondary space-y-4">
                            <p className="text-lg leading-relaxed">
                                GoldRate24 Business News is your comprehensive source for the latest financial insights, business analysis, and money management tips tailored specifically for Indian readers. Our team of experienced finance writers and industry analysts bring you well-researched articles covering a wide range of topics.
                            </p>

                            <h3 className="text-xl font-bold text-text-primary mt-8 mb-3">What We Cover</h3>
                            <p className="leading-relaxed">
                                From in-depth credit card reviews comparing benefits, reward points, and annual fees across major Indian banks like SBI, HDFC, ICICI, and Axis Bank — to startup funding news, venture capital trends, and entrepreneurship guides. Whether you&apos;re looking for the best credit card for travel rewards, gym memberships, or dining cashback, our detailed comparisons help you make an informed decision.
                            </p>

                            <h3 className="text-xl font-bold text-text-primary mt-8 mb-3">Our Editorial Approach</h3>
                            <p className="leading-relaxed">
                                Every article published on GoldRate24 is thoroughly researched and fact-checked. We focus on providing actionable insights rather than generic advice. Our credit card reviews include real-world analysis of fees, benefits, reward structures, and hidden terms. Our startup coverage focuses on Indian ecosystem trends with data-backed analysis. Our career articles provide practical strategies tested by industry professionals.
                            </p>

                            <h3 className="text-xl font-bold text-text-primary mt-8 mb-3">Categories We Cover</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Credit Card Reviews:</strong> Side-by-side comparisons, benefit breakdowns, eligibility criteria, and application tips for the best credit cards in India</li>
                                <li><strong>Startup Ecosystem:</strong> Fundraising guides, pitch deck tips, investor relationship strategies, and venture capital trend analysis</li>
                                <li><strong>Career Growth:</strong> Salary negotiation tactics, job search strategies, skill development recommendations, and industry-specific advice</li>
                                <li><strong>Personal Finance:</strong> Tax planning for digital nomads, investment diversification strategies, emergency fund planning, and insurance comparisons</li>
                                <li><strong>Productivity:</strong> App reviews, workflow optimization techniques, remote work best practices, and time management frameworks</li>
                                <li><strong>Entrepreneurship:</strong> Side hustle ideas, work-life balance strategies, business registration guides, and marketing on a budget</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {[
                                {
                                    q: 'What topics does GoldRate24 Business News cover?',
                                    a: 'GoldRate24 Business News covers a wide range of finance and business topics including credit card reviews and comparisons, startup funding and venture capital news, salary negotiation strategies, productivity tools, entrepreneurship tips, remote work culture analysis, digital nomad tax guides, and financial planning advice — all tailored for Indian readers and consumers.',
                                },
                                {
                                    q: 'How often is the business news section updated?',
                                    a: 'Our business news section is updated regularly with new articles covering the latest financial trends, credit card launches, startup ecosystem developments, and business insights relevant to Indian consumers and investors. We aim to publish multiple articles each week across various business categories.',
                                },
                                {
                                    q: 'Can I find credit card comparisons and reviews here?',
                                    a: 'Yes, we publish detailed credit card reviews comparing benefits like gym memberships, airport lounge access, travel rewards, cashback offers, fuel surcharge waivers, and dining discounts. We cover cards from major Indian banks including SBI, HDFC, ICICI, Axis Bank, American Express, and more, helping you choose the right card for your lifestyle.',
                                },
                                {
                                    q: 'Are the articles on GoldRate24 written by experts?',
                                    a: 'Our articles are written and reviewed by experienced finance writers, industry analysts, and subject matter experts. Each piece is thoroughly researched with data from official sources, regulatory filings, and industry reports to ensure accuracy and reliability.',
                                },
                                {
                                    q: 'How is GoldRate24 Business News different from other finance sites?',
                                    a: 'Unlike generic news aggregators, GoldRate24 focuses on providing actionable, India-specific financial advice. Combined with our real-time gold rate tracking and financial calculators, we offer a complete financial toolkit that helps readers make informed money decisions across investments, credit products, and career choices.',
                                },
                            ].map((faq, index) => (
                                <details key={index} className="card p-6 group cursor-pointer">
                                    <summary className="font-bold text-lg flex items-center justify-between list-none">
                                        <span>{faq.q}</span>
                                        <ArrowRight className="w-5 h-5 text-text-secondary transform group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
                                    </summary>
                                    <p className="mt-4 text-text-secondary leading-relaxed">{faq.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Topics */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-6">Popular Topics</h2>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {[
                                'Credit Cards India', 'SBI Credit Card', 'HDFC Credit Card',
                                'Startup Funding', 'Salary Negotiation', 'Venture Capital',
                                'Remote Work', 'Side Hustle', 'Productivity Apps',
                                'Financial Planning', 'Investment Tips', 'Tax Guide India',
                            ].map((tag) => (
                                <span key={tag} className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-text-secondary hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-700 dark:hover:text-amber-300 transition-colors cursor-default">
                                    <Tag className="w-3 h-3" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-gradient-to-r from-amber-500 to-yellow-500">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Track Gold Prices + Stay Informed
                        </h2>
                        <p className="text-lg mb-8 text-amber-100">
                            Combine real-time gold rate tracking with the latest business insights for smarter financial decisions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/gold-rates" className="px-8 py-3 bg-white text-amber-600 rounded-xl font-semibold hover:bg-amber-50 transition-colors">
                                Live Gold Rates
                            </Link>
                            <Link href="/calculators/gold" className="px-8 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors border border-amber-400">
                                Gold Calculator
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
