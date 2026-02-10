import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const carat = searchParams.get('carat') || '24k';

        // Fetch data from AngelOne API
        const response = await fetch(
            `https://kp-hl-httpapi-prod.angelone.in/goldhistory?city=India&carat=${carat}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
                    'Referer': 'https://www.angelone.in/',
                },
                next: { revalidate: 3600 }, // Cache for 1 hour
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch gold history from AngelOne API');
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching gold history:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch gold history' },
            { status: 500 }
        );
    }
}
