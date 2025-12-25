import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import CitiesGrid from '@/components/cities/CitiesGrid';

export const metadata: Metadata = {
    title: 'Gold Rates in 25+ Indian Cities - City Wise Gold Price Today',
    description: 'Check today\'s gold rates in 25+ major cities across India. City-specific gold prices for 24K, 22K, and 18K gold in Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad & more. Updated hourly.',
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
        title: 'Gold Rates in 25+ Indian Cities - City Wise Gold Price',
        description: 'Check today\'s gold rates in major cities across India. City-specific prices for 24K, 22K, and 18K gold updated hourly.',
        url: '/cities',
        type: 'website',
    },
};

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
                                25+ Cities Covered
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

            {/* Cities Grid - Now Dynamic */}
            <CitiesGrid />

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
