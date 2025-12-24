import type { Metadata } from 'next';
import GoldRatesDashboard from '@/components/home/GoldRatesDashboard';
import { TrendingUp, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Live Gold Rates Today',
    description: 'Check today\'s live gold rates for 24K, 22K, and 18K gold. Updated hourly with accurate prices across India.',
};

const topCities = [
    { name: 'Mumbai', slug: 'mumbai', rate: 6520 },
    { name: 'Delhi', slug: 'delhi', rate: 6515 },
    { name: 'Bangalore', slug: 'bangalore', rate: 6525 },
    { name: 'Chennai', slug: 'chennai', rate: 6530 },
    { name: 'Kolkata', slug: 'kolkata', rate: 6510 },
    { name: 'Hyderabad', slug: 'hyderabad', rate: 6518 },
];

export default function GoldRatesPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 border border-amber-300 dark:border-amber-700 mb-6">
                            <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                                Updated Every Hour
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

            {/* Live Rates Dashboard */}
            <GoldRatesDashboard />

            {/* City Rates Section */}
            <section className="section bg-gradient-to-b from-surface to-background">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="section-title">Gold Rates by City</h2>
                        <p className="section-subtitle">
                            Check gold rates in major cities across India
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {topCities.map((city) => (
                            <Link
                                key={city.slug}
                                href={`/cities/${city.slug}`}
                                className="card-hover p-6 group"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                            <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                        </div>
                                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                                            {city.name}
                                        </h3>
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <div className="text-2xl font-bold text-gradient-gold">
                                        ₹{city.rate.toLocaleString('en-IN')}
                                    </div>
                                    <div className="text-xs text-text-tertiary">
                                        per gram (22K)
                                    </div>
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

            {/* Historical Trends Section */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="card p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600">
                                    <Calendar className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">Gold Price Trends</h2>
                                    <p className="text-sm text-text-secondary">Historical gold rate analysis</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="text-center p-4 rounded-lg bg-surface-elevated">
                                    <div className="text-sm text-text-secondary mb-1">Today</div>
                                    <div className="text-2xl font-bold text-gradient-gold">₹6,520</div>
                                    <div className="text-xs text-success mt-1">+0.7%</div>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-surface-elevated">
                                    <div className="text-sm text-text-secondary mb-1">This Week</div>
                                    <div className="text-2xl font-bold">₹6,485</div>
                                    <div className="text-xs text-success mt-1">+1.2%</div>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-surface-elevated">
                                    <div className="text-sm text-text-secondary mb-1">This Month</div>
                                    <div className="text-2xl font-bold">₹6,420</div>
                                    <div className="text-xs text-success mt-1">+2.5%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
