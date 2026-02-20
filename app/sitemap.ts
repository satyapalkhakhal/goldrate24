import { MetadataRoute } from 'next';
import { CALCULATORS } from '@/lib/calculatorData';
import { BLOG_POSTS } from '@/lib/blogData';

// Define the cities we support
const CITIES = [
    'delhi',
    'chennai',
    'mumbai',
    'pune',
    'hyderabad',
    'bangalore',
    'coimbatore',
    'kolkata',
    'ahmedabad',
    'kerala',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldrate24.in';

    // Try to fetch dynamic articles and CMS pages from Supabase
    let dynamicBlogPages: MetadataRoute.Sitemap = [];
    let dynamicCmsPages: MetadataRoute.Sitemap = [];

    try {
        const { createServerClient } = await import('@/lib/supabase-server');
        const supabase = createServerClient();

        const [{ data: articles }, { data: cmsPages }] = await Promise.all([
            supabase.from('articles').select('slug, updated_at').eq('is_published', true),
            supabase.from('cms_pages').select('slug, updated_at').eq('is_published', true),
        ]);

        if (articles && articles.length > 0) {
            dynamicBlogPages = articles.map((a) => ({
                url: `${baseUrl}/blog/${a.slug}`,
                lastModified: new Date(a.updated_at),
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            }));
        }

        if (cmsPages && cmsPages.length > 0) {
            dynamicCmsPages = cmsPages.map((p) => ({
                url: `${baseUrl}/page/${p.slug}`,
                lastModified: new Date(p.updated_at),
                changeFrequency: 'monthly' as const,
                priority: 0.6,
            }));
        }
    } catch (err) {
        // Fallback silently — use hardcoded data below
    }

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/gold-rates`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/calculators`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/cities`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/silver-rates`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/faq`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/disclaimer`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.4,
        },
    ];

    // Dynamic calculator pages from registry
    const calculatorPages: MetadataRoute.Sitemap = CALCULATORS.map((calc) => ({
        url: `${baseUrl}/calculators/${calc.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // Dynamic city pages for all 10 cities
    const cityPages: MetadataRoute.Sitemap = CITIES.map((city) => ({
        url: `${baseUrl}/cities/${city}`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.8,
    }));

    // Fallback blog pages from hardcoded data (only if Supabase returned nothing)
    const fallbackBlogPages: MetadataRoute.Sitemap = dynamicBlogPages.length === 0
        ? BLOG_POSTS.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.updatedAt),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))
        : [];

    return [
        ...staticPages,
        ...calculatorPages,
        ...cityPages,
        ...(dynamicBlogPages.length > 0 ? dynamicBlogPages : fallbackBlogPages),
        ...dynamicCmsPages,
    ];
}
