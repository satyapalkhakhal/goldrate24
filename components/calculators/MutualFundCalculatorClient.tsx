'use client';

import { useState } from 'react';
import { Wallet, RotateCcw } from 'lucide-react';

export default function MutualFundCalculatorClient() {
    const [investmentType, setInvestmentType] = useState<'sip' | 'lumpsum'>('sip');
    const [amount, setAmount] = useState('5000');
    const [expectedReturn, setExpectedReturn] = useState('12');
    const [timePeriod, setTimePeriod] = useState('10');

    const calculate = () => {
        const P = parseFloat(amount) || 0;
        const annualRate = parseFloat(expectedReturn) || 0;
        const years = parseFloat(timePeriod) || 0;

        if (P <= 0 || annualRate <= 0 || years <= 0) return { invested: 0, returns: 0, total: 0 };

        if (investmentType === 'lumpsum') {
            const total = P * Math.pow(1 + annualRate / 100, years);
            return { invested: P, returns: Math.round(total - P), total: Math.round(total) };
        } else {
            const r = annualRate / 100 / 12;
            const n = years * 12;
            const total = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
            const invested = P * n;
            return { invested, returns: Math.round(total - invested), total: Math.round(total) };
        }
    };

    const result = calculate();
    const fmt = (n: number) => n.toLocaleString('en-IN');
    const investedPercent = result.total > 0 ? (result.invested / result.total) * 100 : 50;

    const handleReset = () => { setAmount('5000'); setExpectedReturn('12'); setTimePeriod('10'); setInvestmentType('sip'); };

    return (
        <div className="min-h-screen">
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-lime-100 to-green-100 dark:from-lime-900/30 dark:to-green-900/30 border border-lime-300 dark:border-lime-700 mb-6">
                            <Wallet className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                            <span className="text-sm font-semibold text-lime-800 dark:text-lime-200">Mutual Fund Calculator</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-lime-600 to-green-600 dark:from-lime-400 dark:to-green-400 bg-clip-text text-transparent">Mutual Fund</span> Calculator
                        </h1>
                        <p className="text-lg text-text-secondary">Calculate returns for SIP and lumpsum investments</p>
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
                                        <label className="input-label">Investment Type</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button onClick={() => { setInvestmentType('sip'); setAmount('5000'); }} className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all ${investmentType === 'sip' ? 'bg-primary text-white border-primary shadow-lg' : 'bg-surface border-border hover:border-primary'}`}>SIP (Monthly)</button>
                                            <button onClick={() => { setInvestmentType('lumpsum'); setAmount('100000'); }} className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all ${investmentType === 'lumpsum' ? 'bg-primary text-white border-primary shadow-lg' : 'bg-surface border-border hover:border-primary'}`}>Lumpsum</button>
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="amount" className="input-label">{investmentType === 'sip' ? 'Monthly SIP Amount (₹)' : 'Lumpsum Amount (₹)'}</label>
                                        <input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="input" min="500" step={investmentType === 'sip' ? '500' : '10000'} />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="return" className="input-label">Expected Return Rate (% p.a.)</label>
                                        <input id="return" type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} className="input" min="1" max="30" step="0.5" />
                                        <div className="flex gap-2 mt-2">
                                            {[8, 10, 12, 15].map((r) => (
                                                <button key={r} onClick={() => setExpectedReturn(r.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">{r}%</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="period" className="input-label">Time Period (Years)</label>
                                        <input id="period" type="number" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} className="input" min="1" max="40" step="1" />
                                        <div className="flex gap-2 mt-2">
                                            {[3, 5, 10, 15, 20].map((y) => (
                                                <button key={y} onClick={() => setTimePeriod(y.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">{y}Y</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-6">
                                <div className="card p-6 bg-gradient-to-br from-lime-50 to-green-50 dark:from-lime-950/20 dark:to-green-950/20 border-lime-200 dark:border-lime-800">
                                    <h3 className="font-bold mb-2 text-sm text-text-secondary">Total Value</h3>
                                    <div className="text-3xl font-bold bg-gradient-to-r from-lime-600 to-green-600 dark:from-lime-400 dark:to-green-400 bg-clip-text text-transparent mb-4">₹{fmt(result.total)}</div>
                                    <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mb-3">
                                        <div className="h-full rounded-full bg-gradient-to-r from-lime-500 to-green-500 transition-all duration-500" style={{ width: `${investedPercent}%` }} />
                                    </div>
                                    <div className="flex justify-between text-xs text-text-tertiary">
                                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-lime-500" /> Invested</span>
                                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> Returns</span>
                                    </div>
                                </div>

                                <div className="card p-6">
                                    <h3 className="font-bold mb-4">Returns Summary</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Total Invested</span>
                                            <span className="font-semibold">₹{fmt(result.invested)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-border">
                                            <span className="text-sm text-text-secondary">Est. Returns</span>
                                            <span className="font-semibold text-green-600 dark:text-green-400">₹{fmt(result.returns)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="font-bold">Total Value</span>
                                            <span className="text-xl font-bold">₹{fmt(result.total)}</span>
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
