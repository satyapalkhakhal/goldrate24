'use client';

import { useState } from 'react';
import { ArrowUpDown, RotateCcw } from 'lucide-react';

export default function SWPCalculatorClient() {
    const [totalInvestment, setTotalInvestment] = useState('5000000');
    const [monthlyWithdrawal, setMonthlyWithdrawal] = useState('25000');
    const [expectedReturn, setExpectedReturn] = useState('10');
    const [timePeriod, setTimePeriod] = useState('20');

    const calculate = () => {
        const corpus = parseFloat(totalInvestment) || 0;
        const monthly = parseFloat(monthlyWithdrawal) || 0;
        const rate = parseFloat(expectedReturn) / 100 / 12 || 0;
        const months = (parseFloat(timePeriod) || 0) * 12;
        if (corpus <= 0 || monthly <= 0 || months <= 0) return { totalWithdrawn: 0, finalCorpus: 0, totalReturns: 0, isCorpusDepleted: false, depletionMonth: 0 };

        let balance = corpus; let totalWithdrawn = 0; let depletionMonth = 0; let isCorpusDepleted = false;
        for (let m = 1; m <= months; m++) {
            balance = balance * (1 + rate) - monthly;
            totalWithdrawn += monthly;
            if (balance <= 0 && !isCorpusDepleted) { isCorpusDepleted = true; depletionMonth = m; balance = 0; }
            if (balance <= 0) balance = 0;
        }
        return { totalWithdrawn: Math.round(totalWithdrawn), finalCorpus: Math.round(Math.max(0, balance)), totalReturns: Math.round((totalWithdrawn + Math.max(0, balance)) - corpus), isCorpusDepleted, depletionMonth };
    };

    const result = calculate();
    const fmt = (n: number) => n.toLocaleString('en-IN');
    const handleReset = () => { setTotalInvestment('5000000'); setMonthlyWithdrawal('25000'); setExpectedReturn('10'); setTimePeriod('20'); };

    return (
        <div className="min-h-screen">
            <section className="section bg-gradient-to-b from-background to-surface">
                <div className="container-custom"><div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 border border-cyan-300 dark:border-cyan-700 mb-6">
                        <ArrowUpDown className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                        <span className="text-sm font-semibold text-cyan-800 dark:text-cyan-200">SWP Calculator</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4"><span className="bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">SWP</span> Calculator</h1>
                    <p className="text-lg text-text-secondary">Plan systematic withdrawals from your mutual fund investment</p>
                </div></div>
            </section>
            <section className="section"><div className="container-custom"><div className="max-w-6xl mx-auto"><div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 card p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">SWP Details</h2>
                        <button onClick={handleReset} className="btn-secondary text-sm py-2 px-4"><RotateCcw className="w-4 h-4" /> Reset</button>
                    </div>
                    <div className="space-y-6">
                        <div className="input-group">
                            <label htmlFor="corpus" className="input-label">Total Corpus (₹)</label>
                            <input id="corpus" type="number" value={totalInvestment} onChange={(e) => setTotalInvestment(e.target.value)} className="input" min="100000" step="100000" />
                            <div className="flex gap-2 mt-2">{[1000000, 2500000, 5000000, 10000000].map((a) => (<button key={a} onClick={() => setTotalInvestment(a.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">{a >= 10000000 ? `${a / 10000000}Cr` : `${a / 100000}L`}</button>))}</div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="withdrawal" className="input-label">Monthly Withdrawal (₹)</label>
                            <input id="withdrawal" type="number" value={monthlyWithdrawal} onChange={(e) => setMonthlyWithdrawal(e.target.value)} className="input" min="1000" step="5000" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="return" className="input-label">Expected Return Rate (% p.a.)</label>
                            <input id="return" type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} className="input" min="1" max="20" step="0.5" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="period" className="input-label">Withdrawal Period (Years)</label>
                            <input id="period" type="number" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} className="input" min="1" max="40" step="1" />
                            <div className="flex gap-2 mt-2">{[10, 15, 20, 25, 30].map((y) => (<button key={y} onClick={() => setTimePeriod(y.toString())} className="px-3 py-1 text-xs rounded-md bg-surface-elevated hover:bg-primary hover:text-white transition-colors">{y}Y</button>))}</div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 space-y-6">
                    <div className="card p-6 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/20 dark:to-teal-950/20 border-cyan-200 dark:border-cyan-800">
                        <h3 className="font-bold mb-2 text-sm text-text-secondary">Remaining Corpus</h3>
                        <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">₹{fmt(result.finalCorpus)}</div>
                    </div>
                    {result.isCorpusDepleted && (
                        <div className="card p-4 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                            <p className="text-xs text-red-800 dark:text-red-300">⚠️ Corpus depleted in {Math.floor(result.depletionMonth / 12)}Y {result.depletionMonth % 12}M. Reduce withdrawal or increase investment.</p>
                        </div>
                    )}
                    <div className="card p-6">
                        <h3 className="font-bold mb-4">SWP Summary</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-border"><span className="text-sm text-text-secondary">Initial Corpus</span><span className="font-semibold">₹{fmt(parseFloat(totalInvestment) || 0)}</span></div>
                            <div className="flex justify-between items-center pb-3 border-b border-border"><span className="text-sm text-text-secondary">Total Withdrawn</span><span className="font-semibold">₹{fmt(result.totalWithdrawn)}</span></div>
                            <div className="flex justify-between items-center pb-3 border-b border-border"><span className="text-sm text-text-secondary">Total Returns</span><span className={`font-semibold ${result.totalReturns >= 0 ? 'text-green-600' : 'text-error'}`}>₹{fmt(result.totalReturns)}</span></div>
                            <div className="flex justify-between items-center pt-2"><span className="font-bold">Remaining Corpus</span><span className="text-xl font-bold">₹{fmt(result.finalCorpus)}</span></div>
                        </div>
                    </div>
                </div>
            </div></div></div></section>
        </div>
    );
}
