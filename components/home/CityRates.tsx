'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'

interface CityRate {
    city: string
    state: string
    gold24k: number
    gold22k: number
    gold18k: number
    silver_10g: number
    lastUpdated: string
}

export default function CityRates() {
    const [cities, setCities] = useState<CityRate[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchCities() {
            try {
                const response = await fetch('/api/gold-rates')
                if (!response.ok) throw new Error('Failed to fetch')

                const data = await response.json()

                if (data.cities && Array.isArray(data.cities)) {
                    // Show only first 8 cities
                    setCities(data.cities.slice(0, 8))
                }
            } catch (error) {
                console.error('Error fetching cities:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchCities()
    }, [])

    return (
        <section className="section">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="section-title">Gold Rates by City</h2>
                    <p className="section-subtitle">
                        Check today's gold rates in major cities across India
                    </p>
                </div>

                {/* Cities Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {loading ? (
                        // Loading skeleton
                        Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className="card p-6 animate-pulse"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                        <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                    </div>
                                </div>
                                <div className="mb-2">
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
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                                                {city.city}
                                            </h3>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-text-tertiary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </div>

                                    {/* Rate - Show 24K */}
                                    <div className="mb-2">
                                        <div className="text-2xl font-bold text-gradient-gold">
                                            ₹{city.gold24k.toLocaleString('en-IN')}
                                        </div>
                                        <div className="text-xs text-text-tertiary">
                                            per gram (24K)
                                        </div>
                                    </div>

                                    {/* Additional Info */}
                                    <div className="text-sm text-text-secondary">
                                        22K: ₹{city.gold22k.toLocaleString('en-IN')}
                                    </div>
                                </Link>
                            )
                        })
                    )}
                </div>

                {/* View All Link */}
                <div className="text-center mt-8">
                    <Link href="/cities" className="btn-outline group">
                        View All Cities
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
