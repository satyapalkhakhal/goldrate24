'use client';

import { useState } from 'react';
import { Banknote, RotateCcw } from 'lucide-react';

export default function FDCalculatorClient() {
    const [principal, setPrincipal] = useState('100000');
    const [interestRate, setInterestRate] = useState('7.1');
    const [tenure, setTenure] = useState('5');
    const [compounding, setCompounding] = useState('4'); // quarterly

    const calculate = () => {
        const P = parseFloat(principal) || 0;
        const r = parseFloat(interestRate) / 100 || 0;
        const t = parseFloat(tenure) || 0;
        const n = parseInt(compounding) || 4;

        if (P === 0 || r === 0 || t === 0) return { maturityAmount: 0, totalInterest: 0 };

        const maturityAmount = P * Math.pow(1 + r / n, n * t);
        const totalInterest = maturityAmount - P;

        return { maturityAmount: Math.round(maturityAmount), totalInterest: Math.round(totalInterest) };
    };

    const result = calculate();
    const fmt = (n: number) => n.toLocaleString('en-IN');

    const handleReset = () => { setPrincipal('100000'); setInterestRate('7.1'); setTenure('5'); setCompounding('4'); };

    return (
        <div className="min-h-screen">
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 border border-yellow-300 dark:border-yellow-700 mb-6">
                            <Banknote className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                            <span className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">FD Calculator</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-yellow-600 to-amber-600 dark:from-yellow-400 dark:to-amber-400 bg-clip-text text-transparent">Fixed Deposit</span> Calculator
                        </h1>
                        <p className="text-lg text-text-secondary">Calculate FD maturity amount and interest earned</p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-5 gap-8">
                            <div className="lg:col-span-3 card p-6 md:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">FD Details</h2>
                                    <button onClick={handleReset} className="btn-secondary text-sm py-2 px-4"><RotateCcw className="w-4 h-4" /> Reset</button>
                                </div>
                                <div className="space-y-6">
                                    <div className="input-group">
                                        <label htmlFor="principal" className="input-label">Deposit Amount (₹)</label>
                                        <input id="principal" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="input" min="1000" step="10000" />
                                        <div className="flex gap-2 mt-2">
                                            {[50000, 100000, 500000, 1000000].map((a) => (
                                                <button key={a} onClick={() => setPrincipal(a.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">₹{a >= 100000 ? `${a / 100000}L` : `${a / 1000}K`}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="rate" className="input-label">Interest Rate (% p.a.)</label>
                                        <input id="rate" type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="input" min="1" max="15" step="0.1" />
                                        <div className="flex gap-2 mt-2">
                                            {[6.5, 7.0, 7.5, 8.0].map((r) => (
                                                <button key={r} onClick={() => setInterestRate(r.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">{r}%</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="tenure" className="input-label">Tenure (Years)</label>
                                        <input id="tenure" type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} className="input" min="0.25" max="10" step="0.25" />
                                        <div className="flex gap-2 mt-2">
                                            {[1, 2, 3, 5, 7].map((y) => (
                                                <button key={y} onClick={() => setTenure(y.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">{y}Y</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="compounding" className="input-label">Compounding Frequency</label>
                                        <select id="compounding" value={compounding} onChange={(e) => setCompounding(e.target.value)} className="input">
                                            <option value="12">Monthly</option>
                                            <option value="4">Quarterly</option>
                                            <option value="2">Half-Yearly</option>
                                            <option value="1">Yearly</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-6">
                                <div className="card p-6 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 border-yellow-200 dark:border-yellow-800">
                                    <h3 className="font-bold mb-2 text-sm text-text-secondary">Maturity Amount</h3>
                                    <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 dark:from-yellow-400 dark:to-amber-400 bg-clip-text text-transparent">₹{fmt(result.maturityAmount)}</div>
                                    <p className="text-xs text-text-tertiary mt-2">After {tenure} years</p>
                                </div>

                                <div className="card p-6">
                                    <h3 className="font-bold mb-4">FD Summary</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Principal Amount</span>
                                            <span className="font-semibold">₹{fmt(parseFloat(principal) || 0)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Total Interest</span>
                                            <span className="font-semibold text-green-600 dark:text-green-400">₹{fmt(result.totalInterest)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="font-bold">Maturity Value</span>
                                            <span className="text-xl font-bold">₹{fmt(result.maturityAmount)}</span>
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
