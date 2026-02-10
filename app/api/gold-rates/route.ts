import { NextResponse } from 'next/server';

/**
 * Gold Rates API Route
 * 
 * Fetches live gold rates from AngelOne API
 * Returns rates for 24K, 22K, and 18K gold with price changes
 * 
 * Usage:
 *   GET /api/gold-rates              - Get rates for Mumbai (default)
 *   GET /api/gold-rates?city=Delhi   - Get rates for specific city
 */

interface AngelOneResponse {
    success: boolean;
    data: {
        city: string;
        grams: number;
        carat: string;
        price: string;
        difference: string;
        percentage: string;
    };
}

async function fetchGoldRate(city: string, carat: string): Promise<AngelOneResponse> {
    const response = await fetch(
        `https://kp-hl-httpapi-prod.angelone.in/goldcalculator?city=${city}&carat=${carat}&grams=10`,
        {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
                'Referer': 'https://www.angelone.in/',
                'Origin': 'https://www.angelone.in',
            },
            next: { revalidate: 3600 }, // Cache for 1 hour
        }
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch ${carat} gold rate`);
    }

    return response.json();
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const city = searchParams.get('city') || 'Mumbai';

        // Fetch rates for all three carat types in parallel
        const [rate24k, rate22k, rate18k] = await Promise.all([
            fetchGoldRate(city, '24k'),
            fetchGoldRate(city, '22k'),
            fetchGoldRate(city, '18k'),
        ]);

        if (!rate24k.success || !rate22k.success || !rate18k.success) {
            throw new Error('Failed to fetch gold rates from API');
        }

        // Format the response
        const rates = [
            {
                purity: '24K Gold',
                price: Math.round(parseFloat(rate24k.data.price) / 10), // Convert from 10g to per gram
                change: parseFloat(rate24k.data.difference) / 10,
                changePercent: rate24k.data.percentage,
                unit: 'gram',
                description: 'Purest form of gold with 99.9% purity, ideal for investment',
            },
            {
                purity: '22K Gold',
                price: Math.round(parseFloat(rate22k.data.price) / 10),
                change: parseFloat(rate22k.data.difference) / 10,
                changePercent: rate22k.data.percentage,
                unit: 'gram',
                description: 'Most popular for jewelry making with 91.6% purity',
            },
            {
                purity: '18K Gold',
                price: Math.round(parseFloat(rate18k.data.price) / 10),
                change: parseFloat(rate18k.data.difference) / 10,
                changePercent: rate18k.data.percentage,
                unit: 'gram',
                description: 'Durable option with 75% purity, great for daily wear jewelry',
            },
        ];

        return NextResponse.json({
            rates,
            city,
            lastUpdated: new Date().toISOString(),
            source: 'angelone',
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=43200, stale-while-revalidate=86400',
            },
        });

    } catch (error) {
        console.error('Error fetching gold rates:', error);

        // Return fallback data on error
        return NextResponse.json({
            rates: [
                {
                    purity: '24K Gold',
                    price: 7350,
                    change: 0,
                    changePercent: '0%',
                    unit: 'gram',
                    description: 'Purest form of gold with 99.9% purity, ideal for investment',
                },
                {
                    purity: '22K Gold',
                    price: 6735,
                    change: 0,
                    changePercent: '0%',
                    unit: 'gram',
                    description: 'Most popular for jewelry making with 91.6% purity',
                },
                {
                    purity: '18K Gold',
                    price: 5513,
                    change: 0,
                    changePercent: '0%',
                    unit: 'gram',
                    description: 'Durable option with 75% purity, great for daily wear jewelry',
                },
            ],
            city: 'Mumbai',
            lastUpdated: new Date().toISOString(),
            source: 'fallback',
            error: error instanceof Error ? error.message : 'Unknown error',
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=43200, stale-while-revalidate=86400',
            },
        });
    }
}
