'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Save, ArrowLeft, AlertCircle, Eye, Search, Globe } from 'lucide-react';
import Link from 'next/link';

interface CmsPageFormData {
    title: string;
    slug: string;
    description: string;
    content: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    is_published: boolean;
}

interface CmsPageEditorProps {
    pageId?: string;
}

export default function CmsPageEditor({ pageId }: CmsPageEditorProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [activeTab, setActiveTab] = useState<'editor' | 'seo'>('editor');

    const isEditing = !!pageId;

    const [form, setForm] = useState<CmsPageFormData>({
        title: '',
        slug: '',
        description: '',
        content: '',
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        is_published: false,
    });

    useEffect(() => {
        if (!pageId) return;
        async function load() {
            const { data } = await supabase.from('cms_pages').select('*').eq('id', pageId).single();
            if (data) {
                setForm({
                    title: data.title,
                    slug: data.slug,
                    description: data.description || '',
                    content: data.content,
                    meta_title: data.meta_title || '',
                    meta_description: data.meta_description || '',
                    meta_keywords: (data.meta_keywords || []).join(', '),
                    is_published: data.is_published,
                });
            }
        }
        load();
    }, [pageId]);

    const handleTitleChange = (title: string) => {
        setForm((prev) => ({
            ...prev,
            title,
            slug: !isEditing
                ? title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
                : prev.slug,
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        setError('');
        setSuccess('');

        if (!form.title || !form.slug || !form.content) {
            setError('Title, slug, and content are required');
            setSaving(false);
            return;
        }

        try {
            const pageData = {
                title: form.title,
                slug: form.slug,
                description: form.description || null,
                content: form.content,
                meta_title: form.meta_title || null,
                meta_description: form.meta_description || null,
                meta_keywords: form.meta_keywords.split(',').map((k) => k.trim()).filter(Boolean),
                is_published: form.is_published,
                published_at: form.is_published ? new Date().toISOString() : null,
            };

            if (isEditing) {
                const { error } = await supabase.from('cms_pages').update(pageData).eq('id', pageId);
                if (error) throw error;
                setSuccess('Page updated!');
            } else {
                const { error } = await supabase.from('cms_pages').insert(pageData);
                if (error) throw error;
                setSuccess('Page created!');
                setTimeout(() => router.push('/admin/pages'), 1000);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to save page');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link href="/admin/pages" className="p-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-bold">{isEditing ? 'Edit Page' : 'New CMS Page'}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={form.is_published}
                            onChange={(e) => setForm((prev) => ({ ...prev, is_published: e.target.checked }))}
                            className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-slate-700 peer-focus:ring-2 peer-focus:ring-amber-500/40 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500" />
                        <span className="text-sm text-slate-400">{form.is_published ? 'Published' : 'Draft'}</span>
                    </label>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
                    >
                        {saving ? <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white" /> : <Save className="w-4 h-4" />}
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                    <AlertCircle className="w-5 h-5" /> {error}
                </div>
            )}
            {success && (
                <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm">
                    <Eye className="w-5 h-5" /> {success}
                </div>
            )}

            {/* Tabs */}
            <div className="flex gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 w-fit">
                {[
                    { key: 'editor', label: '✍️ Editor' },
                    { key: 'seo', label: '🔍 SEO' },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as any)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.key ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'editor' && (
                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Page Title</label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                placeholder="Enter page title..."
                                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all outline-none text-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Slug</label>
                            <div className="flex items-center gap-2">
                                <span className="text-slate-500 text-sm">/page/</span>
                                <input
                                    type="text"
                                    value={form.slug}
                                    onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                                    className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all outline-none text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                            <textarea
                                value={form.description}
                                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                                placeholder="Brief page description..."
                                rows={2}
                                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all outline-none text-sm resize-none"
                            />
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <label className="block text-sm font-medium text-slate-300 mb-2">Content (Markdown)</label>
                        <textarea
                            value={form.content}
                            onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                            placeholder="Write your page content in Markdown..."
                            rows={20}
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all outline-none text-sm font-mono resize-y"
                        />
                    </div>
                </div>
            )}

            {activeTab === 'seo' && (
                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Meta Title (optional override)</label>
                            <input
                                type="text"
                                value={form.meta_title}
                                onChange={(e) => setForm((prev) => ({ ...prev, meta_title: e.target.value }))}
                                placeholder="Custom meta title..."
                                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Meta Description</label>
                            <textarea
                                value={form.meta_description}
                                onChange={(e) => setForm((prev) => ({ ...prev, meta_description: e.target.value }))}
                                placeholder="Custom meta description..."
                                rows={3}
                                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all outline-none text-sm resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Meta Keywords</label>
                            <input
                                type="text"
                                value={form.meta_keywords}
                                onChange={(e) => setForm((prev) => ({ ...prev, meta_keywords: e.target.value }))}
                                placeholder="keyword1, keyword2, keyword3"
                                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all outline-none text-sm"
                            />
                        </div>
                    </div>

                    {/* Google Preview */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <h3 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
                            <Search className="w-4 h-4" /> Google Preview
                        </h3>
                        <div className="bg-white rounded-xl p-6">
                            <p className="text-xs text-green-700">goldrate24.in › page › {form.slug || 'page-slug'}</p>
                            <h3 className="text-xl text-blue-800 font-medium mt-1">
                                {form.meta_title || form.title || 'Page Title'} | GoldRate24
                            </h3>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {form.meta_description || form.description || 'Page description...'}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
