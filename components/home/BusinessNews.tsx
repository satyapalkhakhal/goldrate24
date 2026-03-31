'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { TrendingUp, Clock, ArrowRight, ArrowLeft, Newspaper } from 'lucide-react'
import Image from 'next/image'

const SUPABASE_URL = 'https://rfuumgvtjfvxmhocxhfk.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmdXVtZ3Z0amZ2eG1ob2N4aGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMzU4OTIsImV4cCI6MjA4ODcxMTg5Mn0.9CCpMxp_Kyzsw8Y2wxk6CAL8ZPbhA7vpWqNlOJPXn20'

interface Article {
    id: string
    title: string
    slug: string
    category: string
    subcategory: string
    date: string
    published_at: string
    excerpt: string
    image_url: string
    author: string
    read_time: string
    tags: string[]
    is_featured: boolean
    is_trending: boolean
}

export default function BusinessNews() {
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const scrollRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    useEffect(() => {
        async function fetchBusinessNews() {
            try {
                const url = process.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_URL
                const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY

                const response = await fetch(
                    `${url}/rest/v1/articles?select=*&category=eq.BUSINESS&order=published_at.desc&limit=8`,
                    {
                        headers: {
                            'apikey': key,
                            'Authorization': `Bearer ${key}`,
                            'Accept': 'application/json',
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

    const updateScrollButtons = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    useEffect(() => {
        const el = scrollRef.current
        if (el) {
            el.addEventListener('scroll', updateScrollButtons)
            updateScrollButtons()
            return () => el.removeEventListener('scroll', updateScrollButtons)
        }
    }, [articles])

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const cardWidth = 320
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -cardWidth : cardWidth,
                behavior: 'smooth',
            })
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

        if (diffInHours < 1) return 'Just now'
        if (diffInHours < 24) return `${diffInHours}h ago`
        if (diffInHours < 48) return 'Yesterday'
        if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
        return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
    }

    return (
        <section className="section bg-gradient-to-b from-surface to-background">
            <div className="container-custom">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Newspaper className="w-6 h-6 text-primary" />
                            <h2 className="section-title mb-0 !text-left">Top Stories</h2>
                        </div>
                        <p className="section-subtitle mb-0 !text-left !mx-0">
                            Latest business & finance news curated for you
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Carousel Arrows - Desktop */}
                        <div className="hidden sm:flex items-center gap-2">
                            <button
                                onClick={() => scroll('left')}
                                disabled={!canScrollLeft}
                                className="p-2 rounded-full border border-border bg-surface hover:bg-surface-elevated disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                aria-label="Scroll left"
                            >
                                <ArrowLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                disabled={!canScrollRight}
                                className="p-2 rounded-full border border-border bg-surface hover:bg-surface-elevated disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                aria-label="Scroll right"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        <Link
                            href="/business-news"
                            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors group"
                        >
                            View All
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Carousel */}
                {loading ? (
                    <div className="flex gap-5 overflow-hidden">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="min-w-[280px] md:min-w-[300px] card p-0 overflow-hidden animate-pulse flex-shrink-0">
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
                    <div
                        ref={scrollRef}
                        className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {articles.map((article, index) => (
                            <Link
                                key={article.id}
                                href={`/business-news/${article.slug}`}
                                className="min-w-[280px] md:min-w-[300px] max-w-[300px] card-hover p-0 overflow-hidden group flex-shrink-0 snap-start"
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                }}
                            >
                                {/* Image */}
                                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                                    {article.image_url ? (
                                        <Image
                                            src={article.image_url}
                                            alt={article.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            sizes="300px"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30">
                                            <TrendingUp className="w-12 h-12 text-amber-600 dark:text-amber-400" />
                                        </div>
                                    )}

                                    {/* Trending badge */}
                                    {article.is_trending && (
                                        <div className="absolute top-2 left-2 bg-red-500/90 backdrop-blur-sm px-2 py-0.5 rounded-full">
                                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Trending</span>
                                        </div>
                                    )}

                                    {/* Subcategory badge */}
                                    {article.subcategory && (
                                        <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2 py-0.5 rounded-full">
                                            <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300">{article.subcategory}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="font-bold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                                        {article.title}
                                    </h3>
                                    <p className="text-xs text-text-secondary line-clamp-2 mb-3">
                                        {article.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-[11px] text-text-tertiary">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            <span>{formatDate(article.published_at)}</span>
                                        </div>
                                        <span className="font-medium text-amber-600 dark:text-amber-400">
                                            {article.read_time}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-text-secondary">No business news available at the moment.</p>
                    </div>
                )}

                {/* View More - Mobile */}
                {!loading && articles.length > 0 && (
                    <div className="mt-6 text-center sm:hidden">
                        <Link
                            href="/business-news"
                            className="btn-primary"
                        >
                            View All Business News
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}
            </div>

            {/* Hide scrollbar CSS */}
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    )
}
