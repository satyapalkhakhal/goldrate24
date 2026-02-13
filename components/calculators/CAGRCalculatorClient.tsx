'use client';

import { useState } from 'react';
import { TrendingUp, RotateCcw } from 'lucide-react';

export default function CAGRCalculatorClient() {
    const [initialValue, setInitialValue] = useState('100000');
    const [finalValue, setFinalValue] = useState('250000');
    const [timePeriod, setTimePeriod] = useState('5');

    const calculate = () => {
        const initial = parseFloat(initialValue) || 0;
        const final_ = parseFloat(finalValue) || 0;
        const years = parseFloat(timePeriod) || 0;

        if (initial <= 0 || final_ <= 0 || years <= 0) return { cagr: 0, totalReturn: 0, absoluteReturn: 0 };

        const cagr = (Math.pow(final_ / initial, 1 / years) - 1) * 100;
        const absoluteReturn = ((final_ - initial) / initial) * 100;
        const totalReturn = final_ - initial;

        return { cagr, totalReturn, absoluteReturn };
    };

    const result = calculate();
    const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

    const handleReset = () => { setInitialValue('100000'); setFinalValue('250000'); setTimePeriod('5'); };

    return (
        <div className="min-h-screen">
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-300 dark:border-amber-700 mb-6">
                            <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">CAGR Calculator</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">CAGR</span> Calculator
                        </h1>
                        <p className="text-lg text-text-secondary">Calculate Compound Annual Growth Rate of your investments</p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-5 gap-8">
                            <div className="lg:col-span-3 card p-6 md:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">Investment Details</h2>
                                    <button onClick={handleReset} className="btn-secondary text-sm py-2 px-4"><RotateCcw className="w-4 h-4" /> Reset</button>
                                </div>
                                <div className="space-y-6">
                                    <div className="input-group">
                                        <label htmlFor="initial" className="input-label">Initial Investment (₹)</label>
                                        <input id="initial" type="number" value={initialValue} onChange={(e) => setInitialValue(e.target.value)} className="input" min="1" step="1000" />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="final" className="input-label">Final Value (₹)</label>
                                        <input id="final" type="number" value={finalValue} onChange={(e) => setFinalValue(e.target.value)} className="input" min="1" step="1000" />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="period" className="input-label">Time Period (Years)</label>
                                        <input id="period" type="number" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} className="input" min="1" max="50" step="1" />
                                        <div className="flex gap-2 mt-2">
                                            {[1, 3, 5, 10, 15].map((y) => (
                                                <button key={y} onClick={() => setTimePeriod(y.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">{y}Y</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-6">
                                <div className="card p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800">
                                    <h3 className="font-bold mb-2 text-sm text-text-secondary">CAGR</h3>
                                    <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">{result.cagr.toFixed(2)}%</div>
                                    <p className="text-xs text-text-tertiary mt-2">Compound Annual Growth Rate</p>
                                </div>

                                <div className="card p-6">
                                    <h3 className="font-bold mb-4">Returns Summary</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Initial Investment</span>
                                            <span className="font-semibold">₹{fmt(parseFloat(initialValue) || 0)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Final Value</span>
                                            <span className="font-semibold">₹{fmt(parseFloat(finalValue) || 0)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Total Return</span>
                                            <span className="font-semibold text-green-600 dark:text-green-400">₹{fmt(result.totalReturn)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="font-bold">Absolute Return</span>
                                            <span className="text-xl font-bold text-green-600 dark:text-green-400">{result.absoluteReturn.toFixed(2)}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
