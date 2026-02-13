import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blogData';
import { Calendar, Clock, ArrowRight, BookOpen, Tag } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Gold Investment Blog - Expert Tips & Guides | GoldRate24',
    description:
        'Read expert articles on gold investment, buying tips, price analysis, and financial planning. Your trusted source for gold knowledge in India.',
    keywords: [
        'gold investment blog',
        'gold buying tips',
        'gold price analysis india',
        'gold investment guide',
        'gold jewelry buying tips',
        'gold loan guide',
        'gold rate blog',
    ],
    openGraph: {
        title: 'Gold Investment Blog - Expert Tips & Guides',
        description:
            'Expert articles on gold investment, buying tips, and financial planning for Indian investors.',
        type: 'website',
        url: '/blog',
        siteName: 'GoldRate24',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Gold Investment Blog - GoldRate24',
        description: 'Expert gold investment guides and buying tips for India.',
    },
    alternates: {
        canonical: '/blog',
    },
    robots: { index: true, follow: true },
};

const categoryColors: Record<string, string> = {
    Investment: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    Education: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    Tips: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    Finance: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
};

export default function BlogPage() {
    const featuredPost = BLOG_POSTS[0];
    const otherPosts = BLOG_POSTS.slice(1);

    return (
        <div className="min-h-screen">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Blog',
                        name: 'GoldRate24 Blog',
                        description: 'Expert articles on gold investment and financial planning in India',
                        url: 'https://goldrate24.in/blog',
                        publisher: {
                            '@type': 'Organization',
                            name: 'GoldRate24',
                            url: 'https://goldrate24.in',
                        },
                        blogPost: BLOG_POSTS.map((post) => ({
                            '@type': 'BlogPosting',
                            headline: post.title,
                            description: post.description,
                            datePublished: post.publishedAt,
                            dateModified: post.updatedAt,
                            author: { '@type': 'Organization', name: post.author },
                            url: `https://goldrate24.in/blog/${post.slug}`,
                        })),
                    }),
                }}
            />

            {/* Hero Section */}
            <section className="section bg-gradient-to-b from-amber-50 via-yellow-50/50 to-white dark:from-slate-900 dark:via-amber-950/10 dark:to-slate-950">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-700 dark:text-amber-300 text-sm font-medium mb-6">
                            <BookOpen className="w-4 h-4" />
                            Gold Knowledge Hub
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Gold Investment <span className="text-gradient-gold">Blog</span>
                        </h1>
                        <p className="text-lg md:text-xl text-text-secondary">
                            Expert guides, tips, and analysis to help you make smarter gold
                            investment decisions in India.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <Link href={`/blog/${featuredPost.slug}`} className="group block">
                            <div className="card p-8 md:p-12 hover:shadow-xl transition-all duration-300 border-2 border-amber-200 dark:border-amber-800 relative overflow-hidden">
                                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold rounded-full">
                                    FEATURED
                                </div>
                                <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[featuredPost.category] || 'bg-gray-100 text-gray-700'}`}>
                                                {featuredPost.category}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs text-text-secondary">
                                                <Clock className="w-3 h-3" />
                                                {featuredPost.readTime}
                                            </span>
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-text-secondary mb-6 text-lg">
                                            {featuredPost.description}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-text-secondary">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(featuredPost.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </span>
                                            <span>By {featuredPost.author}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="p-4 rounded-full bg-amber-100 dark:bg-amber-900/30 group-hover:bg-amber-200 dark:group-hover:bg-amber-800/40 transition-colors">
                                            <ArrowRight className="w-6 h-6 text-amber-600 dark:text-amber-400 transform group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* All Posts Grid */}
            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold mb-8">
                            Latest Articles
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {otherPosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group"
                                >
                                    <article className="card-hover p-6 h-full flex flex-col">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
                                                {post.category}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs text-text-secondary">
                                                <Clock className="w-3 h-3" />
                                                {post.readTime}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-text-secondary mb-4 flex-1 line-clamp-3">
                                            {post.description}
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-text-secondary pt-4 border-t border-border">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(post.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </span>
                                            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium group-hover:gap-2 transition-all">
                                                Read More <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Tags Section */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-6">Popular Topics</h2>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {[
                                'Gold Investment',
                                'Gold vs Mutual Funds',
                                '24K vs 22K Gold',
                                'Digital Gold',
                                'Gold Loan',
                                'Making Charges',
                                'Gold Price Factors',
                                'Best Time to Buy Gold',
                                'Gold ETF',
                                'Sovereign Gold Bonds',
                                'Gold Jewelry Tips',
                                'Gold GST',
                            ].map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-text-secondary hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-700 dark:hover:text-amber-300 transition-colors cursor-default"
                                >
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
                            Ready to Invest in Gold?
                        </h2>
                        <p className="text-lg mb-8 text-amber-100">
                            Check today's live gold rates and use our free calculators to make informed investment decisions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/gold-rates"
                                className="px-8 py-3 bg-white text-amber-600 rounded-xl font-semibold hover:bg-amber-50 transition-colors"
                            >
                                Check Gold Rates
                            </Link>
                            <Link
                                href="/calculators/gold"
                                className="px-8 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors border border-amber-400"
                            >
                                Gold Calculator
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
