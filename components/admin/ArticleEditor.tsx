'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, STORAGE_BUCKET, getStorageUrl } from '@/lib/supabase';
import type { Category, ArticleImage } from '@/lib/database.types';
import {
    Save,
    Eye,
    Upload,
    X,
    GripVertical,
    Star,
    StarOff,
    Image as ImageIcon,
    AlertCircle,
    ArrowLeft,
    Search,
    Globe,
    Tag,
} from 'lucide-react';
import Link from 'next/link';

interface ArticleFormData {
    title: string;
    slug: string;
    description: string;
    content: string;
    author: string;
    category_id: string;
    tags: string;
    keywords: string;
    read_time: string;
    is_published: boolean;
    is_featured: boolean;
}

interface UploadedImage {
    id?: string;
    url: string;
    alt_text: string;
    caption: string;
    sort_order: number;
    file?: File;
    isNew?: boolean;
}

interface ArticleEditorProps {
    articleId?: string;
}

export default function ArticleEditor({ articleId }: ArticleEditorProps) {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [images, setImages] = useState<UploadedImage[]>([]);
    const [featuredImageUrl, setFeaturedImageUrl] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'seo'>('editor');
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [showImagePicker, setShowImagePicker] = useState(false);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const cursorPositionRef = useRef<number>(0);

    // Track cursor position in content textarea
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, content: e.target.value }));
        cursorPositionRef.current = e.target.selectionStart;
    };

    const handleContentSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
        cursorPositionRef.current = (e.target as HTMLTextAreaElement).selectionStart;
    };

    // Insert image placeholder at cursor position in content
    const insertImageAtCursor = (imageIndex: number) => {
        const textarea = contentRef.current;
        const placeholder = `{{image:${imageIndex}}}`;
        const pos = cursorPositionRef.current;
        const before = form.content.substring(0, pos);
        const after = form.content.substring(pos);

        // Add newlines around the placeholder if not already at line boundaries
        const needNewlineBefore = before.length > 0 && !before.endsWith('\n');
        const needNewlineAfter = after.length > 0 && !after.startsWith('\n');
        const insert = `${needNewlineBefore ? '\n' : ''}${placeholder}${needNewlineAfter ? '\n' : ''}`;

        const newContent = before + insert + after;
        setForm((prev) => ({ ...prev, content: newContent }));

        // Update cursor position after insertion
        const newPos = pos + insert.length;
        cursorPositionRef.current = newPos;

        // Focus textarea and set cursor
        setTimeout(() => {
            if (textarea) {
                textarea.focus();
                textarea.selectionStart = newPos;
                textarea.selectionEnd = newPos;
            }
        }, 50);

        setShowImagePicker(false);
    };

    const [form, setForm] = useState<ArticleFormData>({
        title: '',
        slug: '',
        description: '',
        content: '',
        author: 'GoldRate24 Team',
        category_id: '',
        tags: '',
        keywords: '',
        read_time: '5 min read',
        is_published: false,
        is_featured: false,
    });

    const isEditing = !!articleId;

    // Fetch categories
    useEffect(() => {
        supabase.from('categories').select('*').order('name').then(({ data }) => {
            if (data) setCategories(data);
        });
    }, []);

    // Fetch article data if editing
    useEffect(() => {
        if (!articleId) return;

        async function loadArticle() {
            const { data: article } = await supabase
                .from('articles')
                .select('*')
                .eq('id', articleId)
                .single();

            if (article) {
                setForm({
                    title: article.title,
                    slug: article.slug,
                    description: article.description,
                    content: article.content,
                    author: article.author || 'GoldRate24 Team',
                    category_id: article.category_id || '',
                    tags: (article.tags || []).join(', '),
                    keywords: (article.keywords || []).join(', '),
                    read_time: article.read_time || '5 min read',
                    is_published: article.is_published,
                    is_featured: article.is_featured,
                });
                setFeaturedImageUrl(article.featured_image || '');

                // Load images
                const { data: imgs } = await supabase
                    .from('article_images')
                    .select('*')
                    .eq('article_id', articleId)
                    .order('sort_order');

                if (imgs) {
                    setImages(imgs.map((img) => ({
                        id: img.id,
                        url: img.url,
                        alt_text: img.alt_text || '',
                        caption: img.caption || '',
                        sort_order: img.sort_order,
                    })));
                }
            }
        }

        loadArticle();
    }, [articleId]);

    // Auto-generate slug from title
    const handleTitleChange = (title: string) => {
        setForm((prev) => ({
            ...prev,
            title,
            slug: !isEditing ? title.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim() : prev.slug,
        }));
    };

    // Calculate read time
    const calculateReadTime = (content: string) => {
        const words = content.trim().split(/\s+/).length;
        const minutes = Math.max(1, Math.ceil(words / 200));
        return `${minutes} min read`;
    };

    // Image upload handler
    const handleImageUpload = useCallback(async (files: FileList | File[]) => {
        setUploading(true);
        setError('');

        const newImages: UploadedImage[] = [];

        for (const file of Array.from(files)) {
            if (!file.type.startsWith('image/')) {
                setError('Only image files are allowed');
                continue;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError('Images must be under 5MB');
                continue;
            }

            const ext = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${ext}`;
            const path = `articles/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(STORAGE_BUCKET)
                .upload(path, file, { cacheControl: '31536000' });

            if (uploadError) {
                setError(`Upload failed: ${uploadError.message}`);
                continue;
            }

            const url = getStorageUrl(path);
            newImages.push({
                url,
                alt_text: file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
                caption: '',
                sort_order: images.length + newImages.length,
                isNew: true,
            });
        }

        setImages((prev) => [...prev, ...newImages]);

        // Set first image as featured if none set
        if (!featuredImageUrl && newImages.length > 0) {
            setFeaturedImageUrl(newImages[0].url);
        }

        setUploading(false);
    }, [images.length, featuredImageUrl]);

    // Drag & drop handlers
    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        handleImageUpload(e.dataTransfer.files);
    }, [handleImageUpload]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setDragOver(false);
    }, []);

    // Remove image
    const removeImage = async (index: number) => {
        const image = images[index];
        if (image.id) {
            await supabase.from('article_images').delete().eq('id', image.id);
        }
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        if (featuredImageUrl === image.url && newImages.length > 0) {
            setFeaturedImageUrl(newImages[0].url);
        } else if (newImages.length === 0) {
            setFeaturedImageUrl('');
        }
    };

    // Update image metadata
    const updateImage = (index: number, field: 'alt_text' | 'caption', value: string) => {
        setImages((prev) =>
            prev.map((img, i) => (i === index ? { ...img, [field]: value } : img))
        );
    };

    // Move image for reordering
    const moveImage = (fromIndex: number, toIndex: number) => {
        if (toIndex < 0 || toIndex >= images.length) return;
        const newImages = [...images];
        const [moved] = newImages.splice(fromIndex, 1);
        newImages.splice(toIndex, 0, moved);
        setImages(newImages.map((img, i) => ({ ...img, sort_order: i })));
    };

    // Save article
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
            const articleData = {
                title: form.title,
                slug: form.slug,
                description: form.description,
                content: form.content,
                author: form.author,
                category_id: form.category_id || null,
                tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
                keywords: form.keywords.split(',').map((k) => k.trim()).filter(Boolean),
                read_time: calculateReadTime(form.content),
                featured_image: featuredImageUrl || null,
                is_published: form.is_published,
                is_featured: form.is_featured,
                published_at: form.is_published ? new Date().toISOString() : null,
            };

            let savedArticleId = articleId;

            if (isEditing) {
                const { error: updateError } = await supabase
                    .from('articles')
                    .update(articleData)
                    .eq('id', articleId);

                if (updateError) throw updateError;
            } else {
                const { data, error: insertError } = await supabase
                    .from('articles')
                    .insert(articleData)
                    .select('id')
                    .single();

                if (insertError) throw insertError;
                savedArticleId = data.id;
            }

            // Save images
            if (savedArticleId) {
                // Delete removed images (for edit mode)
                if (isEditing) {
                    const existingIds = images.filter((img) => img.id).map((img) => img.id);
                    if (existingIds.length > 0) {
                        await supabase
                            .from('article_images')
                            .delete()
                            .eq('article_id', savedArticleId)
                            .not('id', 'in', `(${existingIds.join(',')})`);
                    } else {
                        await supabase
                            .from('article_images')
                            .delete()
                            .eq('article_id', savedArticleId);
                    }
                }

                // Insert new images and update existing
                for (const img of images) {
                    if (img.id) {
                        await supabase
                            .from('article_images')
                            .update({
                                alt_text: img.alt_text,
                                caption: img.caption,
                                sort_order: img.sort_order,
                            })
                            .eq('id', img.id);
                    } else {
                        await supabase.from('article_images').insert({
                            article_id: savedArticleId,
                            url: img.url,
                            alt_text: img.alt_text,
                            caption: img.caption,
                            sort_order: img.sort_order,
                        });
                    }
                }
            }

            setSuccess(isEditing ? 'Article updated!' : 'Article created!');

            if (!isEditing) {
                setTimeout(() => router.push('/admin/articles'), 1000);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to save article');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link href="/admin/articles" className="p-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">{isEditing ? 'Edit Article' : 'New Article'}</h1>
                        <p className="text-slate-400 text-sm mt-0.5">{isEditing ? 'Update your article' : 'Create a new blog article'}</p>
                    </div>
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
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all disabled:opacity-50"
                    >
                        {saving ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-slate-900" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>

            {/* Messages */}
            {error && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {error}
                </div>
            )}
            {success && (
                <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm">
                    <Eye className="w-5 h-5 flex-shrink-0" />
                    {success}
                </div>
            )}

            {/* Tabs */}
            <div className="flex gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 w-fit">
                {[
                    { key: 'editor', label: 'Editor', icon: '✍️' },
                    { key: 'preview', label: 'Preview', icon: '👁' },
                    { key: 'seo', label: 'SEO', icon: '🔍' },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as any)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.key
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    {activeTab === 'editor' && (
                        <>
                            {/* Title */}
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={form.title}
                                        onChange={(e) => handleTitleChange(e.target.value)}
                                        placeholder="Enter article title..."
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all outline-none text-lg"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Slug</label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-slate-500 text-sm">/blog/</span>
                                        <input
                                            type="text"
                                            value={form.slug}
                                            onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                                            placeholder="article-slug"
                                            className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all outline-none text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                                    <textarea
                                        value={form.description}
                                        onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                                        placeholder="Brief description for search results and social sharing..."
                                        rows={3}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all outline-none text-sm resize-none"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-slate-300">
                                        Content (Markdown)
                                    </label>
                                    {/* Toolbar */}
                                    <div className="flex items-center gap-2">
                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={() => setShowImagePicker(!showImagePicker)}
                                                disabled={images.length === 0}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-medium text-slate-300 hover:text-amber-400 hover:border-amber-500/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                <ImageIcon className="w-3.5 h-3.5" />
                                                Insert Image
                                            </button>
                                            {/* Image picker dropdown */}
                                            {showImagePicker && images.length > 0 && (
                                                <div className="absolute right-0 top-full mt-2 w-72 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                                                    <div className="p-3 border-b border-slate-700">
                                                        <p className="text-xs text-slate-400">Click an image to insert at cursor position</p>
                                                    </div>
                                                    <div className="max-h-64 overflow-y-auto p-2 space-y-1">
                                                        {images.map((img, idx) => (
                                                            <button
                                                                key={idx}
                                                                onClick={() => insertImageAtCursor(idx)}
                                                                className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-700/50 transition-colors text-left"
                                                            >
                                                                <img src={img.url} alt={img.alt_text} className="w-10 h-10 rounded object-cover border border-slate-600 flex-shrink-0" />
                                                                <div className="min-w-0 flex-1">
                                                                    <p className="text-xs text-white truncate">{img.alt_text || `Image ${idx}`}</p>
                                                                    <p className="text-[10px] text-amber-400/60 font-mono">{`{{image:${idx}}}`}</p>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <textarea
                                    ref={contentRef}
                                    value={form.content}
                                    onChange={handleContentChange}
                                    onSelect={handleContentSelect}
                                    onClick={handleContentSelect}
                                    placeholder={`Write your article in Markdown...

## Heading
Your content here...

### Sub Heading
- List item 1
- List item 2

**Bold text** and *italic text*

Tip: Upload images below, then click "Insert Image" above or
the ↗ button on any image to place it at your cursor position.`}
                                    rows={20}
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all outline-none text-sm font-mono resize-y"
                                />
                                <p className="text-xs text-slate-500 mt-2">
                                    Supports Markdown. Upload images below, then use the <strong className="text-amber-400">Insert Image</strong> button or click <strong className="text-amber-400">↗ Insert</strong> on any image.
                                    Read time: {calculateReadTime(form.content)}
                                </p>
                            </div>

                            {/* Image Upload */}
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <ImageIcon className="w-5 h-5 text-amber-400" />
                                        Article Images ({images.length})
                                    </h3>
                                </div>

                                {/* Drop Zone */}
                                <div
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    className={`
                    border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
                    ${dragOver
                                            ? 'border-amber-500 bg-amber-500/5'
                                            : 'border-slate-700 hover:border-slate-600'}
                  `}
                                    onClick={() => {
                                        const input = document.createElement('input');
                                        input.type = 'file';
                                        input.multiple = true;
                                        input.accept = 'image/*';
                                        input.onchange = (e) => {
                                            const files = (e.target as HTMLInputElement).files;
                                            if (files) handleImageUpload(files);
                                        };
                                        input.click();
                                    }}
                                >
                                    {uploading ? (
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-amber-500" />
                                            <span className="text-slate-400">Uploading...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                                            <p className="text-slate-400 text-sm">
                                                Drag & drop images here, or <span className="text-amber-400">click to browse</span>
                                            </p>
                                            <p className="text-xs text-slate-500 mt-1">PNG, JPG, WebP, AVIF • Max 5MB each</p>
                                        </>
                                    )}
                                </div>

                                {/* Image Gallery */}
                                {images.length > 0 && (
                                    <div className="space-y-3">
                                        {images.map((image, index) => (
                                            <div
                                                key={index}
                                                className={`flex gap-4 p-4 bg-slate-800/50 rounded-xl border ${featuredImageUrl === image.url
                                                    ? 'border-amber-500/30 bg-amber-500/5'
                                                    : 'border-slate-700'
                                                    }`}
                                            >
                                                {/* Drag handle + Image Preview */}
                                                <div className="flex items-start gap-2">
                                                    <div className="flex flex-col gap-1 pt-2">
                                                        <button
                                                            onClick={() => moveImage(index, index - 1)}
                                                            className="p-1 rounded text-slate-500 hover:text-white hover:bg-slate-700 transition-colors disabled:opacity-30"
                                                            disabled={index === 0}
                                                        >
                                                            ▲
                                                        </button>
                                                        <button
                                                            onClick={() => moveImage(index, index + 1)}
                                                            className="p-1 rounded text-slate-500 hover:text-white hover:bg-slate-700 transition-colors disabled:opacity-30"
                                                            disabled={index === images.length - 1}
                                                        >
                                                            ▼
                                                        </button>
                                                    </div>
                                                    <img
                                                        src={image.url}
                                                        alt={image.alt_text}
                                                        className="w-24 h-24 object-cover rounded-lg border border-slate-700"
                                                    />
                                                </div>

                                                {/* Image Details */}
                                                <div className="flex-1 space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs px-2 py-0.5 bg-slate-700 rounded text-slate-300">
                                                            Image #{index}
                                                        </span>
                                                        <code className="text-xs text-amber-400/60">{`{{image:${index}}}`}</code>
                                                        <button
                                                            type="button"
                                                            onClick={() => insertImageAtCursor(index)}
                                                            className="flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded text-xs text-amber-400 hover:bg-amber-500/20 transition-all"
                                                            title="Insert this image at cursor position in content"
                                                        >
                                                            ↗ Insert
                                                        </button>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={image.alt_text}
                                                        onChange={(e) => updateImage(index, 'alt_text', e.target.value)}
                                                        placeholder="Alt text (for SEO & accessibility)"
                                                        className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 text-xs outline-none focus:border-amber-500/50"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={image.caption}
                                                        onChange={(e) => updateImage(index, 'caption', e.target.value)}
                                                        placeholder="Caption (optional)"
                                                        className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 text-xs outline-none focus:border-amber-500/50"
                                                    />
                                                </div>

                                                {/* Actions */}
                                                <div className="flex flex-col gap-2">
                                                    <button
                                                        onClick={() => setFeaturedImageUrl(image.url)}
                                                        className={`p-2 rounded-lg transition-all ${featuredImageUrl === image.url
                                                            ? 'text-amber-400 bg-amber-500/10'
                                                            : 'text-slate-500 hover:text-amber-400 hover:bg-slate-700'
                                                            }`}
                                                        title={featuredImageUrl === image.url ? 'Featured Image' : 'Set as Featured'}
                                                    >
                                                        {featuredImageUrl === image.url ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
                                                    </button>
                                                    <button
                                                        onClick={() => removeImage(index)}
                                                        className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                                        title="Remove"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {activeTab === 'preview' && (
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                            <div className="prose prose-invert prose-amber max-w-none">
                                <h1>{form.title || 'Untitled Article'}</h1>
                                <p className="lead text-slate-400">{form.description}</p>
                                <hr />
                                <div className="whitespace-pre-wrap text-slate-300">
                                    {form.content
                                        ? form.content.replace(/\{\{image:(\d+)\}\}/g, (_, idx) => {
                                            const img = images[parseInt(idx)];
                                            return img ? `\n[Image: ${img.alt_text || `Image ${idx}`}]\n` : '';
                                        })
                                        : 'No content yet...'}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'seo' && (
                        <div className="space-y-6">
                            {/* Google Preview */}
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                                <h3 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
                                    <Search className="w-4 h-4" />
                                    Google Search Preview
                                </h3>
                                <div className="bg-white rounded-xl p-6">
                                    <div className="space-y-1">
                                        <p className="text-xs text-green-700">goldrate24.in › blog › {form.slug || 'article-slug'}</p>
                                        <h3 className="text-xl text-blue-800 font-medium hover:underline cursor-pointer">
                                            {form.title || 'Article Title'} | GoldRate24 Blog
                                        </h3>
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {form.description || 'Article description will appear here...'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* OG Preview */}
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                                <h3 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
                                    <Globe className="w-4 h-4" />
                                    Social Sharing Preview
                                </h3>
                                <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 max-w-md">
                                    {featuredImageUrl && (
                                        <img src={featuredImageUrl} alt="" className="w-full h-40 object-cover" />
                                    )}
                                    <div className="p-4">
                                        <p className="text-xs text-slate-500 uppercase">goldrate24.in</p>
                                        <h4 className="font-semibold text-white mt-1 line-clamp-2">{form.title || 'Article Title'}</h4>
                                        <p className="text-sm text-slate-400 mt-1 line-clamp-2">{form.description || 'Description...'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* SEO Checklist */}
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                                <h3 className="text-sm font-medium text-slate-300 mb-4">SEO Checklist</h3>
                                <div className="space-y-3 text-sm">
                                    {[
                                        { label: 'Title is set', ok: !!form.title },
                                        { label: 'Title length (50-60 chars)', ok: form.title.length >= 50 && form.title.length <= 70 },
                                        { label: 'Description is set', ok: !!form.description },
                                        { label: 'Description length (120-160 chars)', ok: form.description.length >= 120 && form.description.length <= 160 },
                                        { label: 'Keywords are set', ok: !!form.keywords },
                                        { label: 'Featured image', ok: !!featuredImageUrl },
                                        { label: 'Images have alt text', ok: images.every((img) => !!img.alt_text) },
                                        { label: 'Content is substantial (300+ words)', ok: form.content.trim().split(/\s+/).length >= 300 },
                                        { label: 'Slug is set', ok: !!form.slug },
                                        { label: 'Category is assigned', ok: !!form.category_id },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${item.ok ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-500'
                                                }`}>
                                                {item.ok ? '✓' : '○'}
                                            </div>
                                            <span className={item.ok ? 'text-slate-300' : 'text-slate-500'}>{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Category */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                        <select
                            value={form.category_id}
                            onChange={(e) => setForm((prev) => ({ ...prev, category_id: e.target.value }))}
                            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all outline-none text-sm"
                        >
                            <option value="">Select category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Tags */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                            <Tag className="w-4 h-4" />
                            Tags
                        </label>
                        <input
                            type="text"
                            value={form.tags}
                            onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
                            placeholder="tag1, tag2, tag3"
                            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all outline-none text-sm"
                        />
                        <p className="text-xs text-slate-500 mt-1.5">Separate with commas</p>
                    </div>

                    {/* Keywords */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                            <Search className="w-4 h-4" />
                            SEO Keywords
                        </label>
                        <textarea
                            value={form.keywords}
                            onChange={(e) => setForm((prev) => ({ ...prev, keywords: e.target.value }))}
                            placeholder="keyword 1, keyword 2, keyword 3"
                            rows={3}
                            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all outline-none text-sm resize-none"
                        />
                        <p className="text-xs text-slate-500 mt-1.5">Separate with commas</p>
                    </div>

                    {/* Author */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <label className="block text-sm font-medium text-slate-300 mb-2">Author</label>
                        <input
                            type="text"
                            value={form.author}
                            onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
                            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all outline-none text-sm"
                        />
                    </div>

                    {/* Featured toggle */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.is_featured}
                                onChange={(e) => setForm((prev) => ({ ...prev, is_featured: e.target.checked }))}
                                className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-slate-700 peer-focus:ring-2 peer-focus:ring-amber-500/40 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500" />
                            <span className="text-sm text-slate-300">Featured Article</span>
                        </label>
                        <p className="text-xs text-slate-500 mt-2">Featured articles appear at the top of the blog page</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
