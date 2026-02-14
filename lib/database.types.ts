// Database types matching Supabase schema

export interface Category {
    id: string;
    name: string;
    slug: string;
    color: string;
    created_at: string;
}

export interface Article {
    id: string;
    slug: string;
    title: string;
    description: string;
    content: string;
    author: string;
    category_id: string | null;
    tags: string[];
    keywords: string[];
    read_time: string;
    featured_image: string | null;
    is_published: boolean;
    is_featured: boolean;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    // Joined data
    category?: Category;
    images?: ArticleImage[];
}

export interface ArticleImage {
    id: string;
    article_id: string;
    url: string;
    alt_text: string;
    caption: string;
    sort_order: number;
    width: number | null;
    height: number | null;
    created_at: string;
}

export interface CmsPage {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    content: string;
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string[];
    featured_image: string | null;
    is_published: boolean;
    published_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface ArticleInsert {
    slug: string;
    title: string;
    description: string;
    content: string;
    author?: string;
    category_id?: string | null;
    tags?: string[];
    keywords?: string[];
    read_time?: string;
    featured_image?: string | null;
    is_published?: boolean;
    is_featured?: boolean;
    published_at?: string | null;
}

export interface ArticleImageInsert {
    article_id: string;
    url: string;
    alt_text?: string;
    caption?: string;
    sort_order?: number;
    width?: number | null;
    height?: number | null;
}

export interface CmsPageInsert {
    slug: string;
    title: string;
    description?: string | null;
    content: string;
    meta_title?: string | null;
    meta_description?: string | null;
    meta_keywords?: string[];
    featured_image?: string | null;
    is_published?: boolean;
    published_at?: string | null;
}
