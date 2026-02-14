'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Plus, Search, Trash2, Edit, Eye, ExternalLink } from 'lucide-react';
import type { Article } from '@/lib/database.types';

export default function ArticlesListPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

    useEffect(() => {
        fetchArticles();
    }, []);

    async function fetchArticles() {
        const { data, error } = await supabase
            .from('articles')
            .select('*, category:categories(name, slug, color)')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setArticles(data);
        }
        setLoading(false);
    }

    async function deleteArticle(id: string, title: string) {
        if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

        const { error } = await supabase.from('articles').delete().eq('id', id);
        if (!error) {
            setArticles((prev) => prev.filter((a) => a.id !== id));
        }
    }

    const filtered = articles.filter((article) => {
        const matchesSearch = article.title.toLowerCase().includes(search.toLowerCase()) ||
            article.slug.toLowerCase().includes(search.toLowerCase());
        const matchesFilter =
            filter === 'all' ||
            (filter === 'published' && article.is_published) ||
            (filter === 'draft' && !article.is_published);
        return matchesSearch && matchesFilter;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Articles</h1>
                    <p className="text-slate-400 text-sm mt-1">{articles.length} total articles</p>
                </div>
                <Link
                    href="/admin/articles/new"
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all"
                >
                    <Plus className="w-4 h-4" />
                    New Article
                </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all outline-none text-sm"
                    />
                </div>
                <div className="flex gap-2">
                    {(['all', 'published', 'draft'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all capitalize ${filter === f
                                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                {filtered.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                        <p>No articles found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-800 text-slate-400">
                                    <th className="text-left font-medium px-6 py-4">Title</th>
                                    <th className="text-left font-medium px-4 py-4 hidden md:table-cell">Category</th>
                                    <th className="text-left font-medium px-4 py-4 hidden lg:table-cell">Date</th>
                                    <th className="text-left font-medium px-4 py-4">Status</th>
                                    <th className="text-right font-medium px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {filtered.map((article) => (
                                    <tr key={article.id} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="min-w-0">
                                                <p className="font-medium truncate max-w-xs">{article.title}</p>
                                                <p className="text-xs text-slate-500 mt-0.5">/{article.slug}</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 hidden md:table-cell">
                                            <span className="px-2.5 py-1 rounded-full text-xs bg-slate-800 text-slate-300">
                                                {(article.category as any)?.name || '—'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 hidden lg:table-cell text-slate-400">
                                            {new Date(article.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${article.is_published
                                                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                    : 'bg-slate-700/50 text-slate-400 border border-slate-600'
                                                }`}>
                                                {article.is_published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                {article.is_published && (
                                                    <Link
                                                        href={`/blog/${article.slug}`}
                                                        target="_blank"
                                                        className="p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                                                        title="View"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </Link>
                                                )}
                                                <Link
                                                    href={`/admin/articles/${article.id}/edit`}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => deleteArticle(article.id, article.title)}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
