import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, getBlogPost } from '@/lib/blogData';
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, ChevronRight } from 'lucide-react';

interface Props {
    params: { slug: string };
}

export async function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = getBlogPost(params.slug);
    if (!post) return { title: 'Post Not Found' };

    return {
        title: `${post.title} | GoldRate24 Blog`,
        description: post.description,
        keywords: post.keywords,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt,
            authors: [post.author],
            tags: post.tags,
            url: `/blog/${post.slug}`,
            siteName: 'GoldRate24',
            images: [{ url: post.image, width: 1200, height: 630 }],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
        },
        alternates: {
            canonical: `/blog/${post.slug}`,
        },
        robots: { index: true, follow: true },
    };
}

function MarkdownContent({ content }: { content: string }) {
    // Simple markdown-to-HTML renderer for blog content
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let inTable = false;
    let tableHeaders: string[] = [];
    let tableRows: string[][] = [];
    let inList = false;
    let listItems: string[] = [];
    let listType: 'ul' | 'ol' = 'ul';
    let inBlockquote = false;
    let blockquoteLines: string[] = [];
    let inCodeBlock = false;

    const flushTable = () => {
        if (tableHeaders.length > 0) {
            elements.push(
                <div key={`table-${elements.length}`} className="overflow-x-auto my-6">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-amber-50 dark:bg-amber-900/20">
                                {tableHeaders.map((header, i) => (
                                    <th key={i} className="border border-border px-4 py-2 text-left font-semibold text-text-primary">
                                        {header.trim()}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows.map((row, rowIdx) => (
                                <tr key={rowIdx} className={rowIdx % 2 === 0 ? '' : 'bg-surface'}>
                                    {row.map((cell, cellIdx) => (
                                        <td key={cellIdx} className="border border-border px-4 py-2 text-text-secondary">
                                            {formatInlineText(cell.trim())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }
        tableHeaders = [];
        tableRows = [];
        inTable = false;
    };

    const flushList = () => {
        if (listItems.length > 0) {
            const ListTag = listType;
            elements.push(
                <ListTag key={`list-${elements.length}`} className={`my-4 space-y-2 ${listType === 'ol' ? 'list-decimal' : 'list-disc'} list-outside ml-6 text-text-secondary`}>
                    {listItems.map((item, i) => (
                        <li key={i} className="leading-relaxed">{formatInlineText(item)}</li>
                    ))}
                </ListTag>
            );
        }
        listItems = [];
        inList = false;
    };

    const flushBlockquote = () => {
        if (blockquoteLines.length > 0) {
            elements.push(
                <blockquote key={`bq-${elements.length}`} className="my-6 pl-4 border-l-4 border-amber-400 bg-amber-50/50 dark:bg-amber-900/10 py-4 pr-4 rounded-r-lg">
                    {blockquoteLines.map((line, i) => (
                        <p key={i} className="text-text-secondary italic">{formatInlineText(line)}</p>
                    ))}
                </blockquote>
            );
        }
        blockquoteLines = [];
        inBlockquote = false;
    };

    function formatInlineText(text: string): React.ReactNode {
        // Handle bold, links, italics, inline code
        const parts: React.ReactNode[] = [];
        let remaining = text;
        let key = 0;

        while (remaining.length > 0) {
            // Links [text](url)
            const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
            // Bold **text**
            const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
            // Italic *text*
            const italicMatch = remaining.match(/(?<!\*)\*([^*]+)\*(?!\*)/);
            // Inline code `text`
            const codeMatch = remaining.match(/`([^`]+)`/);

            // Find earliest match
            const matches = [
                linkMatch ? { type: 'link', match: linkMatch, index: linkMatch.index! } : null,
                boldMatch ? { type: 'bold', match: boldMatch, index: boldMatch.index! } : null,
                italicMatch ? { type: 'italic', match: italicMatch, index: italicMatch.index! } : null,
                codeMatch ? { type: 'code', match: codeMatch, index: codeMatch.index! } : null,
            ].filter(Boolean) as { type: string; match: RegExpMatchArray; index: number }[];

            if (matches.length === 0) {
                parts.push(remaining);
                break;
            }

            const earliest = matches.reduce((a, b) => a.index < b.index ? a : b);

            if (earliest.index > 0) {
                parts.push(remaining.substring(0, earliest.index));
            }

            switch (earliest.type) {
                case 'link':
                    parts.push(
                        <Link key={key++} href={earliest.match[2]} className="text-amber-600 dark:text-amber-400 hover:underline font-medium">
                            {earliest.match[1]}
                        </Link>
                    );
                    break;
                case 'bold':
                    parts.push(
                        <strong key={key++} className="font-semibold text-text-primary">{earliest.match[1]}</strong>
                    );
                    break;
                case 'italic':
                    parts.push(<em key={key++}>{earliest.match[1]}</em>);
                    break;
                case 'code':
                    parts.push(
                        <code key={key++} className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-sm">{earliest.match[1]}</code>
                    );
                    break;
            }

            remaining = remaining.substring(earliest.index + earliest.match[0].length);
        }

        return parts.length === 1 ? parts[0] : <>{parts}</>;
    }

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        // Skip empty lines but flush lists/blockquotes
        if (trimmed === '') {
            if (inList) flushList();
            if (inBlockquote) flushBlockquote();
            continue;
        }

        // Skip code blocks
        if (trimmed.startsWith('```')) {
            if (inCodeBlock) {
                inCodeBlock = false;
            } else {
                inCodeBlock = true;
            }
            continue;
        }
        if (inCodeBlock) continue;

        // Tables
        if (trimmed.startsWith('|')) {
            if (!inList && inList) flushList();
            if (inBlockquote) flushBlockquote();

            const cells = trimmed.split('|').filter((c: string) => c.trim() !== '');

            if (trimmed.match(/^\|[\s-:|]+\|$/)) {
                continue; // separator row
            }

            if (!inTable) {
                inTable = true;
                tableHeaders = cells;
            } else {
                tableRows.push(cells);
            }
            continue;
        } else if (inTable) {
            flushTable();
        }

        // Blockquotes
        if (trimmed.startsWith('>')) {
            if (inList) flushList();
            inBlockquote = true;
            blockquoteLines.push(trimmed.replace(/^>\s*/, '').replace(/^\*\*(.+)\*\*:/, '$1:'));
            continue;
        } else if (inBlockquote) {
            flushBlockquote();
        }

        // Headers
        if (trimmed.startsWith('## ')) {
            if (inList) flushList();
            elements.push(
                <h2 key={`h2-${i}`} className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-text-primary">
                    {trimmed.replace('## ', '')}
                </h2>
            );
            continue;
        }
        if (trimmed.startsWith('### ')) {
            if (inList) flushList();
            elements.push(
                <h3 key={`h3-${i}`} className="text-xl md:text-2xl font-bold mt-8 mb-3 text-text-primary">
                    {trimmed.replace('### ', '')}
                </h3>
            );
            continue;
        }

        // Lists
        if (trimmed.match(/^[-*]\s/) || trimmed.match(/^\d+\.\s/)) {
            if (!inList) {
                inList = true;
                listType = trimmed.match(/^\d+\.\s/) ? 'ol' : 'ul';
            }
            listItems.push(trimmed.replace(/^[-*]\s/, '').replace(/^\d+\.\s/, ''));
            continue;
        } else if (inList) {
            flushList();
        }

        // Regular paragraphs
        elements.push(
            <p key={`p-${i}`} className="my-4 text-text-secondary leading-relaxed text-lg">
                {formatInlineText(trimmed)}
            </p>
        );
    }

    // Flush remaining
    if (inTable) flushTable();
    if (inList) flushList();
    if (inBlockquote) flushBlockquote();

    return <>{elements}</>;
}

export default function BlogPostPage({ params }: Props) {
    const post = getBlogPost(params.slug);
    if (!post) notFound();

    const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

    return (
        <div className="min-h-screen">
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            '@context': 'https://schema.org',
                            '@type': 'BlogPosting',
                            headline: post.title,
                            description: post.description,
                            datePublished: post.publishedAt,
                            dateModified: post.updatedAt,
                            author: { '@type': 'Organization', name: post.author },
                            publisher: {
                                '@type': 'Organization',
                                name: 'GoldRate24',
                                url: 'https://goldrate24.in',
                                logo: { '@type': 'ImageObject', url: 'https://goldrate24.in/icon.png' },
                            },
                            mainEntityOfPage: `https://goldrate24.in/blog/${post.slug}`,
                            keywords: post.keywords.join(', '),
                        },
                        {
                            '@context': 'https://schema.org',
                            '@type': 'BreadcrumbList',
                            itemListElement: [
                                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://goldrate24.in' },
                                { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://goldrate24.in/blog' },
                                { '@type': 'ListItem', position: 3, name: post.title, item: `https://goldrate24.in/blog/${post.slug}` },
                            ],
                        },
                    ]),
                }}
            />

            {/* Breadcrumb */}
            <div className="bg-surface border-b border-border">
                <div className="container-custom py-3">
                    <nav className="flex items-center gap-2 text-sm text-text-secondary">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-text-primary font-medium truncate max-w-[200px] sm:max-w-none">{post.title}</span>
                    </nav>
                </div>
            </div>

            {/* Article Header */}
            <section className="section bg-gradient-to-b from-amber-50/50 to-white dark:from-slate-900 dark:to-slate-950">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors mb-6">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>

                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                                {post.category}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-text-secondary">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <p className="text-lg md:text-xl text-text-secondary mb-6">
                            {post.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary pb-6 border-b border-border">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                Published {new Date(post.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span>Updated {new Date(post.updatedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>By {post.author}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <article className="prose prose-lg max-w-none">
                            <MarkdownContent content={post.content} />
                        </article>

                        {/* Tags */}
                        <div className="mt-12 pt-8 border-t border-border">
                            <div className="flex items-center gap-2 flex-wrap">
                                <Tag className="w-4 h-4 text-text-secondary" />
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs text-text-secondary"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Posts */}
            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold mb-8">Related Articles</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedPosts.map((related) => (
                                <Link key={related.slug} href={`/blog/${related.slug}`} className="group">
                                    <article className="card-hover p-6 h-full flex flex-col">
                                        <span className="text-xs font-medium text-amber-600 dark:text-amber-400 mb-2">
                                            {related.category}
                                        </span>
                                        <h3 className="font-bold mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight">
                                            {related.title}
                                        </h3>
                                        <p className="text-sm text-text-secondary line-clamp-2 flex-1">
                                            {related.description}
                                        </p>
                                        <span className="mt-4 text-xs text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1">
                                            Read More <ArrowRight className="w-3 h-3" />
                                        </span>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        <div className="card p-8 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-amber-200 dark:border-amber-800 text-center">
                            <h2 className="text-2xl font-bold mb-3">Check Today&apos;s Gold Rate</h2>
                            <p className="text-text-secondary mb-6">
                                Get real-time gold prices for 24K, 22K, and 18K gold across all major Indian cities.
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
