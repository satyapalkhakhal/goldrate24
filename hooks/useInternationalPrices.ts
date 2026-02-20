'use client';

import useSWR from 'swr';

export interface MetalPrice {
    symbol: string;
    name: string;
    priceOz: number;
    priceGram: number;
    change: number;
    changePercent: number;
    dayHigh: number;
    dayLow: number;
    prevClose: number;
    currency: string;
    marketState: string;
    lastUpdatedUnix: number;
}

export interface InternationalPricesData {
    gold: MetalPrice;
    silver: MetalPrice;
    fetchedAt: string;
    source: 'yahoo-finance' | 'fallback';
    error?: string;
}

const fetcher = async (url: string): Promise<InternationalPricesData> => {
    const res = await fetch(url, {
        // Ensure browser doesn't cache this either
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
    });
    if (!res.ok) throw new Error('Failed to fetch international prices');
    return res.json();
};

export function useInternationalPrices() {
    const { data, error, isLoading, mutate } = useSWR<InternationalPricesData>(
        '/api/international-prices',
        fetcher,
        {
            // Refresh every 5 minutes (300,000ms) while the page is open
            refreshInterval: 300_000,
            // Always revalidate when user focuses the tab
            revalidateOnFocus: true,
            // Revalidate on reconnect
            revalidateOnReconnect: true,
            // No stale data — always show fresh fetch
            dedupingInterval: 60_000, // Don't spam within 1 min
        }
    );

    return {
        gold: data?.gold ?? null,
        silver: data?.silver ?? null,
        fetchedAt: data?.fetchedAt ? new Date(data.fetchedAt) : null,
        source: data?.source ?? null,
        isLoading,
        error,
        refresh: () => mutate(),
    };
}
