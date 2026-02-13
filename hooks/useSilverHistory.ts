'use client';

import useSWR from 'swr';

interface SilverHistoryEntry {
    date: string;
    price: string;
    differenceAmount: string;
    differencePercentage: string;
}

interface SilverHistoryResponse {
    success: boolean;
    data: {
        gram: number;
        history: SilverHistoryEntry[];
    };
}

const fetcher = async (url: string): Promise<SilverHistoryResponse> => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch silver history');
    return res.json();
};

export function useSilverHistory(city?: string) {
    const apiUrl = city ? `/api/silver-history?city=${city}` : '/api/silver-history';

    const { data, error, isLoading, mutate } = useSWR<SilverHistoryResponse>(
        apiUrl,
        fetcher,
        {
            refreshInterval: 43200000,
            revalidateOnFocus: false,
        }
    );

    return {
        history: data?.data?.history || [],
        gram: data?.data?.gram || 10,
        isLoading,
        error,
        refresh: () => mutate(),
    };
}
