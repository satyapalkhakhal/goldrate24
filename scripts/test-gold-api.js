#!/usr/bin/env node

/**
 * Gold Rate API Test Script
 * 
 * This script tests various gold rate APIs to check their response format,
 * data quality, and reliability.
 * 
 * Usage:
 *   node scripts/test-gold-api.js
 * 
 * Or make it executable:
 *   chmod +x scripts/test-gold-api.js
 *   ./scripts/test-gold-api.js
 */

const https = require('https');
const http = require('http');

// Color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};

// Helper function to make HTTP requests
function makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;

        const req = protocol.get(url, options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                        data: jsonData,
                    });
                } catch (error) {
                    resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                        data: data,
                        parseError: error.message,
                    });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.setTimeout(10000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
    });
}

// Print formatted output
function printHeader(text) {
    console.log(`\n${colors.bright}${colors.cyan}${'='.repeat(70)}${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}${text}${colors.reset}`);
    console.log(`${colors.cyan}${'='.repeat(70)}${colors.reset}\n`);
}

function printSuccess(text) {
    console.log(`${colors.green}✓ ${text}${colors.reset}`);
}

function printError(text) {
    console.log(`${colors.red}✗ ${text}${colors.reset}`);
}

function printWarning(text) {
    console.log(`${colors.yellow}⚠ ${text}${colors.reset}`);
}

function printInfo(text) {
    console.log(`${colors.blue}ℹ ${text}${colors.reset}`);
}

// Test your local API
async function testLocalAPI() {
    printHeader('Testing Local Gold Rate API');

    try {
        printInfo('Testing: http://localhost:3000/api/gold-rates');

        const response = await makeRequest('http://localhost:3000/api/gold-rates');

        if (response.statusCode === 200) {
            printSuccess(`Status: ${response.statusCode} OK`);

            // Validate response structure
            if (response.data.rates && Array.isArray(response.data.rates)) {
                printSuccess(`Found ${response.data.rates.length} gold rates`);

                console.log('\n' + colors.bright + 'Response Data:' + colors.reset);
                console.log(JSON.stringify(response.data, null, 2));

                // Check each rate
                response.data.rates.forEach((rate, index) => {
                    console.log(`\n${colors.yellow}Rate ${index + 1}:${colors.reset}`);
                    console.log(`  Purity: ${rate.purity}`);
                    console.log(`  Price: ₹${rate.price}/${rate.unit}`);
                    console.log(`  Change: ${rate.change > 0 ? '+' : ''}${rate.change}`);
                    console.log(`  Description: ${rate.description}`);
                });

                if (response.data.lastUpdated) {
                    printSuccess(`Last Updated: ${new Date(response.data.lastUpdated).toLocaleString()}`);
                }
            } else {
                printWarning('Response structure is unexpected');
                console.log(JSON.stringify(response.data, null, 2));
            }
        } else {
            printError(`Status: ${response.statusCode}`);
            console.log(response.data);
        }
    } catch (error) {
        printError(`Failed to connect to local API: ${error.message}`);
        printWarning('Make sure your Next.js dev server is running (npm run dev)');
    }
}

// Test GoldAPI.io (requires API key)
async function testGoldAPI() {
    printHeader('Testing GoldAPI.io');

    const apiKey = process.env.GOLD_API_KEY;

    if (!apiKey) {
        printWarning('GOLD_API_KEY not found in environment variables');
        printInfo('To test GoldAPI.io, set GOLD_API_KEY in your .env.local file');
        printInfo('Get your free API key at: https://www.goldapi.io/');
        return;
    }

    try {
        printInfo('Testing: https://www.goldapi.io/api/XAU/INR');

        const response = await makeRequest('https://www.goldapi.io/api/XAU/INR', {
            headers: {
                'x-access-token': apiKey,
            },
        });

        if (response.statusCode === 200) {
            printSuccess(`Status: ${response.statusCode} OK`);

            console.log('\n' + colors.bright + 'Response Data:' + colors.reset);
            console.log(JSON.stringify(response.data, null, 2));

            if (response.data.price) {
                console.log(`\n${colors.yellow}Gold Price (XAU/INR):${colors.reset}`);
                console.log(`  Price: ₹${response.data.price} per ounce`);
                console.log(`  Change: ${response.data.ch}`);
                console.log(`  Change %: ${response.data.chp}%`);
                console.log(`  High: ₹${response.data.high_price}`);
                console.log(`  Low: ₹${response.data.low_price}`);
            }
        } else {
            printError(`Status: ${response.statusCode}`);
            console.log(response.data);
        }
    } catch (error) {
        printError(`Failed to connect to GoldAPI.io: ${error.message}`);
    }
}

// Test MetalPriceAPI.com (free tier available)
async function testMetalPriceAPI() {
    printHeader('Testing MetalPriceAPI.com');

    const apiKey = process.env.METAL_PRICE_API_KEY;

    if (!apiKey) {
        printWarning('METAL_PRICE_API_KEY not found in environment variables');
        printInfo('To test MetalPriceAPI.com, set METAL_PRICE_API_KEY in your .env.local file');
        printInfo('Get your free API key at: https://metalpriceapi.com/');
        return;
    }

    try {
        printInfo(`Testing: https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=INR&currencies=XAU`);

        const response = await makeRequest(
            `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=INR&currencies=XAU`
        );

        if (response.statusCode === 200) {
            printSuccess(`Status: ${response.statusCode} OK`);

            console.log('\n' + colors.bright + 'Response Data:' + colors.reset);
            console.log(JSON.stringify(response.data, null, 2));

            if (response.data.rates && response.data.rates.XAU) {
                const pricePerOunce = 1 / response.data.rates.XAU;
                console.log(`\n${colors.yellow}Gold Price:${colors.reset}`);
                console.log(`  Price: ₹${pricePerOunce.toFixed(2)} per ounce`);
                console.log(`  Base: ${response.data.base}`);
                console.log(`  Timestamp: ${new Date(response.data.timestamp * 1000).toLocaleString()}`);
            }
        } else {
            printError(`Status: ${response.statusCode}`);
            console.log(response.data);
        }
    } catch (error) {
        printError(`Failed to connect to MetalPriceAPI.com: ${error.message}`);
    }
}

// Test Supabase gold rates endpoint directly
async function testSupabaseAPI() {
    printHeader('Testing Supabase Gold Rates API (Direct)');

    const supabaseUrl = 'https://mrvapygtxktrgilxqgqr.supabase.co/rest/v1/gold_rates';
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ydmFweWd0eGt0cmdpbHhxZ3FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyOTcwNDUsImV4cCI6MjA3Njg3MzA0NX0.9PA0JNkMOFVDoK4adMF_eO6eG5BBC4Jvut2sdDSPDM4';

    try {
        printInfo(`Testing: ${supabaseUrl}`);

        const response = await makeRequest(supabaseUrl, {
            headers: {
                'apikey': anonKey,
                'Authorization': `Bearer ${anonKey}`,
            },
        });

        if (response.statusCode === 200) {
            printSuccess(`Status: ${response.statusCode} OK`);

            if (Array.isArray(response.data)) {
                printSuccess(`Found ${response.data.length} gold rate records in database`);

                console.log('\n' + colors.bright + 'Response Data:' + colors.reset);
                console.log(JSON.stringify(response.data, null, 2));

                if (response.data.length > 0) {
                    // Show the most recent record
                    const latest = response.data[0];
                    console.log(`\n${colors.yellow}Latest Gold Rates from Supabase:${colors.reset}`);
                    console.log(`  ID: ${latest.id}`);
                    if (latest.price_24k) console.log(`  24K: ₹${latest.price_24k}/gram`);
                    if (latest.price_22k) console.log(`  22K: ₹${latest.price_22k}/gram`);
                    if (latest.price_18k) console.log(`  18K: ₹${latest.price_18k}/gram`);
                    if (latest.currency) console.log(`  Currency: ${latest.currency}`);
                    if (latest.updated_at) console.log(`  Updated: ${new Date(latest.updated_at).toLocaleString()}`);
                    if (latest.city) console.log(`  City: ${latest.city}`);
                    if (latest.change) console.log(`  Change: ${latest.change}`);
                    if (latest.change_percent) console.log(`  Change %: ${latest.change_percent}%`);
                } else {
                    printWarning('No records found in gold_rates table');
                    printInfo('You may need to seed the database with initial data');
                }
            } else {
                printWarning('Response is not an array');
                console.log(JSON.stringify(response.data, null, 2));
            }
        } else if (response.statusCode === 401) {
            printError(`Status: ${response.statusCode} Unauthorized`);
            printWarning('API key may be invalid or missing');
        } else if (response.statusCode === 404) {
            printError(`Status: ${response.statusCode} Not Found`);
            printWarning('The gold_rates table may not exist in your Supabase database');
            printInfo('Create the table with: CREATE TABLE gold_rates (...)');
        } else {
            printError(`Status: ${response.statusCode}`);
            console.log(response.data);
        }
    } catch (error) {
        printError(`Failed to connect to Supabase API: ${error.message}`);
        printInfo('Check that:');
        printInfo('  1. Supabase URL is correct');
        printInfo('  2. gold_rates table exists in your database');
        printInfo('  3. RLS policies allow public read access');
        printInfo('  4. API key is valid');
    }
}

// Test public/free APIs (no key required)
async function testFreeAPIs() {
    printHeader('Testing Free Gold Rate APIs (No API Key Required)');

    // Note: Most reliable free gold APIs are limited or don't exist
    // This is a placeholder for any free APIs you might find

    printWarning('Most reliable gold rate APIs require an API key');
    printInfo('Free options:');
    printInfo('  1. Use web scraping (not recommended, may violate ToS)');
    printInfo('  2. Use cached data from paid API (update periodically)');
    printInfo('  3. Use mock data for development');
    printInfo('  4. Get free tier from GoldAPI.io (50 requests/month)');
}

// Performance test
async function performanceTest() {
    printHeader('Performance Test - Local API');

    try {
        const iterations = 10;
        const times = [];

        printInfo(`Running ${iterations} requests to measure response time...`);

        for (let i = 0; i < iterations; i++) {
            const start = Date.now();
            await makeRequest('http://localhost:3000/api/gold-rates');
            const end = Date.now();
            times.push(end - start);
            process.stdout.write('.');
        }

        console.log('\n');

        const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
        const minTime = Math.min(...times);
        const maxTime = Math.max(...times);

        printSuccess(`Average response time: ${avgTime.toFixed(2)}ms`);
        printInfo(`Min: ${minTime}ms, Max: ${maxTime}ms`);

        if (avgTime < 100) {
            printSuccess('Excellent performance! ⚡');
        } else if (avgTime < 500) {
            printSuccess('Good performance ✓');
        } else {
            printWarning('Response time could be improved');
        }
    } catch (error) {
        printError(`Performance test failed: ${error.message}`);
    }
}

// Main test runner
async function runAllTests() {
    console.log(`${colors.bright}${colors.blue}`);
    console.log('╔════════════════════════════════════════════════════════════════════╗');
    console.log('║         Gold Rate API Test Suite                                   ║');
    console.log('║         Testing API responses and performance                      ║');
    console.log('╚════════════════════════════════════════════════════════════════════╝');
    console.log(colors.reset);

    // Test local API first
    await testLocalAPI();

    // Test Supabase direct API
    await testSupabaseAPI();

    // Test external APIs
    await testGoldAPI();
    await testMetalPriceAPI();
    await testFreeAPIs();

    // Performance test
    await performanceTest();

    // Summary
    printHeader('Test Summary');
    printInfo('Tests completed!');
    printInfo('Check the output above for any errors or warnings');

    console.log(`\n${colors.bright}Next Steps:${colors.reset}`);
    console.log('  1. If local API works: ✓ You can use it in your app');
    console.log('  2. To use real data: Get an API key from GoldAPI.io or MetalPriceAPI.com');
    console.log('  3. Add API key to .env.local file');
    console.log('  4. Update /app/api/gold-rates/route.ts to use the real API');
    console.log('');
}

// Run tests
runAllTests().catch((error) => {
    printError(`Test suite failed: ${error.message}`);
    process.exit(1);
});
