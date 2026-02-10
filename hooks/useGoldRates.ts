'use client';

import useSWR from 'swr';

export interface GoldRate {
    purity: string;
    price: number;
    change: number;
    changePercent?: string;
    unit: string;
    description: string;
}

interface GoldRatesResponse {
    rates: GoldRate[];
    city?: string;
    lastUpdated: string;
}

const fetcher = async (url: string): Promise<GoldRatesResponse> => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch gold rates');
    return res.json();
};

export function useGoldRates(city?: string) {
    const apiUrl = city ? `/api/gold-rates?city=${city}` : '/api/gold-rates';

    const { data, error, isLoading, mutate } = useSWR<GoldRatesResponse>(
        apiUrl,
        fetcher,
        {
            refreshInterval: 43200000, // Refresh every 12 hours (12 * 60 * 60 * 1000)
            revalidateOnFocus: false,
        }
    );

    return {
        rates: data?.rates || [],
        city: data?.city || city || 'Mumbai',
        lastUpdated: data?.lastUpdated ? new Date(data.lastUpdated) : null,
        isLoading,
        error,
        refresh: () => mutate(),
    };
}
