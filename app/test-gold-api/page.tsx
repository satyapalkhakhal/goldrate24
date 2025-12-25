'use client'

import { useState } from 'react'

/**
 * Gold Rate API Test Page
 * 
 * This page provides a visual interface to test the gold rate API
 * and see the response in real-time.
 * 
 * Access at: http://localhost:3000/test-gold-api
 */

export default function TestGoldAPIPage() {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [responseTime, setResponseTime] = useState<number | null>(null)

    async function testAPI() {
        setLoading(true)
        setError(null)
        setResponse(null)
        setResponseTime(null)

        const startTime = Date.now()

        try {
            const res = await fetch('/api/gold-rates')
            const endTime = Date.now()
            setResponseTime(endTime - startTime)

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${res.statusText}`)
            }

            const data = await res.json()
            setResponse(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                        Gold Rate API Tester
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Test your gold rate API endpoint and view the response
                    </p>
                </div>

                {/* Test Button */}
                <div className="bg-gray-800 rounded-xl p-8 shadow-2xl mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">API Endpoint</h2>
                            <code className="text-yellow-400 bg-gray-900 px-3 py-1 rounded">
                                GET /api/gold-rates
                            </code>
                        </div>
                        <button
                            onClick={testAPI}
                            disabled={loading}
                            className={`px-8 py-4 rounded-lg font-bold text-lg transition-all ${loading
                                    ? 'bg-gray-600 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 shadow-lg hover:shadow-xl'
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Testing...
                                </span>
                            ) : (
                                'Test API'
                            )}
                        </button>
                    </div>

                    {/* Response Time */}
                    {responseTime !== null && (
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-400">Response Time:</span>
                            <span className={`font-bold ${responseTime < 100 ? 'text-green-400' : responseTime < 500 ? 'text-yellow-400' : 'text-red-400'}`}>
                                {responseTime}ms
                            </span>
                            {responseTime < 100 && <span className="text-green-400">⚡ Excellent!</span>}
                            {responseTime >= 100 && responseTime < 500 && <span className="text-yellow-400">✓ Good</span>}
                            {responseTime >= 500 && <span className="text-red-400">⚠ Slow</span>}
                        </div>
                    )}
                </div>

                {/* Error Display */}
                {error && (
                    <div className="bg-red-900/50 border-2 border-red-500 rounded-xl p-6 mb-8">
                        <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h3 className="text-xl font-bold text-red-400 mb-2">Error</h3>
                                <p className="text-red-200">{error}</p>
                                <div className="mt-4 p-3 bg-red-950 rounded text-sm text-red-300">
                                    <p className="font-semibold mb-1">Troubleshooting:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Make sure your dev server is running (npm run dev)</li>
                                        <li>Check that /api/gold-rates/route.ts exists</li>
                                        <li>Look for errors in the terminal</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Success Response */}
                {response && (
                    <div className="space-y-6">
                        {/* Status */}
                        <div className="bg-green-900/50 border-2 border-green-500 rounded-xl p-6">
                            <div className="flex items-center gap-3">
                                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <h3 className="text-2xl font-bold text-green-400">Success!</h3>
                                    <p className="text-green-200">API is working correctly</p>
                                </div>
                            </div>
                        </div>

                        {/* Gold Rates Display */}
                        {response.rates && (
                            <div className="bg-gray-800 rounded-xl p-8">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <span className="text-yellow-400">💰</span>
                                    Gold Rates
                                </h3>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {response.rates.map((rate: any, index: number) => (
                                        <div
                                            key={index}
                                            className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 border border-yellow-600/50 rounded-lg p-6"
                                        >
                                            <h4 className="text-xl font-bold text-yellow-400 mb-2">
                                                {rate.purity}
                                            </h4>
                                            <div className="text-3xl font-bold mb-2">
                                                ₹{rate.price.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-gray-400 mb-3">
                                                per {rate.unit}
                                            </div>
                                            <div className={`text-sm font-semibold ${rate.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {rate.change >= 0 ? '↑' : '↓'} {Math.abs(rate.change)} today
                                            </div>
                                            {rate.description && (
                                                <p className="text-xs text-gray-400 mt-3 border-t border-gray-700 pt-3">
                                                    {rate.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {response.lastUpdated && (
                                    <div className="mt-6 text-sm text-gray-400 text-center">
                                        Last updated: {new Date(response.lastUpdated).toLocaleString('en-IN', {
                                            dateStyle: 'medium',
                                            timeStyle: 'short'
                                        })}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Raw JSON Response */}
                        <div className="bg-gray-800 rounded-xl p-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold">Raw JSON Response</h3>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(JSON.stringify(response, null, 2))
                                        alert('Copied to clipboard!')
                                    }}
                                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-semibold transition-colors"
                                >
                                    Copy JSON
                                </button>
                            </div>
                            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
                                <code className="text-green-400">
                                    {JSON.stringify(response, null, 2)}
                                </code>
                            </pre>
                        </div>

                        {/* Response Analysis */}
                        <div className="bg-gray-800 rounded-xl p-8">
                            <h3 className="text-2xl font-bold mb-6">Response Analysis</h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-400 mb-3">Structure Validation</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            {response.rates ? (
                                                <><span className="text-green-400">✓</span><span>Has 'rates' array</span></>
                                            ) : (
                                                <><span className="text-red-400">✗</span><span>Missing 'rates' array</span></>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {Array.isArray(response.rates) ? (
                                                <><span className="text-green-400">✓</span><span>Rates is an array</span></>
                                            ) : (
                                                <><span className="text-red-400">✗</span><span>Rates is not an array</span></>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {response.lastUpdated ? (
                                                <><span className="text-green-400">✓</span><span>Has timestamp</span></>
                                            ) : (
                                                <><span className="text-yellow-400">⚠</span><span>Missing timestamp</span></>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-400 mb-3">Data Quality</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-300">Total rates:</span>
                                            <span className="font-bold text-yellow-400">
                                                {response.rates?.length || 0}
                                            </span>
                                        </div>
                                        {response.rates && response.rates.length > 0 && (
                                            <>
                                                <div className="flex items-center gap-2">
                                                    {response.rates.every((r: any) => r.purity) ? (
                                                        <><span className="text-green-400">✓</span><span>All have purity</span></>
                                                    ) : (
                                                        <><span className="text-red-400">✗</span><span>Some missing purity</span></>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {response.rates.every((r: any) => typeof r.price === 'number') ? (
                                                        <><span className="text-green-400">✓</span><span>All have valid prices</span></>
                                                    ) : (
                                                        <><span className="text-red-400">✗</span><span>Some invalid prices</span></>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Instructions */}
                {!response && !error && !loading && (
                    <div className="bg-gray-800 rounded-xl p-8">
                        <h3 className="text-2xl font-bold mb-4">How to Use</h3>
                        <ol className="space-y-3 text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold text-sm">1</span>
                                <span>Click the "Test API" button above to send a request to your gold rate API</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                                <span>View the response time and check if it's fast enough</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold text-sm">3</span>
                                <span>Review the gold rates data and ensure it's in the correct format</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold text-sm">4</span>
                                <span>Check the raw JSON to see the exact API response structure</span>
                            </li>
                        </ol>

                        <div className="mt-6 p-4 bg-blue-900/30 border border-blue-500/50 rounded-lg">
                            <p className="text-sm text-blue-200">
                                <strong>💡 Tip:</strong> Currently using mock data. To use real gold prices,
                                update <code className="bg-blue-950 px-2 py-1 rounded">/app/api/gold-rates/route.ts</code>
                                with an actual API integration.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
