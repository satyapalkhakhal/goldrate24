import { NextResponse } from 'next/server';

/**
 * Silver Rates API Route
 * 
 * Fetches live silver rates from AngelOne Silver API
 * Returns rate per gram with price changes
 * 
 * Usage:
 *   GET /api/silver-rates              - Get rates for Mumbai (default)
 *   GET /api/silver-rates?city=delhi   - Get rates for specific city
 */

// City slug to AngelOne symbol mapping
const CITY_SYMBOLS: Record<string, string> = {
    ahmedabad: 'XAG-AHME',
    bangalore: 'XAG-BANG',
    chandigarh: 'XAG-CHAN',
    chennai: 'XAG-CHEN',
    coimbatore: 'XAG-COIM',
    hyderabad: 'XAG-HYDE',
    jaipur: 'XAG-JAIP',
    kolkata: 'XAG-KOLK',
    lucknow: 'XAG-LUCK',
    madurai: 'XAG-MADU',
    mangalore: 'XAG-MANG',
    mumbai: 'XAG-MUMB',
    mysore: 'XAG-MYSO',
    nagpur: 'XAG-NAGP',
    patna: 'XAG-PATN',
    pune: 'XAG-PUNE',
    salem: 'XAG-SALE',
    vijayawada: 'XAG-VIJA',
    delhi: 'XAG-MUMB', // Delhi uses Mumbai pricing
    kerala: 'XAG-CHEN', // Kerala uses Chennai pricing
};

interface AngelOneSilverResponse {
    success: boolean;
    data: {
        silver: {
            today: number;
            yesterday: number;
            differenceAmount: number;
            differencePercentage: number;
            date: string;
        };
    };
}

async function fetchSilverRate(symbol: string): Promise<AngelOneSilverResponse> {
    const response = await fetch(
        `https://kp-hl-httpapi-prod.angelone.in/silverCalculator?symbol=${symbol}`,
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
        throw new Error('Failed to fetch silver rate');
    }

    return response.json();
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const city = (searchParams.get('city') || 'mumbai').toLowerCase();
        const symbol = CITY_SYMBOLS[city] || 'XAG-MUMB';

        const result = await fetchSilverRate(symbol);

        if (!result.success) {
            throw new Error('API returned unsuccessful response');
        }

        const silver = result.data.silver;

        return NextResponse.json({
            rate: {
                price: Math.round(silver.today * 100) / 100,
                pricePerGram: Math.round(silver.today * 100) / 100,
                price10g: Math.round(silver.today * 10 * 100) / 100,
                price100g: Math.round(silver.today * 100 * 100) / 100,
                price1kg: Math.round(silver.today * 1000 * 100) / 100,
                yesterday: Math.round(silver.yesterday * 100) / 100,
                change: Math.round(silver.differenceAmount * 100) / 100,
                changePercent: Math.round(silver.differencePercentage * 100) / 100,
            },
            city: city.charAt(0).toUpperCase() + city.slice(1),
            lastUpdated: silver.date,
            source: 'angelone',
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
            },
        });

    } catch (error) {
        console.error('Error fetching silver rates:', error);

        return NextResponse.json({
            rate: {
                price: 85.00,
                pricePerGram: 85.00,
                price10g: 850.00,
                price100g: 8500.00,
                price1kg: 85000.00,
                yesterday: 85.00,
                change: 0,
                changePercent: 0,
            },
            city: 'Mumbai',
            lastUpdated: new Date().toISOString(),
            source: 'fallback',
            error: error instanceof Error ? error.message : 'Unknown error',
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
            },
        });
    }
}
