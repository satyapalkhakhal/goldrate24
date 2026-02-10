'use client';

import { useState, useEffect } from 'react';
import { useGoldRates } from '@/hooks/useGoldRates';
import { TrendingUp, TrendingDown, RefreshCw, Clock, MapPin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const CITIES = [
    'Delhi',
    'Chennai',
    'Mumbai',
    'Pune',
    'Hyderabad',
    'Bangalore',
    'Coimbatore',
    'Kolkata',
    'Ahmedabad',
    'Kerala',
];

export default function GoldRatesDashboard() {
    const [selectedCity, setSelectedCity] = useState<string>('Mumbai');
    const { rates, city, isLoading, error, lastUpdated, refresh } = useGoldRates(selectedCity);

    // Load saved city from localStorage on mount
    useEffect(() => {
        const savedCity = localStorage.getItem('selectedCity');
        if (savedCity && CITIES.includes(savedCity)) {
            setSelectedCity(savedCity);
        }
    }, []);

    // Save selected city to localStorage
    const handleCityChange = (newCity: string) => {
        setSelectedCity(newCity);
        localStorage.setItem('selectedCity', newCity);
    };

    if (error) {
        return (
            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="card p-8 text-center">
                        <p className="text-error">Failed to load gold rates. Please try again later.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="section bg-gradient-to-b from-background to-surface">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <h1 className="section-title">Live Gold Rates in {city}</h1>
                    <p className="section-subtitle">
                        Real-time gold prices updated hourly for accurate investment decisions
                    </p>
                </div>

                {/* City Selector & Controls */}
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    {/* City Selector */}
                    <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-amber-600" />
                        <select
                            value={selectedCity}
                            onChange={(e) => handleCityChange(e.target.value)}
                            className="px-4 py-2.5 rounded-lg border border-border bg-surface text-text-primary font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all cursor-pointer hover:border-amber-400"
                        >
                            {CITIES.map((cityName) => (
                                <option key={cityName} value={cityName}>
                                    {cityName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Last Updated & Refresh */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                            <Clock className="w-4 h-4" />
                            <span>
                                Last updated: {lastUpdated ? formatDistanceToNow(lastUpdated, { addSuffix: true }) : 'Loading...'}
                            </span>
                        </div>
                        <button
                            onClick={refresh}
                            disabled={isLoading}
                            className="btn-secondary text-sm py-2 px-4"
                        >
                            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Gold Rates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {rates.map((rate) => {
                        const isPositive = rate.change >= 0;
                        const changePercent = rate.changePercent || ((rate.change / rate.price) * 100).toFixed(2) + '%';

                        return (
                            <div
                                key={rate.purity}
                                className={`card-hover p-6 ${isLoading ? 'shimmer' : ''}`}
                            >
                                {/* Purity Badge */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="badge-gold text-lg font-bold">
                                        {rate.purity}
                                    </span>
                                    <div className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? 'text-success' : 'text-error'
                                        }`}>
                                        {isPositive ? (
                                            <TrendingUp className="w-4 h-4" />
                                        ) : (
                                            <TrendingDown className="w-4 h-4" />
                                        )}
                                        <span>{changePercent}</span>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="mb-4">
                                    <div className="text-3xl md:text-4xl font-bold text-gradient-gold mb-1">
                                        ₹{rate.price.toLocaleString('en-IN')}
                                    </div>
                                    <div className="text-sm text-text-tertiary">
                                        per {rate.unit}
                                    </div>
                                </div>

                                {/* Change */}
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-text-secondary">Change:</span>
                                    <span className={`font-semibold ${isPositive ? 'text-success' : 'text-error'
                                        }`}>
                                        {isPositive ? '+' : ''}₹{rate.change.toLocaleString('en-IN')}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="mt-4 text-xs text-text-tertiary border-t border-border pt-4">
                                    {rate.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Disclaimer */}
                <div className="mt-8 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                    <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
                        <strong>Note:</strong> Rates are indicative and may vary by location and jeweler.
                        Please verify with your local dealer before making any purchase.
                    </p>
                </div>
            </div>
        </section>
    );
}
