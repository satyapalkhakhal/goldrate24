import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase-server';
import type { Article, ArticleImage } from '@/lib/database.types';
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, ChevronRight } from 'lucide-react';

// Revalidate every hour
export const revalidate = 3600;

interface Props {
    params: { slug: string };
}

async function getArticle(slug: string): Promise<{ article: Article; images: ArticleImage[] } | null> {
    const supabase = createServerClient();

    const { data: article } = await supabase
        .from('articles')
        .select('*, category:categories(name, slug, color)')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

    if (!article) {
        // Fallback to hardcoded data
        const { getBlogPost } = await import('@/lib/blogData');
        const post = getBlogPost(slug);
        if (!post) return null;

        return {
            article: {
                id: post.slug,
                slug: post.slug,
                title: post.title,
                description: post.description,
                content: post.content,
                author: post.author,
                category_id: null,
                tags: post.tags,
                keywords: post.keywords,
                read_time: post.readTime,
                featured_image: post.image,
                is_published: true,
                is_featured: false,
                published_at: post.publishedAt,
                created_at: post.publishedAt,
                updated_at: post.updatedAt,
                category: { id: '', name: post.category, slug: post.category.toLowerCase(), color: 'amber', created_at: '' },
            },
            images: [],
        };
    }

    const { data: images } = await supabase
        .from('article_images')
        .select('*')
        .eq('article_id', article.id)
        .order('sort_order');

    return { article, images: images || [] };
}

async function getRelatedArticles(currentSlug: string): Promise<Article[]> {
    const supabase = createServerClient();
    const { data } = await supabase
        .from('articles')
        .select('*, category:categories(name, slug, color)')
        .eq('is_published', true)
        .neq('slug', currentSlug)
        .order('published_at', { ascending: false })
        .limit(3);

    if (!data || data.length === 0) {
        const { BLOG_POSTS } = await import('@/lib/blogData');
        return BLOG_POSTS
            .filter((p) => p.slug !== currentSlug)
            .slice(0, 3)
            .map((post) => ({
                id: post.slug,
                slug: post.slug,
                title: post.title,
                description: post.description,
                content: '',
                author: post.author,
                category_id: null,
                tags: post.tags,
                keywords: post.keywords,
                read_time: post.readTime,
                featured_image: post.image,
                is_published: true,
                is_featured: false,
                published_at: post.publishedAt,
                created_at: post.publishedAt,
                updated_at: post.updatedAt,
                category: { id: '', name: post.category, slug: post.category.toLowerCase(), color: 'amber', created_at: '' },
            }));
    }

    return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const result = await getArticle(params.slug);
    if (!result) return { title: 'Post Not Found' };

    const { article, images } = result;
    const ogImage = article.featured_image || '/og-image.png';

    return {
        title: `${article.title} | GoldRate24 Blog`,
        description: article.description,
        keywords: article.keywords,
        authors: [{ name: article.author }],
        openGraph: {
            title: article.title,
            description: article.description,
            type: 'article',
            publishedTime: article.published_at || article.created_at,
            modifiedTime: article.updated_at,
            authors: [article.author],
            tags: article.tags,
            url: `/blog/${article.slug}`,
            siteName: 'GoldRate24',
            images: [
                { url: ogImage, width: 1200, height: 630 },
                ...images.map((img) => ({ url: img.url, width: img.width || 800, height: img.height || 600, alt: img.alt_text })),
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.description,
            images: [ogImage],
        },
        alternates: {
            canonical: `/blog/${article.slug}`,
        },
        robots: { index: true, follow: true },
    };
}

// Inline image component for articles
function ArticleInlineImage({ image }: { image: ArticleImage }) {
    return (
        <figure className="my-8">
            <img
                src={image.url}
                alt={image.alt_text || ''}
                width={image.width || undefined}
                height={image.height || undefined}
                loading="lazy"
                className="w-full rounded-xl border border-border"
            />
            {image.caption && (
                <figcaption className="text-center text-sm text-text-secondary mt-3 italic">
                    {image.caption}
                </figcaption>
            )}
        </figure>
    );
}

function MarkdownContent({ content, images }: { content: string; images: ArticleImage[] }) {
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
        const parts: React.ReactNode[] = [];
        let remaining = text;
        let key = 0;

        while (remaining.length > 0) {
            const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
            const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
            const italicMatch = remaining.match(/(?<!\*)\*([^*]+)\*(?!\*)/);
            const codeMatch = remaining.match(/`([^`]+)`/);

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

        // Check for inline image placeholder {{image:N}}
        const imageMatch = trimmed.match(/^\{\{image:(\d+)\}\}$/);
        if (imageMatch) {
            if (inList) flushList();
            if (inBlockquote) flushBlockquote();
            if (inTable) flushTable();
            const imgIndex = parseInt(imageMatch[1]);
            if (images[imgIndex]) {
                elements.push(<ArticleInlineImage key={`img-${i}`} image={images[imgIndex]} />);
            }
            continue;
        }

        if (trimmed === '') {
            if (inList) flushList();
            if (inBlockquote) flushBlockquote();
            continue;
        }

        if (trimmed.startsWith('```')) {
            if (inCodeBlock) {
                inCodeBlock = false;
            } else {
                inCodeBlock = true;
            }
            continue;
        }
        if (inCodeBlock) continue;

        if (trimmed.startsWith('|')) {
            if (inBlockquote) flushBlockquote();
            const cells = trimmed.split('|').filter((c: string) => c.trim() !== '');
            if (trimmed.match(/^\|[\s-:|]+\|$/)) {
                continue;
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

        if (trimmed.startsWith('>')) {
            if (inList) flushList();
            inBlockquote = true;
            blockquoteLines.push(trimmed.replace(/^>\s*/, '').replace(/^\*\*(.+)\*\*:/, '$1:'));
            continue;
        } else if (inBlockquote) {
            flushBlockquote();
        }

        if (trimmed.startsWith('## ')) {
            if (inList) flushList();
            const text = trimmed.replace('## ', '');
            const id = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
            elements.push(
                <h2 key={`h2-${i}`} id={id} className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-text-primary scroll-mt-20">
                    {text}
                </h2>
            );
            continue;
        }
        if (trimmed.startsWith('### ')) {
            if (inList) flushList();
            const text = trimmed.replace('### ', '');
            const id = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
            elements.push(
                <h3 key={`h3-${i}`} id={id} className="text-xl md:text-2xl font-bold mt-8 mb-3 text-text-primary scroll-mt-20">
                    {text}
                </h3>
            );
            continue;
        }

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

        elements.push(
            <p key={`p-${i}`} className="my-4 text-text-secondary leading-relaxed text-lg">
                {formatInlineText(trimmed)}
            </p>
        );
    }

    if (inTable) flushTable();
    if (inList) flushList();
    if (inBlockquote) flushBlockquote();

    return <>{elements}</>;
}

export default async function BlogPostPage({ params }: Props) {
    const result = await getArticle(params.slug);
    if (!result) notFound();

    const { article: post, images } = result;
    const relatedPosts = await getRelatedArticles(params.slug);

    // Build image URLs array for JSON-LD
    const allImageUrls = [
        post.featured_image,
        ...images.map((img) => img.url),
    ].filter(Boolean);

    return (
        <div className="min-h-screen">
            {/* JSON-LD with image structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            '@context': 'https://schema.org',
                            '@type': 'BlogPosting',
                            headline: post.title,
                            description: post.description,
                            datePublished: post.published_at || post.created_at,
                            dateModified: post.updated_at,
                            author: { '@type': 'Organization', name: post.author },
                            publisher: {
                                '@type': 'Organization',
                                name: 'GoldRate24',
                                url: 'https://goldrate24.in',
                                logo: { '@type': 'ImageObject', url: 'https://goldrate24.in/icon.png' },
                            },
                            mainEntityOfPage: `https://goldrate24.in/blog/${post.slug}`,
                            keywords: post.keywords.join(', '),
                            image: allImageUrls,
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
                        // ImageObject structured data for each article image
                        ...images.map((img) => ({
                            '@context': 'https://schema.org',
                            '@type': 'ImageObject',
                            url: img.url,
                            name: img.alt_text || post.title,
                            caption: img.caption || img.alt_text || post.title,
                            ...(img.width ? { width: img.width } : {}),
                            ...(img.height ? { height: img.height } : {}),
                        })),
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
                                {(post.category as any)?.name || 'General'}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-text-secondary">
                                <Clock className="w-4 h-4" />
                                {post.read_time}
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
                                Published {new Date(post.published_at || post.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span>Updated {new Date(post.updated_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>By {post.author}</span>
                        </div>

                        {/* Featured Image */}
                        {post.featured_image && post.featured_image !== '/og-image.png' && (
                            <div className="mt-8">
                                <img
                                    src={post.featured_image}
                                    alt={post.title}
                                    className="w-full rounded-2xl border border-border"
                                    loading="eager"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <article className="prose prose-lg max-w-none">
                            <MarkdownContent content={post.content} images={images} />
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
                                    <article className="card-hover h-full flex flex-col overflow-hidden">
                                        {related.featured_image && related.featured_image !== '/og-image.png' && (
                                            <img
                                                src={related.featured_image}
                                                alt={related.title}
                                                className="w-full h-40 object-cover"
                                                loading="lazy"
                                            />
                                        )}
                                        <div className="p-6 flex flex-col flex-1">
                                            <span className="text-xs font-medium text-amber-600 dark:text-amber-400 mb-2">
                                                {(related.category as any)?.name || 'General'}
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
                                        </div>
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
