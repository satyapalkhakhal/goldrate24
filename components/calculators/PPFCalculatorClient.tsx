'use client';

import { useState } from 'react';
import { PiggyBank, RotateCcw } from 'lucide-react';

export default function PPFCalculatorClient() {
    const [yearlyInvestment, setYearlyInvestment] = useState('150000');
    const [interestRate, setInterestRate] = useState('7.1');
    const [timePeriod, setTimePeriod] = useState('15');

    const calculate = () => {
        const yearly = parseFloat(yearlyInvestment) || 0;
        const rate = parseFloat(interestRate) / 100 || 0;
        const years = parseInt(timePeriod) || 15;

        if (yearly <= 0 || rate <= 0 || years <= 0) return { maturityAmount: 0, totalInvested: 0, totalInterest: 0 };

        let balance = 0;
        for (let i = 0; i < years; i++) {
            balance = (balance + yearly) * (1 + rate);
        }

        const totalInvested = yearly * years;
        const totalInterest = balance - totalInvested;

        return { maturityAmount: Math.round(balance), totalInvested: Math.round(totalInvested), totalInterest: Math.round(totalInterest) };
    };

    const result = calculate();
    const fmt = (n: number) => n.toLocaleString('en-IN');
    const investedPercent = result.maturityAmount > 0 ? (result.totalInvested / result.maturityAmount) * 100 : 50;

    const handleReset = () => { setYearlyInvestment('150000'); setInterestRate('7.1'); setTimePeriod('15'); };

    return (
        <div className="min-h-screen">
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-sky-100 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/30 border border-sky-300 dark:border-sky-700 mb-6">
                            <PiggyBank className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                            <span className="text-sm font-semibold text-sky-800 dark:text-sky-200">PPF Calculator</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">PPF</span> Calculator
                        </h1>
                        <p className="text-lg text-text-secondary">Calculate Public Provident Fund maturity amount and interest</p>
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
                                        <label htmlFor="yearly" className="input-label">Yearly Investment (₹)</label>
                                        <input id="yearly" type="number" value={yearlyInvestment} onChange={(e) => setYearlyInvestment(e.target.value)} className="input" min="500" max="150000" step="5000" />
                                        <div className="flex gap-2 mt-2">
                                            {[50000, 100000, 150000].map((a) => (
                                                <button key={a} onClick={() => setYearlyInvestment(a.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">₹{a >= 100000 ? `${a / 100000}L` : `${a / 1000}K`}</button>
                                            ))}
                                        </div>
                                        <p className="text-xs text-text-tertiary mt-1">Max ₹1,50,000 per year for tax benefit under 80C</p>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="rate" className="input-label">Interest Rate (% p.a.)</label>
                                        <input id="rate" type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="input" min="4" max="12" step="0.1" />
                                        <p className="text-xs text-text-tertiary mt-1">Current PPF rate: 7.1% (reviewed quarterly by Govt.)</p>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="period" className="input-label">Time Period (Years)</label>
                                        <input id="period" type="number" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} className="input" min="15" max="50" step="5" />
                                        <div className="flex gap-2 mt-2">
                                            {[15, 20, 25, 30].map((y) => (
                                                <button key={y} onClick={() => setTimePeriod(y.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">{y}Y</button>
                                            ))}
                                        </div>
                                        <p className="text-xs text-text-tertiary mt-1">Min 15 years. Can be extended in blocks of 5 years.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-6">
                                <div className="card p-6 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/20 dark:to-blue-950/20 border-sky-200 dark:border-sky-800">
                                    <h3 className="font-bold mb-2 text-sm text-text-secondary">Maturity Amount</h3>
                                    <div className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">₹{fmt(result.maturityAmount)}</div>
                                    <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mb-3">
                                        <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-500 transition-all duration-500" style={{ width: `${investedPercent}%` }} />
                                    </div>
                                    <div className="flex justify-between text-xs text-text-tertiary">
                                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-500" /> Invested</span>
                                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Interest</span>
                                    </div>
                                </div>

                                <div className="card p-6">
                                    <h3 className="font-bold mb-4">PPF Summary</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Total Invested</span>
                                            <span className="font-semibold">₹{fmt(result.totalInvested)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Interest Earned</span>
                                            <span className="font-semibold text-green-600 dark:text-green-400">₹{fmt(result.totalInterest)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="font-bold">Maturity Value</span>
                                            <span className="text-xl font-bold">₹{fmt(result.maturityAmount)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="card p-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                                    <h4 className="font-semibold text-sm mb-2 text-green-900 dark:text-green-200">🛡️ Tax Benefits</h4>
                                    <p className="text-xs text-green-800 dark:text-green-300">PPF offers EEE tax benefits — investment (80C), interest, and maturity are all tax-free.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
