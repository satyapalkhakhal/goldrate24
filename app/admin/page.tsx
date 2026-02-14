'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { FileText, Newspaper, Eye, PenLine } from 'lucide-react';
import Link from 'next/link';

interface Stats {
    totalArticles: number;
    publishedArticles: number;
    draftArticles: number;
    totalPages: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({
        totalArticles: 0,
        publishedArticles: 0,
        draftArticles: 0,
        totalPages: 0,
    });
    const [recentArticles, setRecentArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            const [
                { count: total },
                { count: published },
                { count: drafts },
                { count: pages },
                { data: recent },
            ] = await Promise.all([
                supabase.from('articles').select('*', { count: 'exact', head: true }),
                supabase.from('articles').select('*', { count: 'exact', head: true }).eq('is_published', true),
                supabase.from('articles').select('*', { count: 'exact', head: true }).eq('is_published', false),
                supabase.from('cms_pages').select('*', { count: 'exact', head: true }),
                supabase.from('articles').select('id, title, slug, is_published, created_at').order('created_at', { ascending: false }).limit(5),
            ]);

            setStats({
                totalArticles: total || 0,
                publishedArticles: published || 0,
                draftArticles: drafts || 0,
                totalPages: pages || 0,
            });
            setRecentArticles(recent || []);
            setLoading(false);
        }

        fetchStats();
    }, []);

    const statCards = [
        { label: 'Total Articles', value: stats.totalArticles, icon: Newspaper, color: 'from-blue-500 to-blue-600' },
        { label: 'Published', value: stats.publishedArticles, icon: Eye, color: 'from-green-500 to-green-600' },
        { label: 'Drafts', value: stats.draftArticles, icon: PenLine, color: 'from-amber-500 to-amber-600' },
        { label: 'CMS Pages', value: stats.totalPages, icon: FileText, color: 'from-purple-500 to-purple-600' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold">Welcome Back 👋</h1>
                <p className="text-slate-400 mt-1">Here&apos;s an overview of your content.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color}`}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold">{stat.value}</p>
                            <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                    href="/admin/articles/new"
                    className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 border border-amber-500/20 rounded-2xl p-6 hover:border-amber-500/40 transition-all group"
                >
                    <Newspaper className="w-8 h-8 text-amber-400 mb-3" />
                    <h3 className="font-semibold text-lg group-hover:text-amber-400 transition-colors">New Article</h3>
                    <p className="text-sm text-slate-400 mt-1">Create a new blog article with images</p>
                </Link>
                <Link
                    href="/admin/pages/new"
                    className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all group"
                >
                    <FileText className="w-8 h-8 text-purple-400 mb-3" />
                    <h3 className="font-semibold text-lg group-hover:text-purple-400 transition-colors">New CMS Page</h3>
                    <p className="text-sm text-slate-400 mt-1">Create a standalone content page</p>
                </Link>
            </div>

            {/* Recent Articles */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl">
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Recent Articles</h3>
                    <Link href="/admin/articles" className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
                        View All →
                    </Link>
                </div>
                {recentArticles.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                        <Newspaper className="w-10 h-10 mx-auto mb-3 opacity-50" />
                        <p>No articles yet. Create your first one!</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-800">
                        {recentArticles.map((article) => (
                            <div key={article.id} className="p-4 px-6 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium truncate">{article.title}</h4>
                                    <p className="text-xs text-slate-500 mt-1">
                                        {new Date(article.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 ml-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${article.is_published
                                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                            : 'bg-slate-700 text-slate-400'
                                        }`}>
                                        {article.is_published ? 'Published' : 'Draft'}
                                    </span>
                                    <Link
                                        href={`/admin/articles/${article.id}/edit`}
                                        className="text-xs text-slate-400 hover:text-amber-400 transition-colors"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
