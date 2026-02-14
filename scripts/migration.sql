-- GoldRate24 CMS Database Migration
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- Drop existing tables if they have incompatible schemas
DROP TABLE IF EXISTS article_images CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS cms_pages CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  color TEXT DEFAULT 'amber',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT DEFAULT 'GoldRate24 Team',
  category_id UUID REFERENCES categories(id),
  tags TEXT[] DEFAULT '{}',
  keywords TEXT[] DEFAULT '{}',
  read_time TEXT DEFAULT '5 min read',
  featured_image TEXT,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Article images table (multiple images per article)
CREATE TABLE IF NOT EXISTS article_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT DEFAULT '',
  caption TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  width INT,
  height INT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- CMS Pages table
CREATE TABLE IF NOT EXISTS cms_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[] DEFAULT '{}',
  featured_image TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_article_images_article ON article_images(article_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_cms_pages_slug ON cms_pages(slug);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS articles_updated_at ON articles;
CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS cms_pages_updated_at ON cms_pages;
CREATE TRIGGER cms_pages_updated_at
  BEFORE UPDATE ON cms_pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_pages ENABLE ROW LEVEL SECURITY;

-- Public read for published content
CREATE POLICY "Public read published articles" ON articles
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Public read article images" ON article_images
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM articles WHERE articles.id = article_images.article_id AND articles.is_published = true)
  );

CREATE POLICY "Public read published cms pages" ON cms_pages
  FOR SELECT USING (is_published = true);

-- Authenticated admin full access
CREATE POLICY "Admin full access articles" ON articles
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access categories" ON categories
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access article images" ON article_images
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access cms pages" ON cms_pages
  FOR ALL USING (auth.role() = 'authenticated');

-- Seed default categories
INSERT INTO categories (name, slug, color) VALUES
  ('Investment', 'investment', 'blue'),
  ('Education', 'education', 'purple'),
  ('Tips', 'tips', 'green'),
  ('Finance', 'finance', 'amber'),
  ('News', 'news', 'red'),
  ('Guide', 'guide', 'indigo')
ON CONFLICT (slug) DO NOTHING;

-- Create storage bucket for article images
-- NOTE: You need to create this in Supabase Dashboard → Storage → New Bucket
-- Bucket name: article-images
-- Public: Yes
-- File size limit: 5MB
-- Allowed MIME types: image/png, image/jpeg, image/webp, image/avif
