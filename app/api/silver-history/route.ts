import { NextRequest, NextResponse } from 'next/server';

/**
 * Silver History API Route
 * 
 * Fetches 10-day silver price history from AngelOne API
 * 
 * Usage:
 *   GET /api/silver-history              - Get history for Mumbai (default)
 *   GET /api/silver-history?city=delhi   - Get history for specific city
 */

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
    delhi: 'XAG-MUMB',
    kerala: 'XAG-CHEN',
};

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const city = (searchParams.get('city') || 'mumbai').toLowerCase();
        const symbol = CITY_SYMBOLS[city] || 'XAG-MUMB';

        const response = await fetch(
            `https://kp-hl-httpapi-prod.angelone.in/silverhistory?symbol=${symbol}&gram=10`,
            {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
                    'Referer': 'https://www.angelone.in/',
                },
                next: { revalidate: 3600 },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch silver history from AngelOne API');
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching silver history:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch silver history' },
            { status: 500 }
        );
    }
}
