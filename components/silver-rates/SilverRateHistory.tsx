'use client';

import { useState } from 'react';
import { useSilverHistory } from '@/hooks/useSilverHistory';
import { TrendingUp, TrendingDown, RefreshCw, Calendar } from 'lucide-react';

export default function SilverRateHistory({ city }: { city?: string }) {
    const { history, isLoading, error, refresh } = useSilverHistory(city);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await refresh();
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    if (error) {
        return (
            <div className="card p-6 text-center">
                <p className="text-text-secondary">Unable to load silver price history.</p>
                <button onClick={handleRefresh} className="mt-3 btn-primary text-sm">
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="card overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                        <Calendar className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Silver Rate History</h3>
                        <p className="text-sm text-text-secondary">Last 10 days • Price per 10 grams</p>
                    </div>
                </div>
                <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="p-2 rounded-lg hover:bg-surface-elevated transition-colors"
                    title="Refresh"
                >
                    <RefreshCw className={`w-4 h-4 text-text-secondary ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50">
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-4 md:px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider">
                                Price (₹/10g)
                            </th>
                            <th className="px-4 md:px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider">
                                Change
                            </th>
                            <th className="px-4 md:px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider hidden sm:table-cell">
                                Change %
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i}>
                                    <td className="px-4 md:px-6 py-4">
                                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-24" />
                                    </td>
                                    <td className="px-4 md:px-6 py-4 text-right">
                                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-20 ml-auto" />
                                    </td>
                                    <td className="px-4 md:px-6 py-4 text-right">
                                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-16 ml-auto" />
                                    </td>
                                    <td className="px-4 md:px-6 py-4 text-right hidden sm:table-cell">
                                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-14 ml-auto" />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            history.map((entry, index) => {
                                const changeAmount = parseFloat(entry.differenceAmount);
                                const changePercent = parseFloat(entry.differencePercentage);
                                const isPositive = changeAmount >= 0;

                                return (
                                    <tr
                                        key={index}
                                        className="hover:bg-surface-elevated transition-colors"
                                    >
                                        <td className="px-4 md:px-6 py-4 text-sm font-medium text-text-primary whitespace-nowrap">
                                            {entry.date}
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-sm text-right font-semibold text-text-primary">
                                            ₹{parseFloat(entry.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-right">
                                            <span className={`inline-flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                                                {isPositive ? (
                                                    <TrendingUp className="w-3.5 h-3.5" />
                                                ) : (
                                                    <TrendingDown className="w-3.5 h-3.5" />
                                                )}
                                                ₹{Math.abs(changeAmount).toFixed(2)}
                                            </span>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-right hidden sm:table-cell">
                                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${isPositive
                                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                                                : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                                                }`}>
                                                {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
