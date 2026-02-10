'use client';

import { useState } from 'react';
import { useGoldHistory } from '@/hooks/useGoldHistory';
import { TrendingUp, TrendingDown, RefreshCw, Calendar } from 'lucide-react';

type CaratType = '24k' | '22k' | '18k';

export default function GoldRateHistory() {
    const [selectedCarat, setSelectedCarat] = useState<CaratType>('24k');
    const { history, isLoading, error, refresh } = useGoldHistory(selectedCarat);

    const caratOptions: CaratType[] = ['24k', '22k', '18k'];

    if (error) {
        return (
            <section className="section bg-surface">
                <div className="container-custom">
                    <div className="card p-8 text-center">
                        <p className="text-error">Failed to load gold rate history. Please try again later.</p>
                        <button
                            onClick={refresh}
                            className="btn-primary mt-4"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Retry
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="section bg-background">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <h2 className="section-title">Gold Rate History</h2>
                    <p className="section-subtitle">
                        Track historical gold prices and trends over the past 10 days
                    </p>
                </div>

                {/* Carat Type Tabs */}
                <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
                    <div className="flex items-center gap-2 bg-surface rounded-lg p-1 shadow-sm">
                        {caratOptions.map((carat) => (
                            <button
                                key={carat}
                                onClick={() => setSelectedCarat(carat)}
                                className={`px-6 py-2.5 rounded-md font-semibold transition-all duration-200 ${selectedCarat === carat
                                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md'
                                        : 'text-text-secondary hover:text-text-primary hover:bg-background'
                                    }`}
                            >
                                {carat.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={refresh}
                        disabled={isLoading}
                        className="btn-secondary text-sm py-2.5 px-4"
                        title="Refresh data"
                    >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>

                {/* History Table */}
                <div className="card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border-b border-border">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-text-primary">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-amber-600" />
                                            Date
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-right text-sm font-bold text-text-primary">
                                        Rate (₹/10g)
                                    </th>
                                    <th className="px-6 py-4 text-right text-sm font-bold text-text-primary">
                                        Change (%)
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {isLoading ? (
                                    // Loading skeleton
                                    Array.from({ length: 10 }).map((_, index) => (
                                        <tr key={index} className="animate-pulse">
                                            <td className="px-6 py-4">
                                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 ml-auto"></div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 ml-auto"></div>
                                            </td>
                                        </tr>
                                    ))
                                ) : history.length > 0 ? (
                                    history.map((item, index) => {
                                        const changeValue = parseFloat(item.change);
                                        const isPositive = changeValue >= 0;
                                        const isFirstRow = index === 0;

                                        return (
                                            <tr
                                                key={index}
                                                className={`hover:bg-surface/50 transition-colors ${isFirstRow ? 'bg-amber-50/30 dark:bg-amber-950/10' : ''
                                                    }`}
                                            >
                                                <td className="px-6 py-4 text-sm text-text-primary font-medium">
                                                    {item.date}
                                                    {isFirstRow && (
                                                        <span className="ml-2 text-xs bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-full">
                                                            Latest
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm font-bold text-gradient-gold">
                                                    ₹{parseFloat(item.rate).toLocaleString('en-IN', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div
                                                        className={`inline-flex items-center gap-1 font-semibold text-sm ${isPositive ? 'text-success' : 'text-error'
                                                            }`}
                                                    >
                                                        {isPositive ? (
                                                            <TrendingUp className="w-4 h-4" />
                                                        ) : (
                                                            <TrendingDown className="w-4 h-4" />
                                                        )}
                                                        <span>
                                                            {isPositive ? '+' : ''}
                                                            {item.change}%
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-12 text-center text-text-tertiary">
                                            No historical data available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Info Note */}
                <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
                        <strong>Note:</strong> Historical rates are for reference only. Actual rates may vary by location and jeweler.
                    </p>
                </div>
            </div>
        </section>
    );
}
