// Seed script to migrate existing blog posts from blogData.ts into Supabase
// Run with: npx tsx scripts/seed-articles.ts

import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';
import { BLOG_POSTS } from '../lib/blogData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing environment variables:');
    console.error('   NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required');
    console.error('   Add SUPABASE_SERVICE_ROLE_KEY to .env.local (find it in Supabase Dashboard → Settings → API)');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
    console.log('🌱 Starting blog post migration...\n');

    // 1. Fetch existing categories
    const { data: categories, error: catError } = await supabase
        .from('categories')
        .select('id, name');

    if (catError || !categories) {
        console.error('❌ Failed to fetch categories:', catError?.message);
        console.error('   Make sure you have run migration.sql first!');
        process.exit(1);
    }

    const categoryMap: Record<string, string> = {};
    for (const cat of categories) {
        categoryMap[cat.name] = cat.id;
    }
    console.log(`📂 Found ${categories.length} categories:`, Object.keys(categoryMap).join(', '));

    // 2. Insert articles
    let inserted = 0;
    let skipped = 0;

    for (const post of BLOG_POSTS) {
        // Check if already exists
        const { data: existing } = await supabase
            .from('articles')
            .select('id')
            .eq('slug', post.slug)
            .single();

        if (existing) {
            console.log(`⏩ Skipped (exists): ${post.slug}`);
            skipped++;
            continue;
        }

        const categoryId = categoryMap[post.category] || null;

        const { error: insertError } = await supabase.from('articles').insert({
            slug: post.slug,
            title: post.title,
            description: post.description,
            content: post.content,
            author: post.author,
            category_id: categoryId,
            tags: post.tags,
            keywords: post.keywords,
            read_time: post.readTime,
            featured_image: post.image !== '/og-image.png' ? post.image : null,
            is_published: true,
            is_featured: false,
            published_at: new Date(post.publishedAt).toISOString(),
            created_at: new Date(post.publishedAt).toISOString(),
            updated_at: new Date(post.updatedAt).toISOString(),
        });

        if (insertError) {
            console.error(`❌ Failed to insert "${post.slug}":`, insertError.message);
        } else {
            console.log(`✅ Inserted: ${post.title}`);
            inserted++;
        }
    }

    console.log(`\n🎉 Migration complete!`);
    console.log(`   Inserted: ${inserted}`);
    console.log(`   Skipped:  ${skipped}`);
    console.log(`   Total:    ${BLOG_POSTS.length}`);
}

seed().catch(console.error);
