'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MapPin, TrendingUp, RefreshCw } from 'lucide-react'

interface CityRate {
    city: string
    state: string
    gold24k: number
    gold22k: number
    gold18k: number
    silver_10g: number
    lastUpdated: string
}

export default function CitiesGrid() {
    const [cities, setCities] = useState<CityRate[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    async function fetchCities() {
        try {
            setLoading(true)
            setError(null)

            const response = await fetch('/api/gold-rates')
            if (!response.ok) throw new Error('Failed to fetch cities')

            const data = await response.json()

            if (data.cities && Array.isArray(data.cities)) {
                setCities(data.cities)
            } else {
                throw new Error('Invalid response format')
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCities()
    }, [])

    if (error) {
        return (
            <section className="section">
                <div className="container-custom">
                    <div className="card p-8 text-center">
                        <p className="text-error mb-4">Failed to load city rates: {error}</p>
                        <button onClick={fetchCities} className="btn-primary">
                            <RefreshCw className="w-4 h-4" />
                            Retry
                        </button>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="section">
            <div className="container-custom">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading ? (
                        // Loading skeleton
                        Array.from({ length: 12 }).map((_, index) => (
                            <div
                                key={index}
                                className="card p-6 animate-pulse"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                        <div>
                                            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                                            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                                    <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                </div>
                                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            </div>
                        ))
                    ) : (
                        cities.map((city, index) => {
                            // Create slug from city name
                            const slug = city.city.toLowerCase().replace(/\s+/g, '-')

                            return (
                                <Link
                                    key={city.city}
                                    href={`/cities/${slug}`}
                                    className="card-hover p-6 group"
                                    style={{
                                        animationDelay: `${index * 0.05}s`,
                                    }}
                                >
                                    {/* City Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                                <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold group-hover:text-primary transition-colors">
                                                    {city.city}
                                                </h3>
                                                <p className="text-xs text-text-tertiary">{city.state}</p>
                                            </div>
                                        </div>
                                        <TrendingUp className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-colors" />
                                    </div>

                                    {/* Rate - 24K First */}
                                    <div className="mb-3">
                                        <div className="text-2xl font-bold text-gradient-gold">
                                            ₹{city.gold24k.toLocaleString('en-IN')}
                                        </div>
                                        <div className="text-xs text-text-tertiary">
                                            per gram (24K)
                                        </div>
                                    </div>

                                    {/* Additional Info */}
                                    <div className="space-y-1 text-xs mb-3">
                                        <div className="flex justify-between text-text-secondary">
                                            <span>22K:</span>
                                            <span className="font-semibold">₹{city.gold22k.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between text-text-secondary">
                                            <span>18K:</span>
                                            <span className="font-semibold">₹{city.gold18k.toLocaleString('en-IN')}</span>
                                        </div>
                                    </div>

                                    {/* Silver Rate */}
                                    {city.silver_10g && (
                                        <div className="pt-3 border-t border-border">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-text-secondary">Silver (10g):</span>
                                                <span className="font-semibold text-gray-600 dark:text-gray-400">
                                                    ₹{city.silver_10g.toLocaleString('en-IN')}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* View Details */}
                                    <div className="mt-4 pt-3 border-t border-border text-sm text-primary font-medium group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                                        View Details
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </Link>
                            )
                        })
                    )}
                </div>

                {!loading && cities.length > 0 && (
                    <div className="mt-8 text-center">
                        <p className="text-sm text-text-secondary">
                            Showing {cities.length} cities with live gold rates
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}
