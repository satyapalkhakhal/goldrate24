'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MapPin, RefreshCw, Clock, TrendingUp } from 'lucide-react'

interface CityRate {
    city: string
    state: string
    gold24k: number
    gold22k: number
    gold18k: number
}

const CITIES = [
    { name: 'Delhi', state: 'Delhi' },
    { name: 'Mumbai', state: 'Maharashtra' },
    { name: 'Chennai', state: 'Tamil Nadu' },
    { name: 'Bangalore', state: 'Karnataka' },
    { name: 'Kolkata', state: 'West Bengal' },
    { name: 'Hyderabad', state: 'Telangana' },
    { name: 'Pune', state: 'Maharashtra' },
    { name: 'Ahmedabad', state: 'Gujarat' },
    { name: 'Coimbatore', state: 'Tamil Nadu' },
    { name: 'Kerala', state: 'Kerala' },
]

export default function CitiesGrid() {
    const [cityRates, setCityRates] = useState<CityRate[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [lastUpdated, setLastUpdated] = useState<string>('')

    async function fetchAllCities() {
        try {
            setLoading(true)
            setError(null)

            const results = await Promise.allSettled(
                CITIES.map(async (city) => {
                    const response = await fetch(`/api/gold-rates?city=${encodeURIComponent(city.name)}`)
                    if (!response.ok) throw new Error(`Failed to fetch ${city.name}`)
                    const data = await response.json()

                    // API returns { rates: [{ purity, price }, ...], city, lastUpdated }
                    const rate24k = data.rates?.find((r: any) => r.purity === '24K Gold')
                    const rate22k = data.rates?.find((r: any) => r.purity === '22K Gold')
                    const rate18k = data.rates?.find((r: any) => r.purity === '18K Gold')

                    return {
                        city: city.name,
                        state: city.state,
                        gold24k: rate24k?.price || 0,
                        gold22k: rate22k?.price || 0,
                        gold18k: rate18k?.price || 0,
                    } as CityRate
                })
            )

            const successfulRates = results
                .filter((r): r is PromiseFulfilledResult<CityRate> => r.status === 'fulfilled')
                .map((r) => r.value)

            if (successfulRates.length === 0) {
                throw new Error('Failed to fetch rates for any city')
            }

            setCityRates(successfulRates)
            setLastUpdated(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAllCities()
    }, [])

    if (error) {
        return (
            <section className="section">
                <div className="container-custom">
                    <div className="card p-8 text-center">
                        <p className="text-error mb-4">Failed to load city rates: {error}</p>
                        <button onClick={fetchAllCities} className="btn-primary inline-flex items-center gap-2">
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
                <div className="max-w-5xl mx-auto">
                    {/* Section Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold">
                            Live Gold Rates <span className="text-gradient-gold">by City</span>
                        </h2>
                        {!loading && cityRates.length > 0 && (
                            <div className="flex items-center gap-2 text-xs text-text-tertiary">
                                <Clock className="w-3.5 h-3.5" />
                                <span>Last updated: {lastUpdated}</span>
                            </div>
                        )}
                    </div>

                    {/* Table */}
                    <div className="card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-b border-border">
                                        <th className="px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                                            City
                                        </th>
                                        <th className="px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">
                                            24K Gold /g
                                        </th>
                                        <th className="px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">
                                            22K Gold /g
                                        </th>
                                        <th className="px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">
                                            18K Gold /g
                                        </th>
                                        <th className="px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider text-center">
                                            Details
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {loading ? (
                                        Array.from({ length: 10 }).map((_, index) => (
                                            <tr key={index} className="animate-pulse">
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                                        <div>
                                                            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                                                            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded ml-auto"></div>
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded ml-auto"></div>
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded ml-auto"></div>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        cityRates.map((city, index) => {
                                            const slug = city.city.toLowerCase().replace(/\s+/g, '-')
                                            const isEven = index % 2 === 0

                                            return (
                                                <tr
                                                    key={city.city}
                                                    className={`hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-colors ${isEven ? 'bg-transparent' : 'bg-surface/50'
                                                        }`}
                                                >
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex-shrink-0">
                                                                <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-sm">{city.city}</div>
                                                                <div className="text-xs text-text-tertiary">{city.state}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-right">
                                                        <span className="font-bold text-sm text-gradient-gold">
                                                            ₹{city.gold24k.toLocaleString('en-IN')}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4 text-right">
                                                        <span className="font-semibold text-sm">
                                                            ₹{city.gold22k.toLocaleString('en-IN')}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4 text-right">
                                                        <span className="font-semibold text-sm text-text-secondary">
                                                            ₹{city.gold18k.toLocaleString('en-IN')}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4 text-center">
                                                        <Link
                                                            href={`/cities/${slug}`}
                                                            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5"
                                                        >
                                                            View
                                                            <TrendingUp className="w-3 h-3" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Footer */}
                    {!loading && cityRates.length > 0 && (
                        <div className="mt-4 flex items-center justify-between text-xs text-text-tertiary">
                            <p>
                                Showing gold rates for {cityRates.length} cities • All prices in INR (₹) per gram
                            </p>
                            <button
                                onClick={fetchAllCities}
                                className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-medium transition-colors"
                            >
                                <RefreshCw className="w-3 h-3" />
                                Refresh
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
