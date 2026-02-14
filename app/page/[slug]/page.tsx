import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase-server';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, Calendar } from 'lucide-react';

export const revalidate = 3600;

interface Props {
    params: { slug: string };
}

async function getCmsPage(slug: string) {
    const supabase = createServerClient();
    const { data } = await supabase
        .from('cms_pages')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

    return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const page = await getCmsPage(params.slug);
    if (!page) return { title: 'Page Not Found' };

    return {
        title: `${page.meta_title || page.title} | GoldRate24`,
        description: page.meta_description || page.description,
        keywords: page.meta_keywords,
        openGraph: {
            title: page.meta_title || page.title,
            description: page.meta_description || page.description || '',
            type: 'website',
            url: `/page/${page.slug}`,
            siteName: 'GoldRate24',
        },
        alternates: { canonical: `/page/${page.slug}` },
        robots: { index: true, follow: true },
    };
}

function SimpleMarkdown({ content }: { content: string }) {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];

    for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim();
        if (trimmed === '') continue;

        if (trimmed.startsWith('### ')) {
            elements.push(<h3 key={i} className="text-xl font-bold mt-8 mb-3">{trimmed.replace('### ', '')}</h3>);
        } else if (trimmed.startsWith('## ')) {
            elements.push(<h2 key={i} className="text-2xl font-bold mt-10 mb-4">{trimmed.replace('## ', '')}</h2>);
        } else if (trimmed.startsWith('# ')) {
            elements.push(<h1 key={i} className="text-3xl font-bold mt-10 mb-4">{trimmed.replace('# ', '')}</h1>);
        } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            elements.push(
                <li key={i} className="ml-6 list-disc text-text-secondary leading-relaxed">
                    {trimmed.replace(/^[-*]\s/, '')}
                </li>
            );
        } else {
            elements.push(<p key={i} className="my-4 text-text-secondary leading-relaxed text-lg">{trimmed}</p>);
        }
    }

    return <div className="prose prose-lg max-w-none">{elements}</div>;
}

export default async function CmsPageRoute({ params }: Props) {
    const page = await getCmsPage(params.slug);
    if (!page) notFound();

    return (
        <div className="min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebPage',
                        name: page.title,
                        description: page.description,
                        url: `https://goldrate24.in/page/${page.slug}`,
                        publisher: { '@type': 'Organization', name: 'GoldRate24' },
                    }),
                }}
            />

            <div className="bg-surface border-b border-border">
                <div className="container-custom py-3">
                    <nav className="flex items-center gap-2 text-sm text-text-secondary">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-text-primary font-medium">{page.title}</span>
                    </nav>
                </div>
            </div>

            <section className="section">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{page.title}</h1>
                        {page.description && (
                            <p className="text-lg text-text-secondary mb-8">{page.description}</p>
                        )}
                        <div className="text-sm text-text-secondary mb-8 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Last updated: {new Date(page.updated_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <article>
                            <SimpleMarkdown content={page.content} />
                        </article>
                    </div>
                </div>
            </section>
        </div>
    );
}
