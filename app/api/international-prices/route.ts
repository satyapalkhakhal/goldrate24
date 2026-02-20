import { NextResponse } from 'next/server';

/**
 * International Prices API Route
 *
 * Fetches live international gold (XAU/USD) and silver (XAG/USD) spot prices
 * from Yahoo Finance v8 chart API — no API key required.
 *
 * Tickers:
 *  GC=F  → Gold Futures (USD/troy oz) — closely tracks XAU spot
 *  SI=F  → Silver Futures (USD/troy oz)
 *
 * Usage: GET /api/international-prices
 */

interface YahooChartMeta {
    symbol: string;
    regularMarketPrice: number;
    chartPreviousClose: number;
    regularMarketDayHigh: number;
    regularMarketDayLow: number;
    currency: string;
    exchangeName: string;
    marketState?: string;
}

interface YahooChartResponse {
    chart: {
        result: Array<{ meta: YahooChartMeta }>;
        error: null | { code: string; description: string };
    };
}

const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://finance.yahoo.com/',
    'Origin': 'https://finance.yahoo.com',
};

async function fetchChart(ticker: string): Promise<YahooChartMeta> {
    const url = `https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1m&range=1d`;

    const res = await fetch(url, {
        headers: HEADERS,
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error(`Yahoo Finance chart API returned ${res.status} for ${ticker}`);
    }

    const data: YahooChartResponse = await res.json();

    if (data.chart.error || !data.chart.result?.[0]) {
        throw new Error(`No chart data for ${ticker}: ${JSON.stringify(data.chart.error)}`);
    }

    return data.chart.result[0].meta;
}

export async function GET() {
    // 1 troy oz = 31.1035 grams
    const TROY_OZ_TO_GRAM = 31.1035;

    try {
        // Fetch both in parallel
        const [goldMeta, silverMeta] = await Promise.all([
            fetchChart('GC=F'),
            fetchChart('SI=F'),
        ]);

        const goldPrice = goldMeta.regularMarketPrice;
        const goldPrev = goldMeta.chartPreviousClose;
        const goldChange = +(goldPrice - goldPrev).toFixed(2);
        const goldChangePct = +((goldChange / goldPrev) * 100).toFixed(2);

        const silverPrice = silverMeta.regularMarketPrice;
        const silverPrev = silverMeta.chartPreviousClose;
        const silverChange = +(silverPrice - silverPrev).toFixed(2);
        const silverChangePct = +((silverChange / silverPrev) * 100).toFixed(2);

        // Determine market state -  futures markets are open Sun 6pm-Fri 5pm ET
        const now = new Date();
        const hourUTC = now.getUTCHours();
        const dayUTC = now.getUTCDay(); // 0=Sun, 6=Sat
        // Rough check: CME Globex gold/silver open ~24h Sun-Fri except Fri 5pm-Sun 6pm ET
        // ET is UTC-5 (winter) / UTC-4 (summer). We'll approximate:
        const isFriAfterClose = dayUTC === 5 && hourUTC >= 21; // Fri after 5pm ET (~ 21 UTC)
        const isSatOrSunBefore6pm = dayUTC === 6 || (dayUTC === 0 && hourUTC < 22);
        const marketState = (isFriAfterClose || isSatOrSunBefore6pm) ? 'CLOSED' : 'REGULAR';

        return NextResponse.json({
            gold: {
                symbol: 'XAU/USD',
                name: 'Gold Futures',
                ticker: 'GC=F',
                priceOz: goldPrice,
                priceGram: +(goldPrice / TROY_OZ_TO_GRAM).toFixed(2),
                change: goldChange,
                changePercent: goldChangePct,
                dayHigh: goldMeta.regularMarketDayHigh || goldPrice,
                dayLow: goldMeta.regularMarketDayLow || goldPrice,
                prevClose: goldPrev,
                currency: goldMeta.currency || 'USD',
                marketState,
                lastUpdatedUnix: Math.floor(Date.now() / 1000),
            },
            silver: {
                symbol: 'XAG/USD',
                name: 'Silver Futures',
                ticker: 'SI=F',
                priceOz: silverPrice,
                priceGram: +(silverPrice / TROY_OZ_TO_GRAM).toFixed(2),
                change: silverChange,
                changePercent: silverChangePct,
                dayHigh: silverMeta.regularMarketDayHigh || silverPrice,
                dayLow: silverMeta.regularMarketDayLow || silverPrice,
                prevClose: silverPrev,
                currency: silverMeta.currency || 'USD',
                marketState,
                lastUpdatedUnix: Math.floor(Date.now() / 1000),
            },
            fetchedAt: new Date().toISOString(),
            source: 'yahoo-finance',
        }, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate',
                'Pragma': 'no-cache',
            },
        });

    } catch (error) {
        console.error('[international-prices] Error:', error instanceof Error ? error.message : error);

        // Graceful fallback with realistic current values
        return NextResponse.json({
            gold: {
                symbol: 'XAU/USD',
                name: 'Gold Futures',
                ticker: 'GC=F',
                priceOz: 2930.0,
                priceGram: +(2930.0 / 31.1035).toFixed(2),
                change: 0,
                changePercent: 0,
                dayHigh: 2945.0,
                dayLow: 2918.0,
                prevClose: 2930.0,
                currency: 'USD',
                marketState: 'CLOSED',
                lastUpdatedUnix: Math.floor(Date.now() / 1000),
            },
            silver: {
                symbol: 'XAG/USD',
                name: 'Silver Futures',
                ticker: 'SI=F',
                priceOz: 32.50,
                priceGram: +(32.50 / 31.1035).toFixed(2),
                change: 0,
                changePercent: 0,
                dayHigh: 33.0,
                dayLow: 32.2,
                prevClose: 32.50,
                currency: 'USD',
                marketState: 'CLOSED',
                lastUpdatedUnix: Math.floor(Date.now() / 1000),
            },
            fetchedAt: new Date().toISOString(),
            source: 'fallback',
            error: error instanceof Error ? error.message : 'Unknown error',
        }, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate',
            },
        });
    }
}
