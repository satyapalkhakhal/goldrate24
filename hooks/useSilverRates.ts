'use client';

import useSWR from 'swr';

export interface SilverRate {
    price: number;
    pricePerGram: number;
    price10g: number;
    price100g: number;
    price1kg: number;
    yesterday: number;
    change: number;
    changePercent: number;
}

interface SilverRatesResponse {
    rate: SilverRate;
    city: string;
    lastUpdated: string;
    source: string;
}

const fetcher = async (url: string): Promise<SilverRatesResponse> => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch silver rates');
    return res.json();
};

export function useSilverRates(city?: string) {
    const apiUrl = city ? `/api/silver-rates?city=${city}` : '/api/silver-rates';

    const { data, error, isLoading, mutate } = useSWR<SilverRatesResponse>(
        apiUrl,
        fetcher,
        {
            refreshInterval: 43200000, // 12 hours
            revalidateOnFocus: false,
        }
    );

    return {
        rate: data?.rate || null,
        city: data?.city || city || 'Mumbai',
        lastUpdated: data?.lastUpdated || null,
        isLoading,
        error,
        refresh: () => mutate(),
    };
}
