'use client';

import { useState, useEffect } from 'react';
import { useSilverRates } from '@/hooks/useSilverRates';
import { TrendingUp, TrendingDown, MapPin, Clock, RefreshCw, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import SilverRateHistory from './SilverRateHistory';

const ALL_CITIES = [
    { name: 'Mumbai', slug: 'mumbai' },
    { name: 'Delhi', slug: 'delhi' },
    { name: 'Bangalore', slug: 'bangalore' },
    { name: 'Chennai', slug: 'chennai' },
    { name: 'Hyderabad', slug: 'hyderabad' },
    { name: 'Pune', slug: 'pune' },
    { name: 'Kolkata', slug: 'kolkata' },
    { name: 'Ahmedabad', slug: 'ahmedabad' },
    { name: 'Jaipur', slug: 'jaipur' },
    { name: 'Coimbatore', slug: 'coimbatore' },
];

interface CityRate {
    name: string;
    slug: string;
    rate: number;
    isLoading: boolean;
}

export default function SilverRatesPageContent() {
    const [selectedCity, setSelectedCity] = useState('mumbai');
    const { rate, city, lastUpdated, isLoading, refresh } = useSilverRates(selectedCity);
    const [cityRates, setCityRates] = useState<CityRate[]>([]);
    const [loadingCities, setLoadingCities] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Load saved city preference
    useEffect(() => {
        const savedCity = localStorage.getItem('preferredCity');
        if (savedCity) {
            setSelectedCity(savedCity.toLowerCase());
        }
    }, []);

    // Fetch rates for all cities
    useEffect(() => {
        const fetchCityRates = async () => {
            setLoadingCities(true);
            try {
                const results = await Promise.all(
                    ALL_CITIES.map(async (c) => {
                        try {
                            const res = await fetch(`/api/silver-rates?city=${c.slug}`);
                            const data = await res.json();
                            return {
                                name: c.name,
                                slug: c.slug,
                                rate: data.rate?.pricePerGram || 0,
                                isLoading: false,
                            };
                        } catch {
                            return { name: c.name, slug: c.slug, rate: 0, isLoading: false };
                        }
                    })
                );
                setCityRates(results);
            } finally {
                setLoadingCities(false);
            }
        };
        fetchCityRates();
    }, []);

    const handleCityChange = (newCity: string) => {
        setSelectedCity(newCity);
        localStorage.setItem('preferredCity', newCity);
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await refresh();
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    const isPositive = (rate?.change || 0) >= 0;

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-gray-950 dark:to-slate-900 py-12 md:py-16">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-slate-400 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-48 h-48 bg-gray-400 rounded-full blur-3xl" />
                </div>

                <div className="container-custom relative">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            Live <span className="bg-gradient-to-r from-slate-500 to-gray-600 bg-clip-text text-transparent">Silver Rates</span> Today
                        </h1>
                        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                            Real-time silver prices across major Indian cities. Updated every hour with accurate rates per gram.
                        </p>
                    </div>

                    {/* City Selector */}
                    <div className="flex justify-center mb-8">
                        <div className="relative inline-flex items-center gap-2 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 shadow-lg border border-border">
                            <MapPin className="w-4 h-4 text-slate-500" />
                            <select
                                value={selectedCity}
                                onChange={(e) => handleCityChange(e.target.value)}
                                className="bg-transparent font-medium text-text-primary pr-6 appearance-none cursor-pointer focus:outline-none"
                            >
                                {ALL_CITIES.map(c => (
                                    <option key={c.slug} value={c.slug}>{c.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="w-4 h-4 text-text-secondary absolute right-4" />
                        </div>
                    </div>

                    {/* Main Rate Card */}
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-border overflow-hidden">
                            <div className="bg-gradient-to-r from-slate-500 to-gray-600 p-4 md:p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-white/80">
                                        <MapPin className="w-4 h-4" />
                                        <span className="font-medium">{city} Silver Rate</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/60 text-sm">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>{lastUpdated || 'Loading...'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 md:p-8">
                                {isLoading ? (
                                    <div className="animate-pulse space-y-4">
                                        <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded w-48" />
                                        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-32" />
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                                            <div>
                                                <p className="text-sm text-text-secondary mb-1">Silver Rate Per Gram</p>
                                                <div className="text-4xl md:text-5xl font-bold text-text-primary">
                                                    ₹{rate?.pricePerGram?.toFixed(2) || '—'}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold ${isPositive
                                                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                                                    : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                                                    }`}>
                                                    {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                                    ₹{Math.abs(rate?.change || 0).toFixed(2)} ({rate?.changePercent?.toFixed(2)}%)
                                                </span>
                                                <button
                                                    onClick={handleRefresh}
                                                    disabled={isRefreshing}
                                                    className="p-2 rounded-lg hover:bg-surface-elevated transition-colors"
                                                    title="Refresh rates"
                                                >
                                                    <RefreshCw className={`w-4 h-4 text-text-secondary ${isRefreshing ? 'animate-spin' : ''}`} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Weight-based prices */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 text-center">
                                                <p className="text-xs text-text-secondary mb-1">1 Gram</p>
                                                <p className="text-lg font-bold">₹{rate?.pricePerGram?.toFixed(2) || '—'}</p>
                                            </div>
                                            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 text-center">
                                                <p className="text-xs text-text-secondary mb-1">10 Grams</p>
                                                <p className="text-lg font-bold">₹{rate?.price10g?.toFixed(2) || '—'}</p>
                                            </div>
                                            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 text-center">
                                                <p className="text-xs text-text-secondary mb-1">100 Grams</p>
                                                <p className="text-lg font-bold">₹{rate?.price100g?.toLocaleString('en-IN', { minimumFractionDigits: 2 }) || '—'}</p>
                                            </div>
                                            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 text-center">
                                                <p className="text-xs text-text-secondary mb-1">1 Kg</p>
                                                <p className="text-lg font-bold">₹{rate?.price1kg?.toLocaleString('en-IN', { minimumFractionDigits: 2 }) || '—'}</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* City-wise Comparison */}
            <section className="section">
                <div className="container-custom">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Silver Rate Across Indian Cities</h2>
                    <p className="text-text-secondary mb-8">Compare live silver prices per gram in major cities</p>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {loadingCities
                            ? Array.from({ length: 10 }).map((_, i) => (
                                <div key={i} className="card p-4 animate-pulse">
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-20 mb-2" />
                                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-16" />
                                </div>
                            ))
                            : cityRates.map((cr) => (
                                <button
                                    key={cr.slug}
                                    onClick={() => handleCityChange(cr.slug)}
                                    className={`card p-4 text-left transition-all hover:shadow-md ${selectedCity === cr.slug
                                        ? 'ring-2 ring-slate-500 bg-slate-50 dark:bg-slate-800'
                                        : 'hover:bg-surface-elevated'
                                        }`}
                                >
                                    <div className="flex items-center gap-1.5 text-sm text-text-secondary mb-1">
                                        <MapPin className="w-3 h-3" />
                                        {cr.name}
                                    </div>
                                    <p className="text-lg font-bold">
                                        ₹{cr.rate > 0 ? cr.rate.toFixed(2) : '—'}
                                    </p>
                                    <p className="text-xs text-text-secondary">per gram</p>
                                </button>
                            ))}
                    </div>
                </div>
            </section>

            {/* Silver Rate History */}
            <section className="section bg-surface">
                <div className="container-custom">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Silver Price History</h2>
                    <p className="text-text-secondary mb-8">Track silver price movements over the last 10 days</p>
                    <div className="max-w-4xl">
                        <SilverRateHistory city={selectedCity} />
                    </div>
                </div>
            </section>

            {/* Silver Info / FAQ */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold mb-8">About Silver Rates in India</h2>

                        <div className="space-y-6">
                            <div className="card p-6">
                                <h3 className="font-bold text-lg mb-3">How are silver rates determined?</h3>
                                <p className="text-text-secondary leading-relaxed">
                                    Silver rates in India are influenced by international spot prices (LBMA), the USD/INR exchange rate,
                                    import duties (currently 6%), GST (3%), and local demand-supply dynamics. Unlike gold, silver has
                                    significant industrial demand (solar panels, electronics, EVs) which adds another price driver.
                                </p>
                            </div>

                            <div className="card p-6">
                                <h3 className="font-bold text-lg mb-3">Silver Purity Standards</h3>
                                <p className="text-text-secondary leading-relaxed">
                                    In India, silver is primarily sold in two purities: <strong>999 Silver</strong> (99.9% pure, used for
                                    coins and bars) and <strong>925 Sterling Silver</strong> (92.5% pure, used for jewelry). The rates shown
                                    here are for 999 purity silver. BIS hallmarking for silver follows similar standards as gold.
                                </p>
                            </div>

                            <div className="card p-6">
                                <h3 className="font-bold text-lg mb-3">Silver vs Gold Investment</h3>
                                <p className="text-text-secondary leading-relaxed">
                                    Silver is more affordable and volatile than gold. It offers higher upside during bull markets but also
                                    carries more risk. Silver&apos;s industrial demand (55% of total demand) makes it partially tied to economic
                                    cycles. Read our detailed{' '}
                                    <Link href="/blog/gold-vs-silver-investment-india" className="text-slate-600 dark:text-slate-400 hover:underline font-medium">
                                        Gold vs Silver comparison guide
                                    </Link>{' '}
                                    for more information.
                                </p>
                            </div>

                            <div className="card p-6">
                                <h3 className="font-bold text-lg mb-3">Why do silver rates vary between cities?</h3>
                                <p className="text-text-secondary leading-relaxed">
                                    Silver prices differ slightly across Indian cities due to local taxes, transportation costs,
                                    dealer margins, and regional demand patterns. Coastal cities like Mumbai and Chennai may have
                                    slightly lower rates due to proximity to import hubs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Track Gold Rates Too</h2>
                        <p className="text-text-secondary mb-6">
                            Monitor both gold and silver prices to make informed precious metal investment decisions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/gold-rates" className="btn-primary">
                                Live Gold Rates
                            </Link>
                            <Link href="/calculators/gold" className="px-6 py-3 rounded-xl border-2 border-slate-300 dark:border-slate-700 font-semibold hover:bg-slate-100 dark:hover:bg-slate-900/30 transition-colors">
                                Gold Calculator
                            </Link>
                            <Link href="/blog/gold-vs-silver-investment-india" className="px-6 py-3 rounded-xl border-2 border-slate-300 dark:border-slate-700 font-semibold hover:bg-slate-100 dark:hover:bg-slate-900/30 transition-colors">
                                Gold vs Silver
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
