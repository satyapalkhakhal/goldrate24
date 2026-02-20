'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, Wifi, WifiOff, Globe, Minus } from 'lucide-react';
import { useInternationalPrices } from '@/hooks/useInternationalPrices';
import type { MetalPrice } from '@/hooks/useInternationalPrices';

/** Formats a number to 2 decimal places with commas */
function fmt(n: number, decimals = 2) {
    return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

/** Animated number that pulses when value changes */
function AnimatedPrice({ value, className }: { value: number; className?: string }) {
    const [flash, setFlash] = useState(false);
    const [prev, setPrev] = useState(value);

    useEffect(() => {
        if (value !== prev) {
            setFlash(true);
            const t = setTimeout(() => setFlash(false), 600);
            setPrev(value);
            return () => clearTimeout(t);
        }
    }, [value, prev]);

    return (
        <span
            className={`transition-colors duration-300 ${flash ? 'text-amber-400' : ''} ${className ?? ''}`}
        >
            {fmt(value, 2)}
        </span>
    );
}

/** Single metal card */
function MetalCard({ metal, label, icon }: { metal: MetalPrice | null; label: string; icon: string }) {
    if (!metal) {
        return (
            <div className="flex-1 min-w-0 animate-pulse">
                <div className="h-6 bg-white/10 rounded w-32 mb-2" />
                <div className="h-10 bg-white/10 rounded w-40" />
            </div>
        );
    }

    const isUp = metal.change > 0;
    const isFlat = metal.change === 0;

    return (
        <div className="flex-1 min-w-0">
            {/* Label row */}
            <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{icon}</span>
                <span className="text-xs font-semibold tracking-widest text-white/60 uppercase">{label}</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-white/10 text-white/50 font-mono">{metal.symbol}</span>
                {metal.marketState === 'REGULAR' && (
                    <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE
                    </span>
                )}
            </div>

            {/* Price row */}
            <div className="flex items-baseline gap-3 flex-wrap">
                <div className="flex items-baseline gap-1">
                    <span className="text-xs text-white/40 font-medium">$</span>
                    <span className="text-3xl md:text-4xl font-bold text-white tracking-tight font-mono">
                        <AnimatedPrice value={metal.priceOz} />
                    </span>
                    <span className="text-xs text-white/40">/oz</span>
                </div>

                {/* Change badge */}
                <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-bold
                    ${isFlat ? 'bg-white/10 text-white/50' :
                        isUp ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                    {isFlat ? <Minus className="w-3 h-3" /> :
                        isUp ? <TrendingUp className="w-3 h-3" /> :
                            <TrendingDown className="w-3 h-3" />}
                    {isUp ? '+' : ''}{fmt(metal.change, 2)}  ({isUp ? '+' : ''}{fmt(metal.changePercent, 2)}%)
                </div>
            </div>

            {/* Per gram + Day range */}
            <div className="flex items-center gap-4 mt-2 text-xs text-white/40">
                <span>
                    <span className="text-white/60 font-medium">${fmt(metal.priceGram)}</span>
                    <span>/gram</span>
                </span>
                <span className="hidden sm:inline">
                    Range: <span className="text-white/60">${fmt(metal.dayLow)} – ${fmt(metal.dayHigh)}</span>
                </span>
            </div>
        </div>
    );
}

export default function InternationalPricesTicker() {
    const { gold, silver, fetchedAt, source, isLoading, error, refresh } = useInternationalPrices();
    const [timeAgo, setTimeAgo] = useState('');

    // Update "X seconds ago" live
    useEffect(() => {
        function update() {
            if (!fetchedAt) return;
            const secs = Math.round((Date.now() - fetchedAt.getTime()) / 1000);
            if (secs < 60) setTimeAgo(`${secs}s ago`);
            else if (secs < 3600) setTimeAgo(`${Math.round(secs / 60)}m ago`);
            else setTimeAgo(`${Math.round(secs / 3600)}h ago`);
        }
        update();
        const t = setInterval(update, 5000);
        return () => clearInterval(t);
    }, [fetchedAt]);

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#1a1408] to-slate-900">
            {/* Ambient glow effects */}
            <div className="absolute top-0 left-1/4 w-96 h-32 bg-amber-500/8 blur-3xl pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-96 h-32 bg-slate-400/5 blur-3xl pointer-events-none" />

            {/* Top divider line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

            <div className="container-custom py-5 md:py-6">
                {/* Header row */}
                <div className="flex items-center justify-between mb-4 gap-4">
                    <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-amber-500" />
                        <h2 className="text-xs font-bold tracking-widest text-white/50 uppercase">
                            International Spot Prices
                        </h2>
                        {source === 'fallback' && (
                            <span className="text-xs text-amber-500/70 flex items-center gap-1">
                                <WifiOff className="w-3 h-3" /> offline data
                            </span>
                        )}
                        {source === 'yahoo-finance' && !isLoading && (
                            <span className="text-xs text-white/30 flex items-center gap-1">
                                <Wifi className="w-3 h-3 text-emerald-500/60" /> live
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-white/30">
                        {fetchedAt && !isLoading && (
                            <span>Updated {timeAgo}</span>
                        )}
                        <button
                            onClick={refresh}
                            disabled={isLoading}
                            title="Refresh prices"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-amber-500/40 hover:text-amber-400 transition-all duration-200 disabled:opacity-50"
                        >
                            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
                            <span className="hidden sm:inline">{isLoading ? 'Fetching...' : 'Refresh'}</span>
                        </button>
                    </div>
                </div>

                {/* Error state */}
                {error && !gold && !silver && (
                    <div className="text-xs text-red-400/70 text-center py-4">
                        Could not fetch live prices. Showing last known values.
                    </div>
                )}

                {/* Main price cards */}
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12">
                    <MetalCard metal={gold} label="Gold" icon="🥇" />

                    {/* Divider */}
                    <div className="hidden sm:block w-px bg-gradient-to-b from-transparent via-white/10 to-transparent self-stretch" />
                    <div className="block sm:hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <MetalCard metal={silver} label="Silver" icon="🥈" />
                </div>

                {/* Footer disclaimer */}
                <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs text-white/20">
                        Prices in USD · Source: Yahoo Finance (GC=F, SI=F) · Auto-refreshes every 5 min
                    </p>
                    <p className="text-xs text-white/15">
                        1 troy oz = 31.1035 grams · Indicative prices only
                    </p>
                </div>
            </div>

            {/* Bottom divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        </section>
    );
}
