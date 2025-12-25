'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { TrendingUp, ExternalLink, Clock } from 'lucide-react'
import Image from 'next/image'

interface Article {
    id: number
    title: string
    slug: string
    excerpt: string
    featured_image_url: string
    featured_image_alt: string
    published_at: string
    article_link: string
    rss_article_author: string
}

export default function BusinessNews() {
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchBusinessNews() {
            try {
                const response = await fetch(
                    'https://mrvapygtxktrgilxqgqr.supabase.co/rest/v1/articles?category_id=eq.8&order=published_at.desc&limit=6',
                    {
                        headers: {
                            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ydmFweWd0eGt0cmdpbHhxZ3FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyOTcwNDUsImV4cCI6MjA3Njg3MzA0NX0.9PA0JNkMOFVDoK4adMF_eO6eG5BBC4Jvut2sdDSPDM4',
                            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ydmFweWd0eGt0cmdpbHhxZ3FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyOTcwNDUsImV4cCI6MjA3Njg3MzA0NX0.9PA0JNkMOFVDoK4adMF_eO6eG5BBC4Jvut2sdDSPDM4'}`,
                        },
                    }
                )

                if (!response.ok) throw new Error('Failed to fetch')

                const data = await response.json()
                setArticles(data)
            } catch (error) {
                console.error('Error fetching business news:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchBusinessNews()
    }, [])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

        if (diffInHours < 1) return 'Just now'
        if (diffInHours < 24) return `${diffInHours}h ago`
        if (diffInHours < 48) return 'Yesterday'
        return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
    }

    return (
        <section className="section bg-gradient-to-b from-surface to-background">
            <div className="container-custom">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-6 h-6 text-primary" />
                            <h2 className="section-title mb-0">Business & Finance News</h2>
                        </div>
                        <p className="section-subtitle mb-0">
                            Stay updated with latest market trends and financial news
                        </p>
                    </div>
                </div>

                {/* News Grid */}
                {loading ? (
                    // Loading skeleton
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="card p-0 overflow-hidden animate-pulse">
                                <div className="aspect-video bg-gray-200 dark:bg-gray-700"></div>
                                <div className="p-4">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : articles.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article, index) => (
                            <a
                                key={article.id}
                                href={article.article_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card-hover p-0 overflow-hidden group"
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                }}
                            >
                                {/* Image */}
                                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                                    {article.featured_image_url ? (
                                        <Image
                                            src={article.featured_image_url}
                                            alt={article.featured_image_alt || article.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30">
                                            <TrendingUp className="w-12 h-12 text-amber-600 dark:text-amber-400" />
                                        </div>
                                    )}

                                    {/* External link badge */}
                                    <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-full">
                                        <ExternalLink className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    {/* Title */}
                                    <h3 className="font-bold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                        {article.title}
                                    </h3>

                                    {/* Excerpt */}
                                    <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                                        {article.excerpt}
                                    </p>

                                    {/* Meta */}
                                    <div className="flex items-center justify-between text-xs text-text-tertiary">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            <span>{formatDate(article.published_at)}</span>
                                        </div>
                                        {article.rss_article_author && (
                                            <span className="font-medium">{article.rss_article_author}</span>
                                        )}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-text-secondary">No business news available at the moment.</p>
                    </div>
                )}

                {/* Disclaimer */}
                {!loading && articles.length > 0 && (
                    <div className="mt-8 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                        <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
                            <strong>Note:</strong> News articles are sourced from external publishers.
                            Click to read full articles on their original websites.
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}
