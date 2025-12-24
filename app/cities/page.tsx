import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Gold Rates in 100+ Indian Cities - City Wise Gold Price Today',
    description: 'Check today\'s gold rates in 100+ major cities across India. City-specific gold prices for 24K, 22K, and 18K gold in Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad & more. Updated hourly.',
    keywords: [
        'gold rates by city',
        'city wise gold rate',
        'gold rate in cities',
        'gold price by city',
        'gold rate mumbai',
        'gold rate delhi',
        'gold rate bangalore',
        'gold rate chennai',
        'gold rate kolkata',
        'gold rate hyderabad',
        'city gold rates india',
    ],
    alternates: {
        canonical: '/cities',
    },
    openGraph: {
        title: 'Gold Rates in 100+ Indian Cities - City Wise Gold Price',
        description: 'Check today\'s gold rates in major cities across India. City-specific prices for 24K, 22K, and 18K gold updated hourly.',
        url: '/cities',
        type: 'website',
    },
};

const cities = [
    { name: 'Mumbai', slug: 'mumbai', state: 'Maharashtra', rate: 6520, change: 25 },
    { name: 'Delhi', slug: 'delhi', state: 'Delhi', rate: 6515, change: 30 },
    { name: 'Bangalore', slug: 'bangalore', state: 'Karnataka', rate: 6525, change: 20 },
    { name: 'Chennai', slug: 'chennai', state: 'Tamil Nadu', rate: 6530, change: 15 },
    { name: 'Kolkata', slug: 'kolkata', state: 'West Bengal', rate: 6510, change: 35 },
    { name: 'Hyderabad', slug: 'hyderabad', state: 'Telangana', rate: 6518, change: 28 },
    { name: 'Pune', slug: 'pune', state: 'Maharashtra', rate: 6522, change: 22 },
    { name: 'Ahmedabad', slug: 'ahmedabad', state: 'Gujarat', rate: 6512, change: 32 },
    { name: 'Jaipur', slug: 'jaipur', state: 'Rajasthan', rate: 6516, change: 26 },
    { name: 'Lucknow', slug: 'lucknow', state: 'Uttar Pradesh', rate: 6514, change: 29 },
    { name: 'Chandigarh', slug: 'chandigarh', state: 'Chandigarh', rate: 6517, change: 27 },
    { name: 'Kochi', slug: 'kochi', state: 'Kerala', rate: 6528, change: 18 },
];

export default function CitiesPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 border border-amber-300 dark:border-amber-700 mb-6">
                            <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                                100+ Cities Covered
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Gold Rates by <span className="text-gradient-gold">City</span>
                        </h1>

                        <p className="text-lg md:text-xl text-text-secondary">
                            Check today's gold rates in major cities across India
                        </p>
                    </div>
                </div>
            </section>

            {/* Cities Grid */}
            <section className="section">
                <div className="container-custom">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {cities.map((city, index) => {
                            const isPositive = city.change >= 0;
                            return (
                                <Link
                                    key={city.slug}
                                    href={`/cities/${city.slug}`}
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
                                                    {city.name}
                                                </h3>
                                                <p className="text-xs text-text-tertiary">{city.state}</p>
                                            </div>
                                        </div>
                                        <TrendingUp className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-colors" />
                                    </div>

                                    {/* Rate */}
                                    <div className="mb-3">
                                        <div className="text-2xl font-bold text-gradient-gold">
                                            ₹{city.rate.toLocaleString('en-IN')}
                                        </div>
                                        <div className="text-xs text-text-tertiary">
                                            per gram (22K)
                                        </div>
                                    </div>

                                    {/* Change */}
                                    <div className={`text-sm font-semibold ${isPositive ? 'text-success' : 'text-error'
                                        }`}>
                                        {isPositive ? '+' : ''}₹{city.change} today
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Can't Find Your City?
                        </h2>
                        <p className="text-lg text-slate-300 mb-8">
                            We're constantly adding more cities. Contact us to request gold rates for your city.
                        </p>
                        <Link href="/contact" className="btn-primary">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
