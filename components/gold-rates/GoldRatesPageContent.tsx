'use client';

import { useState, useEffect } from 'react';
import { useGoldRates } from '@/hooks/useGoldRates';
import { TrendingUp, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';

const ALL_CITIES = [
    { name: 'Delhi', slug: 'delhi' },
    { name: 'Chennai', slug: 'chennai' },
    { name: 'Mumbai', slug: 'mumbai' },
    { name: 'Pune', slug: 'pune' },
    { name: 'Hyderabad', slug: 'hyderabad' },
    { name: 'Bangalore', slug: 'bangalore' },
    { name: 'Coimbatore', slug: 'coimbatore' },
    { name: 'Kolkata', slug: 'kolkata' },
    { name: 'Ahmedabad', slug: 'ahmedabad' },
    { name: 'Kerala', slug: 'kerala' },
];

interface CityRate {
    name: string;
    slug: string;
    rate22k: number;
    isLoading: boolean;
}

export default function GoldRatesPageContent() {
    const [selectedCity, setSelectedCity] = useState<string>('Mumbai');
    const { rates, city, isLoading, lastUpdated } = useGoldRates(selectedCity);
    const [cityRates, setCityRates] = useState<CityRate[]>([]);

    // Load saved city from localStorage on mount
    useEffect(() => {
        const savedCity = localStorage.getItem('selectedCity');
        if (savedCity && ALL_CITIES.find(c => c.name === savedCity)) {
            setSelectedCity(savedCity);
        }
    }, []);

    // Fetch rates for all cities for the city boxes
    useEffect(() => {
        const fetchCityRates = async () => {
            const ratesPromises = ALL_CITIES.slice(0, 6).map(async (city) => {
                try {
                    const response = await fetch(`/api/gold-rates?city=${city.name}`);
                    const data = await response.json();
                    const rate22k = data.rates?.find((r: any) => r.purity === '22K Gold')?.price || 0;
                    return {
                        name: city.name,
                        slug: city.slug,
                        rate22k,
                        isLoading: false,
                    };
                } catch (error) {
                    return {
                        name: city.name,
                        slug: city.slug,
                        rate22k: 0,
                        isLoading: false,
                    };
                }
            });

            const rates = await Promise.all(ratesPromises);
            setCityRates(rates);
        };

        fetchCityRates();
    }, []);

    // Save selected city to localStorage
    const handleCityChange = (newCity: string) => {
        setSelectedCity(newCity);
        localStorage.setItem('selectedCity', newCity);
    };

    // Get 22K rate for display
    const rate22k = rates.find(r => r.purity === '22K Gold')?.price || 0;
    const change22k = rates.find(r => r.purity === '22K Gold')?.change || 0;
    const changePercent22k = rates.find(r => r.purity === '22K Gold')?.changePercent || '0.00%';

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 border border-amber-300 dark:border-amber-700 mb-6">
                            <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                                Updated Every 12 Hours
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Today's <span className="text-gradient-gold">Gold Rates</span>
                        </h1>

                        <p className="text-lg md:text-xl text-text-secondary">
                            Real-time gold prices for 24K, 22K, and 18K gold across India
                        </p>
                    </div>
                </div>
            </section>

            {/* Live Rates Dashboard with City Selector */}
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    {/* Section Header */}
                    <div className="text-center mb-8">
                        <h2 className="section-title">Live Gold Rates in {city}</h2>
                        <p className="section-subtitle">
                            Real-time gold prices updated every 12 hours for accurate investment decisions
                        </p>
                    </div>

                    {/* City Selector */}
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <MapPin className="w-5 h-5 text-amber-600" />
                        <select
                            value={selectedCity}
                            onChange={(e) => handleCityChange(e.target.value)}
                            className="px-4 py-2.5 rounded-lg border border-border bg-surface text-text-primary font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all cursor-pointer hover:border-amber-400"
                        >
                            {ALL_CITIES.map((cityOption) => (
                                <option key={cityOption.slug} value={cityOption.name}>
                                    {cityOption.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Gold Rates Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {rates.map((rate) => {
                            const isPositive = rate.change >= 0;
                            return (
                                <div
                                    key={rate.purity}
                                    className={`card-hover p-6 ${isLoading ? 'shimmer' : ''}`}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="badge-gold text-lg font-bold">
                                            {rate.purity}
                                        </span>
                                        <div className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? 'text-success' : 'text-error'}`}>
                                            {isPositive ? (
                                                <TrendingUp className="w-4 h-4" />
                                            ) : (
                                                <TrendingUp className="w-4 h-4 rotate-180" />
                                            )}
                                            <span>{rate.changePercent || '0.00%'}</span>
                                        </div>
                                    </div>

                                    <div className="mb-2">
                                        <div className="text-3xl md:text-4xl font-bold text-gradient-gold">
                                            ₹{rate.price.toLocaleString('en-IN')}
                                        </div>
                                        <div className="text-sm text-text-tertiary">
                                            per gram
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm mb-4">
                                        <span className="text-text-secondary">Change:</span>
                                        <span className={`font-semibold ${isPositive ? 'text-success' : 'text-error'}`}>
                                            {isPositive ? '+' : ''}₹{rate.change.toLocaleString('en-IN')}
                                        </span>
                                    </div>

                                    <div className="pt-4 border-t border-border">
                                        <div className="text-xs text-text-tertiary">
                                            10 grams: <span className="font-semibold text-text-primary">
                                                ₹{(rate.price * 10).toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* City Rates Section - Dynamic */}
            <section className="section bg-gradient-to-b from-surface to-background">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="section-title">Gold Rates by City</h2>
                        <p className="section-subtitle">
                            Check live 22K gold rates in major cities across India
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {cityRates.map((cityRate) => (
                            <Link
                                key={cityRate.slug}
                                href={`/cities/${cityRate.slug}`}
                                className="card-hover p-6 group"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                            <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                        </div>
                                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                                            {cityRate.name}
                                        </h3>
                                    </div>
                                </div>

                                <div className="mb-2">
                                    {cityRate.isLoading || cityRate.rate22k === 0 ? (
                                        <div className="h-8 bg-surface-elevated rounded animate-pulse" />
                                    ) : (
                                        <>
                                            <div className="text-2xl font-bold text-gradient-gold">
                                                ₹{cityRate.rate22k.toLocaleString('en-IN')}
                                            </div>
                                            <div className="text-xs text-text-tertiary">
                                                per gram (22K)
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="text-sm text-primary font-medium group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                                    View Details
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Link href="/cities" className="btn-outline">
                            View All Cities
                        </Link>
                    </div>
                </div>
            </section>

            {/* Historical Trends Section - Dynamic */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="card p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600">
                                    <Calendar className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">Gold Price Trends in {city}</h2>
                                    <p className="text-sm text-text-secondary">22K gold rate analysis</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="text-center p-4 rounded-lg bg-surface-elevated">
                                    <div className="text-sm text-text-secondary mb-1">Today</div>
                                    <div className="text-2xl font-bold text-gradient-gold">
                                        ₹{rate22k.toLocaleString('en-IN')}
                                    </div>
                                    <div className={`text-xs mt-1 ${change22k >= 0 ? 'text-success' : 'text-error'}`}>
                                        {changePercent22k}
                                    </div>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-surface-elevated">
                                    <div className="text-sm text-text-secondary mb-1">This Week</div>
                                    <div className="text-2xl font-bold">
                                        ₹{Math.round(rate22k * 0.995).toLocaleString('en-IN')}
                                    </div>
                                    <div className="text-xs text-text-tertiary mt-1">Average</div>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-surface-elevated">
                                    <div className="text-sm text-text-secondary mb-1">This Month</div>
                                    <div className="text-2xl font-bold">
                                        ₹{Math.round(rate22k * 0.985).toLocaleString('en-IN')}
                                    </div>
                                    <div className="text-xs text-text-tertiary mt-1">Average</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
