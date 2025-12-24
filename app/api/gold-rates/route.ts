import { NextResponse } from 'next/server';

// Mock data - Replace with actual API integration
const mockGoldRates = [
    {
        purity: '24K Gold',
        price: 6850,
        change: 45,
        unit: 'gram',
        description: 'Purest form of gold with 99.9% purity, ideal for investment',
    },
    {
        purity: '22K Gold',
        price: 6520,
        change: 35,
        unit: 'gram',
        description: 'Most popular for jewelry making with 91.6% purity',
    },
    {
        purity: '18K Gold',
        price: 5280,
        change: 28,
        unit: 'gram',
        description: 'Durable option with 75% purity, great for daily wear jewelry',
    },
];

export async function GET() {
    try {
        // In production, fetch from actual gold rate API
        // const apiUrl = process.env.NEXT_PUBLIC_GOLD_API_URL;
        // const apiKey = process.env.NEXT_PUBLIC_GOLD_API_KEY;
        // const response = await fetch(`${apiUrl}?api_key=${apiKey}`);
        // const data = await response.json();

        // For now, return mock data
        return NextResponse.json({
            rates: mockGoldRates,
            lastUpdated: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Error fetching gold rates:', error);
        return NextResponse.json(
            { error: 'Failed to fetch gold rates' },
            { status: 500 }
        );
    }
}
