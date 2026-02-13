'use client';

import { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';

export default function SimpleInterestCalculatorClient() {
    const [principal, setPrincipal] = useState('100000');
    const [rate, setRate] = useState('8');
    const [time, setTime] = useState('5');

    const calculate = () => {
        const P = parseFloat(principal) || 0;
        const R = parseFloat(rate) || 0;
        const T = parseFloat(time) || 0;
        const interest = (P * R * T) / 100;
        return { interest: Math.round(interest), total: Math.round(P + interest) };
    };

    const result = calculate();
    const fmt = (n: number) => n.toLocaleString('en-IN');
    const handleReset = () => { setPrincipal('100000'); setRate('8'); setTime('5'); };

    return (
        <div className="min-h-screen">
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom"><div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 border border-violet-300 dark:border-violet-700 mb-6">
                        <Calculator className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                        <span className="text-sm font-semibold text-violet-800 dark:text-violet-200">Simple Interest Calculator</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4"><span className="bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">Simple Interest</span> Calculator</h1>
                    <p className="text-lg text-text-secondary">Calculate simple interest on your investments or loans</p>
                </div></div>
            </section>
            <section className="section"><div className="container-custom"><div className="max-w-6xl mx-auto"><div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 card p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Calculation Details</h2>
                        <button onClick={handleReset} className="btn-secondary text-sm py-2 px-4"><RotateCcw className="w-4 h-4" /> Reset</button>
                    </div>
                    <div className="space-y-6">
                        <div className="input-group">
                            <label htmlFor="P" className="input-label">Principal Amount (₹)</label>
                            <input id="P" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="input" min="1" step="10000" />
                            <div className="flex gap-2 mt-2">{[50000, 100000, 500000, 1000000].map((a) => (<button key={a} onClick={() => setPrincipal(a.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">₹{a >= 100000 ? `${a / 100000}L` : `${a / 1000}K`}</button>))}</div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="R" className="input-label">Rate of Interest (% p.a.)</label>
                            <input id="R" type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="input" min="0.1" max="50" step="0.5" />
                            <div className="flex gap-2 mt-2">{[5, 7, 8, 10, 12].map((r) => (<button key={r} onClick={() => setRate(r.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">{r}%</button>))}</div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="T" className="input-label">Time Period (Years)</label>
                            <input id="T" type="number" value={time} onChange={(e) => setTime(e.target.value)} className="input" min="0.5" max="30" step="0.5" />
                            <div className="flex gap-2 mt-2">{[1, 3, 5, 7, 10].map((y) => (<button key={y} onClick={() => setTime(y.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">{y}Y</button>))}</div>
                        </div>
                    </div>
                    <div className="mt-6 p-4 rounded-xl bg-surface-elevated text-sm text-text-secondary">
                        <p><strong>Formula:</strong> SI = (P × R × T) / 100</p>
                        <p className="mt-1">SI = ({principal} × {rate} × {time}) / 100 = ₹{fmt(result.interest)}</p>
                    </div>
                </div>
                <div className="lg:col-span-2 space-y-6">
                    <div className="card p-6 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 border-violet-200 dark:border-violet-800">
                        <h3 className="font-bold mb-2 text-sm text-text-secondary">Total Amount</h3>
                        <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">₹{fmt(result.total)}</div>
                    </div>
                    <div className="card p-6">
                        <h3 className="font-bold mb-4">Summary</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-border"><span className="text-sm text-text-secondary">Principal</span><span className="font-semibold">₹{fmt(parseFloat(principal) || 0)}</span></div>
                            <div className="flex justify-between items-center pb-3 border-b border-border"><span className="text-sm text-text-secondary">Interest Earned</span><span className="font-semibold text-green-600 dark:text-green-400">₹{fmt(result.interest)}</span></div>
                            <div className="flex justify-between items-center pt-2"><span className="font-bold">Total Amount</span><span className="text-xl font-bold">₹{fmt(result.total)}</span></div>
                        </div>
                    </div>
                </div>
            </div></div></div></section>
        </div>
    );
}
