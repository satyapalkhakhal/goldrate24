'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Plus, Search, Trash2, Edit, ExternalLink } from 'lucide-react';
import type { CmsPage } from '@/lib/database.types';

export default function CmsPagesListPage() {
    const [pages, setPages] = useState<CmsPage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPages() {
            const { data } = await supabase
                .from('cms_pages')
                .select('*')
                .order('created_at', { ascending: false });

            if (data) setPages(data);
            setLoading(false);
        }
        fetchPages();
    }, []);

    async function deletePage(id: string, title: string) {
        if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
        const { error } = await supabase.from('cms_pages').delete().eq('id', id);
        if (!error) {
            setPages((prev) => prev.filter((p) => p.id !== id));
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">CMS Pages</h1>
                    <p className="text-slate-400 text-sm mt-1">{pages.length} total pages</p>
                </div>
                <Link
                    href="/admin/pages/new"
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl hover:from-purple-400 hover:to-purple-500 transition-all"
                >
                    <Plus className="w-4 h-4" />
                    New Page
                </Link>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                {pages.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                        <p>No CMS pages yet. Create your first one!</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-800 text-slate-400">
                                    <th className="text-left font-medium px-6 py-4">Title</th>
                                    <th className="text-left font-medium px-4 py-4 hidden md:table-cell">Slug</th>
                                    <th className="text-left font-medium px-4 py-4 hidden lg:table-cell">Date</th>
                                    <th className="text-left font-medium px-4 py-4">Status</th>
                                    <th className="text-right font-medium px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {pages.map((page) => (
                                    <tr key={page.id} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium">{page.title}</td>
                                        <td className="px-4 py-4 hidden md:table-cell text-slate-400">/{page.slug}</td>
                                        <td className="px-4 py-4 hidden lg:table-cell text-slate-400">
                                            {new Date(page.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${page.is_published
                                                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                    : 'bg-slate-700/50 text-slate-400 border border-slate-600'
                                                }`}>
                                                {page.is_published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                {page.is_published && (
                                                    <Link
                                                        href={`/page/${page.slug}`}
                                                        target="_blank"
                                                        className="p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </Link>
                                                )}
                                                <Link
                                                    href={`/admin/pages/${page.id}/edit`}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => deletePage(page.id, page.title)}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
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
