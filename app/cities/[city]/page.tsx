import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MapPin, TrendingUp, TrendingDown, Calendar, Info } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL || 'https://mrvapygtxktrgilxqgqr.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ydmFweWd0eGt0cmdpbHhxZ3FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyOTcwNDUsImV4cCI6MjA3Njg3MzA0NX0.9PA0JNkMOFVDoK4adMF_eO6eG5BBC4Jvut2sdDSPDM4'
);

// Fetch city data from Supabase
async function getCityData(citySlug: string) {
    try {
        // Convert slug to city name (capitalize first letter)
        const cityName = citySlug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        const { data, error } = await supabase
            .from('gold_rates')
            .select('*')
            .eq('city', cityName)
            .single();

        if (error || !data) {
            return null;
        }

        // Format data to match expected structure
        return {
            city: data.city,
            state: data.state,
            rates: [
                {
                    purity: '24K Gold',
                    price: Math.round(data.gold24k_10g / 10),
                    change: 0,
                },
                {
                    purity: '22K Gold',
                    price: Math.round(data.gold22k_10g / 10),
                    change: 0,
                },
                {
                    purity: '18K Gold',
                    price: Math.round(data.gold18k_10g / 10),
                    change: 0,
                },
            ],
            silver: {
                price_10g: data.silver_10g,
                price_1kg: data.silver_1kg,
            },
            lastUpdated: data.api_last_updated,
        };
    } catch (error) {
        console.error('Error fetching city data:', error);
        return null;
    }
}

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
    const cityData = await getCityData(params.city);

    if (!cityData) {
        return {
            title: 'City Not Found',
        };
    }

    const cityName = cityData.city;
    const stateName = cityData.state;
    const rate24k = cityData.rates[0].price;
    const rate22k = cityData.rates[1].price;

    return {
        title: `Gold Rate in ${cityName} Today - ${stateName} | 24K, 22K, 18K Gold Price`,
        description: `Today's gold rate in ${cityName}, ${stateName}: 24K ₹${rate24k}/gram, 22K ₹${rate22k}/gram. Check live gold prices updated hourly.`,
        keywords: [
            `gold rate in ${cityName.toLowerCase()}`,
            `gold price in ${cityName.toLowerCase()}`,
            `${cityName.toLowerCase()} gold rate today`,
            `24k gold rate ${cityName.toLowerCase()}`,
            `22k gold rate ${cityName.toLowerCase()}`,
        ],
        alternates: {
            canonical: `/cities/${params.city}`,
        },
    };
}

export default async function CityPage({ params }: { params: { city: string } }) {
    const cityData = await getCityData(params.city);

    if (!cityData) {
        notFound();
    }

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
                            <span className="text-text-primary">{cityData.city}</span>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600">
                                <MapPin className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                                    Gold Rate in <span className="text-gradient-gold">{cityData.city}</span>
                                </h1>
                                <p className="text-lg text-text-secondary mt-2">
                                    {cityData.state} • Updated hourly
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
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            {cityData.rates.map((rate) => {
                                const isPositive = rate.change >= 0;
                                return (
                                    <div key={rate.purity} className="card-hover p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="badge-gold text-lg font-bold">
                                                {rate.purity}
                                            </span>
                                            {rate.change !== 0 && (
                                                <div className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? 'text-success' : 'text-error'}`}>
                                                    {isPositive ? (
                                                        <TrendingUp className="w-4 h-4" />
                                                    ) : (
                                                        <TrendingDown className="w-4 h-4" />
                                                    )}
                                                    <span>{isPositive ? '+' : ''}₹{rate.change}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-2">
                                            <div className="text-3xl md:text-4xl font-bold text-gradient-gold">
                                                ₹{rate.price.toLocaleString('en-IN')}
                                            </div>
                                            <div className="text-sm text-text-tertiary">
                                                per gram
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-border">
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
                            <Calendar className="w-4 h-4" />
                            <span>Last updated: {new Date(cityData.lastUpdated).toLocaleString('en-IN')}</span>
                        </div>

                        {/* Silver Rates */}
                        {cityData.silver && (
                            <div className="card p-6 mb-8">
                                <h3 className="text-xl font-bold mb-4">Silver Rates in {cityData.city}</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-sm text-text-secondary">10 grams</div>
                                        <div className="text-2xl font-bold text-gray-600">
                                            ₹{cityData.silver.price_10g.toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-text-secondary">1 kilogram</div>
                                        <div className="text-2xl font-bold text-gray-600">
                                            ₹{cityData.silver.price_1kg.toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

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
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="card p-6">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-2">About Gold Rates in {cityData.city}</h3>
                                        <p className="text-sm text-text-secondary">
                                            Gold rates in {cityData.city} are influenced by international gold prices,
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
                            <Link href="/cities/mumbai" className="card-hover p-4 group">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-semibold group-hover:text-primary transition-colors">Mumbai</div>
                                        <div className="text-sm text-text-tertiary">Maharashtra</div>
                                    </div>
                                    <span className="text-text-tertiary group-hover:text-primary group-hover:translate-x-1 transition-all">→</span>
                                </div>
                            </Link>
                            <Link href="/cities/delhi" className="card-hover p-4 group">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-semibold group-hover:text-primary transition-colors">Delhi</div>
                                        <div className="text-sm text-text-tertiary">Delhi</div>
                                    </div>
                                    <span className="text-text-tertiary group-hover:text-primary group-hover:translate-x-1 transition-all">→</span>
                                </div>
                            </Link>
                            <Link href="/cities/bangalore" className="card-hover p-4 group">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-semibold group-hover:text-primary transition-colors">Bangalore</div>
                                        <div className="text-sm text-text-tertiary">Karnataka</div>
                                    </div>
                                    <span className="text-text-tertiary group-hover:text-primary group-hover:translate-x-1 transition-all">→</span>
                                </div>
                            </Link>
                            <Link href="/cities/chennai" className="card-hover p-4 group">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-semibold group-hover:text-primary transition-colors">Chennai</div>
                                        <div className="text-sm text-text-tertiary">Tamil Nadu</div>
                                    </div>
                                    <span className="text-text-tertiary group-hover:text-primary group-hover:translate-x-1 transition-all">→</span>
                                </div>
                            </Link>
                            <Link href="/cities/kolkata" className="card-hover p-4 group">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-semibold group-hover:text-primary transition-colors">Kolkata</div>
                                        <div className="text-sm text-text-tertiary">West Bengal</div>
                                    </div>
                                    <span className="text-text-tertiary group-hover:text-primary group-hover:translate-x-1 transition-all">→</span>
                                </div>
                            </Link>
                            <Link href="/cities/hyderabad" className="card-hover p-4 group">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-semibold group-hover:text-primary transition-colors">Hyderabad</div>
                                        <div className="text-sm text-text-tertiary">Telangana</div>
                                    </div>
                                    <span className="text-text-tertiary group-hover:text-primary group-hover:translate-x-1 transition-all">→</span>
                                </div>
                            </Link>
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
