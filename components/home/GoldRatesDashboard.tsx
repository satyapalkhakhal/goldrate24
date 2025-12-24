'use client';

import { useGoldRates } from '@/hooks/useGoldRates';
import { TrendingUp, TrendingDown, RefreshCw, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function GoldRatesDashboard() {
    const { rates, isLoading, error, lastUpdated, refresh } = useGoldRates();

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
                <div className="text-center mb-12">
                    <h2 className="section-title">Live Gold Rates</h2>
                    <p className="section-subtitle">
                        Real-time gold prices updated hourly for accurate investment decisions
                    </p>
                </div>

                {/* Last Updated & Refresh */}
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
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

                {/* Gold Rates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {rates.map((rate) => {
                        const isPositive = rate.change >= 0;
                        const changePercent = ((rate.change / rate.price) * 100).toFixed(2);

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
                                        <span>{changePercent}%</span>
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
