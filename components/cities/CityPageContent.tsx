'use client';

import { MapPin, TrendingUp, TrendingDown, Clock, Info } from 'lucide-react';
import Link from 'next/link';
import { useGoldRates } from '@/hooks/useGoldRates';
import GoldRateHistory from '@/components/home/GoldRateHistory';

interface CityPageContentProps {
    cityName: string;
    stateName: string;
    otherCities: Array<{ name: string; slug: string; state: string }>;
}

export default function CityPageContent({ cityName, stateName, otherCities }: CityPageContentProps) {
    const { rates, isLoading, lastUpdated } = useGoldRates(cityName);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm text-text-secondary mb-6">
                            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/cities" className="hover:text-primary transition-colors">Cities</Link>
                            <span>/</span>
                            <span className="text-text-primary">{cityName}</span>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600">
                                <MapPin className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                                    Gold Rate in <span className="text-gradient-gold">{cityName}</span>
                                </h1>
                                <p className="text-lg text-text-secondary mt-2">
                                    {stateName} • Updated every 12 hours
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gold Rates */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6">Today's Gold Prices in {cityName}</h2>
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            {rates.map((rate) => {
                                const isPositive = rate.change >= 0;
                                return (
                                    <div key={rate.purity} className={`card-hover p-6 ${isLoading ? 'shimmer' : ''}`}>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="badge-gold text-lg font-bold">
                                                {rate.purity}
                                            </span>
                                            <div className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? 'text-success' : 'text-error'}`}>
                                                {isPositive ? (
                                                    <TrendingUp className="w-4 h-4" />
                                                ) : (
                                                    <TrendingDown className="w-4 h-4" />
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

                        {/* Last Updated */}
                        <div className="flex items-center justify-center gap-2 text-sm text-text-secondary mb-8">
                            <Clock className="w-4 h-4" />
                            <span>Last updated: {lastUpdated ? lastUpdated.toLocaleString('en-IN') : 'Loading...'}</span>
                        </div>

                        {/* Gold Rate History */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-6">Gold Rate History in {cityName}</h2>
                            <GoldRateHistory />
                        </div>

                        {/* Calculator CTA */}
                        <div className="card p-8 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-amber-200 dark:border-amber-800 mb-8">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">
                                        Calculate Your Gold Purchase
                                    </h2>
                                    <p className="text-text-secondary">
                                        Use our advanced calculator to get the exact cost including making charges and GST
                                    </p>
                                </div>
                                <Link href="/calculators/gold" className="btn-primary whitespace-nowrap">
                                    Calculate Now
                                </Link>
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="card p-6">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-2">About Gold Rates in {cityName}</h3>
                                        <p className="text-sm text-text-secondary">
                                            Gold rates in {cityName} are influenced by international gold prices,
                                            currency exchange rates, and local demand. Prices may vary slightly between
                                            different jewelers based on making charges and purity.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="card p-6">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                        <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-2">Factors Affecting Gold Prices</h3>
                                        <ul className="text-sm text-text-secondary space-y-1">
                                            <li>• International market trends</li>
                                            <li>• Currency exchange rates (USD/INR)</li>
                                            <li>• Import duties and GST</li>
                                            <li>• Local demand and supply</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Other Cities */}
            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6">Gold Rates in Other Cities</h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {otherCities.map((city) => (
                                <Link key={city.slug} href={`/cities/${city.slug}`} className="card-hover p-4 group">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-semibold group-hover:text-primary transition-colors">{city.name}</div>
                                            <div className="text-sm text-text-tertiary">{city.state}</div>
                                        </div>
                                        <span className="text-text-tertiary group-hover:text-primary group-hover:translate-x-1 transition-all">→</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="text-center mt-6">
                            <Link href="/cities" className="btn-outline">
                                View All Cities
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
