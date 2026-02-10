'use client';

import useSWR from 'swr';

export interface GoldHistoryItem {
    date: string;
    rate: string;
    change: string;
}

interface GoldHistoryResponse {
    success: boolean;
    data: GoldHistoryItem[];
}

const fetcher = async (url: string): Promise<GoldHistoryResponse> => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch gold history');
    return res.json();
};

export function useGoldHistory(carat: '24k' | '22k' | '18k') {
    const { data, error, isLoading, mutate } = useSWR<GoldHistoryResponse>(
        `/api/gold-history?carat=${carat}`,
        fetcher,
        {
            refreshInterval: 3600000, // Refresh every hour
            revalidateOnFocus: false,
        }
    );

    return {
        history: data?.data || [],
        isLoading,
        error,
        refresh: () => mutate(),
    };
}
