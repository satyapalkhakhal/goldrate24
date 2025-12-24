'use client';

import useSWR from 'swr';

export interface GoldRate {
    purity: string;
    price: number;
    change: number;
    unit: string;
    description: string;
}

interface GoldRatesResponse {
    rates: GoldRate[];
    lastUpdated: string;
}

const fetcher = async (url: string): Promise<GoldRatesResponse> => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch gold rates');
    return res.json();
};

export function useGoldRates() {
    const { data, error, isLoading, mutate } = useSWR<GoldRatesResponse>(
        '/api/gold-rates',
        fetcher,
        {
            refreshInterval: 3600000, // Refresh every hour
            revalidateOnFocus: false,
        }
    );

    return {
        rates: data?.rates || [],
        lastUpdated: data?.lastUpdated ? new Date(data.lastUpdated) : null,
        isLoading,
        error,
        refresh: () => mutate(),
    };
}
