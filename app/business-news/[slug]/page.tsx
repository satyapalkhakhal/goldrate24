import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, ChevronRight, User, Share2, Bookmark } from 'lucide-react';

export const revalidate = 3600;

const SUPABASE_URL = 'https://rfuumgvtjfvxmhocxhfk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmdXVtZ3Z0amZ2eG1ob2N4aGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMzU4OTIsImV4cCI6MjA4ODcxMTg5Mn0.9CCpMxp_Kyzsw8Y2wxk6CAL8ZPbhA7vpWqNlOJPXn20';

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

interface Props {
    params: { slug: string };
}

/**
 * Transforms article HTML content from ThinkScope's design system classes
 * to classes compatible with our Tailwind setup.
 */
function transformContentClasses(html: string): string {
    return html
        // Text colors
        .replace(/text-muted-foreground/g, 'text-text-secondary')
        .replace(/text-foreground/g, 'text-text-primary')
        // Spacing
        .replace(/mb-4 mt-8/g, 'mb-4 mt-10')
        // Make headings use playfair
        .replace(/<h2 /g, '<h2 style="font-family: var(--font-playfair)" ')
        .replace(/<h3 /g, '<h3 style="font-family: var(--font-playfair)" ');
}

async function getArticle(slug: string): Promise<Article | null> {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY;

    try {
        const response = await fetch(
            `${url}/rest/v1/articles?select=*&slug=eq.${slug}`,
            {
                headers: {
                    'apikey': key,
                    'Authorization': `Bearer ${key}`,
                    'Accept': 'application/json',
                },
                next: { revalidate: 3600 },
            }
        );

        if (!response.ok) throw new Error('Failed to fetch article');

        const data = await response.json();
        return data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error('Error fetching article:', error);
        return null;
    }
}

async function getRelatedArticles(currentSlug: string): Promise<Article[]> {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY;

    try {
        const response = await fetch(
            `${url}/rest/v1/articles?select=*&category=eq.BUSINESS&slug=neq.${currentSlug}&order=published_at.desc&limit=3`,
            {
                headers: {
                    'apikey': key,
                    'Authorization': `Bearer ${key}`,
                    'Accept': 'application/json',
                },
                next: { revalidate: 3600 },
            }
        );

        if (!response.ok) throw new Error('Failed to fetch related articles');

        return await response.json();
    } catch (error) {
        console.error('Error fetching related articles:', error);
        return [];
    }
}

/**
 * Extracts h2 headings from HTML content for a table of contents.
 */
function extractHeadings(html: string): { text: string; id: string }[] {
    const regex = /<h2[^>]*>([^<]+)<\/h2>/gi;
    const headings: { text: string; id: string }[] = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
        const text = match[1].trim();
        const id = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
        headings.push({ text, id });
    }
    return headings;
}

/**
 * Adds IDs to h2 tags in the content for anchor links.
 */
function addHeadingIds(html: string): string {
    return html.replace(/<h2([^>]*)>([^<]+)<\/h2>/gi, (_, attrs, text) => {
        const id = text.trim().toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
        return `<h2${attrs} id="${id}">${text}</h2>`;
    });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const article = await getArticle(params.slug);
    if (!article) return { title: 'Article Not Found | GoldRate24' };

    const publishDate = new Date(article.published_at).toLocaleDateString('en-IN', {
        year: 'numeric', month: 'long', day: 'numeric',
    });

    return {
        title: `${article.title} | Business News - GoldRate24`,
        description: article.excerpt,
        keywords: [...article.tags, 'business news', 'finance india', article.subcategory?.toLowerCase()].filter(Boolean),
        authors: [{ name: article.author }],
        openGraph: {
            title: article.title,
            description: article.excerpt,
            type: 'article',
            publishedTime: article.published_at,
            authors: [article.author],
            tags: article.tags,
            url: `/business-news/${article.slug}`,
            siteName: 'GoldRate24',
            images: article.image_url
                ? [{ url: article.image_url, width: 1200, height: 630, alt: article.title }]
                : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.excerpt,
            images: article.image_url ? [article.image_url] : undefined,
        },
        alternates: {
            canonical: `/business-news/${article.slug}`,
        },
        robots: { index: true, follow: true },
    };
}

export default async function BusinessNewsArticlePage({ params }: Props) {
    const article = await getArticle(params.slug);
    if (!article) notFound();

    const relatedArticles = await getRelatedArticles(params.slug);

    const headings = extractHeadings(article.content);
    const processedContent = addHeadingIds(transformContentClasses(article.content));

    const publishDate = new Date(article.published_at).toLocaleDateString('en-IN', {
        year: 'numeric', month: 'long', day: 'numeric',
    });

    // Estimate word count from content for structured data
    const wordCount = article.content.replace(/<[^>]*>/g, '').split(/\s+/).length;

    return (
        <div className="min-h-screen">
            {/* JSON-LD Structured Data — Multiple schemas for rich results */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            '@context': 'https://schema.org',
                            '@type': 'NewsArticle',
                            headline: article.title,
                            description: article.excerpt,
                            datePublished: article.published_at,
                            dateModified: article.created_at,
                            wordCount: wordCount,
                            author: {
                                '@type': 'Person',
                                name: article.author,
                                url: 'https://goldrate24.in/about',
                            },
                            publisher: {
                                '@type': 'Organization',
                                name: 'GoldRate24',
                                url: 'https://goldrate24.in',
                                logo: { '@type': 'ImageObject', url: 'https://goldrate24.in/icon.png', width: 512, height: 512 },
                            },
                            mainEntityOfPage: {
                                '@type': 'WebPage',
                                '@id': `https://goldrate24.in/business-news/${article.slug}`,
                            },
                            keywords: article.tags.join(', '),
                            articleSection: article.subcategory || 'Business',
                            ...(article.image_url ? {
                                image: {
                                    '@type': 'ImageObject',
                                    url: article.image_url,
                                    width: 1200,
                                    height: 630,
                                },
                            } : {}),
                            isAccessibleForFree: true,
                        },
                        {
                            '@context': 'https://schema.org',
                            '@type': 'BreadcrumbList',
                            itemListElement: [
                                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://goldrate24.in' },
                                { '@type': 'ListItem', position: 2, name: 'Business News', item: 'https://goldrate24.in/business-news' },
                                { '@type': 'ListItem', position: 3, name: article.title, item: `https://goldrate24.in/business-news/${article.slug}` },
                            ],
                        },
                    ]),
                }}
            />

            {/* Breadcrumb */}
            <div className="bg-surface border-b border-border">
                <div className="container-custom py-3">
                    <nav className="flex items-center gap-2 text-sm text-text-secondary" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/business-news" className="hover:text-primary transition-colors">Business News</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-text-primary font-medium truncate max-w-[200px] sm:max-w-none">{article.title}</span>
                    </nav>
                </div>
            </div>

            {/* Article Header */}
            <section className="section bg-gradient-to-b from-amber-50/50 to-white dark:from-slate-900 dark:to-slate-950">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <Link href="/business-news" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors mb-6">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Business News
                        </Link>

                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                            {article.subcategory && (
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                                    {article.subcategory}
                                </span>
                            )}
                            {article.is_trending && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white uppercase tracking-wider">
                                    Trending
                                </span>
                            )}
                            {article.is_editors_pick && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500 text-white uppercase tracking-wider">
                                    Editor&apos;s Pick
                                </span>
                            )}
                            <span className="flex items-center gap-1 text-sm text-text-secondary">
                                <Clock className="w-4 h-4" />
                                {article.read_time}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                            {article.title}
                        </h1>

                        <p className="text-lg md:text-xl text-text-secondary mb-6">
                            {article.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary pb-6 border-b border-border">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                Published {publishDate}
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span className="flex items-center gap-1.5">
                                <User className="w-4 h-4" />
                                By {article.author}
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span>{wordCount} words</span>
                        </div>

                        {/* Featured Image */}
                        {article.image_url && (
                            <div className="mt-8 relative aspect-video rounded-2xl overflow-hidden border border-border">
                                <Image
                                    src={article.image_url}
                                    alt={article.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 800px"
                                    priority
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Article Content + Sidebar */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">

                        {/* Main Content */}
                        <div className="flex-1 max-w-4xl">
                            <article
                                className="prose prose-lg max-w-none
                                    [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:scroll-mt-20
                                    [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-3
                                    [&_p]:leading-relaxed [&_p]:text-base [&_p]:md:text-lg [&_p]:mb-4
                                    [&_ul]:my-4 [&_ul]:space-y-2 [&_ol]:my-4 [&_ol]:space-y-2
                                    [&_li]:leading-relaxed
                                    [&_strong]:font-semibold
                                    [&_a]:text-amber-600 dark:[&_a]:text-amber-400 [&_a]:no-underline hover:[&_a]:underline"
                                dangerouslySetInnerHTML={{ __html: processedContent }}
                            />

                            {/* Author Bio */}
                            <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                                        {article.author.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Written by {article.author}</h3>
                                        <p className="text-sm text-text-secondary leading-relaxed">
                                            {article.author === 'Satyapal Khakhal'
                                                ? 'Satyapal is a finance writer and technology enthusiast based in India. He covers credit cards, personal finance, and fintech trends, helping readers make informed financial decisions. His articles combine thorough research with practical, actionable advice.'
                                                : `${article.author} is a contributor at GoldRate24 Business News, covering ${article.subcategory || 'business and finance'} topics. Their articles focus on providing actionable insights and expert analysis for Indian readers.`
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Tags */}
                            {article.tags && article.tags.length > 0 && (
                                <div className="mt-8 pt-8 border-t border-border">
                                    <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wider">Related Topics</h3>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <Tag className="w-4 h-4 text-text-secondary" />
                                        {article.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs text-text-secondary hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Disclaimer */}
                            <div className="mt-8 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                                <p className="text-sm text-blue-800 dark:text-blue-200">
                                    <strong>Disclaimer:</strong> The information provided in this article is for educational and informational purposes only. It does not constitute financial advice. Please consult with a qualified financial advisor before making any investment or financial decisions. Credit card features, fees, and benefits mentioned are subject to change by the issuing bank.
                                </p>
                            </div>
                        </div>

                        {/* Sidebar — Table of Contents + Quick Links */}
                        <aside className="lg:w-72 flex-shrink-0">
                            <div className="lg:sticky lg:top-24 space-y-6">
                                {/* Table of Contents */}
                                {headings.length > 0 && (
                                    <div className="card p-5">
                                        <h3 className="font-bold text-sm uppercase tracking-wider text-text-secondary mb-4">
                                            In This Article
                                        </h3>
                                        <nav className="space-y-2">
                                            {headings.map((heading, index) => (
                                                <a
                                                    key={index}
                                                    href={`#${heading.id}`}
                                                    className="block text-sm text-text-secondary hover:text-amber-600 dark:hover:text-amber-400 transition-colors leading-snug py-1 border-l-2 border-transparent hover:border-amber-500 pl-3"
                                                >
                                                    {heading.text}
                                                </a>
                                            ))}
                                        </nav>
                                    </div>
                                )}

                                {/* Article Info Card */}
                                <div className="card p-5">
                                    <h3 className="font-bold text-sm uppercase tracking-wider text-text-secondary mb-4">
                                        Article Details
                                    </h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="text-text-secondary">Category</span>
                                            <span className="font-medium">{article.subcategory || 'Business'}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-text-secondary">Read Time</span>
                                            <span className="font-medium">{article.read_time}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-text-secondary">Published</span>
                                            <span className="font-medium">{article.date}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-text-secondary">Words</span>
                                            <span className="font-medium">{wordCount.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Links */}
                                <div className="card p-5">
                                    <h3 className="font-bold text-sm uppercase tracking-wider text-text-secondary mb-4">
                                        Quick Links
                                    </h3>
                                    <div className="space-y-2">
                                        <Link href="/gold-rates" className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors py-1.5">
                                            <ArrowRight className="w-3 h-3" /> Live Gold Rates
                                        </Link>
                                        <Link href="/calculators/gold" className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors py-1.5">
                                            <ArrowRight className="w-3 h-3" /> Gold Calculator
                                        </Link>
                                        <Link href="/business-news" className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors py-1.5">
                                            <ArrowRight className="w-3 h-3" /> All Business News
                                        </Link>
                                        <Link href="/blog" className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors py-1.5">
                                            <ArrowRight className="w-3 h-3" /> Gold Investment Blog
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Recommended Business News */}
            {relatedArticles.length > 0 && (
                <section className="section bg-surface">
                    <div className="container-custom">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold mb-8">Recommended Business News</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {relatedArticles.map((related) => (
                                    <Link key={related.slug} href={`/business-news/${related.slug}`} className="group">
                                        <article className="card-hover h-full flex flex-col overflow-hidden">
                                            {related.image_url && (
                                                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                                                    <Image
                                                        src={related.image_url}
                                                        alt={related.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        sizes="(max-width: 768px) 100vw, 33vw"
                                                    />
                                                    {related.is_trending && (
                                                        <div className="absolute top-2 left-2 bg-red-500/90 backdrop-blur-sm px-2 py-0.5 rounded-full">
                                                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Trending</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            <div className="p-6 flex flex-col flex-1">
                                                {related.subcategory && (
                                                    <span className="text-xs font-medium text-amber-600 dark:text-amber-400 mb-2">
                                                        {related.subcategory}
                                                    </span>
                                                )}
                                                <h3 className="font-bold mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight">
                                                    {related.title}
                                                </h3>
                                                <p className="text-sm text-text-secondary line-clamp-2 flex-1">
                                                    {related.excerpt}
                                                </p>
                                                <div className="mt-4 flex items-center justify-between text-xs text-text-secondary">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {related.read_time}
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

                            <div className="mt-8 text-center">
                                <Link
                                    href="/business-news"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-amber-300 dark:border-amber-700 font-semibold hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors text-amber-700 dark:text-amber-300"
                                >
                                    View All Business News
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        <div className="card p-8 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-amber-200 dark:border-amber-800 text-center">
                            <h2 className="text-2xl font-bold mb-3">Check Today&apos;s Gold Rate</h2>
                            <p className="text-text-secondary mb-6">
                                Track real-time gold prices for 24K, 22K, and 18K gold across all major Indian cities.
                                Make informed decisions with live data and free calculators.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link href="/gold-rates" className="btn-primary">
                                    Live Gold Rates
                                </Link>
                                <Link href="/calculators/gold" className="px-6 py-3 rounded-xl border-2 border-amber-300 dark:border-amber-700 font-semibold hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                                    Gold Calculator
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
