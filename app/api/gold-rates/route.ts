import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * Gold Rates API Route
 * 
 * Fetches live gold rates from Supabase database
 * Supports filtering by city
 * 
 * Usage:
 *   GET /api/gold-rates              - Get default rates + all cities
 *   GET /api/gold-rates?city=Mumbai  - Get specific city
 */

export async function GET(request: Request) {
    try {
        // Initialize Supabase client
        const supabaseUrl = process.env.SUPABASE_URL || 'https://mrvapygtxktrgilxqgqr.supabase.co';
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseKey) {
            throw new Error('Supabase API key not configured');
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        // Get city parameter from query string
        const { searchParams } = new URL(request.url);
        const city = searchParams.get('city');

        // Build query
        let query = supabase
            .from('gold_rates')
            .select('*')
            .order('api_last_updated', { ascending: false });

        // Filter by city if provided
        if (city) {
            query = query.eq('city', city).limit(1);
        } else {
            // Get latest rates for all cities
            query = query.limit(25);
        }

        const { data, error } = await query;

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) {
            // Return mock data as fallback
            return NextResponse.json({
                rates: [
                    {
                        purity: '24K Gold',
                        price: 13855,
                        change: 0,
                        unit: 'gram',
                        description: 'Purest form of gold with 99.9% purity, ideal for investment',
                    },
                    {
                        purity: '22K Gold',
                        price: 12700,
                        change: 0,
                        unit: 'gram',
                        description: 'Most popular for jewelry making with 91.6% purity',
                    },
                    {
                        purity: '18K Gold',
                        price: 10391,
                        change: 0,
                        unit: 'gram',
                        description: 'Durable option with 75% purity, great for daily wear jewelry',
                    },
                ],
                lastUpdated: new Date().toISOString(),
                source: 'fallback',
            });
        }

        // If single city requested, return formatted rates
        if (city && data.length > 0) {
            const cityData = data[0];

            return NextResponse.json({
                city: cityData.city,
                state: cityData.state,
                rates: [
                    {
                        purity: '24K Gold',
                        price: Math.round(cityData.gold24k_10g / 10), // Convert from 10g to per gram
                        change: 0, // Calculate from historical data if available
                        unit: 'gram',
                        description: 'Purest form of gold with 99.9% purity, ideal for investment',
                    },
                    {
                        purity: '22K Gold',
                        price: Math.round(cityData.gold22k_10g / 10),
                        change: 0,
                        unit: 'gram',
                        description: 'Most popular for jewelry making with 91.6% purity',
                    },
                    {
                        purity: '18K Gold',
                        price: Math.round(cityData.gold18k_10g / 10),
                        change: 0,
                        unit: 'gram',
                        description: 'Durable option with 75% purity, great for daily wear jewelry',
                    },
                ],
                silver: {
                    price_10g: cityData.silver_10g,
                    price_1kg: cityData.silver_1kg,
                },
                lastUpdated: cityData.api_last_updated,
                fetchedAt: cityData.fetched_at,
                source: 'supabase',
            });
        }

        // Return default format for homepage (no city specified)
        // Use first city's data as default
        const defaultCity = data[0];

        return NextResponse.json({
            rates: [
                {
                    purity: '24K Gold',
                    price: Math.round(defaultCity.gold24k_10g / 10),
                    change: 0,
                    unit: 'gram',
                    description: 'Purest form of gold with 99.9% purity, ideal for investment',
                },
                {
                    purity: '22K Gold',
                    price: Math.round(defaultCity.gold22k_10g / 10),
                    change: 0,
                    unit: 'gram',
                    description: 'Most popular for jewelry making with 91.6% purity',
                },
                {
                    purity: '18K Gold',
                    price: Math.round(defaultCity.gold18k_10g / 10),
                    change: 0,
                    unit: 'gram',
                    description: 'Durable option with 75% purity, great for daily wear jewelry',
                },
            ],
            lastUpdated: defaultCity.api_last_updated,
            source: 'supabase',
            // Also include all cities for advanced usage
            cities: data.map(cityData => ({
                city: cityData.city,
                state: cityData.state,
                gold24k: Math.round(cityData.gold24k_10g / 10),
                gold22k: Math.round(cityData.gold22k_10g / 10),
                gold18k: Math.round(cityData.gold18k_10g / 10),
                silver_10g: cityData.silver_10g,
                lastUpdated: cityData.api_last_updated,
            })),
        });

    } catch (error) {
        console.error('Error fetching gold rates:', error);

        // Return fallback data on error
        return NextResponse.json({
            rates: [
                {
                    purity: '24K Gold',
                    price: 13855,
                    change: 0,
                    unit: 'gram',
                    description: 'Purest form of gold with 99.9% purity, ideal for investment',
                },
                {
                    purity: '22K Gold',
                    price: 12700,
                    change: 0,
                    unit: 'gram',
                    description: 'Most popular for jewelry making with 91.6% purity',
                },
                {
                    purity: '18K Gold',
                    price: 10391,
                    change: 0,
                    unit: 'gram',
                    description: 'Durable option with 75% purity, great for daily wear jewelry',
                },
            ],
            lastUpdated: new Date().toISOString(),
            source: 'fallback',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}
